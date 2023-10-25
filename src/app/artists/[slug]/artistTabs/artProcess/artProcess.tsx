import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AddIcon } from '@/app/icons/icon-add';
import { useAppSelector } from '@/types/ReduxHooks';

import style from './artProcess.module.scss';
import ArtProcessGallery from './art-process-gallery/art-process-gallery';

const ArtProcess = () => {
  const artProcessImages = useAppSelector((state) => state.artistPaintings.artProcessImages);

  const pathname = usePathname();
  const isProfile = pathname === '/profile';
  return (
    <div className={style.container}>
      {artProcessImages.length > 0 ? (
        <ArtProcessGallery artProcessImages={artProcessImages} />
      ) : (
        <p className={style.contentText}>There are no art process images yet</p>
      )}
      {isProfile && (
        <>
          <p className={style.text}>You can add a photo of your creative process</p>
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
