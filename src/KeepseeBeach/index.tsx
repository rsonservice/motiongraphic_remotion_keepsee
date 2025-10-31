import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  interpolate,
  Easing,
  useCurrentFrame,
  Sequence,
} from "remotion";
import { DateMark } from "../DateMark";
import { KeepseePig } from "../KeepseePig";

export const KeepseeBeach: React.FC = () => {
  const frame = useCurrentFrame();

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
      <Sequence from={-80}>
        <KeepseePig staticSize={true} />
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
        <OffthreadVideo
          src={staticFile("beach.mp4")}
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
          <DateMark month={4} />
        </div>

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
