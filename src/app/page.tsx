import About from "@/app/components/home/about-section/about-section";
import HaveCollection from "@/app/components/home/collection-section/collection-section";
import Artist from "@home/artist-section/artist-section";
import DataInfo from "@home/dataInfo-section/dataInfo-section";
import Funds from "@home/funds-section/funds-section";
import Hero from "./components/home/hero-section/hero-loader";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Funds />
      <DataInfo />
      <HaveCollection />
      <Artist />
    </>
  );
};

export default Home;
