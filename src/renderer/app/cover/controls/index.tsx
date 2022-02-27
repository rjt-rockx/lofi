import React, { FunctionComponent, useCallback, useMemo } from 'react';
import styled, { css } from 'styled-components';

import { DEFAULT_SETTINGS } from '../../../../models/settings';
import { AccountType, SpotifyApiInstance, SpotifyCurrentlyPlaying } from '../../../api/spotify-api';
import { useCurrentlyPlaying } from '../../../contexts/currently-playing.context';

const ControlsContainer = styled.div`
  overflow: hidden;
  background-color: #000000aa;
  position: absolute;
  top: 0;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  border: 1px solid #5252524d;
  opacity: 0;
  transition: 0.1s;

  p {
    margin: auto;
    color: white;
    padding: 0;
  }
`;

const ControlsCluster = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const ControlButton = styled.li<{ fontSize: string }>`
  vertical-align: middle;
  color: #6affb3bf;
  background-color: #00000080;
  padding: 0.5rem;
  border-radius: 50%;
  border: 1px solid #4c4c4c54;
  margin: 0.25em;
  transition: transform 0.2s;
  ${({ fontSize }) =>
    css`
      font-size: ${fontSize};
      height: ${fontSize};
      width: ${fontSize};
      line-height: ${fontSize};
    `};

  &:hover {
    background-color: #000000ed;
    transform: scale(1.25);
    color: #00ff7ebf;
  }

  &:active {
    background-color: #000000;
    border-color: rgb(59, 59, 59);
  }
`;

const LikeControlButton = styled(ControlButton)`
  color: #ffa9f4bb;

  &:hover {
    color: #ff00ddbb;
  }
`;

const moveSongProgress = async (isForward: boolean, distInSec: number): Promise<void> => {
  const distinMs = distInSec * 1000;
  const currentlyPlaying = await SpotifyApiInstance.fetch<SpotifyCurrentlyPlaying>('/me/player?type=episode,track', {
    method: 'GET',
  });
  const currentProgress = Number(currentlyPlaying.progress_ms);
  const newProgress = isForward ? currentProgress + distinMs : currentProgress - distinMs;
  await SpotifyApiInstance.fetch(`/me/player/seek?position_ms=${newProgress}`, {
    method: 'PUT',
  });
};

interface Props {
  skipSongDelay: number;
  onPlaybackChanged: () => void;
  onTrackLiked: () => void;
}

export const Controls: FunctionComponent<Props> = ({
  skipSongDelay = DEFAULT_SETTINGS.skipSongDelay,
  onPlaybackChanged,
  onTrackLiked,
}) => {
  const { state } = useCurrentlyPlaying();

  const handlePausePlay = useCallback(async (): Promise<void> => {
    if (SpotifyApiInstance.error) {
      return;
    }

    if (state.isPlaying) {
      await SpotifyApiInstance.fetch('/me/player/pause', {
        method: 'PUT',
      });
    } else {
      await SpotifyApiInstance.fetch('/me/player/play', {
        method: 'PUT',
      });
    }

    onPlaybackChanged();
  }, [onPlaybackChanged, state.isPlaying]);

  const handleSkip = useCallback(
    async (isForward: boolean, event: React.MouseEvent): Promise<void> => {
      if (SpotifyApiInstance.error) {
        return;
      }

      if (event.ctrlKey || event.metaKey) {
        moveSongProgress(isForward, skipSongDelay);
      } else {
        await SpotifyApiInstance.fetch(`/me/player/${isForward ? 'next' : 'previous'}`, {
          method: 'POST',
        });
      }

      onPlaybackChanged();
    },
    [onPlaybackChanged, skipSongDelay]
  );

  const handleLike = useCallback(async (): Promise<void> => {
    if (SpotifyApiInstance.error) {
      return;
    }

    const verb = state.isLiked ? 'DELETE' : 'PUT';
    await SpotifyApiInstance.fetch(`/me/tracks?ids=${state.id}`, {
      method: verb,
    });

    onTrackLiked();
  }, [onTrackLiked, state.id, state.isLiked]);

  const accountType = useMemo(() => state.userProfile?.product as AccountType, [state.userProfile?.product]);

  return (
    <ControlsContainer className="controls centered draggable">
      {accountType ? (
        <ControlsCluster className="controls-cluster draggable">
          {accountType === AccountType.Premium ? (
            <p className="draggable">
              <button type="button" onClick={(event) => handleSkip(false, event)} className="skip unstyled-button">
                <ControlButton fontSize="10px" className="fa fa-step-backward" />
              </button>
              <button type="button" onClick={handlePausePlay} className="pause-play unstyled-button">
                <ControlButton fontSize="18px" className={`fa ${state.isPlaying ? 'fa-pause' : 'fa-play'}`} />
              </button>
              <button type="button" onClick={(event) => handleSkip(true, event)} className="skip unstyled-button">
                <ControlButton fontSize="10px" className="fa fa-step-forward" />
              </button>
            </p>
          ) : null}
          <p className="draggable">
            <button type="button" onClick={handleLike} className="love unstyled-button">
              <LikeControlButton fontSize="8px" className={`${state.isLiked ? 'fa' : 'far'} fa-heart`} />
            </button>
          </p>
        </ControlsCluster>
      ) : null}
    </ControlsContainer>
  );
};
