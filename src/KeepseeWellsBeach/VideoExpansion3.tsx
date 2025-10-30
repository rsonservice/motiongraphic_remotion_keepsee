import {
  AbsoluteFill,
  staticFile,
  useCurrentFrame,
  interpolate,
  Easing,
  Img,
  Sequence,
} from "remotion";
import { VideoExpansionSplit } from "./VideoExpansionSplit";

export const VideoExpansion3: React.FC = () => {
  const frame = useCurrentFrame();

  const heightWellsBeach3 = interpolate(frame, [1, 30], [0, 1], {
    easing: Easing.linear,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const heightWellsBeach3_1 = interpolate(
    frame,
    [0, 90, 110, 150],
    [33.33, 33.33, 100, 100],
    {
      easing: Easing.linear,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const heightWellsBeach3_2 = interpolate(
    frame,
    [0, 90, 110, 150],
    [33.33, 33.33, 0, 0],
    {
      easing: Easing.linear,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const heightWellsBeach3_3 = interpolate(
    frame,
    [0, 90, 110, 150],
    [33.33, 33.33, 0, 0],
    {
      easing: Easing.linear,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // VIDEO1 and VIDEO4 expand from center (frames 0-60 in this component)

  return (
    <div>
      <Sequence from={-30}>
        <VideoExpansionSplit />
      </Sequence>

      <AbsoluteFill
        style={{
          height: `${heightWellsBeach3 * 92.5}%`,
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: `${heightWellsBeach3_1}%`,
            overflow: "hidden",
            border: "16px solid white",
            borderRadius: "40px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <Img
              src={staticFile("beach_split3_1.jpg")}
              //   startFrom={frame}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        {/* VIDEO4 - Expands downward from center */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: `${heightWellsBeach3_2}%`,
            overflow: "hidden",
            border: `${heightWellsBeach3_2 > 0 ? "16px solid white" : "none"}`,
            borderRadius: "40px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <Img
              src={staticFile("beach_split3_2.png")}
              //   startFrom={frame}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        <div
          style={{
            position: "relative",
            width: "100%",
            height: `${heightWellsBeach3_3}%`,
            overflow: "hidden",
            border: `${heightWellsBeach3_3 > 0 ? "16px solid white" : "none"}`,
            borderRadius: "40px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <Img
              src={staticFile("beach_split3_3.png")}
              //   startFrom={frame}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </AbsoluteFill>
    </div>
  );
};
