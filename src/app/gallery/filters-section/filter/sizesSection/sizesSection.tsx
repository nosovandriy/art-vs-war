"use client";

import { useState } from "react";

import style from "./sizesSection.module.scss";
import { ArrowUpIcon } from "@/app/icons/icon-arrow-up";
import RangeSlider from "../rangeSlider/rangeSlider";

type Props = {
  maxWidth: number;
  minWidth: number;
  maxHeight: number;
  minHeight: number;
  widthRanges: number[];
  heightRanges: number[];
  setWidthRanges: (ranges: number[]) => void;
  setHeightRanges: (ranges: number[]) => void;
};

const SizesSection: React.FC<Props> = ({
  maxWidth,
  minWidth,
  maxHeight,
  minHeight,
  widthRanges,
  heightRanges,
  setWidthRanges,
  setHeightRanges,
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const isSizeChanged =
    widthRanges[0] !== minWidth ||
    widthRanges[1] !== maxWidth ||
    heightRanges[0] !== minHeight ||
    heightRanges[1] !== maxHeight;

  return (
    <div className={style.sizes}>
      <div
        className={style.sizesHeader}
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        <div className={style.sizesHeader__wrapper}>
          <div className={style.title}>SIZE</div>
          {isSizeChanged && <div className={style.point} />}
        </div>
        <div className={`${style.arrow} ${isOpenMenu && style.arrowUp}`}>
          <ArrowUpIcon />
        </div>
      </div>
      {isOpenMenu && (
        <div className={style.dropdown}>
          <RangeSlider
            title={"Horizontal size"}
            valueType={"cm"}
            ranges={widthRanges}
            setRanges={setWidthRanges}
            maxValue={maxWidth}
            minValue={minWidth}
          />
          <RangeSlider
            title={"Vertical size"}
            valueType={"cm"}
            ranges={heightRanges}
            setRanges={setHeightRanges}
            maxValue={maxHeight}
            minValue={minHeight}
          />
        </div>
      )}
    </div>
  );
};

export default SizesSection;
