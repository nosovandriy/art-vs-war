import Link from "next/link";
import { usePathname } from "next/navigation";

import { AddIcon } from "@/app/icons/icon-add";
import { useAppSelector } from "@/types/ReduxHooks";
import MasonryArtProcess from "./masonry-art-process/masonry-art-process";

import style from "./artProcess.module.scss";

const ArtProcess = () => {
  const artProcessImages = useAppSelector(
    (state) => state.artistPaintings.artProcessImages
  );

  const pathname = usePathname();
  const isProfile = pathname === "/profile";
  return (
    <div className={style.container}>
      {artProcessImages.length > 0 ? (
        <MasonryArtProcess artProcessImages={artProcessImages} />
      ) : (
        <p className={style.contentText}>There are no art process images yet</p>
      )}
      {isProfile && (
        <>
          <p className={style.text}>
            You can add a photo of your creative process
          </p>
          <Link href="/profile/add-art-process-content" className={style.add}>
            <AddIcon isDark={false} />
            Add image
          </Link>
        </>
      )}
    </div>
  );
};

export default ArtProcess;
