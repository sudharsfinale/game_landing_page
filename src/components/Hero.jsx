import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { Send } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FullScreenLoader from "./FullScreenLoader";
import {ScrollTrigger} from "gsap/all"

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const TOTAL_VIDEOS = 4;
  const nextVideoRef = useRef(null);
  const upComingVideoIndex = (currentIndex % TOTAL_VIDEOS) + 1;
  const miniVideoPlayerClick = () => {
    setHasClicked(true);
    setCurrentIndex(upComingVideoIndex);
  };
  const getVideoSource = (index) => `videos/hero-${index}.mp4`;
  const handleVideoLoaded = () => {
    setLoadedVideos((prev) => prev + 1);
  };
  useEffect(()=>{
    if(loadedVideos){
        setIsLoading(false)
    }
  },[loadedVideos]);
  console.log(loadedVideos, "loadedVideos")
  useGSAP(()=> {
    debugger;
    if(hasClicked){
        gsap.set("#next-video", {visibility: "visible"})
        gsap.to("#next-video", {
            transformOrigin:"center center",
            scale:1,
            width:"100%",
            height:"100%",
            duration: 1.5,
            ease:"power1.inOut",
            onStart:()=> {
                debugger;
                nextVideoRef.current.play();
            }
        })
        gsap.from("#current-video", {
            transformOrigin:"center center",
            scale:0,
            duration: 1.5,
            ease:"power1.inOut",
        })
    }
  }, {dependencies: [currentIndex], revertOnUpdate: true})
  useGSAP(()=>{
    gsap.set("#video-frame", {
        clipPath: "polygon(14% 0, 72% 0, 90% 90%, 0 100%)",
        borderRadius : "0 0 40% 10%"
    })
    gsap.from("#video-frame", {
        clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0 100%)",
        borderRadius : "0 0 0 0",
        ease: "power1.inOut",
        scrollTrigger: {
            trigger: "#video-frame",
            start: "center center",
            end: "bottom center",
            scrub: true
        }
    })
  })
  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
        {isLoading ? <FullScreenLoader /> : null}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              onClick={miniVideoPlayerClick}
            >
              <video
                className="origin-center size-64 scale-150 object-cover object-center"
                ref={nextVideoRef}
                src={getVideoSource(upComingVideoIndex)}
                loop
                muted
                id="current-video"
                onLoadedData={handleVideoLoaded}
              ></video>
            </div>
          </div>
          <video
            ref={nextVideoRef}
            src={getVideoSource(currentIndex)}
            loop
            muted
            // autoPlay
            id="next-video"
            className="z-20 absolute-center invisible absolute size-64 object-center object-cover"
          ></video>
          <video
            src={getVideoSource(currentIndex === TOTAL_VIDEOS - 1 ? 1 : currentIndex)}
            loop
            muted
            autoPlay
            className="absolute left-0 top-0 size-full object-center object-cover"
          ></video>
        </div>
        <h1 className="hero-heading special-font absolute bottom-5 right-5 z-40 text-blue75">
          G<b>a</b>ming
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="hero-heading special-font text-blue100">
              Redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue100">
              Enter the Metagame Layer
              <br />
              Unleash the Play Economy
            </p>
            <Button
              containerClass={"bg-yellow-300 flex-center gap-2"}
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<Send size={12} />}
            />
          </div>
        </div>
      </div>
      <h1 className="hero-heading special-font absolute bottom-5 right-5 text-black">
          G<b>a</b>ming
        </h1>
    </div>
  );
};

export default Hero;
