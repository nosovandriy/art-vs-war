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
  created_at: string;
  moderation_status: string;
  public_id: string;
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
    setList(res.resources);
    console.log(res.resources);
  };

  const handleOpenModal = (public_id: string) => {
    setSelectedImage(public_id);
    onOpen();
  };

  const handleRejectImage = async () => {
    if (selectedImage) {
      onClose();
      console.log();
      const data = await rejectNotValidImage(headers, selectedImage);
      console.log(data);
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
        <div key={image.public_id} className={style.image}>
          <p>Image ID</p>
          <div className={style.id}>{image.public_id}</div>
          <div className={style.id}>{image.created_at}</div>
          <button className={style.button} onClick={() => handleOpenModal(image.public_id)}>
            Reject
          </button>
        </div>
      ))}
    </section>
  );
};

export default ImagesValidation;
