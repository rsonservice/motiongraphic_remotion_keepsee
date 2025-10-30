import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
} from "remotion";

export const SplitScreen: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      {/* VIDEO1 as background - top half */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "50%",
          backgroundColor: "white",
        }}
      >
        <OffthreadVideo
          src={staticFile("VIDEO1.mp4")}
          startFrom={60 + frame} // Continue from where Phase1 left off
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
          backgroundColor: "white",
        }}
      >
        <OffthreadVideo
          src={staticFile("VIDEO4.mp4")}
          startFrom={60 + frame} // Continue from where Phase1 left off
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

      {/* Horizontal line separator */}
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
    </AbsoluteFill>
  );
};
