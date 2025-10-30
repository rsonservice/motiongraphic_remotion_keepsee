import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  interpolate,
  Easing,
  useCurrentFrame,
} from "remotion";
import { DateMark } from "../DateMark";

export const KeepseePig: React.FC = () => {
  const frame = useCurrentFrame();

  const scaleCalendar = interpolate(frame, [40, 55], [0, 1], {
    easing: Easing.bezier(0.83, 0, 0.17, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <OffthreadVideo
        src={staticFile("pig.mp4")}
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
        <DateMark month={3} />
      </div>
    </AbsoluteFill>
  );
};
