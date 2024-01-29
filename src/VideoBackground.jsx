
const VideoBackground = () => {
    return (
      <div className="video-container">
        <video autoPlay muted className="video-background">
          <source src="/Users/xsteelmill/code/seb/projects/StyleStash-frontend/src/assets/closetopening.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div> 
      </div>
    );
  };
  
  export default VideoBackground;
  