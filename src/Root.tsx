import { Composition } from "remotion";
import { FullVideo } from "./FullVideo";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Full video with all scenes */}
      <Composition
        id="FullVideo"
        component={FullVideo}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
