import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { version } from '../../../../version.generated';
import { ApplicationUrl } from '../../../constants';
import { TitleBar } from '../../components/title-bar';
import { AboutLink } from './about-link';

const AboutWindow = styled.div`
  background-color: #333333;
  color: white;
  border: 1px solid #666666;
  font-size: 75%;
  margin: 0;
  padding: 0.5rem;
  height: calc(100% - 18px);

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  button {
    margin: 0 0.25rem;

    &:hover {
      color: #979eff;
      cursor: pointer;
    }

    &:active {
      color: #50569e;
    }
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const AboutContent = styled.div`
  padding: 1rem;
  padding-top: 0;
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem;
`;

interface Props {
  onClose: () => void;
}

export const About: FunctionComponent<Props> = ({ onClose }) => (
  <AboutWindow className="about-window" id="about-window">
    <TitleBar onClose={onClose} />
    <AboutContent className="about-content">
      <Header className="header">
        <h1>Lofi v{version}</h1>
        <Links className="links">
          <AboutLink url={ApplicationUrl.Home} icon="fa-solid fa-house" />
          <AboutLink url={ApplicationUrl.GitHub} icon="fa-brands fa-github" />
          <AboutLink url={ApplicationUrl.Discord} icon="fa-brands fa-discord" />
        </Links>
      </Header>

      <code>
        Copyright (c) 2019-{new Date().getFullYear()} David Titarenco
        <br />
        <br />
        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
        documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without
        limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
        Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
        <br />
        <br />
        The above copyright notice and this permission notice shall be included in all copies or substantial portions of
        the Software.
        <br />
        <br />
        THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
        LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
        SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
        OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
        DEALINGS IN THE SOFTWARE.
      </code>
    </AboutContent>
  </AboutWindow>
);
