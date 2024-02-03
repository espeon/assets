"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { CrossFade } from "react-crossfade-simple";

interface Track {
  name: string;
  artist: string;
  image_url: string;
}
interface BackgroundImage {
  current: string;
  previous: string | null;
}

const FM_KEY = "6f5ff9d828991a85bd78449a85548586";
const MAIN = "kanb";

export default function Home() {
  const [track, setTrack] = useState<Track | null>(null);
  const [bgImage, setBgImage] = useState<BackgroundImage>({
    current: "https://i.imgur.com/eiR2CBe.jpeg",
    previous: null,
  });
  useEffect(() => {
    const fetchTrack = () => {
      console.log("fetching track");
      fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${MAIN}&api_key=${FM_KEY}&limit=1&format=json`,
      )
        .then((response) => response.json())
        .then((data) => {
          const recentTrack = data.recenttracks.track[0];
          console.log(recentTrack.image.length - 1);
          console.log(recentTrack.image[recentTrack.image.length - 1]);
          let image: string =
            recentTrack.image[recentTrack.image.length - 1]["#text"];
          if (
            image.includes(
              "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
            )
          ) {
            image = "https://i.imgur.com/eiR2CBe.jpeg";
          }
          console.log(image);
          document.documentElement.style.setProperty("--current-image", image);
          setTrack({
            name: recentTrack.name,
            artist: recentTrack.artist["#text"],
            image_url: image,
          });
          setBgImage({
            current: image,
            previous: bgImage.current,
          });
        })
        .catch((error) => console.error(error));
    };

    fetchTrack(); // Fetch immediately on component mount
    const intervalId = setInterval(fetchTrack, 1000); // Fetch every 1s

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);
  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-center p-24 transition-all text-white overflow-clip">
      <div className="absolute min-h-[155vw] min-w-[155vw] -z-50 spin blur-2xl brightness-[25%]">
        <CrossFade
          contentKey={bgImage.current}
          timeout={5000}
          style={{ backgroundColor: "black" }}
        >
          <Image
            className="contrast-[96%]"
            src={bgImage.current}
            alt=""
            height="20000"
            width="20000"
            unoptimized
          />
        </CrossFade>
      </div>
      <CrossFade
        contentKey={track ? track.name + track.artist : "none"}
        timeout={500}
      >
        <div className="relative flex flex-row w-screen items-center justify-center">
          <div className="absolute">
            <div className="text-3xl">
              <span className="absolute rounded-full bg-gradient-to-r from-teal-800 to-purple-800 blur-3xl -translate-x-[10rem] -translate-y-24 h-[250px] w-[550px] z-[-49] animate" />
              {track ? (
                <>
                  <span className="bg-white text-black rounded-full px-3 py-1 mr-1">
                    ♫
                  </span>{" "}
                  {track.name} • {track.artist}
                </>
              ) : (
                <div />
              )}
            </div>
          </div>
          <div className="absolute">
            <div
              className="relative flex place-items-center before:absolute before:h-[350px] before:w-[480px] 
      before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:via-transparent
      before:blur-2xl before:content-[''] after:absolute after:-z-45 after:h-[180px] after:w-[240px] after:translate-x-1/3 
      after:bg-gradient-conic after:from-sky-200 after:via-blue-500 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br 
      before:dark:from-transparent before:dark:to-fuchsia-400 before:dark:opacity-45 after:dark:from-fuchsia-400 after:dark:via-slate-600
      after:dark:opacity-100 before:lg:h-[320px] before:lg:w-[480px] z-[-1] after:animate-pulse"
            >
              <span className="absolute rounded-full bg-gradient-radial from-purple-950 to-transparent blur-xl -translate-x-[8.4rem] translate-y-12 h-[250px] w-[550px] z-[-49]" />
              <span
                className="relative flex place-items-center before:absolute before:h-[180px] before:w-[280px] 
      before:-translate-x-[-200px] before:translate-y-[30px] before:rounded-full before:bg-gradient-radial before:from-pink-500 
      before:to-transparent before-animate before:delay-300 before:blur-2xl
      after:absolute after:-z-45 after:h-[280px] after:w-[240px] after:rounded-full after:translate-x-[150px] after:translate-y-[-50px]
      after:bg-gradient-conic after:from-pink-800 after:via-purple-800 after:content-[''] after:blur-2xl after-animate"
              />
            </div>
          </div>
        </div>
      </CrossFade>
    </main>
  );
}
