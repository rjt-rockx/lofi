import React, { FunctionComponent, useMemo } from 'react';
import styled, { css } from 'styled-components';

import { useCurrentlyPlaying } from '../../contexts/currently-playing.context';

const Bar = styled.div<{ isHorizontal: boolean }>`
  position: absolute;
  opacity: 0;
  z-index: 2;

  ${({ isHorizontal }) =>
    isHorizontal
      ? css`
          height: 1px;
          bottom: 0;
        `
      : css`
          height: 100%;
          bottom: 1px;
          width: 1px;
          position: absolute;
        `}
`;

const VolumeNumber = styled.div<{ isVisible: boolean; volume: number }>`
  font-weight: bold;
  font-size: 10px;
  position: absolute;
  border-radius: 100%;
  padding: 0.5rem;
  margin: 0 0 0.5rem;
  color: #6affb3bf;
  background-color: #000000a0;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  -webkit-transition: opacity 0.5s ease-in-out;
  -moz-transition: opacity 0.5s ease-in-out;
  -o-transition: opacity 0.5s ease-in-out;
  transition: opacity 0.5s ease-in-out;
  bottom: ${({ volume }) => volume}%;
  z-index: 2;
`;

interface Props {
  displayVolumeChange: boolean;
  isVolumeChanged: boolean;
  barThickness: number;
  barColor: string;
  alwaysShowProgress: boolean;
}

export const Bars: FunctionComponent<Props> = ({
  displayVolumeChange,
  isVolumeChanged,
  barColor,
  barThickness,
  alwaysShowProgress,
}) => {
  const { state } = useCurrentlyPlaying();

  const progressPercentage = useMemo(() => (state.progress / state.duration) * 100, [state.progress, state.duration]);

  return (
    <>
      <Bar
        isHorizontal
        style={{
          width: `${progressPercentage}%`,
          height: `${barThickness}px`,
          backgroundColor: barColor,
          opacity: alwaysShowProgress && 0.25,
        }}
      />
      <Bar
        isHorizontal={false}
        style={{
          height: `${state.volume}%`,
          width: `${barThickness}px`,
          bottom: `${barThickness}px`,
          backgroundColor: barColor,
        }}
      />
      {displayVolumeChange && (
        <VolumeNumber volume={state.volume} isVisible={isVolumeChanged}>
          {state.volume}
        </VolumeNumber>
      )}
    </>
  );
};
