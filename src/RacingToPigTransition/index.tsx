import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
  Sequence,
} from "remotion";
import { KeepseeRacing } from "../KeepseeRacing";
import { KeepseePig } from "../KeepseePig";

export const RacingToPigTransition: React.FC = () => {
  const frame = useCurrentFrame();

  // Transition duration: 30 frames (1 second)
  const transitionDuration = 30;
  const midPoint = 15;

  // Continuous scale animation from 1 to 0.3 to 1
  const scale = interpolate(
    frame,
    [0, midPoint, transitionDuration],
    [1, 0.3, 1],
    {
      easing: Easing.bezier(0.83, 0, 0.17, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Gaussian blur increases in first half, decreases in second half
  const blurAmount = interpolate(
    frame,
    [0, midPoint, transitionDuration],
    [0, 30, 0],
    {
      easing: Easing.inOut(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Racing fades out smoothly
  const racingOpacity = interpolate(
    frame,
    [0, midPoint, midPoint + 5],
    [1, 0.5, 0],
    {
      easing: Easing.inOut(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Pig fades in smoothly (starts slightly before midpoint)
  const pigOpacity = interpolate(
    frame,
    [midPoint - 5, midPoint, transitionDuration],
    [0, 0.5, 1],
    {
      easing: Easing.inOut(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Noise intensity peaks at midpoint
  const noiseIntensity = interpolate(
    frame,
    [0, midPoint, transitionDuration],
    [0, 0.15, 0],
    {
      easing: Easing.inOut(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="transitionBlur">
            <feGaussianBlur stdDeviation={blurAmount} />
          </filter>
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              seed={frame}
            />
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues={`1 ${noiseIntensity}`} />
            </feComponentTransfer>
            <feBlend mode="overlay" in="SourceGraphic" />
          </filter>
        </defs>
      </svg>

      {/* KeepseePig - underneath, starting from beginning */}
      <AbsoluteFill
        style={{
          opacity: pigOpacity,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            filter: `url(#transitionBlur)`,
            transform: `scale(${scale})`,
          }}
        >
          <Sequence from={0}>
            <KeepseePig />
          </Sequence>
        </div>
      </AbsoluteFill>

      {/* KeepseeRacing - on top, fading out */}
      <AbsoluteFill
        style={{
          opacity: racingOpacity,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            filter: `url(#transitionBlur)`,
            transform: `scale(${scale})`,
          }}
        >
          <Sequence from={-210}>
            <KeepseeRacing />
          </Sequence>
        </div>
      </AbsoluteFill>

      {/* Noise overlay */}
      <AbsoluteFill
        style={{
          mixBlendMode: "overlay",
          opacity: noiseIntensity * 3,
          pointerEvents: "none",
        }}
      >
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              seed={frame * 100}
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
