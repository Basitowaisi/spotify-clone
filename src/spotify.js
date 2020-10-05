//developer.spotify.com/documentation/web-playback-sdk/quick-start/

export const authenticationEndpoint = "https://accounts.spotify.com/authorize"

const redirectURI = "https://spotify-clone-112233.web.app"

const CLIENT_ID = "b066a87bedc54a3ea74c5a924dfec8a7"

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
]

export const getTokenFromResponseURL = () => {
  return window.location.hash //get to the point where it encounters a hash in url
    .substr(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=")
      initial[parts[0]] = decodeURIComponent(parts[1])
      return initial
    }, {})
}

export const loginURL = `${authenticationEndpoint}?client_id=${CLIENT_ID}&redirect_uri=${redirectURI}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`
