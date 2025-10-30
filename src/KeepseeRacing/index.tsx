import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";

import { DateMark } from "../DateMark";

export const KeepseeRacing: React.FC = () => {
  const frame = useCurrentFrame();

  // Top-to-bottom reveal animation with exponential easing
  // Reveal happens over 60 frames (2 seconds)
  const revealProgress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.exp), // Exponential easing for smooth flow
  });

  const scaleCalendar = interpolate(frame, [40, 55], [0, 1], {
    easing: Easing.bezier(0.83, 0, 0.17, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Calculate the clip path - reveal from top to bottom
  const clipHeight = revealProgress * 100;

  return (
    <AbsoluteFill>
      {/* Background: VIDEO2 (same as the end of KeepseeTitle) with white border */}
      <AbsoluteFill style={{ backgroundColor: "white" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "16px solid white",
            borderRadius: "40px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <OffthreadVideo
            src={staticFile("VIDEO2.mp4")}
            pauseWhenBuffering
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* Text overlay from KeepseeTitle's last frame */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontFamily: "Figtree Bold, sans-serif",
                fontSize: "150px",
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                lineHeight: "145.2px",
              }}
            >
              WITH
              <br />
              <br />
              THE
              <br />
              MOULTON
              <br />
              FAMILY
              <br />
              CIRCUS
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Racing video that reveals from top to bottom */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          clipPath: `inset(0 0 ${100 - clipHeight}% 0)`,
        }}
      >
        {/* Main racing video */}
        <OffthreadVideo
          src={staticFile("racing.mp4")}
          pauseWhenBuffering
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "relative",
            top: -260,
            left: 350,
            transform: `scale(${scaleCalendar})`,
          }}
        >
          <DateMark month={1} />
        </div>
      </div>

      {/* White border line that moves with the racing video reveal, disappears when fully expanded */}
      {frame < 54 && (
        <div
          style={{
            position: "absolute",
            top: `${clipHeight}%`,
            left: 0,
            width: "100%",
            height: "18px",
            backgroundColor: "white",
            transform: "translateY(-16px)",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
