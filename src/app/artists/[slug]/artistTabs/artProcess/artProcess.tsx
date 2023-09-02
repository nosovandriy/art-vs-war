import MasonryArtProcess from "./masonry-art-process/masonry-art-process";

import style from "./artProcess.module.scss";

const ArtProcess = () => {
  return (
    <div className={style.container}>
      <MasonryArtProcess />
    </div>
  );
};

export default ArtProcess;
