import React, { useEffect } from "react"
import "./Footer.css"
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline"
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline"
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious"
import SkipNextIcon from "@material-ui/icons/SkipNext"
import ShuffleIcon from "@material-ui/icons/Shuffle"
import RepeatIcon from "@material-ui/icons/Repeat"
import { Grid, Slider } from "@material-ui/core"
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay"
import VolumeDownIcon from "@material-ui/icons/VolumeDown"
import { useStateProvider } from "./StateProvider"
import { SET_ITEM, SET_PLAYING } from "./reducer"

const Footer = (props) => {
  const { spotify } = props
  const [{ item, playing }, dispatch] = useStateProvider()
  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((res) => {
      dispatch({
        type: SET_PLAYING,
        playing: res.is_playing,
      })

      dispatch({
        type: SET_ITEM,
        item: res.item,
      })
    })
  }, [spotify])
  const handlePlayPause = () => {
    if (playing) {
      spotify.pause()
      dispatch({
        type: SET_PLAYING,
        playing: false,
      })
    } else {
      spotify.play()
      dispatch({
        type: SET_PLAYING,
        playing: true,
      })
    }
  }

  const skipNext = () => {
    spotify.skipToNext()
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
  }

  const skipPrevious = () => {
    spotify.skipToPrevious()
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
  }
  return (
    <div className="footer">
      <div className="footer__left">
        <img
          src={item?.album.images[0].url}
          alt={item?.name}
          className="footer__albumLogo"
        />
        {item ? (
          <div className="footer__songInfo">
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>
      <div className="footer__center">
        <ShuffleIcon className="footer__green" />
        <SkipPreviousIcon onClick={skipPrevious} className="footer__icon" />
        {playing ? (
          <PauseCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        )}
        <SkipNextIcon onClick={skipNext} className="footer__icon" />
        <RepeatIcon className="footer__green" />
      </div>
      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Footer
