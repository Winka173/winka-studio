import React from "react";
import { CalculateMetadataFunction, Composition } from "remotion";
import { Trailer, TrailerProps, trailerFrames } from "./Trailer";
import { Gameplay, GameplayProps, gameplayFrames } from "./Gameplay";

const FPS = 30;

const trailerMeta: CalculateMetadataFunction<TrailerProps> = ({ props }) => ({ durationInFrames: trailerFrames(props, FPS), width: props.width ?? 1920, height: props.height ?? 1080 });
const gameplayMeta: CalculateMetadataFunction<GameplayProps> = ({ props }) => ({ durationInFrames: gameplayFrames(props, FPS), width: props.width ?? 1920, height: props.height ?? 1080 });

export const Root: React.FC = () => (
  <>
    <Composition
      id="ArcaneTrailer"
      component={Trailer}
      fps={FPS}
      width={1920}
      height={1080}
      durationInFrames={60 * FPS}
      defaultProps={{ music: "", shots: [], cards: [], endSeconds: 7, endLines: [] } as TrailerProps}
      calculateMetadata={trailerMeta}
    />
    <Composition
      id="ArcaneGameplay"
      component={Gameplay}
      fps={FPS}
      width={1920}
      height={1080}
      durationInFrames={60 * FPS}
      defaultProps={{ src: "", start: 0, seconds: 30, title: "", subtitle: "", chapters: [], endLines: [] } as GameplayProps}
      calculateMetadata={gameplayMeta}
    />
  </>
);
