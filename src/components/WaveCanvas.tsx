"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import * as THREE from "three";
import {
  AmbientLight,
  VideoTexture,
  TextureLoader,
  LinearFilter,
  NoToneMapping,
  LinearSRGBColorSpace,
  ShaderMaterial,
  Vector2,
} from "three";
import LiquidBackgroundFn from "../app/utils/liquidBackground";

type WaveCanvasProps = {
  imageSrc?: string;
  onReady?: () => void;
  preloaderDone?: boolean;
};

const vertexShader = `
  varying vec2 vUv;
  void main() { 
    vUv = uv; 
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); 
  }
`;

const fragmentShader = `
  uniform sampler2D map;            
  uniform sampler2D videoMap;        
  uniform sampler2D displacementMap; 
  uniform vec2 uvMapScale;
  uniform float displacementScale;
  varying vec2 vUv;

  void main() {
    vec4 disp = texture2D(displacementMap, vUv);
    vec3 normal = vec3(disp.b, disp.a, sqrt(max(0.0, 1.0 - dot(disp.ba, disp.ba))));
    
    vec2 dUv = normal.xy * displacementScale * 0.04;
    vec2 newUv = ((vUv - 0.5) * uvMapScale) + 0.5 + dUv;
    
    vec4 baseColor = texture2D(map, newUv);
    vec4 videoColor = texture2D(videoMap, newUv);
    float videoLuminance = dot(videoColor.rgb, vec3(0.299, 0.587, 0.114));
    float causticsStrength = 0.14; 
    vec3 finalColor = baseColor.rgb + (videoColor.rgb * videoLuminance * causticsStrength);
    
    gl_FragColor = vec4(finalColor, baseColor.a);
  }
`;

export default function WaveCanvas({ imageSrc, onReady, preloaderDone = true }: WaveCanvasProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isMobileOrTablet, setIsMobileOrTablet] = useState<boolean | null>(null);
  const [engineReady, setEngineReady] = useState(false);
  const appInstanceRef = useRef<any>(null);

  // Detect device type
  useEffect(() => {
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobileOrTablet(isMobileUA || window.innerWidth <= 1024);
  }, []);

  // Handle immediate readiness for non-home pages or mobile/tablet
  useEffect(() => {
    if (!isHome || isMobileOrTablet) {
      onReady?.();
    }
  }, [isHome, isMobileOrTablet, onReady]);

  // WebGL Interactive Engine Setup (ONLY for Home page on Desktop)
  useEffect(() => {
    if (!isHome || isMobileOrTablet === null || isMobileOrTablet) return;

    let destroyed = false;
    let bgTexture: THREE.Texture | null = null;
    let videoTexture: THREE.VideoTexture | null = null;
    let shaderMat: THREE.ShaderMaterial | null = null;
    let animationFrameId: number;

    const setupEngine = async () => {
      if (!canvasRef.current || appInstanceRef.current) return;

      try {
        // High-performance async texture load
        if (imageSrc) {
          const loader = new TextureLoader();
          loader.setCrossOrigin("anonymous");
          bgTexture = await loader.loadAsync(imageSrc);
          bgTexture.colorSpace = LinearSRGBColorSpace;
          bgTexture.minFilter = LinearFilter;
          bgTexture.magFilter = LinearFilter;
          bgTexture.generateMipmaps = false;
        }

        if (destroyed) return;

        // Bypass heavy PMREM environment generation.
        //
        // liquidBackground's plane constructor calls
        // `new PMREMGenerator(renderer).fromScene(...).texture` to build an env
        // map. That is expensive and unused here, because the plane's material
        // is replaced with our own ShaderMaterial immediately below.
        //
        // This patches a *prototype*, i.e. process-wide state, so the restore
        // must be guaranteed even if the constructor throws. Without the
        // try/finally, a single failure left every later Three.js instance in
        // the app with a stubbed generator returning `{ texture: null }`.
        const originalFromScene = THREE.PMREMGenerator.prototype.fromScene;
        let appInstance: any;
        try {
          THREE.PMREMGenerator.prototype.fromScene = function () {
            return { texture: null } as any;
          };
          appInstance = (LiquidBackgroundFn as any)(canvasRef.current);
        } finally {
          THREE.PMREMGenerator.prototype.fromScene = originalFromScene;
        }

        appInstanceRef.current = appInstance;

        // Sharper desktop water detail without unbounded Retina rendering.
        appInstance.three.maxPixelRatio = Math.min(window.devicePixelRatio, 1.5);
        
        const initialWidth = canvasRef.current.clientWidth || window.innerWidth;
        const initialHeight = canvasRef.current.clientHeight || window.innerHeight;
        appInstance.three.renderer.setPixelRatio(appInstance.three.maxPixelRatio);
        appInstance.three.renderer.setSize(initialWidth, initialHeight);

        const renderer = appInstance.three.renderer;
        renderer.toneMapping = NoToneMapping;
        renderer.outputColorSpace = LinearSRGBColorSpace; 
        appInstance.three.scene.add(new AmbientLight(0xffffff, 1.0));

        if (videoRef.current) {
          videoTexture = new VideoTexture(videoRef.current);
          videoTexture.colorSpace = LinearSRGBColorSpace;
          videoTexture.minFilter = LinearFilter;
          videoTexture.magFilter = LinearFilter;
          videoTexture.generateMipmaps = false; 
        }

        shaderMat = new ShaderMaterial({
          uniforms: {
            map: { value: bgTexture },
            videoMap: { value: videoTexture },
            displacementMap: { value: appInstance.liquidPlane.uniforms.displacementMap.value },
            uvMapScale: { value: new Vector2(1, 1) },
            displacementScale: { value: 5.0 },
          },
          vertexShader,
          fragmentShader,
          depthWrite: false,
          transparent: false,
          blending: THREE.NoBlending,
        });

        if (appInstance.liquidPlane.material) {
          appInstance.liquidPlane.material.dispose();
        }
        
        appInstance.liquidPlane.material = shaderMat;
        appInstance.liquidPlane.uniforms = shaderMat.uniforms;
        
        if (appInstance.liquidPlane.attenuation !== undefined) {
          appInstance.liquidPlane.attenuation = 0.9;
        }

        appInstance.setRain(false);

        const updateAspect = () => {
          if (!appInstanceRef.current || !canvasRef.current) return;
          const cw = canvasRef.current.clientWidth || window.innerWidth;
          const ch = canvasRef.current.clientHeight || window.innerHeight;
          const uniforms = appInstanceRef.current.liquidPlane.uniforms;
          
          if (bgTexture?.image) {
            const cRatio = cw / ch;
            const img = bgTexture.image as HTMLImageElement;
            const iRatio = img.width && img.height ? img.width / img.height : 1;
            
            if (cRatio < iRatio) uniforms.uvMapScale.value.set(cRatio / iRatio, 1.0);
            else uniforms.uvMapScale.value.set(1.0, iRatio / cRatio);
          }

          appInstanceRef.current.three.renderer.setSize(cw, ch);
        };
        
        updateAspect();
        window.addEventListener("resize", updateAspect, { passive: true });

        renderer.render(appInstance.three.scene, appInstance.three.camera);

        if (videoRef.current) {
          const video = videoRef.current;
          video.playbackRate = 0.7;

          /*
           * preload="metadata" only guarantees the first frame, so play() can
           * reject or resolve before enough data exists to actually paint.
           * Wait for canplay before starting playback, otherwise the caustics
           * layer renders black until the browser buffers on its own schedule.
           */
          const startPlayback = () => {
            video.playbackRate = 0.7;
            video.play().catch(() => {});
          };

          if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            startPlayback();
          } else {
            video.addEventListener("canplay", startPlayback, { once: true });
            // If the browser never reaches canplay, load explicitly so the
            // texture is not left permanently empty.
            video.load();
          }
        }

        setEngineReady(true);
        onReady?.();
      } catch (err) {
        console.error("WebGL Setup Error:", err);
        // Fallback to ready state if WebGL setup fails
        onReady?.();
      }
    };

    animationFrameId = requestAnimationFrame(() => {
      setupEngine();
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(animationFrameId);
      if (bgTexture) bgTexture.dispose();
      if (videoTexture) videoTexture.dispose();
      if (shaderMat) shaderMat.dispose();
      if (appInstanceRef.current?.dispose) appInstanceRef.current.dispose();
      appInstanceRef.current = null;
    };
  }, [isHome, isMobileOrTablet, imageSrc, onReady]);

  // Non-Home static fallback render (Ultra-lightweight, zero WebGL overhead)
  if (!isHome) {
    return (
      <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-black">
        {imageSrc && (
          <img
            src={imageSrc}
            alt="" aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            onLoad={() => onReady?.()}
          />
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-black">
      {!isMobileOrTablet && (
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          /*
           * "metadata", not "auto".
           *
           * With preload="auto" the browser buffered the full 2.5MB webm while
           * the page's rAF scroll scrub was running. Measured on the homepage:
           * a 268ms long task at ~51% of scroll, p95 frame 35.8ms. Swapping in
           * preload="metadata" (VideoTexture only needs the first frame) gave
           * p95 17.5ms and no long task attributable to the video.
           */
          preload="metadata"
          crossOrigin="anonymous"
          className="hidden"
        >
          <source src="/videos/pool-water-hq.webm" type="video/webm"/>
          <source src="/videos/pool-water-hq.mp4" type="video/mp4"/>
        </video>
      )}

      {imageSrc && (
        <img
          src={imageSrc}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ opacity: 1 }}
          onLoad={() => {
            if (isMobileOrTablet) onReady?.();
          }}
        />
      )}
      
      {!isMobileOrTablet && (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full block transition-opacity duration-500 ease-out ${
            engineReady ? "opacity-100" : "opacity-0"
          }`}
          style={{ zIndex: 1, willChange: "transform" }}
        />
      )}
    </div>
  );
}