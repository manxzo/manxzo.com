"use client";
import PixelCard from "@/components/ReactBits/Components/PixelCard/PixelCard";
import SplitText from "@/components/ReactBits/TextAnimations/SplitText/SplitText";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const texts = [
    "Hello, World!",
    "I'm Manzo, a Software Developer!",
    "Welcome to my website!",
    "What do you want to see?"
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [text, setText] = useState(texts[0]);
  const [replay, setReplay] = useState(false);

  const triggerReplay = () => {
    setReplay(true);
    setTimeout(() => setReplay(false), 100);
  };

  const advanceText = () => {
    if (textIndex < texts.length - 1) {
      const nextIndex = textIndex + 1;
      setTextIndex(nextIndex);
      setText(texts[nextIndex]);
      triggerReplay();
    }
  };
  const handleClick = () => {
    advanceText();
  };

  const showTapToContinue = textIndex < texts.length - 1;
  const showCards = textIndex === texts.length - 1; 

  return (
    <div
      className="flex flex-col justify-center items-center h-screen gap-4 cursor-pointer"
      onClick={textIndex < texts.length - 1 ? handleClick : undefined} 
    >
      <SplitText
        text={text}
        className="text-5xl font-semibold text-center"
        delay={50}
        animationFrom={{ opacity: 0, transform: 'translate3d(0,100px,0)' }}
        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
        threshold={0.2}
        rootMargin="-50px"
        replay={replay}
      />

      {showTapToContinue && (
        <p className="text-gray-400 text-sm mt-6 opacity-70">
          Tap to Continue!
        </p>
      )}

      {showCards && (
        <div className="flex flex-row gap-10">
          <PixelCard
            variant="pink"
            className="max-h-[300px] max-w-[300px] cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out shadow-lg"
            onClick={() => router.push('/professional')}
          >
            <div className="text-center p-4 absolute">
              <h3 className="font-bold text-2xl mb-2">Professional</h3>
              <p>View my work experience, projects, and skills</p>
            </div>
          </PixelCard>
          <PixelCard
            variant="blue"
            className="max-h-[300px] max-w-[300px] cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
            onClick={() => router.push('/casual')}
          >
            <div className="text-center p-4 absolute">
              <h3 className="font-bold text-2xl mb-2">Casual</h3>
              <p>Learn about my hobbies, interests, and personal side</p>
            </div>
          </PixelCard>
        </div>
      )}
    </div>
  )
}
