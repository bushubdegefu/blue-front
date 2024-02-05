
import { useEffect, useState,useRef } from "react";
import { ErrorBoundary } from '../components/ErrorBoundary';
// import { blueClient } from "../store/client";
import dashjs from 'dashjs';



const DashPlayer = ({ url }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Initialize the MediaPlayer instance
    const player = dashjs.MediaPlayer().create();

    // Attach the MediaPlayer to the video element
    player.initialize(videoRef.current, url, true);

    // Clean up the MediaPlayer when the component unmounts
    return () => {
      player.destroy();
    };
  }, [url]);

  return (
    <video className='w-full h-full px-10 py-10 rounded-xl' ref={videoRef} controls />
  );
};

export default DashPlayer;

export function VideoStream(){ 
 
    return (
        <>
        <div className="px-10 py-auto">
        <ErrorBoundary>
            <DashPlayer url="http://localhost:5500/api/v1/stream/here_oXKrj8z_dash.mpd" />
            
        </ErrorBoundary>

        <img className="w-full"src="http://localhost:5500/api/v1/pics"/> 

        </div>
        </>
    )
}