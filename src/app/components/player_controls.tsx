"use client";
import { Box, Flex, Slider, Text } from "@radix-ui/themes";
import {
  PlayIcon,
  PauseIcon,
  ShuffleIcon,
  LoopIcon,
  SpeakerQuietIcon,
  SpeakerLoudIcon,
  TrackPreviousIcon,
  TrackNextIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

function convertTime(time: string, convertTo: "seconds" | "minutes"): string {
  if (convertTo === "seconds") {
    const [minutes, seconds] = time.split(":").map(Number);
    return String(minutes * 60 + (seconds || 0));
  } else if (convertTo === "minutes") {
    const totalSeconds = parseInt(time, 10);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
  throw new Error("Invalid conversion type");
}

interface Song {
  title: string;
  artist: string;
  src: string;
  cover: string;
}

const songs: Song[] = [
  {
    title: "Tears In Your Eyes",
    artist: "Nora En Pure",
    src: "/music/nora_en_pure_tears_in_your_eyes.mp3",
    cover: "/albums/nora_en_pure.jpg",
  },
  {
    title: "Walk With Me",
    artist: "Alex Stavi",
    src: "/music/alex_stavi_walk_with_me.mp3",
    cover: "/albums/alex_stavi.jpg",
  },
  // Add more songs here
];

export default function PlayerControls() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playTime, setPlayTime] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volume, setVolume] = useState(50);
  const [hoveringOverProgress, setHoveringOverProgress] = useState(false);
  const [seekTime, setSeekTime] = useState(0);
  const [seekTimeout, setSeekTimeout] = useState<NodeJS.Timeout | null>(null);

  const progressWidth = (playTime / duration) * 100;

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const setAudioData = () => {
        if (!isNaN(audio.duration)) {
          setDuration(Math.floor(audio.duration));
        }
      };

      const setAudioTime = () => {
        setPlayTime(Math.floor(audio.currentTime));
      };

      audio.addEventListener("loadeddata", setAudioData);
      audio.addEventListener("timeupdate", setAudioTime);

      // Manually load the audio to ensure loadeddata event is fired
      audio.load();

      return () => {
        audio.removeEventListener("loadeddata", setAudioData);
        audio.removeEventListener("timeupdate", setAudioTime);
      };
    }
  }, [currentSongIndex]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playTime >= duration) {
        setIsPlaying(false);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [playTime, duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const onUserInteraction = () => {
    setUserInteracted(true);
  };

  const handleVolumeChange = (value: number) => {
    const newVolume = value / 100;
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const playNextSong = useCallback(() => {
    setCurrentSongIndex((prevIndex) => {
      return prevIndex < songs.length - 1 ? prevIndex + 1 : 0;
    });
    onUserInteraction();
  }, []);

  const playPreviousSong = useCallback(() => {
    setCurrentSongIndex((prevIndex) => {
      return prevIndex > 0 ? prevIndex - 1 : songs.length - 1;
    });
    onUserInteraction();
  }, []);

  const handleProgressMouseEnter = () => {
    setHoveringOverProgress(true);
  };

  const handleProgressMouseLeave = () => {
    setHoveringOverProgress(false);
  };

  const handleSeekChange = (value: number) => {
    if (audioRef.current) {
      // Clear existing timeout if there is one
      if (seekTimeout) {
        clearTimeout(seekTimeout);
      }

      // Update seek time immediately for the slider
      setSeekTime(value);

      // Set a new timeout for audio playback
      const newTimeout = setTimeout(() => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = value;

        // Only play if it was playing before
        if (isPlaying) {
          audioRef.current.play();
        }
      }, 500); // Delay of 500 ms

      setSeekTimeout(newTimeout);
    }
  };

  useEffect(() => {
    if (userInteracted && audioRef.current) {
      setPlayTime(0); // Reset play time for the new song
      audioRef.current.load(); // Reload the audio source
      audioRef.current.play(); // Start playing the new song
      setIsPlaying(true); // Start playing the new song
    }
  }, [currentSongIndex, userInteracted]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playTime >= duration) {
        playNextSong();
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [playTime, duration, playNextSong]);

  const currentSong = songs[currentSongIndex];

  return (
    <Box className="w-full max-w-5xl bg-zinc-900/30 backdrop-blur-lg border border-neutral-600 p-2 rounded-3xl absolute bottom-12">
      <audio ref={audioRef} preload="metadata">
        <source src={currentSong.src} type="audio/mpeg" />
      </audio>
      <Flex justify="between">
        {
          // Start/Stop/Shuffle
        }
        <Flex direction="row" align="center" gap="3">
          <Box
            className="bg-red-500 p-3 rounded-full cursor-pointer"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <PauseIcon color="#fff" height={20} width={20} />
            ) : (
              <PlayIcon color="#fff" height={20} width={20} />
            )}
          </Box>
          <ShuffleIcon
            className="text-zinc-400 cursor-pointer"
            height={20}
            width={20}
          />
          <LoopIcon
            className="text-zinc-400 cursor-pointer"
            height={20}
            width={20}
          />
        </Flex>

        {
          // Currently Playing
        }
        <Flex direction="row" align="center" gap="3">
          <TrackPreviousIcon
            className="text-zinc-400 cursor-pointer"
            height={20}
            width={20}
            onClick={playPreviousSong}
          />
          <Flex direction="row" align="center" gap="2">
            <Image
              src={currentSong.cover}
              width="50"
              height="50"
              alt="Currently playing"
              className="rounded"
            />
            <Flex direction="column">
              <Text className="text-neutral-100">{currentSong.title}</Text>
              <Flex direction="row" justify="between">
                <Text size="2" weight="light" className="text-neutral-400">
                  {currentSong.artist}
                </Text>
                <Text size="2" weight="light" className="text-neutral-400">
                  {convertTime(playTime.toString(), "minutes")} /{" "}
                  {convertTime(duration.toString(), "minutes")}
                </Text>
              </Flex>
              <Box
                onMouseEnter={handleProgressMouseEnter}
                onMouseLeave={handleProgressMouseLeave}
                className="w-[28rem] mt-1 bg-gray-300 rounded h-1 relative"
              >
                {hoveringOverProgress ? (
                  <Slider
                    value={[seekTime]}
                    min={0}
                    max={duration}
                    onValueChange={(values) => handleSeekChange(values[0])}
                    className="absolute top-0 left-0 right-0 h-1" // Slider styling to match progress bar
                  />
                ) : (
                  <Box
                    className="bg-red-500 h-1 rounded"
                    style={{ width: `${progressWidth}%` }}
                  />
                )}
              </Box>
            </Flex>
          </Flex>
          <TrackNextIcon
            className="text-zinc-400 cursor-pointer"
            height={20}
            width={20}
            onClick={playNextSong}
          />
        </Flex>

        {
          // Volume Controls
        }
        <Flex className="min-w-lg" direction="row" align="center" gap="1">
          <SpeakerQuietIcon className="text-zinc-400" height={15} width={15} />
          <Slider
            value={[volume]}
            defaultValue={[50]}
            onValueChange={(values) => handleVolumeChange(values[0])}
            size="1"
            className="w-24"
          />
          <SpeakerLoudIcon className="text-zinc-400" height={15} width={15} />
        </Flex>
      </Flex>
    </Box>
  );
}
