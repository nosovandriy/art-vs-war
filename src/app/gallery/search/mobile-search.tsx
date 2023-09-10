"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { IconSearch } from "@/app/icons/icon-search";
import InputGallerySearch from "../inputGallerySearch/inputGallerySearch";
import { TitleAnimation } from "@/utils/animation";

import style from "./mobile-search.module.scss";

const MobileSearch = ({ totalPaintings }: { totalPaintings: number }) => {
  const [searchPanel, setSearchPanel] = useState(false);
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.titleWrapper}>
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={TitleAnimation("x")}
            className={style.title}
          >
            Gallery
          </motion.h1>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={TitleAnimation("y", 0.5)}
            className={style.title__info}
          >
            &nbsp;{`${totalPaintings}`}
          </motion.p>
        </div>

        <div
          className={style.iconSearch}
          onClick={() => setSearchPanel(!searchPanel)}
        >
          <IconSearch />
        </div>
      </div>
      <div className={style.mobileInputSearch}>
        <InputGallerySearch
          searchPanel={searchPanel}
          setSearchPanel={setSearchPanel}
        />
      </div>
    </>
  );
};

export default MobileSearch;
