import { AudioFeatures } from "@spotify/web-api-ts-sdk";

interface TrackInfoCardProps {
  imageUrl: string;
  audioFeatures: AudioFeatures | undefined;
  trackName: string | undefined;
  artists: string | undefined;
  album: string | undefined;
}

function TrackInfoCard({
  imageUrl,
  audioFeatures,
  trackName,
  artists,
  album,
}: TrackInfoCardProps) {
  const sortOptions = [
    { key: "danceability", icon: "💃🕺" },
    { key: "energy", icon: "🧨" },
    { key: "loudness", icon: "🔊" },
    { key: "speechiness", icon: "🗣️" },
    { key: "acousticness", icon: "🎻" },
    { key: "instrumentalness", icon: "🎷" },
    { key: "liveness", icon: "🔆" },
    { key: "valence", icon: "🎭" },
  ];

  const filteredAudioFeatures = audioFeatures
    ? Object.fromEntries(
        Object.entries(audioFeatures).filter(([key]) =>
          sortOptions.map((option) => option.key).includes(key)
        )
      )
    : {};

  return (
    <div
      className="flex flex-col pt-5 items-center w-96 h-640 text-white bg-white bg-opacity-30 
    drop-shadow-lg rounded-lg p-4"
    >
      <img src={imageUrl} alt={trackName} className="mb-4 w-96 " />

      <h2 className="text-2xl font-bold">{trackName}</h2>
      <p className="">{artists}</p>
      <p className="text-white text-xs mb-2">{album}</p>

      {Object.entries(filteredAudioFeatures).length > 0 && (
        <div className="grid grid-cols-2 mt-4">
          {sortOptions.map(({ key, icon }) => (
            <div
              key={key}
              className="flex flex-col items-center text-center pb-2"
            >
              <p className="text-3xl">{icon}</p>
              <div className="mt-1 mb-1">
                <p className="text-sm">{key}</p>
                <p className="text-sm">{filteredAudioFeatures[key]}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TrackInfoCard;
