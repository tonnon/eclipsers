import './homeStyle.css';

import Video from '../assets/video.mp4';

function Home() {
  return (
    <>
      <video 
        src={Video} 
        autoPlay={true}
        loop
        muted />
    </>
  );
}

export default Home;
