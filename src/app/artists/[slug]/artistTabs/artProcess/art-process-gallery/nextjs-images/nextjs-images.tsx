import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { TrashIcon } from '@/app/icons/icon-trash';
import type { RenderPhotoProps } from 'react-photo-album';

import style from './nextjs-images.module.scss';

export default function NextJsImage({
  photo,
  imageProps: { alt, title, sizes, className, onClick },
  wrapperStyle,
}: RenderPhotoProps) {
  const pathname = usePathname();
  const isProfile = pathname === '/profile';

  return (
    <div style={{ ...wrapperStyle, position: 'relative' }} {...{ onClick }}>
      <Image
        fill
        src={photo}
        placeholder={'blurDataURL' in photo ? 'blur' : undefined}
        {...{ alt, title, sizes, className }}
      />
      {isProfile && (
        <div className={style.trashIcon} data-custom-attribute="trash-icon">
          <TrashIcon />
        </div>
      )}
    </div>
  );
}
