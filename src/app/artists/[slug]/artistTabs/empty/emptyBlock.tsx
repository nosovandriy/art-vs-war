import React, { FC } from "react";
import style from "./emptyBlock.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AddIcon } from "@/app/icons/icon-add";

type Props = {
  title: string;
  isArtsTab?: boolean;
};

const EmptyBlock: FC<Props> = ({ title, isArtsTab }) => {
  const pathname = usePathname();
  const isProfile = pathname === "/profile";

  return (
    <div className={style.titleContainer}>
      <div className={style.title}>
        {title}
      </div>

      {(isArtsTab && isProfile) && (
        <>
          <p className={style.subtitle}>You can create your first Artwork</p>
          <Link href="/profile/create-painting" className={style.button}>
            <AddIcon className={style.button__icon} />
            <span>Add arts</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default EmptyBlock
