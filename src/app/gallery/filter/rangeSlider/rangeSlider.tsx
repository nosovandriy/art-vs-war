import React, { useEffect, useState } from "react";
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
  const [editMode, setEditMode] = useState(false);
  const [errorInputs, setErrorInputs] = useState([false, false]);

  const toggleEditMode = () => {
    setEditMode(true);
  };

  const handleInputChange = (index: number, value: string) => {
    if (!isNaN(Number(value))) {
      const updatedRanges = [...ranges];
      updatedRanges[index] = Number(value);
      setRanges(updatedRanges);
    }
  };

  useEffect(() => {
    const [firstRange, secondRange] = ranges;
    const errors = [
      firstRange > secondRange || firstRange < minValue || firstRange === 0,
      secondRange < firstRange || secondRange > maxValue || secondRange === 0,
    ];
    setErrorInputs(errors);
  }, [ranges, minValue, maxValue]);

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
      <div className="priceSlider__price" onClick={toggleEditMode}>
        {editMode ? (
          <>
            <input
              type="text"
              value={ranges[0]}
              onChange={(e) => handleInputChange(0, e.target.value)}
              className={`priceRangeSliderInput ${errorInputs[0] &&
                "priceRangeSliderInput__error"}`}
            />
            <div>&nbsp;&nbsp;—&nbsp;&nbsp;</div>
            <input
              type="text"
              value={ranges[1]}
              onChange={(e) => handleInputChange(1, e.target.value)}
              className={`priceRangeSliderInput ${errorInputs[1] &&
                "priceRangeSliderInput__error"}`}
            />
          </>
        ) : (
          <>
            <span>{`${ranges[0]} ${valueType}`}</span>
            <span>—</span>
            <span>{`${ranges[1]} ${valueType}`}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default RangeSlider;
