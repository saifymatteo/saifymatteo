'use client';

import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react';
import { useEffect, useRef, useState } from 'react';

/**
 * Aspect at which the seeded waterPlane exactly fills the viewport
 * (cDistance 3.6 / fov 45). Sections wider than this get a horizontal
 * crop (no black bars); taller sections get a vertical crop.
 */
const FILL_ASPECT = 8 / 3;

/**
 * Lifecycle of the canvas vs. the frozen-frame overlay:
 *
 * - `live`    canvas mounted and animating; no overlay.
 * - `frozen`  scrolled out — last frame snapshotted to an <img>, canvas
 *             UNMOUNTED (zero GPU/CPU while offscreen; the user sees the
 *             exact frame that was just playing — no gradient seam).
 * - `waking`  scrolled back in — canvas remounted UNDER the frozen frame
 *             (still opaque) and given `WAKE_DELAY` ms to render its
 *             first real frame (three.js init would otherwise flash).
 * - `fading`  canvas is live — the frame cross-fades out (`FADE_MS`),
 *             then the overlay is discarded.
 */
type Phase = 'live' | 'frozen' | 'waking' | 'fading';

/** Grace period for the remounted canvas to paint before the fade. */
const WAKE_DELAY = 400;
/** Cross-fade duration of the frozen frame (matches the CSS transition). */
const FADE_MS = 700;

/**
 * Live shader-gradient backdrop (seed from shadergradient.co/customize).
 * Renders an absolute, full-bleed WebGL canvas; parent must be `relative overflow-hidden`.
 * pointerEvents="none" keeps the camera from being manipulated (wheel/drag).
 *
 * Phase 3 frozen-frame pause (docs/phase-3-perf-a11y-plan.md, P2): an
 * IntersectionObserver snapshots the canvas on scroll-out (needs
 * `preserveDrawingBuffer` so toDataURL isn't blank) and unmounts it;
 * scroll-in remounts under the snapshot and cross-fades. `lazyLoad` was
 * rejected because the canvas unmounts to the plain CSS gradient — the
 * frozen frame removes that seam.
 *
 * The canvas is sized to *cover* the section (like object-fit: cover) so the
 * plane never leaves black bars on wide heroes. A CSS gradient in the shader's
 * palette sits behind the canvas, so the brief WebGL init shows blue, not black.
 */
export default function ShaderBackdropCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<Phase>('live');
  const [snapshot, setSnapshot] = useState<string | null>(null);
  // The IO callback reads the phase without re-subscribing: an observer
  // keyed on `phase` would be recreated on every transition and its initial
  // callback would re-fire the wake branch mid-fade (waking↔fading loop).
  const phaseRef = useRef<Phase>('live');
  const setPhaseSync = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };

  // Cover-fit sizing.
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

  // Frozen-frame pause: snapshot + unmount on exit, remount + fade on entry.
  // Mounted once ([] deps) — transitions read/write phaseRef, never re-keyed.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Only `frozen` wakes — pre-warm via rootMargin: the canvas
          // remounts under the frozen frame before the section enters.
          if (phaseRef.current === 'frozen') {
            setVisible(true);
            setPhaseSync('waking');
          }
        } else if (phaseRef.current !== 'frozen') {
          // Snapshot BEFORE unmounting — the canvas is still in the DOM here.
          const canvas = wrap.querySelector('canvas');
          if (canvas) {
            try {
              const url = canvas.toDataURL('image/png');
              // Guard against a blank/unpreserved buffer ('data:,' or tiny
              // payloads): fall back to the CSS gradient behind the canvas.
              if (url && url.length > 1024) setSnapshot(url);
            } catch {
              /* tainted/blank canvas — CSS gradient remains, worst case a
                 brief seam, never a broken layout */
            }
          }
          setVisible(false);
          setPhaseSync('frozen');
        }
      },
      // Start waking slightly before the section re-enters.
      { rootMargin: '100px' }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  // waking -> fading: the remounted canvas has had its grace period.
  useEffect(() => {
    if (phase !== 'waking') return;
    const t = setTimeout(() => setPhaseSync('fading'), WAKE_DELAY);
    return () => clearTimeout(t);
  }, [phase]);

  // fading -> live: cross-fade done; drop the overlay entirely.
  useEffect(() => {
    if (phase !== 'fading') return;
    const t = setTimeout(() => {
      setSnapshot(null);
      setPhaseSync('live');
    }, FADE_MS);
    return () => clearTimeout(t);
  }, [phase]);

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
        {visible && (
          <ShaderGradientCanvas
            pointerEvents="none"
            lazyLoad={false}
            // Keep the drawing buffer readable so scroll-out can snapshot
            // the exact last frame (without it, toDataURL returns blank).
            preserveDrawingBuffer
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
        )}
        {snapshot && (
          // Runtime canvas snapshot (data: URL) — next/image cannot serve it.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={snapshot}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
              phase === 'fading' ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}
      </div>
    </div>
  );
}
