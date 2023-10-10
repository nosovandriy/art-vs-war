import React, { FC } from "react";
import style from "./collection.module.scss";
import Link from "next/link";

type Props = {
  title: string;
  isArtsTab?: boolean;
};

const Collection: FC<Props> = ({ title, isArtsTab }) => {
    return (
        <div className={style.titleContainer}>
            <div className={style.title}>
                {title}
            </div>

            {isArtsTab && (
              <Link href="/profile/createPainting" className={style.button}>Add arts</Link>
            )}
        </div>
    );
};

export default Collection;
