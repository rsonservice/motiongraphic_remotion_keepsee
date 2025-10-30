import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
  Sequence,
} from "remotion";
import { KeepseePig } from "../KeepseePig";
import { KeepseeBeach } from "../KeepseeBeach";

export const PigToBeachTransition: React.FC = () => {
  const frame = useCurrentFrame();

  // Transition duration: 30 frames (1 second)
  const transitionDuration = 30;

  // Slide from right to left
  const slideProgress = interpolate(frame, [0, transitionDuration], [0, 1], {
    easing: Easing.bezier(0.83, 0, 0.17, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gaussian blur - constant throughout
  const blurAmount = 30;

  // Noise intensity - constant throughout
  const noiseIntensity = 0.3;

  // Calculate horizontal positions for frames flowing right to left
  const baseTranslateX = slideProgress * -100; // Slides left

  // Radial noise expansion from center
  const noiseExpansion = interpolate(frame, [0, transitionDuration], [0, 100], {
    easing: Easing.out(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="pigBeachBlur">
            <feGaussianBlur stdDeviation={blurAmount} />
          </filter>
          <radialGradient id="noiseRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop
              offset={`${noiseExpansion}%`}
              stopColor="white"
              stopOpacity="1"
            />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* KeepseePig last frame - slides left with blur */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          transform: `translateX(${baseTranslateX}%)`,
          filter: `url(#pigBeachBlur)`,
        }}
      >
        <Sequence from={-330}>
          <KeepseePig />
        </Sequence>
      </div>

      {/* KeepseeBeach first frame - slides in from right */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          transform: `translateX(${100 + baseTranslateX}%)`,
          filter: `url(#pigBeachBlur)`,
        }}
      >
        <KeepseeBeach />
      </div>

      {/* Noise overlay radiating from center */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <svg width="100%" height="100%">
          <defs>
            <filter id="centerNoise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="4"
                seed={frame * 100}
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
          <rect
            width="100%"
            height="100%"
            filter="url(#centerNoise)"
            fill="url(#noiseRadial)"
            opacity={noiseIntensity}
            style={{ mixBlendMode: "overlay" }}
          />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
