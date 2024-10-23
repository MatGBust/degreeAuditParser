import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './IntroScreen.css'; // Import your CSS file
import scallywag from './scallywag.png';
import nlgmm from './nlgmm.png';
import osu from './osu.png';

// Import audio files
import scallywagMusic from './scallywagSong.mp3';
import nlgmmMusic from './nlgmmSong.mp3';
import osuMusic from './osuSong.mp3';

const combos = [
  { image: nlgmm, text: "Naveen's Lean Green Mean Machines Present", music: new Audio(nlgmmMusic) },
  { image: osu, text: "In association with The Ohio State University", music: new Audio(osuMusic) },
  { image: scallywag, text: "A ScallyWag Software Production", music: new Audio(scallywagMusic) },
];

const IntroScreen = () => {
  const navigate = useNavigate();
  const [currentCombo, setCurrentCombo] = useState(0);
  const [fade, setFade] = useState(true);
  const [started, setStarted] = useState(false); // Tracks if the intro has started

  const handleStart = () => {
    setStarted(true); // Start the intro sequence when button is clicked
  };

  useEffect(() => {
    if (!started) return; // Do nothing until the intro is started

    const currentAudio = combos[currentCombo].music;
    currentAudio.load();
    currentAudio.play().catch((error) => {
      console.log(`Audio playback error for combo ${currentCombo}:`, error);
    });

    // Cleanup: Pause the audio when combo changes or component unmounts
    return () => {
      currentAudio.pause();
      currentAudio.currentTime = 0; // Reset to the beginning of the song
    };
  }, [currentCombo, started]);

  useEffect(() => {
    if (!started) return; // Do nothing until the intro is started

    const totalDuration = 45000; // Total duration of the intro
    const intervalDuration = 14000; // Duration for each logo (except the last one)

    // Timer to change logos
    const cycleTimer = setInterval(() => {
      if (currentCombo < combos.length - 1) {
        setFade(false); // Start fade out
        setTimeout(() => {
          setCurrentCombo((prev) => prev + 1); // Move to the next combo
          setFade(true); // Start fade in after changing combo
        }, 1000); // 1 second for fade out
      }
    }, intervalDuration); // Change logos every 14 seconds

    // Timer to navigate to home page
    const navigateTimer = setTimeout(() => {
      navigate('/home'); // Redirect to home after the last logo
    }, totalDuration); // Navigate after total duration

    return () => {
      clearInterval(cycleTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate, started, currentCombo]);

  useEffect(() => {
    // If we're at the last combo, set a specific timer to navigate after showing it
    if (currentCombo === combos.length - 1) {
      const lastComboTimer = setTimeout(() => {
        navigate('/home'); // Navigate to home after the last combo
      }, 14000); // Duration of the last logo

      return () => {
        clearTimeout(lastComboTimer);
      };
    }
  }, [currentCombo, navigate]);

  return (
    <div className="splash-screen">
      {!started ? (
        <div className="start-button-container">
          <button onClick={handleStart} className="start-button">
            Click to Start
          </button>
        </div>
      ) : (
        <div className={`splash-screen-content ${fade ? 'fade-in' : 'fade-out'}`}>
          <img
            src={combos[currentCombo].image}
            alt="Logo"
            className="logo"
            style={{ width: '400px', height: 'auto' }}
          />
          <h1 className="fade-text">{combos[currentCombo].text}</h1>
        </div>
      )}
    </div>
  );
};

export default IntroScreen;