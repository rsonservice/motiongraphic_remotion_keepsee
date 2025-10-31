import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  interpolate,
  Easing,
  Sequence,
} from "remotion";

export const VideoExpansion: React.FC = () => {
  const frame = useCurrentFrame();

  // VIDEO1 and VIDEO4 expand from center (frames 0-60 in this component)
  const expansionStart = 2;
  const expansionEnd = 60;
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
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      {/* VIDEO3 - Background */}
      <Sequence>
        <OffthreadVideo
          src={staticFile("VIDEO3.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Sequence>

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
            boxSizing: "border-box",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <OffthreadVideo
              src={staticFile("VIDEO1.mp4")}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                objectFit: "cover",
                borderRadius: "40px",
              }}
            />
            {/* Text overlay for VIDEO1 */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  fontFamily: "Figtree Bold, sans-serif",
                  fontSize: "250px",
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                }}
              >
                AUG
              </div>
            </div>
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
            boxSizing: "border-box",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <OffthreadVideo
              src={staticFile("VIDEO4.mp4")}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                objectFit: "cover",
                borderRadius: "40px",
              }}
            />
            {/* Text overlay for VIDEO4 */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  fontFamily: "Figtree Bold, sans-serif",
                  fontSize: "250px",
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                }}
              >
                2025
              </div>
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
