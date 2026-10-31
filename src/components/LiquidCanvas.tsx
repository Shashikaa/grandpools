"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  AmbientLight,
  TextureLoader,
  LinearFilter,
  NoToneMapping,
  LinearSRGBColorSpace,
  ShaderMaterial,
  Vector2,
} from "three";
import LiquidBackgroundFn from "../app/utils/liquidBackground";

type LiquidCanvasProps = {
  imageSrc: string; // Made required since there's no video fallback
  onReady?: () => void;
};

// --- Shaders ---
const vertexShader = `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;
const fragmentShader = `
  uniform sampler2D map;             
  uniform sampler2D displacementMap; 
  uniform vec2 uvMapScale;
  uniform float displacementScale;
  varying vec2 vUv;
  
  void main() {
    // Read the displacement texture
    vec4 disp = texture2D(displacementMap, vUv);
    vec3 normal = vec3(disp.b, disp.a, sqrt(max(0.0, 1.0 - dot(disp.ba, disp.ba))));
    
    // Calculate UV distortion based on the normal
    vec2 dUv = normal.xy * displacementScale * 0.02;
    vec2 newUv = ((vUv - 0.5) * uvMapScale) + 0.5 + dUv;
    
    // Sample the background image with the distorted UVs
    vec4 baseColor = texture2D(map, newUv);
    gl_FragColor = baseColor;
  }
`;

// --- Utility: Off-Main-Thread Texture Decoding ---
const loadTextureOffThread = async (url: string): Promise<THREE.Texture> => {
  try {
    const res = await fetch(url, { mode: "cors" });
    const blob = await res.blob();
    // Keeps the flipY fix to ensure the image isn't upside down
    const bitmap = await createImageBitmap(blob, { 
        premultiplyAlpha: 'none',
        imageOrientation: 'flipY' 
    });
    const texture = new THREE.Texture(bitmap);
    texture.colorSpace = LinearSRGBColorSpace;
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;
    texture.generateMipmaps = false;
    texture.needsUpdate = true;
    return texture;
  } catch (e) {
    const loader = new TextureLoader();
    loader.setCrossOrigin("anonymous");
    const tex = await loader.loadAsync(url);
    tex.colorSpace = LinearSRGBColorSpace;
    tex.minFilter = LinearFilter;
    tex.magFilter = LinearFilter;
    tex.generateMipmaps = false;
    return tex;
  }
};

const yieldToMain = () => new Promise((resolve) => setTimeout(resolve, 30));

export default function LiquidCanvas({ imageSrc, onReady }: LiquidCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isMobileOrTablet, setIsMobileOrTablet] = useState<boolean | null>(null);
  const [engineReady, setEngineReady] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  
  const appInstanceRef = useRef<any>(null);

  // 1. Device Detection
  useEffect(() => {
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobileOrTablet(isMobileUA || window.innerWidth <= 1024);
  }, []);

  // 2. Interaction-Triggered Setup
  useEffect(() => {
    if (isMobileOrTablet === null || isMobileOrTablet || !canvasRef.current) return;

    let destroyed = false;
    let setupInitiated = false;
    let fallbackTimeout: NodeJS.Timeout;
    
    let bgTexture: THREE.Texture | null = null;
    let shaderMat: THREE.ShaderMaterial | null = null;

    const setupEngine = async () => {
      try {
        await yieldToMain();
        if (destroyed) return;

        if (imageSrc) {
          bgTexture = await loadTextureOffThread(imageSrc);
        }
        await yieldToMain();
        if (destroyed) return;

        const originalFromScene = THREE.PMREMGenerator.prototype.fromScene;
        THREE.PMREMGenerator.prototype.fromScene = function () { return { texture: null } as any; };
        
        const appInstance = (LiquidBackgroundFn as any)(canvasRef.current);
        appInstanceRef.current = appInstance;
        THREE.PMREMGenerator.prototype.fromScene = originalFromScene;

        appInstance.three.maxPixelRatio = Math.min(window.devicePixelRatio, 1.5);
        appInstance.three.resize();
        
        const renderer = appInstance.three.renderer;
        renderer.toneMapping = NoToneMapping;
        renderer.outputColorSpace = LinearSRGBColorSpace; 
        appInstance.three.scene.add(new AmbientLight(0xffffff, 1.0));

        await yieldToMain();
        if (destroyed) return;

        shaderMat = new ShaderMaterial({
          uniforms: {
            map:               { value: bgTexture },
            displacementMap:   { value: appInstance.liquidPlane.uniforms.displacementMap.value },
            uvMapScale:        { value: new Vector2(1, 1) },
            displacementScale: { value: 5.0 },
          },
          vertexShader,
          fragmentShader,
          depthWrite: false,
          transparent: false,
          blending: THREE.NoBlending,
        });

        appInstance.liquidPlane.material.dispose();
        appInstance.liquidPlane.material = shaderMat;
        appInstance.liquidPlane.uniforms = shaderMat.uniforms;
        
        if (appInstance.liquidPlane.attenuation !== undefined) {
          appInstance.liquidPlane.attenuation = 0.95; 
        }

        // Setup mouse/touch interaction for the liquid drops
        if (appInstance.interaction) {
          let lastDropTime = 0;
          appInstance.interaction.onMove = () => {
            const now = performance.now();
            if (now - lastDropTime < 16) return; 
            lastDropTime = now;
            
            appInstance.liquidPlane.addDrop(
              appInstance.interaction.nPosition.x,
              appInstance.interaction.nPosition.y,
              0.04,   
              0.004   
            );
          };
        }

        appInstance.setRain(false);
        await yieldToMain();
        if (destroyed) return;

        renderer.compile(appInstance.three.scene, appInstance.three.camera);
        
        const updateAspect = () => {
          if (!appInstanceRef.current || !canvasRef.current || !bgTexture?.image) return;
          const cw = canvasRef.current.clientWidth;
          const ch = canvasRef.current.clientHeight;
          const uniforms = appInstanceRef.current.liquidPlane.uniforms;
          const cRatio = cw / ch;
          const img = bgTexture.image as HTMLImageElement | ImageBitmap;
          const iRatio = img.width && img.height ? img.width / img.height : 1;
          
          // Cover the canvas with the image while maintaining aspect ratio
          if (cRatio < iRatio) uniforms.uvMapScale.value.set(cRatio / iRatio, 1.0);
          else uniforms.uvMapScale.value.set(1.0, iRatio / cRatio);
        };
        
        updateAspect();
        window.addEventListener("resize", updateAspect);
        setEngineReady(true);
        onReady?.(); // Fire onReady right away once setup completes

      } catch (err) {
        console.error("WebGL Setup Error:", err);
      }
    };

    const triggerSetup = () => {
      if (setupInitiated) return;
      setupInitiated = true;
      
      window.removeEventListener("mousemove", triggerSetup);
      window.removeEventListener("touchstart", triggerSetup);
      window.removeEventListener("scroll", triggerSetup);
      clearTimeout(fallbackTimeout);

      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(() => setupEngine(), { timeout: 1000 });
      } else {
        setTimeout(() => setupEngine(), 200);
      }
    };

    window.addEventListener("mousemove", triggerSetup, { once: true, passive: true });
    window.addEventListener("touchstart", triggerSetup, { once: true, passive: true });
    window.addEventListener("scroll", triggerSetup, { once: true, passive: true });
    fallbackTimeout = setTimeout(triggerSetup, 3500);

    return () => {
      destroyed = true;
      clearTimeout(fallbackTimeout);
      window.removeEventListener("mousemove", triggerSetup);
      window.removeEventListener("touchstart", triggerSetup);
      window.removeEventListener("scroll", triggerSetup);
      
      if (bgTexture) bgTexture.dispose();
      if (shaderMat) shaderMat.dispose();
      if (appInstanceRef.current?.dispose) appInstanceRef.current.dispose();
    };
  }, [isMobileOrTablet, imageSrc, onReady]);

  // 3. Viewport Observer
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-black">
      {/* Background Image - Acts as a placeholder/fallback */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      )}
      
      {/* WebGL Canvas */}
      {!isMobileOrTablet && (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full block transition-opacity duration-1000 ease-out ${
            engineReady && isInViewport ? "opacity-100" : "opacity-0"
          }`}
          style={{ zIndex: 1 }}
        />
      )}
    </div>
  );
}