import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { VisualizationType } from '../../../models/settings';
import { LoginButton } from '../../components/login-button';
import wavesImage from '../../static/waves.gif';
import Menu from '../cover/menu';

const WelcomeContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: calc(100% - 1em);
  padding: 0.5em;
  margin: auto;
  text-align: center;
  height: calc(100% - 1em);
  background-image: url(${wavesImage});
  background-size: cover;
  transition: 0.2s;
`;

const Brand = styled.h2`
  font-size: 20px;
  display: inline-block;
  color: white;
  text-shadow: 1px 1px 1px #ff0e88;
`;

const BrandHighlight = styled.span`
  font-weight: normal;
  text-shadow: 1px 1px 1px #ef00ff;
`;

const BrandTagLine = styled.div`
  font-size: 10px;
  color: white;
  background-color: black;
  margin: 0.5em;
  padding: 0.5em;
  position: relative;
`;

export const Welcome: FunctionComponent = () => (
  <div className="full draggable">
    <Menu isWelcome visualizationType={VisualizationType.None} />
    <WelcomeContent className="welcome-content centered draggable">
      <Brand className="brand draggable">
        lo
        <BrandHighlight className="brand-highlight draggable">fi</BrandHighlight>
      </Brand>
      <BrandTagLine className="brand-tagline draggable">a tiny player</BrandTagLine>
    </WelcomeContent>
    <div className="centered controls draggable">
      <LoginButton />
    </div>
  </div>
);
