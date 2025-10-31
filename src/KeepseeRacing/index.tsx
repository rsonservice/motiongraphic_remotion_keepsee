import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  interpolate,
  Easing,
  Sequence,
} from "remotion";

import { DateMark } from "../DateMark";
import { VideoExpansionWithText } from "../KeepseeTitle/VideoExpansionWithText";

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
    <div>
      <Sequence from={-60}>
        <VideoExpansionWithText staticSize={true} />
      </Sequence>

      <AbsoluteFill
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
            top: -220,
            left: 380,
            transform: `scale(${scaleCalendar})`,
          }}
        >
          <DateMark month={1} />
        </div>

        {/* White border line that moves with the racing video reveal, disappears when fully expanded */}
        {frame < 40 && (
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
    </div>
  );
};
