import About from "@/app/components/home/about-section/about-section";
import HaveCollection from "@/app/components/home/collection-section/collection-section";
import Artist from "@home/artist-section/artist-section";
import Funds from "@home/funds-section/funds-section";
import GeneralProjectData from "./components/home/dataInfo-section/prefetchData";
import Hero from "./components/home/hero-section/hero-loader";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Funds />
      <GeneralProjectData />
      <HaveCollection />
      <Artist />
    </>
  );
};

export default Home;
