'use server'

const SPOTIFY_CLIENT_ID = "c00e0f42261f4ab49a74b1ada758d61f"
const SPOTIFY_CLIENT_SECRET = "2f96992a6ef8440d92a2b3d5a6071346"
const SPOTIFY_REFRESH_TOKEN = "AQBcrDADMe7scCaI4uJi7wZLuPj0nuJuFnzyigEMMNjUIQlFaWijRFMYRs-TOIJHEU4yw4gkll6-3qnxsL6IYzUsnZOV1t-cq29NK1hg_evFhillBDVN2V1nfmEzpiwcQ84yQEaF3Ef5Keerh9aiFAK7GvKx605WHFi5MBaCSB3Kf2D6dnzGMoTW7LhMCVzGTAlLw3fsTMdUDanu5rdP-RBw8WZ1-Y-1ODK7i0XXSq58mZLNv3HswZEUiR5xYA"

export const getAccessToken = async () => {
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded")

  const urlencoded = new URLSearchParams()
  urlencoded.append("client_id", SPOTIFY_CLIENT_ID)
  urlencoded.append("client_secret", SPOTIFY_CLIENT_SECRET)
  urlencoded.append("grant_type", "refresh_token")
  urlencoded.append("refresh_token", SPOTIFY_REFRESH_TOKEN)

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    })
    const data = await response.json()
    console.log("TOKEN RESPONSE:", JSON.stringify(data))
    return data.access_token
  } catch (error) {
    console.log("TOKEN ERROR:", error)
  }
}

export async function getCurrentTrack(accessToken: string) {
  const myHeaders = new Headers()
  myHeaders.append("Authorization", `Bearer ${accessToken}`)

  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      { method: "GET", headers: myHeaders, next: { revalidate: 0 } }
    )
    if (response.status === 204 || response.status > 400) return null
    const data = await response.json()
    return data ?? null
  } catch (err) {
    return null
  }
}

export async function getLastPlayedTrack(accessToken: string) {
  const myHeaders = new Headers()
  myHeaders.append("Authorization", `Bearer ${accessToken}`)

  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      { method: "GET", headers: myHeaders, next: { revalidate: 60 } }
    )
    const data = await response.json()
    return data ?? null
  } catch (err) {
    return null
  }
}