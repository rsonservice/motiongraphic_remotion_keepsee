import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  Sequence,
} from "remotion";

export const SplitScreen: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      <Sequence from={-20}>
        <OffthreadVideo
          src={staticFile("VIDEO3.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Sequence>

      {/* Horizontal line separator */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "100%",
          height: "6px",
          backgroundColor: "white",
          transform: "translateY(-3px)",
        }}
      />
    </AbsoluteFill>
  );
};
