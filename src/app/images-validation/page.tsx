'use client';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useDisclosure } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { DataImage, ImageValidationCartSteps } from '@/types/cartSteps';
import { getUserRole } from '@/utils/account';
import { changeImagesStatus, getValidationImagesList } from '@/utils/api';
import createHeaders from '@/utils/getAccessToken';
import { ArrowUpIcon } from '../icons/icon-arrow-up';
import ModalComponent from '../profile/[slug]/modal/modal';

import style from './page.module.scss';

interface CloudinaryImage {
  createdAt: {
    createdAt: string;
  };
  moderationStatus: string;
  publicId: string;
  url: string;
  author: {
    prettyId: string;
    fullName: string;
    email: string;
  };
}

const ImagesValidation = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [activeSection, setActiveSection] = useState<ImageValidationCartSteps | null>(
    ImageValidationCartSteps.secondStep,
  );
  const [selectedImage, setSelectedImage] = useState<DataImage | null>(null);
  const [rejectedList, setRejectedList] = useState<CloudinaryImage[]>([]);
  const [pendingList, setPendingList] = useState<CloudinaryImage[]>([]);
  const { user } = useAuthenticator((context) => [context.user]);
  const route = useRouter();

  const hasAdminRole = getUserRole(user, 'ROLE_ADMIN');
  const headers = createHeaders(user);

  const getImagesList = async (status: string) => {
    const res = await getValidationImagesList(headers, status);
    if (status === 'rejected') {
      setRejectedList(res.content);
    }
    if (status === 'pending') {
      setPendingList(res.content);
    }
  };

  const handleOpenModal = (publicId: string, status: string) => {
    const dataImage: DataImage = {
      publicId,
      status,
    };

    setSelectedImage(dataImage);
    onOpen();
  };

  const handleRejectImage = async () => {
    if (selectedImage?.publicId) {
      onClose();

      try {
        await changeImagesStatus(headers, selectedImage);
        await getImagesList('rejected');
        await getImagesList('pending');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    if (user && hasAdminRole) {
      getImagesList('rejected');
      getImagesList('pending');
    } else {
      route.push('/');
    }
  }, []);

  const handleSectionClick = (step: ImageValidationCartSteps | null) => {
    setActiveSection(activeSection === step ? null : step);
  };

  return (
    <section className={style.imagesValidation}>
      <div className={style.orderInfo}>
        <div
          className={style.headerStep}
          onClick={() => handleSectionClick(ImageValidationCartSteps.firstStep)}
        >
          <p>REJECTED LIST</p>
          <div
            className={`${style.arrow} ${
              activeSection !== ImageValidationCartSteps.firstStep && `${style.arrow__close}`
            }`}
          >
            <ArrowUpIcon />
          </div>
        </div>
        {activeSection === ImageValidationCartSteps.firstStep && (
          <>
            {rejectedList.map((image) => (
              <div key={image.publicId} className={style.imageWrapper}>
                <p className={style.rejected}>REJECTED</p>
                <p className={style.title}>Public ID</p>
                <p className={style.id}>{image.publicId}</p>
                <p className={style.title}>Created at</p>
                <div className={style.id}>{image.createdAt.createdAt}</div>
                <p className={style.title}>Author</p>
                <Link
                  className={style.linkAuthor}
                  href={`/artists/${image.author.prettyId}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {image.author.fullName}
                </Link>
                <div className={style.id}>{image.author.email}</div>
                <Link
                  className={`${style.title} ${style.link}`}
                  href={image.url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Image
                    src={image.url}
                    alt="Art vs War art images"
                    width={300}
                    height={300}
                    className={style.image}
                  />
                </Link>

                {image.moderationStatus === 'REJECTED' && (
                  <button
                    className={`${style.button} ${style.button__approve}`}
                    onClick={() => handleOpenModal(image.publicId, 'APPROVED')}
                  >
                    APPROVE
                  </button>
                )}
              </div>
            ))}
          </>
        )}
        <div
          className={style.headerStep}
          onClick={() => handleSectionClick(ImageValidationCartSteps.secondStep)}
        >
          <p className={style.headerStep__text}>PENDING LIST</p>
          <div
            className={`${style.arrow} ${
              activeSection !== ImageValidationCartSteps.secondStep && `${style.arrow__close}`
            }`}
          >
            <ArrowUpIcon />
          </div>
        </div>
        {activeSection === ImageValidationCartSteps.secondStep && (
          <>
            {pendingList.map((image) => (
              <div key={image.publicId} className={style.imageWrapper}>
                <p className={style.pending}>PENDING</p>

                <p className={style.title}>Public ID</p>
                <p className={style.id}>{image.publicId}</p>
                <p className={style.title}>Created at</p>
                <div className={style.id}>{image.createdAt.createdAt}</div>
                <p className={style.title}>Author</p>
                <Link
                  className={style.linkAuthor}
                  href={`/artists/${image.author.prettyId}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {image.author.fullName}
                </Link>
                <div className={style.id}>{image.author.email}</div>
                <Link
                  className={`${style.title} ${style.link}`}
                  href={image.url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Image
                    src={image.url}
                    alt="Art vs War art images"
                    width={300}
                    height={300}
                    className={style.image}
                  />
                </Link>

                {image.moderationStatus === 'PENDING' && (
                  <>
                    <button
                      className={`${style.button} ${style.button__approve}`}
                      onClick={() => handleOpenModal(image.publicId, 'APPROVED')}
                    >
                      APPROVE
                    </button>
                    <button
                      className={`${style.button} ${style.button__reject}`}
                      onClick={() => handleOpenModal(image.publicId, 'REJECTED')}
                    >
                      REJECT
                    </button>
                  </>
                )}
              </div>
            ))}
          </>
        )}
      </div>

      <Link
        className={`${style.title} ${style.link}`}
        href="https://console.cloudinary.com/console/c-1e98a800837a96a82947e8ca3b3fd0/media_library/search?q=&view_mode=grid"
        target="_blank"
        rel="noreferrer noopener"
      >
        Cloudinary Gallery Link
      </Link>
      <ModalComponent
        content="Are you sure?"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onAction={handleRejectImage}
      />
    </section>
  );
};

export default ImagesValidation;
