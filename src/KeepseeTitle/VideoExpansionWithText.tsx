import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";

export const VideoExpansionWithText: React.FC = () => {
  const frame = useCurrentFrame();

  // VIDEO2 expands from center (frames 0-45 in this component, 1.5 seconds)
  const video2ExpansionStart = 0;
  const video2ExpansionEnd = 45;

  const video2ExpansionProgress = interpolate(
    frame,
    [video2ExpansionStart, video2ExpansionEnd],
    [0, 1],
    {
      easing: Easing.bezier(0.85, 0, 0.15, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // VIDEO2 grows from 0% to 50% in each direction (total 100% of screen)
  const video2Height = video2ExpansionProgress * 50;

  // Text animation (frames 15-40, 0.83 seconds) with cosine easing
  const textAnimStart = 15;
  const textAnimEnd = 40;

  // Calculate text animation progress with cosine easing
  const textProgress = interpolate(
    frame,
    [textAnimStart, textAnimEnd],
    [0, 50],
    {
      easing: Easing.bezier(0.45, 0, 0.15, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* Background: Split screen VIDEO1/VIDEO4 */}
      <>
        {/* VIDEO1 as background - top half */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "50%",
          }}
        >
          <OffthreadVideo
            src={staticFile("VIDEO1.mp4")}
            startFrom={60 + 15 + frame} // Continue playing
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
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

        {/* VIDEO4 as background - bottom half */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: "100%",
            height: "50%",
          }}
        >
          <OffthreadVideo
            src={staticFile("VIDEO4.mp4")}
            startFrom={60 + 15 + frame} // Continue playing
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
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

        {/* Horizontal line separator - only visible until VIDEO2 is fully expanded */}
        {frame < 45 && (
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
        )}
      </>

      {/* VIDEO2 - Expands from center upward and downward simultaneously */}
      <div
        style={{
          position: "absolute",
          top: `${50 - video2Height}%`,
          left: 0,
          width: "100%",
          height: `${video2Height * 2}%`,
          overflow: "hidden",
          border: frame < 45 ? "16px solid white" : "none",
          borderRadius: frame < 45 ? "40px" : "0px",
          boxSizing: "border-box",
        }}
      >
        <OffthreadVideo
          src={staticFile("VIDEO2.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Text overlay for VIDEO2 with cosine easing animation */}
        {frame >= 10 && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -${textProgress}%)`,
                fontFamily: "Figtree Bold, sans-serif",
                fontSize: "150px",
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                lineHeight: "145.2px",
                WebkitTextStroke: "3px white",
              }}
            >
              WITH
              <br />
              <br />
              THE
              <br />
              MOULTON
              <br />
              FAMILY
              <br />
              CIRCUS
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
