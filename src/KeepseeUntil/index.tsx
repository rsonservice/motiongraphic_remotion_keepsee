import {
  Img,
  Sequence,
  useCurrentFrame,
  interpolate,
  Easing,
  staticFile,
} from "remotion";
import { VideoExpansion3 } from "../KeepseeWellsBeach/VideoExpansion3";
// import { VideoExpansionRight } from "./VideoExpansionRight";
// import { VideoExpansionSplit } from "./VideoExpansionSplit";
// import { VideoExpansion3 } from "./VideoExpansion3";
// import { VideoExpansionWithText } from "./VideoExpansionWithText";

export const KeepseeUntil: React.FC = () => {
  const frame = useCurrentFrame();

  const expansionStart = 0;
  const expansionEnd = 20;

  const untilImgExpansionProgress = interpolate(
    frame,
    [expansionStart, expansionEnd],
    [0, 1],
    {
      easing: Easing.linear,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const textAnimStart = 0;
  const textAnimEnd = 90;

  const textProgress = interpolate(
    frame,
    [textAnimStart, expansionEnd, textAnimEnd],
    [80, 60, 50],
    {
      easing: Easing.linear,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const untilImgHeight = untilImgExpansionProgress * 50;

  return (
    <div>
      <Sequence from={-30}>
        <VideoExpansion3 />
      </Sequence>

      <div
        style={{
          position: "absolute",
          top: `${50 - untilImgHeight}%`,
          left: 0,
          width: "100%",
          height: `${untilImgHeight * 2}%`,
          overflow: "hidden",
          border: "16px solid white",
          borderRadius: "40px",
          boxSizing: "border-box",
        }}
      >
        <Img
          src={staticFile("next_time.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            // transform: `scale(${textProgress / 100})`,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            transform: `scale(${textProgress / 50})`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%)`,
              fontFamily: "Figtree Bold, sans-serif",
              fontSize: "230px",
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              lineHeight: "230px",
            }}
          >
            UNTIL
            <br />
            NEXT
            <br />
            TIME...
          </div>
        </div>
      </div>
    </div>
  );
};
