import React from "react";
import "./Wave.css";

export function SoundWave() {
  const waveCount = 100; // Número de ondas, ajústalo para llenar el contenedor
  return (
    <div className="sound-wave">
    {Array.from({ length: waveCount }).map((_, index) => (
      <div
        key={`wave1-${index}`}
        className="wave"
        style={{
          animationDelay: `${-0.1 * (index % 10)}s`,
        }}
      ></div>
    ))}
    
  </div>
  );
}

