import * as React from 'react';
import './style.scss';
import { SpotifyApiInstance } from '../../../../../api/spotify-api';

class Controls extends React.Component<any, any> {
  private accountType: string;
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.getUserAccountType();
  }

  async getUserAccountType() {
    const userProfile = await SpotifyApiInstance.fetch('/me', {
      method: 'GET',
    });

    this.accountType = userProfile.product;
  }

  async pausePlay() {
    if (this.props.parent.getPlayState()) {
      SpotifyApiInstance.fetch('/me/player/pause', {
        method: 'PUT',
      });
    } else {
      SpotifyApiInstance.fetch('/me/player/play', {
        method: 'PUT',
      });
    }
    // Assume original state is correct and make UI a bit snappier
    this.props.parent.togglePlayPause();
  }

  async forward() {
    SpotifyApiInstance.fetch('/me/player/next', {
      method: 'POST',
    }).then(() => {
      // Spotify API doesn't update fast enough sometimes, so give it some leeway
      setTimeout(this.props.parent.listeningTo.bind(this), 2000);
    });
    this.props.parent.setPlaying(true);
  }

  async backward() {
    SpotifyApiInstance.fetch('/me/player/previous', {
      method: 'POST',
    }).then(() => {
      // Spotify API doesn't update fast enough sometimes, so give it some leeway
      setTimeout(this.props.parent.listeningTo.bind(this), 2000);
    });
    this.props.parent.setPlaying(true);
  }

  async like() {
    const liked = this.props.parent.isTrackLiked();
    const id = this.props.parent.getTrackId();
    const verb = liked ? 'DELETE' : 'PUT';
    await SpotifyApiInstance.fetch('/me/tracks?ids=' + id, {
      method: verb,
    });

    this.props.parent.refreshTrackLiked();
  }

  renderVolumeLabel() {
    if (!this.props.parent.state.display_volume_change) {
      return;
    }

    const className = this.props.parent.state.volume_changed
      ? 'volume-number-show'
      : 'volume-number';

    return <label className={className}>{this.props.parent.getVolume()}</label>;
  }

  render() {
    return (
      <div className="controls centered">
        {this.accountType ? (
          <div className="controls-cluster">
            {this.accountType === 'premium' ? (
              <p className="row">
                <a
                  onClick={this.backward.bind(this)}
                  className="control-btn secondary-control not-draggable skip">
                  <i className="fa fa-step-backward not-draggable"></i>
                </a>
                <a
                  onClick={this.pausePlay.bind(this)}
                  className="control-btn not-draggable pause-play">
                  <i
                    className={
                      'fa not-draggable ' +
                      (this.props.parent.getPlayState()
                        ? 'fa-pause'
                        : 'fa-play')
                    }></i>
                </a>
                <a
                  onClick={this.forward.bind(this)}
                  className="control-btn secondary-control not-draggable skip">
                  <i className="fa fa-step-forward not-draggable"></i>
                </a>
              </p>
            ) : null}
            {this.props.parent.isTrackLiked() !== null ? (
              <p className="row">
                <a
                  onClick={this.like.bind(this)}
                  className="control-btn secondary-control not-draggable">
                  <i
                    className={
                      (this.props.parent.isTrackLiked() ? 'fa' : 'far') +
                      ' fa-heart not-draggable'
                    }></i>
                </a>
              </p>
            ) : null}
          </div>
        ) : null}
        <div
          className="progress"
          style={{ width: this.props.parent.getTrackProgress() + '%' }}
        />
        <div
          className="volume"
          style={{ height: this.props.parent.getVolume() + '%' }}>
          {this.renderVolumeLabel()}
        </div>
      </div>
    );
  }
}

export default Controls;
