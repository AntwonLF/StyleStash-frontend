import React, { useEffect, useRef, useState } from 'react';

const VideoBackground = ({ playInReverse = false }) => {
  const videoRef = useRef(null);
  const [allowPlay, setAllowPlay] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => {
      if (playInReverse) {
        video.currentTime = video.duration;
      }
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);

    let intervalId;
    if (playInReverse && allowPlay) {
      const decrementAmount = 0.05;
      const intervalDuration = 50;

      const handleReversePlayback = () => {
        if (video.currentTime <= 0.1) {
          video.pause();
          clearInterval(intervalId);
          setAllowPlay(false); // Ensures video stops after playing in reverse
        } else {
          video.currentTime -= decrementAmount;
        }
      };

      video.pause(); // Make sure to pause before setting the interval
      intervalId = setInterval(handleReversePlayback, intervalDuration);
    } else {
      // Reset video to start only if allowed to play
      if (allowPlay) {
        video.currentTime = 0;
        video.play().catch(error => console.error("Video play failed", error));
      }
    }

    return () => {
      clearInterval(intervalId);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [playInReverse, allowPlay]);

  useEffect(() => {
    // Reset allowPlay when component unmounts or resets
    return () => {
      setAllowPlay(true); 
    };
  }, []);

  return (
    <div className="video-container">
      <video autoPlay muted loop={false} ref={videoRef} className="video-background" onEnded={() => setAllowPlay(false)}>
        <source src="src/assets/opening.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay"></div>
    </div>
  );
};

export default VideoBackground;
