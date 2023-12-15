'use client';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@nextui-org/react';

import createHeaders from '@/utils/getAccessToken';
import { getUserRole } from '@/utils/account';
import { getRejectedImagesList, rejectNotValidImage } from '@/utils/api';
import ModalComponent from '../profile/[slug]/modal/modal';

import style from './page.module.scss';

interface CloudinaryImage {
  createdAt: string;
  moderationStatus: string;
  publicId: string;
}

const ImagesValidation = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [list, setList] = useState<CloudinaryImage[]>([]);
  const { user } = useAuthenticator((context) => [context.user]);
  const route = useRouter();

  const hasAdminRole = getUserRole(user, 'ROLE_ADMIN');
  const headers = createHeaders(user);

  const getImagesList = async () => {
    const res = await getRejectedImagesList(headers);
    setList(res);
  };

  const handleOpenModal = (publicId: string) => {
    setSelectedImage(publicId);
    onOpen();
  };

  const handleRejectImage = async () => {
    if (selectedImage) {
      onClose();
      try {
        const data = await rejectNotValidImage(headers, selectedImage);

        await getImagesList();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    if (!hasAdminRole) {
      route.push('/');
    }

    getImagesList();
  }, []);

  return (
    <section className={style.imagesValidation}>
      <ModalComponent
        content="Are you sure you want to reject this image?"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onAction={handleRejectImage}
      />
      {list.map((image) => (
        <div key={image.publicId} className={style.image}>
          <p>Image ID</p>
          <div className={style.id}>{image.publicId}</div>
          <div className={style.id}>{image.createdAt}</div>
          {image.moderationStatus === 'REJECTED' ? (
            <p className={style.rejected}>Rejected manually</p>
          ) : (
            <button className={style.button} onClick={() => handleOpenModal(image.publicId)}>
              Reject
            </button>
          )}
        </div>
      ))}
    </section>
  );
};

export default ImagesValidation;
