import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { KeepseePig } from "../KeepseePig";

export const KeepseeBeach: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Background: KeepseePig component */}
      {/* <KeepseePig /> */}

      {/* Beach video playing on top */}
      <AbsoluteFill>
        <OffthreadVideo
          src={staticFile("beach.mp4")}
          pauseWhenBuffering
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
