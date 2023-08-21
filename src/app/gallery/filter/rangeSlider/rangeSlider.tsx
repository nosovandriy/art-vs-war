"use client";

import Slider from "react-slider";

import "./rangeSlider.scss";

type Props = {
  title: string;
  valueType: string;
  ranges: number[];
  setRanges: (ranges: number[]) => void;
  maxValue: number;
  minValue: number;
};

const RangeSlider: React.FC<Props> = ({
  title,
  valueType,
  ranges,
  setRanges,
  maxValue,
  minValue,
}) => {
  return (
    <div className="priceSlider">
      <div className="priceSlider__title">{title}</div>
      <Slider
        className="price-slider-wrapper"
        onChange={setRanges}
        value={ranges}
        max={maxValue}
        min={minValue}
        trackClassName="range-track"
      />
      <div className="priceSlider__price">
        <span>{`${ranges[0]} ${valueType}`}</span>
        <span>—</span>
        <span>{`${ranges[1]} ${valueType}`}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
