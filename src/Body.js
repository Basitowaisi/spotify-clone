import { Favorite, PlayCircleFilled } from "@material-ui/icons"
import React from "react"
import "./Body.css"
import Header from "./Header"
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled"
import FavoriteIcon from "@material-ui/icons/Favorite"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import { useStateProvider } from "./StateProvider"
import SongRow from "./SongRow"
import { SET_ITEM, SET_PLAYING } from "./reducer"
const Body = (props) => {
  const { spotify } = props
  const [{ discover_weekly }, dispatch] = useStateProvider()
  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:2Kee5haeQfP0hXoZn6YhaJ`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((res) => {
          dispatch({
            type: SET_ITEM,
            item: res.item,
          })
          dispatch({
            type: SET_PLAYING,
            playing: true,
          })
        })
      })
  }

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((res) => {
          dispatch({
            type: SET_ITEM,
            item: res.item,
          })
          dispatch({
            type: SET_PLAYING,
            playing: true,
          })
        })
      })
  }
  return (
    <div className="body">
      <Header spotify={spotify} />
      <div className="body__info">
        <img src={discover_weekly?.images[0]?.url} alt="" />
        <div className="body__infoText">
          <strong>PLAYLISTS</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>
      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon
            onClick={playPlaylist}
            className="body__shuffle"
          />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>
        {discover_weekly?.tracks.items.map((item) => (
          <SongRow playSong={playSong} track={item.track} />
        ))}
      </div>
    </div>
  )
}

export default Body
