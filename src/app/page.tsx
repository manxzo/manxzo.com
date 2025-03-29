"use client";
import Aurora from "@/ReactBits/Backgrounds/Aurora/Aurora";
import SplitText from "@/ReactBits/TextAnimations/SplitText/SplitText";
import FlowingMenu from "@/ReactBits/Components/FlowingMenu/FlowingMenu";
import SplashCursor from "@/ReactBits/Animations/SplashCursor/SplashCursor";
export default function Home() {
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };
  const demoItems = [
    { link: '#', text: 'Mojave', image: 'https://picsum.photos/600/400?random=1' },
    { link: '#', text: 'Sonoma', image: 'https://picsum.photos/600/400?random=2' },
    { link: '#', text: 'Monterey', image: 'https://picsum.photos/600/400?random=3' },
    { link: '#', text: 'Sequoia', image: 'https://picsum.photos/600/400?random=4' }
  ];
  return (
 <div>
  <main>
    <SplashCursor />
  <Aurora
  colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
  blend={0.5}
  amplitude={1.0}
  speed={0.5}
/>
<SplitText
  text="Hello, Tailwind!"
  className="text-2xl font-semibold text-center"
  delay={150}
  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
  easing={(t:number) => t}
  threshold={0.2}
  rootMargin="-50px"
  onLetterAnimationComplete={handleAnimationComplete}
/>
<div style={{ height: '600px', position: 'relative' }} className="h-1/2 w-1/2">
  <FlowingMenu items={demoItems}/>
</div>
  </main>
 </div>
  
  );
}
