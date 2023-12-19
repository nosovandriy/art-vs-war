import { getHeroPaintings } from '@/utils/api';
import HeroSection from './hero-section';

const Hero = async () => {
  const paintings = await getHeroPaintings();

  const videos = [
    { src: '/assets/video1_cropped.mp4', text: 'video1.mp4'  },
    { src: '/assets/video2_cropped.mp4', text: 'video2.mp4'  },
    { src: '/assets/video3_cropped.mp4', text: 'video3.mp4'  },
    { src: '/assets/video4_cropped.mp4', text: 'video4.mp4'  },
    { src: '/assets/video5_cropped.mp4', text: 'video5.mp4'  },
    { src: '/assets/video6_cropped.mp4', text: 'video6.mp4'  },
    { src: '/assets/video7_cropped.mp4', text: 'video7.mp4'  },
    { src: '/assets/video8_cropped.mp4', text: 'video8.mp4'  },
    { src: '/assets/video9_cropped.mp4', text: 'video9.mp4'  },
    { src: '/assets/video10_cropped.mp4', text: 'video10.mp4' },
  ];

  const randomIndex = Math.floor(Math.random() * videos.length);

  return <HeroSection paintings={paintings} video={videos[randomIndex]} />;
};

export default Hero;
