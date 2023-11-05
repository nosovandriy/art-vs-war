import { useAuthenticator } from '@aws-amplify/ui-react';
import { useDisclosure } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { AddIcon } from '@/app/icons/icon-add';
import ModalComponent from '@/app/profile/[slug]/modal/modal';
import { setArtProcessImages } from '@/app/redux/slices/artistPaintingsSlice';
import { useAppDispatch, useAppSelector } from '@/types/ReduxHooks';
import { deleteArtProcessItem } from '@/utils/api';
import createHeaders from '@/utils/getAccessToken';
import ArtProcessGallery from './art-process-gallery/art-process-gallery';

import style from './artProcess.module.scss';

const ArtProcess = () => {
  const artProcessImages = useAppSelector((state) => state.artistPaintings.artProcessImages);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedImageId, setSelectedImageId] = useState('');

  const { user } = useAuthenticator((context) => [context.user]);
  const headers = createHeaders(user);
  const pathname = usePathname();
  const isProfile = pathname === '/profile';
  const dispatch = useAppDispatch();

  const filteredImageFromGallery = artProcessImages.filter(
    (image) => image.id !== Number(selectedImageId),
  );

  const handleDeletePainting = () => {
    onClose();

    toast.promise(
      deleteArtProcessItem(selectedImageId, headers)
        .then((response) => {
          if (response.ok && response.status === 202)
            dispatch(setArtProcessImages(filteredImageFromGallery));
        })
        .catch((error) => {
          console.log('error', error);
        }),
      {
        loading: 'Deleting...',
        success: <b>Image deleted!</b>,
        error: <b>Could not delete.</b>,
      },
      {
        style: {
          borderRadius: '10px',
          background: '#1c1d1d',
          color: '#b3b4b5',
        },
      },
    );
  };

  return (
    <div className={style.container}>
      <ModalComponent
        content="Are you sure you want to delete this image?"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onAction={handleDeletePainting}
      />
      {artProcessImages.length > 0 ? (
        <ArtProcessGallery
          artProcessImages={artProcessImages}
          onOpen={onOpen}
          setSelectedImageId={setSelectedImageId}
        />
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
