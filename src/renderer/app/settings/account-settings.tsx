import { capitalize } from 'lodash';
import React, { FunctionComponent, useCallback } from 'react';
import styled from 'styled-components';

import { LoginButton } from '../../components/login-button';
import { useCurrentlyPlaying } from '../../contexts/currently-playing.context';
import { useHover } from '../../hooks/use-hover';
import { CurrentlyPlayingActions } from '../../reducers/currently-playing.reducer';
import { FieldSet, Legend, Row } from './settings-style';

const Image = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const InfoRow = styled(Row)`
  align-items: center;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const LogoutButton = styled.button`
  display: flex;
  text-align: left;
  align-content: flex-end;
  width: fit-content;
  margin-top: 0.25rem;

  &:hover {
    cursor: pointer;
  }
`;

const UserInformation = styled.div`
  display: flex;
  width: 100%;
`;

const UserName = styled.div`
  display: flex;
  width: 100%;
`;

const AccountSettingsFieldSet = styled(FieldSet)`
  height: 4.375rem;
`;

interface Props {
  onLogout: () => void;
}

export const AccountSettings: FunctionComponent<Props> = ({ onLogout }) => {
  const {
    state: { userProfile },
    dispatch,
  } = useCurrentlyPlaying();

  const {
    isHovering,
    props: { onMouseEnter, onMouseLeave },
  } = useHover();

  const handleLogoutClick = useCallback(() => {
    onLogout();
    dispatch({
      type: CurrentlyPlayingActions.SetUserProfile,
      payload: null,
    });
  }, [dispatch, onLogout]);

  return (
    <AccountSettingsFieldSet>
      <Legend>Account</Legend>
      <InfoRow>
        {userProfile ? (
          <>
            <Image src={userProfile.avatar} alt="" />
            <InfoWrapper>
              <UserInformation>
                <UserName>
                  {userProfile.name} ({userProfile.email})
                </UserName>
                <LogoutButton
                  type="button"
                  className="unstyled-button"
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  onClick={handleLogoutClick}>
                  {isHovering ? <i className="fa-solid fa-link-slash" /> : <i className="fa-solid fa-link" />}
                </LogoutButton>
              </UserInformation>
              <div>{capitalize(userProfile.product)} account</div>
            </InfoWrapper>
          </>
        ) : (
          <LoginButton />
        )}
      </InfoRow>
    </AccountSettingsFieldSet>
  );
};
