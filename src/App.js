import React, { useState, useEffect } from "react"
import "./App.css"
import Login from "./Login"
import { getTokenFromResponseURL } from "./spotify"
import SpotifyWebApi from "spotify-web-api-js"
import Player from "./Player"
import { useStateProvider } from "./StateProvider"

import {
  SET_USER,
  SET_TOKEN,
  SET_PLAYLISTS,
  SET_DISCOVER_WEEKLY,
} from "./reducer"

const spotify = new SpotifyWebApi()

function App() {
  const [{ user, token }, dispatch] = useStateProvider()

  useEffect(() => {
    const hash = getTokenFromResponseURL()
    window.location.hash = ""
    const _token = hash.access_token
    if (_token) {
      dispatch({
        type: SET_TOKEN,
        token: _token,
      })
      spotify.setAccessToken(_token)
      spotify.getMe().then((user) =>
        dispatch({
          type: SET_USER,
          user: user,
        })
      )
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: SET_PLAYLISTS,
          playlists: playlists,
        })
      })
      spotify.getPlaylist("2Kee5haeQfP0hXoZn6YhaJ").then((res) => {
        dispatch({
          type: SET_DISCOVER_WEEKLY,
          discover_weekly: res,
        })
      })
    }
  }, [])
  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  )
}

export default App
