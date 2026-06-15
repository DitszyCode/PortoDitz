import { getRecentTrack } from "@/lib/lastfm"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const data = await getRecentTrack()
    const track = data.recenttracks.track[0]
    const isPlaying = track["@attr"]?.nowplaying === "true"

    return NextResponse.json({
      name: track.name,
      artists: [{ name: track.artist["#text"], url: `https://www.last.fm/music/${encodeURIComponent(track.artist["#text"])}` }],
      href: track.url,
      albumArt: { url: track.image[2]["#text"] || "/default-album.png" },
      currentlyPlaying: isPlaying,
    })
  } catch (error) {
    return NextResponse.json({ error: "Error fetching Last.fm data" }, { status: 500 })
  }
}