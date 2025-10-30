import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  interpolate,
  Easing,
  Sequence,
} from "remotion";

import { KeepseeUntil } from "../KeepseeUntil";

export const KeepseeEnd: React.FC = () => {
  const frame = useCurrentFrame();

  // Top-to-bottom reveal animation with exponential easing
  // Reveal happens over 60 frames (2 seconds)
  const revealProgress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.exp), // Exponential easing for smooth flow
  });

  // Calculate the clip path - reveal from top to bottom
  const clipHeight = revealProgress * 100;

  return (
    <div>
      <Sequence from={-30}>
        <KeepseeUntil />
      </Sequence>

      <AbsoluteFill>
        {/* Racing video that reveals from top to bottom */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            clipPath: `inset(0 0 ${100 - clipHeight}% 0)`,
          }}
        >
          {/* Main racing video */}
          <Img
            src={staticFile("end.jpg")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

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
          WE
          <br />
          LOVE
          <br />
          YOU!
        </div>

        <div
          style={{
            position: "absolute",
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            bottom: "100px",
          }}
        >
          <div
            style={{
              position: "relative",
              fontFamily: "Figtree Bold, sans-serif",
              fontSize: "35px",
              color: "white",
            }}
          >
            POWERED BY
          </div>

          <Img
            src={staticFile("logo.png")}
            style={{
              position: "relative",
              width: "350px",
              height: "80px",
              objectFit: "cover",
              filter: "invert(1)",
            }}
          />
        </div>

        {/* White border line that moves with the racing video reveal, disappears when fully expanded */}
        {frame < 54 && (
          <div
            style={{
              position: "absolute",
              top: `${clipHeight}%`,
              left: 0,
              width: "100%",
              height: "18px",
              backgroundColor: "white",
              transform: "translateY(-16px)",
            }}
          />
        )}
      </AbsoluteFill>
    </div>
  );
};
