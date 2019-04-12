import React from 'react';
import NewWebplayerForm from './NewWebplayerForm';
import NewSongsForm from './NewSongsForm';
//
const UserSongsArea = ({ webplayer: { id, title, songs } }) => {
  return (
    <div className="songsArea">
      <h2>{title}</h2>
      <ul>{orderedSongs(songs)}</ul>
      <NewSongsForm webplayer_id={id} />
    </div>
  );
}

export default UserSongsArea;

//helpers

const orderedSongs = songs => {
  const sortedSongs = songs.sort(
    (a,b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedSongs.map(song => {
    return <li key={song.id}>{song.title}</li>
  })
};
