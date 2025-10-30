import {
  AbsoluteFill,
  staticFile,
  useCurrentFrame,
  interpolate,
  Easing,
  Img,
  Sequence,
} from "remotion";
import { VideoExpansionRight } from "./VideoExpansionRight";

export const VideoExpansionSplit: React.FC = () => {
  const frame = useCurrentFrame();

  // VIDEO1 and VIDEO4 expand from center (frames 0-60 in this component)
  const expansionStart = 1;
  const expansionEnd = 30;
  const expansionProgress = interpolate(
    frame,
    [expansionStart, expansionEnd],
    [0, 1],
    {
      easing: Easing.bezier(0.83, 0, 0.17, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Height grows from 0% to 50% of screen
  const videoHeight = expansionProgress * 50;

  return (
    <div>
      <Sequence from={-30}>
        <VideoExpansionRight />
      </Sequence>

      <AbsoluteFill
        style={{
          height: "92.5%",
        }}
      >
        {/* Background: VideoExpansionRight's last frame */}

        {/* VIDEO1 - Expands upward from center */}
        {frame >= 2 && (
          <div
            style={{
              position: "absolute",
              top: `${50 - videoHeight}%`,
              left: 0,
              width: "100%",
              height: `${videoHeight}%`,
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
                src={staticFile("beach_split_1.png")}
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
        )}

        {/* VIDEO4 - Expands downward from center */}
        {frame >= 2 && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: "100%",
              height: `${videoHeight}%`,
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
                src={staticFile("beach_split_2.jpg")}
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
        )}
      </AbsoluteFill>
    </div>
  );
};
