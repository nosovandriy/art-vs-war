"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  resetGalleryPageCount,
  setPaintings,
} from "@/app/redux/slices/paintingsSlice";
import { useAppDispatch } from "@/types/ReduxHooks";
import { getPaintings } from "@/utils/api";

import { IconClose } from "@/app/icons/icon-close";
import { FilterIcon } from "@/app/icons/icon-filter";
import { PaintingFilterParams } from "@/types/Painting";
import { handleCloseDropdown } from "@/utils/checkClick";
import AvailablePaintings from "./available-paintings/available-paintings";
import RangeSlider from "./rangeSlider/rangeSlider";
import SizesSection from "./sizesSection/sizesSection";
import StylesCheckBox from "./stylesCheckbox/stylesCheckbox";

import style from "./filter.module.scss";
import {
  removeAllSearchParameters,
  updatePrice,
  updateSize,
  updateStatus,
  updateStyles,
} from "@/utils/helpersGalleryFilter";

type Props = {
  filtersData: PaintingFilterParams;
  styleCheckOptions: string[];
  setStyleCheckOptions: (styles: string[]) => void;
};

const Filter: React.FC<Props> = ({
  filtersData,
  styleCheckOptions,
  setStyleCheckOptions,
}) => {
  const {
    maxPrice,
    minPrice,
    maxWidth,
    minWidth,
    maxHeight,
    minHeight,
    styles,
    subjects,
    mediums,
    supports,
  } = filtersData;

  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState("");
  const [priceRanges, setPriceRanges] = useState<number[]>([
    minPrice,
    maxPrice,
  ]);
  const [widthRanges, setWidthRanges] = useState<number[]>([
    minWidth,
    maxWidth,
  ]);
  const [heightRanges, setHeightRanges] = useState<number[]>([
    minHeight,
    maxHeight,
  ]);
  const [subjectCheckOptions, setSubjectCheckOptions] = useState<string[]>([]);
  const [mediumCheckOptions, setMediumCheckOptions] = useState<string[]>([]);
  const [supportCheckOptions, setSupportCheckOptions] = useState<string[]>([]);

  const menuRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const isFilterByPriceOrSize =
    !Array.isArray(priceRanges) ||
    priceRanges.length !== 2 ||
    priceRanges[0] !== minPrice ||
    priceRanges[1] !== maxPrice ||
    !Array.isArray(widthRanges) ||
    widthRanges.length !== 2 ||
    widthRanges[0] !== minWidth ||
    widthRanges[1] !== maxWidth ||
    !Array.isArray(heightRanges) ||
    heightRanges.length !== 2 ||
    heightRanges[0] !== minHeight ||
    heightRanges[1] !== maxHeight;

  const isFilterByStyles =
    styleCheckOptions.length +
    subjectCheckOptions.length +
    mediumCheckOptions.length +
    supportCheckOptions.length;

  const isFiltering =
    isFilterByPriceOrSize || isFilterByStyles || paymentStatus;

  const getFilteringPaintings = async (filtersParams: string) => {
    const paintings = await getPaintings(filtersParams);
    dispatch(setPaintings(paintings));
  };

  const handleFilterPaintings = () => {
    setIsMenuOpen(!isMenuOpen);

    const params = new URLSearchParams(window.location.search);

    dispatch(resetGalleryPageCount());

    updateStatus(params, "paymentStatus", paymentStatus);
    updatePrice(params, priceRanges, minPrice, maxPrice, setPriceRanges);
    updateStyles("styleIn", styleCheckOptions, params);
    updateStyles("subjectIn", subjectCheckOptions, params);
    updateStyles("mediumIn", mediumCheckOptions, params);
    updateStyles("supportIn", supportCheckOptions, params);
    updateSize(params, "widthBetween", widthRanges, minWidth, maxWidth);
    updateSize(params, "heightBetween", heightRanges, minHeight, maxHeight);

    router.replace(`${pathname}?${params.toString()}`);

    getFilteringPaintings(params.toString());
  };

  const handleClearFilters = () => {
    setIsMenuOpen(false);
    dispatch(resetGalleryPageCount());

    const params = new URLSearchParams(window.location.search);
    removeAllSearchParameters(params);
    router.replace(`${pathname}?${params.toString()}`);

    setPaymentStatus("");
    setPriceRanges([minPrice, maxPrice]);
    setStyleCheckOptions([]);
    setSubjectCheckOptions([]);
    setMediumCheckOptions([]);
    setSupportCheckOptions([]);
    setWidthRanges([minWidth, maxWidth]);
    setHeightRanges([minHeight, maxHeight]);

    getFilteringPaintings(params.toString());
  };

  const setValuesFromSearchParams = () => {
    const paymentStatus = searchParams.get("paymentStatus");
    const price = searchParams.get("priceBetween");
    const style = searchParams.get("styleIn");
    const subject = searchParams.get("subjectIn");
    const medium = searchParams.get("mediumIn");
    const support = searchParams.get("supportIn");
    const width = searchParams.get("widthBetween");
    const height = searchParams.get("heightBetween");

    if (paymentStatus) {
      setPaymentStatus(paymentStatus);
    }

    if (price) {
      const priceNumbers = price.split(",").map((item) => Number(item));
      setPriceRanges(priceNumbers);
    }

    if (style) {
      setStyleCheckOptions(style.split(","));
    }

    if (subject) {
      setSubjectCheckOptions(subject.split(","));
    }

    if (medium) {
      setMediumCheckOptions(medium.split(","));
    }

    if (support) {
      setSupportCheckOptions(support.split(","));
    }

    if (width) {
      const widthNumbers = width.split(",").map((item) => Number(item));
      setWidthRanges(widthNumbers);
    }

    if (height) {
      const heightNumbers = height.split(",").map((item) => Number(item));
      setHeightRanges(heightNumbers);
    }
  };

  useEffect(() => {
    setValuesFromSearchParams();
  }, []);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      handleCloseDropdown(event, menuRef, setIsMenuOpen);
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  });

  return (
    <div className={style.wrapper} ref={menuRef}>
      <div className={style.select} onClick={() => setIsMenuOpen(true)}>
        <FilterIcon />
        <div className={style.filterHeader}>
          <p className={style.title}>Filter</p>
          {isFiltering && <div className={style.point} />}
        </div>
      </div>
      {isMenuOpen && (
        <div className={style.menu}>
          <div
            className={style.menu__wrapper}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={style.menu__container}>
              <div className={style.filterIcon}>
                <FilterIcon />
              </div>
              <div className={style.filterHeader}>
                <p className={style.title}>Filter</p>
                {isFiltering && <div className={style.point} />}
              </div>
            </div>
            <div>
              <IconClose />
            </div>
          </div>
          <div className={style.dropdown}>
            <AvailablePaintings
              paymentStatus={paymentStatus}
              setPaymentStatus={setPaymentStatus}
            />
            <RangeSlider
              title={"PRICE"}
              valueType={"€"}
              ranges={priceRanges}
              setRanges={setPriceRanges}
              maxValue={maxPrice}
              minValue={minPrice}
            />
            <StylesCheckBox
              title={"STYLE"}
              types={styles}
              styleOptions={styleCheckOptions}
              setCheckedOptions={setStyleCheckOptions}
            />
            <StylesCheckBox
              title={"SUBJECT"}
              types={subjects}
              styleOptions={subjectCheckOptions}
              setCheckedOptions={setSubjectCheckOptions}
            />
            <StylesCheckBox
              title={"MEDIUM"}
              types={mediums}
              styleOptions={mediumCheckOptions}
              setCheckedOptions={setMediumCheckOptions}
            />
            <StylesCheckBox
              title={"SUPPORT"}
              types={supports}
              styleOptions={supportCheckOptions}
              setCheckedOptions={setSupportCheckOptions}
            />
            <SizesSection
              maxWidth={maxWidth}
              minWidth={minWidth}
              maxHeight={maxHeight}
              minHeight={minHeight}
              widthRanges={widthRanges}
              heightRanges={heightRanges}
              setWidthRanges={setWidthRanges}
              setHeightRanges={setHeightRanges}
            />
          </div>
          <div className={style.buttons}>
            <button
              className={`${style.button} ${style.mainButton}`}
              onClick={handleFilterPaintings}
            >
              Apply filters
            </button>
            <button className={style.button} onClick={handleClearFilters}>
              Discard filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
