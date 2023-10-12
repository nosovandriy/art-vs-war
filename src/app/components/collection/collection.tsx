import React, { FC } from "react";
import style from "./collection.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  title: string;
  isArtsTab?: boolean;
};

const Collection: FC<Props> = ({ title, isArtsTab }) => {
  const pathname = usePathname();
  const isProfile = pathname === "/profile";

  console.log(isProfile)
    return (
        <div className={style.titleContainer}>
            <div className={style.title}>
                {title}
            </div>

            {(isArtsTab && isProfile) && (
              <Link href="/profile/createPainting" className={style.button}>Add arts</Link>
            )}
        </div>
    );
};

export default Collection;
