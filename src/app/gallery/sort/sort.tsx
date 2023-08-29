"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ArrowUpIcon } from "@/app/icons/icon-arrow-up";
import { SortIcon } from "@/app/icons/icon-sort";
import {
  resetGalleryPageCount,
  setPaintings,
} from "@/app/redux/slices/paintingsSlice";
import { useAppDispatch } from "@/types/ReduxHooks";
import { SortPaintings } from "@/types/SortPaintings";
import { getPaintings } from "@/utils/api";
import { handleCloseDropdown } from "@/utils/checkClick";

import style from "./sort.module.scss";

const Sort = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const fieldsOptions = [
    {
      title: "New to old",
      value: SortPaintings.newToOld,
    },
    {
      title: "Old to new",
      value: SortPaintings.oldToNew,
    },
    {
      title: "Price: high to low",
      value: SortPaintings.priceHighToLow,
    },
    {
      title: "Price: low to high",
      value: SortPaintings.priceLowToHigh,
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState(SortPaintings.newToOld as string);
  const menuRef = useRef<HTMLInputElement>(null);

  const getSortingPaintings = async (sortParams: string) => {
    const paintings = await getPaintings(sortParams);
    dispatch(setPaintings(paintings));
  };

  const handleSortPaintings = (sortValue: SortPaintings) => {
    dispatch(resetGalleryPageCount());
    setSortBy(sortValue);
    const params = new URLSearchParams(window.location.search);
    params.set("sort", sortValue);
    router.replace(`${pathname}?${params.toString()}`);

    getSortingPaintings(params.toString());
  };

  useEffect(() => {
    const search = searchParams.get("sort");
    if (search) {
      setSortBy(search);
    }
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
    <div
      className={style.wrapper}
      ref={menuRef}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      <div className={style.select}>
        <SortIcon />
        <p className={style.title}>Sort</p>
      </div>
      {isMenuOpen && (
        <div className={style.menu}>
          <div className={style.menu__wrapper}>
            <div className={style.menu__container}>
              <SortIcon />
              <p className={style.menu__title}>Sort</p>
            </div>
            <div>
              <ArrowUpIcon />
            </div>
          </div>
          <div className={style.dropdown}>
            {fieldsOptions.map((field, index) => (
              <div
                className={style.dropdown__options}
                key={index}
                onClick={() => handleSortPaintings(field.value)}
              >
                <span>{field.title}</span>
                <option value={field.value} />
                <div
                  className={`${
                    sortBy === field.value && style.radioButtonActive
                  } ${style.radioButton} `}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sort;
