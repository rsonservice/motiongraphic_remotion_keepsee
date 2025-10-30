import { AbsoluteFill, Sequence } from "remotion";
import { VideoExpansionRight } from "./VideoExpansionRight";
import { VideoExpansionSplit } from "./VideoExpansionSplit";
import { VideoExpansion3 } from "./VideoExpansion3";
// import { VideoExpansionWithText } from "./VideoExpansionWithText";

export const KeepseeWellsBeach: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Phase 1: VIDEO1/VIDEO4 expand from center with VIDEO3 background (frames 0-59, 2 seconds) */}
      <Sequence from={0} durationInFrames={90}>
        <VideoExpansionRight />
      </Sequence>

      <Sequence from={91} durationInFrames={90}>
        <VideoExpansionSplit />
      </Sequence>

      <Sequence from={181} durationInFrames={150}>
        <VideoExpansion3 />
      </Sequence>
    </AbsoluteFill>
  );
};
