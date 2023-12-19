'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { TitleAnimation } from '@/utils/animation';

import style from './hero-section.module.scss';

type Painting = {
  url: string;
  prettyId: string;
  authorPrettyId: string;
};

type PaintingsData = {
  '2.0': Painting[];
  '1.75': Painting[];
  '1.5': Painting[];
  '1.0': Painting[];
  '1.25': Painting[];
  '0.75': Painting[];
};

type HeroSectionProps = {
  paintings: PaintingsData;
  video: any;
};

const HeroSection = ({ paintings, video }: HeroSectionProps) => {
  const firstImage2_0 = paintings['2.0'][0];
  const secondImage2_0 = paintings['2.0'][1];
  const firstImage1_75 = paintings['1.75'][0];
  const firstImage1_5 = paintings['1.5'][0];
  const secondImage1_5 = paintings['1.5'][1];
  const firstImage1_25 = paintings['1.25'][0];
  const secondImage1_25 = paintings['1.25'][1];
  const thirdImage1_25 = paintings['1.25'][2];
  const firstImage1_0 = paintings['1.0'][0];
  const secondImage1_0 = paintings['1.0'][1];
  const firstImage0_75 = paintings['0.75'][0];
  const secondImage0_75 = paintings['0.75'][1];

  const [showImage, setShowImage] = useState(false);

  console.log(video);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);

      setTimeout(() => {
        setShowImage(false);
      }, 3000);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      <div className={style.mobile}>
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={TitleAnimation('y')}
          className={style.mobile__title}
        >
          Buy Art
          <br />
          Help Ukraine
        </motion.h1>

        {/* <Image
          src="/assets/hero_image.webp"
          className={style.mobile__background}
          alt="ukrainian art"
          fill
          priority
          sizes="(max-width: 639px) 100vw"
        /> */}
        <video
          width="100%"
          autoPlay
          playsInline
          muted
          loop
          className={style.mobile__background}
          // poster={video.poster}
        >
          <source src={video.src} type="video/mp4" />
          <track
            kind="captions"
            label="Manoli the process of creating perfumes"
            srcLang="uk"
            default
          />
        </video>
        <Link href={'/gallery'} className={style.mobile__button}>
          Explore
        </Link>
        <p className={style.textTitle}>{video.text}</p>
      </div>
      <div className={style.hero}>
        <div className={style.title}>
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={TitleAnimation('y')}
            className={style.title__text}
          >
            Buy Art
            <br /> Help Ukraine
          </motion.h1>
          <Image
            src="/assets/map.webp"
            alt="map of Ukraine"
            width={145}
            height={80}
            className={`${style.imageMap} ${showImage && style.visible}`}
          />
        </div>

        <Link
          href={`/gallery/${firstImage2_0.prettyId}`}
          className={`${style.first__image} ${style.images}`}
        >
          <Image
            src={firstImage2_0.url}
            alt={`Painting ${firstImage2_0.prettyId} by artist ${firstImage2_0.authorPrettyId}`}
            fill
            priority
            sizes="(max-width: 1600px) 33vw"
            className={`${style.image} imageOpacityEffect`}
            onLoadingComplete={(img) => (img.style.opacity = '1')}
          />
        </Link>
        <Link
          href={`/gallery/${firstImage0_75.prettyId}`}
          className={`${style.second__image} ${style.images}`}
        >
          <Image
            src={firstImage0_75.url}
            alt={`Painting ${firstImage0_75.prettyId} by artist ${firstImage0_75.authorPrettyId}`}
            fill
            priority
            sizes="(max-width: 1600px) 33vw"
            className={`${style.image} imageOpacityEffect`}
            onLoadingComplete={(img) => (img.style.opacity = '1')}
          />
        </Link>
        <Link
          href={`/gallery/${firstImage1_25.prettyId}`}
          className={`${style.third__image} ${style.images}`}
        >
          <Image
            src={firstImage1_25.url}
            alt={`Painting ${firstImage1_25.prettyId} by artist ${firstImage1_25.authorPrettyId}`}
            fill
            priority
            sizes="(max-width: 1600px) 33vw"
            className={`${style.image} imageOpacityEffect`}
            onLoadingComplete={(img) => (img.style.opacity = '1')}
          />
        </Link>
        <Link
          href={`/gallery/${secondImage2_0.prettyId}`}
          className={`${style.fourth__image} ${style.images}`}
        >
          <Image
            src={secondImage2_0.url}
            alt={`Painting ${secondImage2_0.prettyId} by artist ${secondImage2_0.authorPrettyId}`}
            fill
            priority
            sizes="(max-width: 1600px) 33vw"
            className={`${style.image} imageOpacityEffect`}
            onLoadingComplete={(img) => (img.style.opacity = '1')}
          />
        </Link>
        <Link
          href={`/gallery/${secondImage0_75.prettyId}`}
          className={`${style.fifth__image} ${style.images}`}
        >
          <Image
            src={secondImage0_75.url}
            alt={`Painting ${secondImage0_75.prettyId} by artist ${secondImage0_75.authorPrettyId}`}
            fill
            priority
            sizes="(max-width: 1600px) 33vw"
            className={`${style.image} imageOpacityEffect`}
            onLoadingComplete={(img) => (img.style.opacity = '1')}
          />
        </Link>
        <Link
          href={`/gallery/${firstImage1_0.prettyId}`}
          className={`${style.sixth__image} ${style.images}`}
        >
          <Image
            src={firstImage1_0.url}
            alt={`Painting ${firstImage1_0.prettyId} by artist ${firstImage1_0.authorPrettyId}`}
            fill
            priority
            sizes="(max-width: 1600px) 33vw"
            className={`${style.image} imageOpacityEffect`}
            onLoadingComplete={(img) => (img.style.opacity = '1')}
          />
        </Link>
        <Link
          href={`/gallery/${secondImage1_0.prettyId}`}
          className={`${style.seventh__image} ${style.images}`}
        >
          <Image
            src={secondImage1_0.url}
            alt={`Painting ${secondImage1_0.prettyId} by artist ${secondImage1_0.authorPrettyId}`}
            fill
            priority
            sizes="(max-width: 1600px) 33vw"
            className={`${style.image} imageOpacityEffect`}
            onLoadingComplete={(img) => (img.style.opacity = '1')}
          />
        </Link>
        <Link
          href={`/gallery/${secondImage1_25.prettyId}`}
          className={`${style.eighth__image} ${style.images}`}
        >
          <Image
            src={secondImage1_25.url}
            alt={`Painting ${secondImage1_25.prettyId} by artist ${secondImage1_25.authorPrettyId}`}
            fill
            priority
            sizes="(max-width: 1600px) 33vw"
            className={`${style.image} imageOpacityEffect`}
            onLoadingComplete={(img) => (img.style.opacity = '1')}
          />
        </Link>
        <Link
          href={`/gallery/${thirdImage1_25.prettyId}`}
          className={`${style.ninth__image} ${style.images}`}
        >
          <Image
            src={thirdImage1_25.url}
            alt={`Painting ${thirdImage1_25.prettyId} by artist ${thirdImage1_25.authorPrettyId}`}
            fill
            priority
            sizes="(max-width: 1600px) 33vw"
            className={`${style.image} imageOpacityEffect`}
            onLoadingComplete={(img) => (img.style.opacity = '1')}
          />
        </Link>
        <Link
          href={`/gallery/${firstImage1_5.prettyId}`}
          className={`${style.tenth__image} ${style.images}`}
        >
          <Image
            src={firstImage1_5.url}
            alt={`Painting ${firstImage1_5.prettyId} by artist ${firstImage1_5.authorPrettyId}`}
            fill
            priority
            sizes="(max-width: 1600px) 33vw"
            className={`${style.image} imageOpacityEffect`}
            onLoadingComplete={(img) => (img.style.opacity = '1')}
          />
        </Link>
        <Link
          href={`/gallery/${secondImage1_5.prettyId}`}
          className={`${style.eleventh__image} ${style.images}`}
        >
          <Image
            src={secondImage1_5.url}
            alt={`Painting ${secondImage1_5.prettyId} by artist ${secondImage1_5.authorPrettyId}`}
            fill
            priority
            sizes="(max-width: 1600px) 33vw"
            className={`${style.image} imageOpacityEffect`}
            onLoadingComplete={(img) => (img.style.opacity = '1')}
          />
        </Link>
        <Link
          href={`/gallery/${firstImage1_75.prettyId}`}
          className={`${style.twelfth__image} ${style.images}`}
        >
          <Image
            src={firstImage1_75.url}
            alt={`Painting ${firstImage1_75.prettyId} by artist ${firstImage1_75.authorPrettyId}`}
            fill
            priority
            sizes="(max-width: 1600px) 33vw"
            className={`${style.image} imageOpacityEffect`}
            onLoadingComplete={(img) => (img.style.opacity = '1')}
          />
        </Link>
        <Link href={'/gallery'} className={style.additionalButton}>
          More artworks
        </Link>
        <Link href={'/gallery'} className={style.button}>
          Explore
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
