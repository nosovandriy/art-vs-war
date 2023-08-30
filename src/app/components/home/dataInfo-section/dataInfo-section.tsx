"use client";

import Image from "next/image";
import CountUp from "react-countup";
import Link from "next/link";

import style from "./dataInfo-section.module.scss";

const DataInfo = () => {
  return (
    <section className={style.dataInfo}>
      <div className={style.data}>
        <div className={style.info}>
          <h4 className={style.quantity}>
            <CountUp
              end={45}
              duration={2}
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />
          </h4>
          <p className={style.text}>ARTISTS IN COMMUNITY</p>
        </div>
        <div className={style.info}>
          <h4 className={style.quantity}>
            <CountUp
              end={567}
              duration={3}
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />
          </h4>
          <p className={style.text}>PAINTINGS IN DATABASE</p>
        </div>
        <div className={style.info}>
          <h4 className={style.quantity}>
            <CountUp
              end={1000000}
              duration={4}
              suffix=" €"
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />
          </h4>
          <p className={style.text}>RAISED FUNDS</p>
        </div>
      </div>
      <div className={style.wrapper}>
        <Link href={"/donation"} className={style.button}>
          Learn more
        </Link>

        <div className={style.ornament}>
          <Image
            src="/assets/dataInfoMob.webp"
            alt="Ukrainian gallery ornament"
            width={1000}
            height={1000}
            className={style.imageMobile}
          />
          <Image
            src="/assets/dataInfoDesk.webp"
            alt="Ukrainian gallery ornament"
            width={1000}
            height={1000}
            className={style.imageDesktop}
          />
        </div>
      </div>
    </section>
  );
};

export default DataInfo;
