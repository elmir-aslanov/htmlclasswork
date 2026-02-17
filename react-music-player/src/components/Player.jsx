import { useRef } from "react";

export default function Player() {
  const audioRef = useRef(null);

  const play = async () => {
    try {
      await audioRef.current.play();
      console.log("PLAY");
    } catch (e) {
      console.log("PLAY ERROR", e);
    }
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src="/songs/song1.mp3"
        controls
      />
      <br />
      <button onClick={play}>▶ Play</button>
    </div>
  );
}
