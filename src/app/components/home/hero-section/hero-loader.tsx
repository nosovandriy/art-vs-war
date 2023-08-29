import { getHeroPaintings } from "@/utils/api";
import HeroSection from "./hero-section";

const Hero = async () => {
  const paintings = await getHeroPaintings();

  return <HeroSection paintings={paintings} />;
};

export default Hero;
