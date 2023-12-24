import { getHeroPaintings } from '@/utils/api';
import HeroSection from './hero-section';

const Hero = async () => {
  const paintings = await getHeroPaintings();

  const videos = [
    { src: '/assets/video1.mp4', text: 'video1.mp4'  },
    { src: '/assets/video2.mp4', text: 'video2.mp4'  },
    { src: '/assets/video3.mp4', text: 'video3.mp4'  },
    { src: '/assets/video4.mp4', text: 'video4.mp4'  },
    { src: '/assets/video5.mp4', text: 'video5.mp4'  },
    { src: '/assets/video6.mp4', text: 'video6.mp4'  },
    { src: '/assets/video7.mp4', text: 'video7.mp4'  },
    { src: '/assets/video8.mp4', text: 'video8.mp4'  },
    { src: '/assets/video9.mp4', text: 'video9.mp4'  },
    { src: '/assets/video10.mp4', text: 'video10.mp4' },
    { src: '/assets/video11.mp4', text: 'video11.mp4' },
    { src: '/assets/video12.mp4', text: 'video12.mp4' },
    { src: '/assets/video13.mp4', text: 'video13.mp4' },
    { src: '/assets/video14.mp4', text: 'video14.mp4' },
    { src: '/assets/video15.mp4', text: 'video15.mp4' },
    { src: '/assets/video16.mp4', text: 'video16.mp4' },
    { src: '/assets/video17.mp4', text: 'video17.mp4' },
    { src: '/assets/video18.mp4', text: 'video18.mp4' },
    { src: '/assets/video19.mp4', text: 'video19.mp4' },
    { src: '/assets/video20.mp4', text: 'video20.mp4' },
    { src: '/assets/video21.mp4', text: 'video21.mp4' },
    { src: '/assets/video22.mp4', text: 'video22.mp4' },
  ];

  const randomIndex = Math.floor(Math.random() * videos.length);

  return <HeroSection paintings={paintings} video={videos[randomIndex]} />;
};

export default Hero;
