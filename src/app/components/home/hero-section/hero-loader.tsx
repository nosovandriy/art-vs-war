import { getHeroPaintings } from '@/utils/api';
import HeroSection from './hero-section';

const Hero = async () => {
  const paintings = await getHeroPaintings();

  const videos = [
    { src: '/assets/video/video_1.mp4' },
    { src: '/assets/video/video_2.mp4' },
    { src: '/assets/video/video_3.mp4' },
    { src: '/assets/video/video_4.mp4' },
    { src: '/assets/video/video_5.mp4' },
    { src: '/assets/video/video_6.mp4' },
    { src: '/assets/video/video_7.mp4' },
    { src: '/assets/video/video_8.mp4' },
    { src: '/assets/video/video_9.mp4' },
  ];

  const randomIndex = Math.floor(Math.random() * videos.length);

  return <HeroSection paintings={paintings} video={videos[randomIndex]} />;
};

export default Hero;
