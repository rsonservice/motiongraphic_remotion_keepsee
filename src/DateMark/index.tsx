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

  const bigWidthSize = 200;
  const bigHightSize = 262;

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

  const horizontalLineWidth = interpolate(frame, [55, 65], [0, 1], {
    easing: Easing.out(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text appears after rotation completes (frame 35)
  const textOpacityA = interpolate(frame, [60, 70], [0, 1], {
    easing: Easing.out(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textOpacityU = interpolate(frame, [65, 75], [0, 1], {
    easing: Easing.out(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textOpacityG = interpolate(frame, [70, 80], [0, 1], {
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
            width: "180px",
            height: "240px",
            backgroundColor: "#e2e2dc",
            borderRadius: "23px",
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
              marginTop: "-17px",
              marginBottom: "-7px",
              opacity: textOpacityA,
            }}
          >
            {month}
          </div>

          <div
            style={{
              width: `${horizontalLineWidth * 70}%`,
              height: "3px",
              backgroundColor: "black",
              margin: "20px",
              opacity: horizontalLineWidth,
            }}
          />

          {/* Month */}
          <div
            style={{
              fontSize: "67px",
              fontWeight: "350",
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "black",
              lineHeight: "1",
              display: "flex",
              flexDirection: "row",
              marginTop: "-12px",
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
            rx={30}
            style={{
              filter: "drop-shadow(0px 0px 20px rgba(226, 226, 220, 0.5))",
            }}
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
