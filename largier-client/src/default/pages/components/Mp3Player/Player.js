import React, { useEffect, useState } from 'react';
import useSound from 'use-sound'; // for handling the sound
import './player.css';

// Player icons
import PreviousIcon from './icons/previous.svg';
import NextIcon from './icons/next.svg';
import PlayIcon from './icons/play.svg';
import PauseIcon from './icons/pause.svg';

import FeelAudio from './mp3/Feel.1.wav.mp3';
import MagicalMomentsAudio from './mp3/Magical Moments.wav.mp3';
import TrustTheProcessAudio from './mp3/trustthepocess Kopie.wav.mp3';

import MagicalMomentsCover from './covers/magical-moments.png';
import TrustTheProcessCover from './covers/trust-the-process.png';
import FeelCover from './covers/feel.png';

const player = () => {
  const songs = [
    {
      src: FeelAudio,
      title: 'Feel',
      img: FeelCover,
      duration: '7:21',
    },
    {
      src: MagicalMomentsAudio,
      title: 'Magical Moments',
      img: MagicalMomentsCover,
      duration: '5:01',
    },
    {
      src: TrustTheProcessAudio,
      title: 'Trust The Process',
      img: TrustTheProcessCover,
      duration: '3:28',
    },
  ];

  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSong, setSelectedSong] = useState(songs[1]); // selected song

  const [play, { pause, duration, sound }] = useSound(selectedSong.src); // useSound hook
  const [seconds, setSeconds] = useState(); // current position of the audio in seconds

  const playingButton = () => {
    if (isPlaying) {
      pause(); // this will pause the audio
      setIsPlaying(false);
    } else {
      play(); // this will play the audio
      setIsPlaying(true);
    }
  };

  const handleChangeSong = (song) => {
    pause();
    setSelectedSong(song);
  };

  const handleSkip = () => {
    const currentIndex = songs.findIndex(song => song.title === selectedSong.title);
    const nextIndex = (currentIndex + 1) % songs.length;
    handleChangeSong(songs[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = songs.findIndex(song => song.title === selectedSong.title);
    const previousIndex = ((currentIndex - 1) + songs.length) % songs.length;
    handleChangeSong(songs[previousIndex]);
  };

  // Song changed
  useEffect(() => {
    const handleTimeUpdate = () => {
      // Update time each second when sound is loaded and song is playing
      if (sound && isPlaying) {
        const position = sound.seek([]);

        if (position && !isNaN(position)) {
          setSeconds(position); // setting the seconds state with the current state
        }
      }
    };

    const interval = setInterval(() => handleTimeUpdate(), 1000);

    return () => {
      pause();
      clearInterval(interval);
    };
  }, [sound, isPlaying]);

  // Song changed
  useEffect(() => {
    setSeconds(0);
    pause();

    if (sound && isPlaying) {
      play();
    }
  }, [sound]);


  // Displays the current Time of the song cursor
  const CurrentTime = () => (
    isNaN(seconds) ? '0:00' :
      <div>
        {Math.floor(seconds / 60)}:{Math.floor(seconds % 60).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </div>
  );

  // Displays total song duration
  const SongDuration = () => (
    <div>
      {Math.floor(duration / 1000 / 60)}:{Math.floor((duration / 1000) % 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}
    </div>
  );

  return (
    <div className="player">
      {
        <div>
          <div className="header">
            <img
              alt="cover"
              className="musicCover"
              src={selectedSong.img}
            />
            <div>
              <h3 className="title">{selectedSong.title}</h3>
              <p className="subTitle">Chantal Largier</p>

              {
                // Button section
                <div>
                  <button className="playButton" onClick={handlePrevious}>
                    <PreviousIcon className="icon" alt="previous track" style={{ color: 'white' }} />
                  </button>
                  {!isPlaying ? (
                    <button className="playButton" onClick={playingButton}>
                      <PlayIcon className="icon" alt="play track" style={{ color: 'white' }} />
                    </button>
                  ) : (
                    <button className="playButton" onClick={playingButton}>
                      <PauseIcon className="icon" alt="pause track" style={{ color: 'white' }} />
                    </button>
                  )}
                  <button className="playButton" onClick={handleSkip}>
                    <NextIcon className="icon" alt="next track" style={{ color: 'white' }} />
                  </button>
                </div>
              }

            </div>
          </div>

          <div>
            <div className="time">
              <CurrentTime />
              <SongDuration />
            </div>


            <input
              type="range"
              min="0"
              max={duration / 1000}
              default="0"
              className="timeline"
              value={seconds}
              onChange={(e) => {
                setSeconds(e.target.value);
                sound.seek([e.target.value]);
              }}
              onMouseDown={() => pause()}
              onMouseUp={() => isPlaying && play()}
            />

          </div>

          <div className="songList">
            {
              songs.map((song, index) => (
                <button
                  className={`songListButton ${selectedSong.title === song.title ? 'active' : ''}`}
                  onClick={() => {
                    setIsPlaying(true);
                    handleChangeSong(song);
                  }
                }
                >
                  <span>{index + 1}</span>
                  <span style={{ flexGrow: 1 }}>{song.title}</span>
                  <span>{song.duration}</span>
                </button>

              ))
            }
          </div>

        </div>

      }
    </div>
  );
};

export default player;
