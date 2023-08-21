import Image from "next/image";

import style from "./artProcess.module.scss";

const ArtProcess = () => {
  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.image}>
          <Image
            src={"/assets/images/Rectangle 7.png"}
            alt="process"
            width={1000}
            height={1000}
            className={style.image}
          />
        </div>
        <div className={style.description}>
          Simple description (Name picture, style, medium)
        </div>
      </div>
      <div className={style.card}>
        <div className={style.image}>
          <Image
            src={"/assets/artistsOrnament.webp"}
            alt="process"
            width={1000}
            height={1000}
            className={style.image}
          />
        </div>
        <div className={style.description}>
          Simple description (Name picture, style, medium)
        </div>
      </div>
      <div className={style.card}>
        <div className={style.image}>
          <Image
            src={"/assets/artistsOrnament.webp"}
            alt="process"
            width={1000}
            height={1000}
            className={style.image}
          />
        </div>
        <div className={style.description}>
          Simple description (Name picture, style, medium)
        </div>
      </div>
      <div className={style.card}>
        <div className={style.image}>
          <Image
            src={"/assets/images/Rectangle 7.png"}
            alt="process"
            width={1000}
            height={1000}
            className={style.image}
          />
        </div>
        <div className={style.description}>
          Simple description (Name picture, style, medium)
        </div>
      </div>
    </div>
  );
};

export default ArtProcess;
