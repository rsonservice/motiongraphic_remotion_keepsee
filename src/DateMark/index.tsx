import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
  interpolate,
} from "remotion";

export const DateMark: React.FC<{ month: number }> = ({ month }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bigWidthSize = 240;
  const bigHightSize = 305;

  const drawProgress = spring({
    frame,
    fps,
    durationInFrames: 25,
    delay: 55,
    config: {
      damping: 100,
      stiffness: 7,
    },
  });

  const horizontalLineWidth = interpolate(frame, [55, 85], [0, 1], {
    easing: Easing.out(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text appears after rotation completes (frame 35)
  const textOpacityA = interpolate(frame, [80, 90], [0, 1], {
    easing: Easing.out(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textOpacityU = interpolate(frame, [95, 105], [0, 1], {
    easing: Easing.out(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textOpacityG = interpolate(frame, [100, 110], [0, 1], {
    easing: Easing.out(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const perimeter = (bigWidthSize + bigHightSize) * 2;
  const dashOffset = perimeter * (1 - drawProgress);

  return (
    <AbsoluteFill>
      {/* Calendar Date Widget */}

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%)`,
        }}
      >
        <div
          style={{
            width: "210px",
            height: "280px",
            backgroundColor: "#e2e2dc",
            borderRadius: "35px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Day Number */}
          <div
            style={{
              fontSize: "100px",
              fontWeight: "350",
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "black",
              lineHeight: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "-30px",
              opacity: textOpacityA,
            }}
          >
            {month}
          </div>

          <div
            style={{
              width: `${horizontalLineWidth * 70}%`,
              height: "5px",
              backgroundColor: "black",
              margin: "20px",
              opacity: horizontalLineWidth,
            }}
          />

          {/* Month */}
          <div
            style={{
              fontSize: "80px",
              fontWeight: "350",
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "black",
              lineHeight: "1",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div style={{ opacity: textOpacityA }}>A</div>
            <div style={{ opacity: textOpacityU }}>u</div>
            <div style={{ opacity: textOpacityG }}>g</div>
          </div>
        </div>

        <svg
          width={bigWidthSize}
          height={bigHightSize}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) `,
            overflow: "visible",
          }}
        >
          <rect
            x="0"
            y="0"
            width={bigWidthSize}
            height={bigHightSize}
            stroke="#e2e2dc"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={perimeter}
            strokeDashoffset={-dashOffset}
            strokeWidth={3}
            rx={45}
            style={{
              filter: "drop-shadow(0px 0px 20px rgba(226, 226, 220, 0.5))",
            }}
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
