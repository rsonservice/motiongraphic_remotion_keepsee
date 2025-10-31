import {
  useCurrentFrame,
  interpolate,
  Easing,
  staticFile,
  Img,
  Sequence,
} from "remotion";

import { KeepseeBeach } from "../KeepseeBeach";

export const VideoExpansionRight: React.FC = () => {
  const frame = useCurrentFrame();

  const widthWellBeach = interpolate(frame, [0, 30], [30, 100], {
    easing: Easing.linear,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const imageTranslateX = interpolate(frame, [0, 30], [-100, 0], {
    easing: Easing.linear,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{}}>
      <Sequence from={-240} staticSize={true}>
        <KeepseeBeach />
      </Sequence>

      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          transform: `translateX(${imageTranslateX}%)`,
          clipPath: `rect(0 ${widthWellBeach}% 100% 0)`,
          justifyContent: "center",
          display: "flex",
          backgroundColor: "white",
        }}
      >
        {/* Main content area - 95% */}
        <div
          style={{
            width: "96%",
            height: "92%",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            clipPath: `rect(0 ${widthWellBeach}% 100% 0)`,
            paddingTop: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              borderRadius: "40px",
              overflow: "hidden",
            }}
          >
            <div
              key="top-0"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            >
              <Img
                src={staticFile("well_beach.jpg")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            fontFamily: "Figtree Bold, sans-serif",
            fontSize: "80px",
            color: "black",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bottom: "40px",
            width: "100%",
          }}
        >
          Wells Beach, ME
        </div>
      </div>
    </div>
  );
};
