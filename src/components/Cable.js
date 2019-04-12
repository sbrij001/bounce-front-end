import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({ webplayers, handleRecievedUserSong }) => {
  return (
    <Fragment>
      { webplayers.map(webplayer => {
        return (
          <ActionCable
            key={webplayer.id}
            channel={{ channel: 'UserSongsChannel', webplayer: webplayer.id }}
            onReceived={handleRecievedUserSong}
          />
        );
      })}
    </Fragment>
  );
};

export default Cable;
