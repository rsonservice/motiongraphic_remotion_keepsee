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
import { KeepseeRacing } from "../KeepseeRacing";

export const KeepseePig: React.FC = () => {
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

  const clipHeight = revealProgress * 100;

  return (
    <div>
      <Sequence from={-80}>
        <KeepseeRacing staticSize={true} />
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
          src={staticFile("pig.mp4")}
          pauseWhenBuffering
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            // borderBottom: "16px solid white",
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
          <DateMark month={3} />
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
