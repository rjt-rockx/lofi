import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const TrackInfoWrapper = styled.div`
  position: fixed;
  opacity: 1;
  font-weight: bold;
  font-size: 90%;
  color: white;
  text-shadow: 0px 2px 8px black;
  -webkit-app-region: no-drag;
  background-color: #000000a8;
  transition: 0.1s;
  padding: 1em;

  &.left {
    text-align: right;
    left: 0;
  }

  &.right {
    text-align: left;
    right: 0;
  }
`;

const Line = styled.div`
  -webkit-line-clamp: 2;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Artist = styled(Line)`
  font-weight: normal;
  color: #ddd;
  font-size: 80%;
`;

interface TrackInfoProps {
  track?: string;
  artist?: string;
  isOnLeft?: boolean;
}

const TRUNCATE_REGEX = /(.*?)\s[-(].*/g;
const truncateText = (text: string): string => text.replace(TRUNCATE_REGEX, '$1');

export const TrackInfo: FunctionComponent<TrackInfoProps> = ({ track, artist, isOnLeft }) => (
  <TrackInfoWrapper className={isOnLeft ? 'left' : 'right'}>
    <Line>{truncateText(track)}</Line>
    <Artist>{truncateText(artist)}</Artist>
  </TrackInfoWrapper>
);
