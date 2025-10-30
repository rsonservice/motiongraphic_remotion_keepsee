import { AbsoluteFill, Sequence } from "remotion";
import { VideoExpansion } from "./VideoExpansion";
import { SplitScreen } from "./SplitScreen";
import { VideoExpansionWithText } from "./VideoExpansionWithText";

export const KeepseeTitle: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      {/* Phase 1: VIDEO1/VIDEO4 expand from center with VIDEO3 background (frames 0-59, 2 seconds) */}
      <Sequence from={0} durationInFrames={75}>
        <VideoExpansion />
      </Sequence>

      {/* Phase 2: Split screen transition (frames 60-74, 0.5 seconds) */}
      {/* <Sequence from={60} durationInFrames={15}>
        <SplitScreen />
      </Sequence> */}

      {/* Phase 3: VIDEO2 expands with text animation (frames 75-180, 3.5 seconds) */}
      <Sequence from={76} durationInFrames={105}>
        <VideoExpansionWithText />
      </Sequence>
    </AbsoluteFill>
  );
};
