import React, { useEffect, useState } from "react";
import axios from "axios";

const RandomTrackPlayer = () => {
  const [trackUrl, setTrackUrl] = useState("");

  const getAccessToken = async () => {
    const clientId = "94206db11e7d423182376daced19ef90";
    const clientSecret = "20cfa6426ba34ec88ab5c60ea1ceb71d";
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token;
  };

  const getRandomTrack = async () => {
    const accessToken = await getAccessToken();
    if (!accessToken) return;

    const playlistId = "4v2GdXhonsihNLhRk04oTK";
    const apiUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const headers = { Authorization: `Bearer ${accessToken}` };

    try {
      const response = await axios.get(apiUrl, { headers });
      const tracks = response.data.items;
      const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
      setTrackUrl(randomTrack.track.uri);  // Guardamos el uri de la canción
    } catch (error) {
      console.error("Error al obtener una canción aleatoria:", error);
    }
  };

  useEffect(() => {
    getRandomTrack();
  }, []);

  return (
    <div>
      {trackUrl ? (
        <iframe
          src={`https://open.spotify.com/embed/track/${trackUrl.split(":")[2]}`}  // Extraemos el trackId del uri
          width="100%"
          height="300"
          frameBorder="0"
          allow="encrypted-media"
        ></iframe>
      ) : (
        console.log("Cargando Spotify...")
      )}
    </div>
  );
};

export default RandomTrackPlayer;
