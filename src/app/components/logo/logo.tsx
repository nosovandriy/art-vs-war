import Image from "next/image";

import style from "./logo.module.scss";

export const Logo = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.image__wrapper}>
        <Image
          src="/assets/logo_icon.svg"
          alt="Art gallery logo"
          fill
          priority
          sizes="10vw"
          className={style.image}
        />
      </div>
      <p className={style.text}>ART VS WAR</p>
    </div>
  );
};
