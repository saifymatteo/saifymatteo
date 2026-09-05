'use client';

import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react';
import { useEffect, useRef } from 'react';

/**
 * Aspect at which the seeded waterPlane exactly fills the viewport
 * (cDistance 3.6 / fov 45). Sections wider than this get a horizontal
 * crop (no black bars); taller sections get a vertical crop.
 */
const FILL_ASPECT = 8 / 3;

/**
 * Live shader-gradient backdrop (seed from shadergradient.co/customize).
 * Renders an absolute, full-bleed WebGL canvas; parent must be `relative overflow-hidden`.
 * pointerEvents="none" keeps the camera from being manipulated (wheel/drag).
 * lazyLoad={false} keeps the canvas mounted at all times (no unmount/remount
 * black flash when scrolling out of view).
 * The canvas is sized to *cover* the section (like object-fit: cover) so the
 * plane never leaves black bars on wide heroes. A CSS gradient in the shader's
 * palette sits behind the canvas, so the brief WebGL init shows blue, not black.
 */
export default function ShaderBackdrop() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const box = boxRef.current;
    if (!wrap || !box) return;
    const update = () => {
      const { width, height } = wrap.getBoundingClientRect();
      if (!width || !height) return;
      if (width / height > FILL_ASPECT) {
        box.style.width = '100%';
        box.style.height = `${(width / FILL_ASPECT).toFixed(1)}px`;
      } else {
        box.style.height = '100%';
        box.style.width = `${(height * FILL_ASPECT).toFixed(1)}px`;
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="z-backdrop absolute inset-0 overflow-hidden"
      aria-hidden
      style={{
        background:
          'linear-gradient(120deg, #1f2f6e 0%, #527dff 35%, #38d1ff 70%, #809bd6 100%)',
      }}
    >
      <div
        ref={boxRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <ShaderGradientCanvas
          pointerEvents="none"
          lazyLoad={false}
          style={{ position: 'absolute', inset: 0 }}
          pixelDensity={1}
          fov={45}
        >
          <ShaderGradient
            control="props"
            animate="on"
            type="waterPlane"
            shader="defaults"
            color1="#809bd6"
            color2="#527dff"
            color3="#38d1ff"
            brightness={1.5}
            lightType="3d"
            envPreset="city"
            grain="on"
            reflection={0.5}
            cAzimuthAngle={180}
            cPolarAngle={90}
            cDistance={3.6}
            cameraZoom={12.5}
            loop="on"
            loopDuration={10}
            range="enabled"
            rangeStart={0}
            rangeEnd={10}
            positionX={0}
            positionY={0}
            positionZ={0}
            rotationX={0}
            rotationY={0}
            rotationZ={0}
            uAmplitude={7}
            uDensity={0.8}
            uFrequency={5.5}
            uSpeed={0.3}
            uStrength={0.4}
            uTime={0}
            wireframe={false}
            zoomOut={false}
          />
        </ShaderGradientCanvas>
      </div>
    </div>
  );
}
