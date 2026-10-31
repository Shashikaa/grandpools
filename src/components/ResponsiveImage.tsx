import type { ComponentPropsWithRef, CSSProperties } from 'react';
import mobileImages from '../lib/mobile-images.json';
type Props = Omit<ComponentPropsWithRef<'img'>,'src'> & { src: string; fill?: boolean; priority?: boolean; quality?: number };
/** Browser-selected photo sources avoid downloading the desktop image on phones. */
export default function ResponsiveImage({ src, fill, priority, quality: _quality, style, loading, ...props }: Props) {
  const mobile = mobileImages[src as keyof typeof mobileImages];
  const image = <img {...props} src={src} style={{ ...(fill ? { position:'absolute',inset:0,width:'100%',height:'100%' } as CSSProperties : {}), ...style }} loading={priority ? 'eager' : loading || 'lazy'} fetchPriority={priority ? 'high' : props.fetchPriority} decoding="async" />;
  return mobile ? <picture className="contents"><source media="(max-width:1024px)" srcSet={mobile}/>{image}</picture> : image;
}
export function responsiveBackground(src: string): CSSProperties {
  return { backgroundImage:`url('${src}')`, '--mobile-scene-image':`url('${mobileImages[src as keyof typeof mobileImages] || src}')` } as CSSProperties;
}
