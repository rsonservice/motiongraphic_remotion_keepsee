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
      <Sequence from={181} durationInFrames={210}>
        <KeepseeRacing />
      </Sequence>

      {/* Transition: KeepseeRacing scales down with blur to KeepseePig */}
      <Sequence from={392} durationInFrames={30}>
        <RacingToPigTransition />
      </Sequence>

      {/* KeepseePig continues from frame 30 (after full transition) */}
      <Sequence from={423} durationInFrames={300}>
        <Sequence from={-30}>
          <KeepseePig />
        </Sequence>
      </Sequence>

      {/* Transition: KeepseePig slides left, KeepseeBeach slides in from right */}
      <Sequence from={724} durationInFrames={30}>
        <PigToBeachTransition />
      </Sequence>

      {/* KeepseeBeach continues from frame 30 (after transition) */}
      <Sequence from={754} durationInFrames={240}>
        {/* <Sequence from={-30}> */}
        <KeepseeBeach />
        {/* </Sequence> */}
      </Sequence>

      <Sequence from={995} durationInFrames={330}>
        <KeepseeWellsBeach />
      </Sequence>

      <Sequence from={1325} durationInFrames={90}>
        <KeepseeUntil />
      </Sequence>

      <Sequence from={1415} durationInFrames={90}>
        <KeepseeEnd />
      </Sequence>
    </AbsoluteFill>
  );
};
