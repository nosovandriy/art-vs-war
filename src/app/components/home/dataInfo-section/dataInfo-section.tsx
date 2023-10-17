"use client";

import Image from "next/image";
import CountUp from "react-countup";
import Link from "next/link";

import style from "./dataInfo-section.module.scss";

type DataInfoTypes = {
  authorsQuantity: number;
  paintingsQuantity: number;
  raisedFunds: number;
};

const DataInfo = ({ dataInfo }: { dataInfo: DataInfoTypes }) => {
  return (
    <section className={style.dataInfo}>
      <div className={style.data}>
        <div className={style.info}>
          <h4 className={style.quantity}>
            <CountUp
              end={dataInfo.authorsQuantity}
              duration={3}
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />
          </h4>
          <p className={style.text}>ARTISTS IN COMMUNITY</p>
        </div>
        <div className={style.info}>
          <h4 className={style.quantity}>
            <CountUp
              end={dataInfo.paintingsQuantity}
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
              end={dataInfo.raisedFunds}
              duration={3}
              suffix=" €"
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />
          </h4>
          <p className={style.text}>TOTAL PAINTINGS SOLD</p>
        </div>
      </div>
      <div className={style.wrapper}>
        <Link href={"/gallery"} className={style.button}>
          Gallery
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
