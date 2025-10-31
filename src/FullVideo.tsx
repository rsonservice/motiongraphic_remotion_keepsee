import { AbsoluteFill, Sequence } from "remotion";
import { KeepseeTitle } from "./KeepseeTitle";
import { KeepseeRacing } from "./KeepseeRacing";
import { RacingToPigTransition } from "./RacingToPigTransition";
import { KeepseePig } from "./KeepseePig";
import { PigToBeachTransition } from "./PigToBeachTransition";
import { KeepseeBeach } from "./KeepseeBeach";
import { KeepseeWellsBeach } from "./KeepseeWellsBeach";
import { KeepseeUntil } from "./KeepseeUntil";
import { KeepseeEnd } from "./KeepseeEnd";

export const FullVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* KeepseeTitle: frames 0-180 (181 frames, 6.03 seconds) */}
      <Sequence from={0} durationInFrames={180}>
        <KeepseeTitle />
      </Sequence>

      {/* KeepseeRacing: starts at frame 181, includes frozen KeepseeTitle background */}
      <Sequence from={180} durationInFrames={210}>
        <KeepseeRacing />
      </Sequence>

      {/* KeepseePig continues from frame 30 (after full transition) */}
      <Sequence from={390} durationInFrames={330}>
        <KeepseePig />
      </Sequence>

      {/* KeepseeBeach continues from frame 30 (after transition) */}
      <Sequence from={720} durationInFrames={270}>
        {/* <Sequence from={-30}> */}
        <KeepseeBeach />
        {/* </Sequence> */}
      </Sequence>

      <Sequence from={990} durationInFrames={330}>
        <KeepseeWellsBeach />
      </Sequence>

      <Sequence from={1320} durationInFrames={90}>
        <KeepseeUntil />
      </Sequence>

      <Sequence from={1410} durationInFrames={90}>
        <KeepseeEnd />
      </Sequence>
    </AbsoluteFill>
  );
};
