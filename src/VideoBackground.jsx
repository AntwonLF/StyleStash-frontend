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
          setAllowPlay(false);
        } else {
          video.currentTime -= decrementAmount;
        }
      };

      video.pause();
      intervalId = setInterval(handleReversePlayback, intervalDuration);
    } else {

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
