export const initialState = {
  user: null,
  playlists: [],
  spotify: null,
  discover_weekly: null,
  top_artists: null,
  playing: false,
  item: null,
}

export const SET_USER = "app/SET_USER"
export const SET_PLAYING = "app/SET_PLAYING"
export const SET_ITEM = "app/SET_ITEM"
export const SET_TOP_ARTISTS = "app/SET_TOP_ARTISTS"
export const SET_SPOTIFY = "app/SET_SPOTIFY"
export const SET_TOKEN = "app/SET_TOKEN"
export const SET_PLAYLISTS = "app/SET_PLAYLISTS"
export const SET_DISCOVER_WEEKLY = "app/SET_DISCOVER_WEEKLY"

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      }

    case SET_PLAYING:
      return {
        ...state,
        playing: action.playing,
      }

    case SET_ITEM:
      return {
        ...state,
        item: action.item,
      }

    case SET_DISCOVER_WEEKLY:
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      }

    case SET_TOP_ARTISTS:
      return {
        ...state,
        top_artists: action.top_artists,
      }

    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      }

    case SET_SPOTIFY:
      return {
        ...state,
        spotify: action.spotify,
      }

    case SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      }
    default:
      return state
  }
}

export default reducer
