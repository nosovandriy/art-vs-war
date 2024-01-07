'use client';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useDisclosure } from '@nextui-org/modal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import NextUiProvider from '@/app/nextui/nextuiProvider';
import { UploadedPaintingData } from '@/types/Painting';
import { deletePaintingById, getAuthorPaintingById } from '@/utils/api';
import createHeaders from '@/utils/getAccessToken';
import ModalComponent from './modal/modal';
import PaintingGallery from './paintingGallery/paintingGallery';

import style from './page.module.scss';
import NavigationBackArrow from '@/app/components/navigation-back-arrow/navigation-back-arrow';

const ProfilePaintingCard = ({ params }: { params: { slug: string } }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [painting, setPainting] = useState<UploadedPaintingData | null>(null);
  const headers = createHeaders(user);
  const router = useRouter();

  const isSoldPainting = painting?.paymentStatus === 'SOLD';

  const getPaintingFromServer = async () => {
    const fetched = await getAuthorPaintingById(headers, params.slug);

    setPainting(fetched);
  };

  const handleDeletePainting = () => {
    onClose();

    toast.promise(
      deletePaintingById(headers, params.slug).finally(() => {
        router.replace('/profile');
      }),
      {
        loading: 'Deleting...',
        success: <b>Painting deleted!</b>,
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

  useEffect(() => {
    try {
      getPaintingFromServer();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <section className={style.card}>
      <ModalComponent
        content="Are you sure you want to delete this artwork?"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onAction={handleDeletePainting}
      />
      <div className={style.titleWrapper}>
        <NavigationBackArrow />
        <h1 className={style.paintingTitle}>{painting?.title}</h1>
      </div>

      <div className={style.gallery}>
        <div className={style.gallery__slider}>
          {painting?.image.views && (
            <PaintingGallery
              paintings={painting.image.views}
              title={painting.title}
              author={painting.author.fullName}
            />
          )}
        </div>

        <div className={style.paintingInfo}>
          <div className={style.description}>
            <div className={style.description__block}>
              <p>Artist:</p>
              <p className={style.info}>
                <Link href={`/artists/${painting?.author.prettyId}`} className={style.link}>
                  {painting?.author.fullName}
                </Link>
              </p>
            </div>
            <div className={style.description__block}>
              <p>Country:</p>
              <p className={style.info}>{painting?.author.country}</p>
            </div>
            <div className={style.description__block}>
              <p>Subject:</p>
              <div>
                {painting &&
                  painting?.subjects.map(({ id, value }, index) => (
                    <span key={id}>
                      {value}
                      {index !== painting?.subjects.length - 1 && `,  `}
                    </span>
                  ))}
              </div>
            </div>
            <div className={style.description__block}>
              <p>Style:</p>
              <div>
                {painting?.styles.map(({ id, value }, index) => (
                  <span key={id}>
                    {value}
                    {index !== painting?.styles.length - 1 && `,  `}
                  </span>
                ))}
              </div>
            </div>
            <div className={style.description__block}>
              <p>Medium:</p>
              <div>
                {painting?.mediums.map(({ id, value }, index) => (
                  <span key={id}>
                    {value}
                    {index !== painting?.mediums.length - 1 && `,  `}
                  </span>
                ))}
              </div>
            </div>
            <div className={style.description__block}>
              <p>Support:</p>
              <div>
                {painting?.supports.map(({ id, value }, index) => (
                  <span key={id}>
                    {value}
                    {index !== painting?.supports.length - 1 && `,  `}
                  </span>
                ))}
              </div>
            </div>
            <div className={style.description__block}>
              <p>Year:</p>
              <p className={style.info}>{painting?.yearOfCreation}</p>
            </div>
            <div className={style.description__block}>
              <p>Size:</p>
              <p
                className={style.info}
              >{`${painting?.width} W x ${painting?.height} H x ${painting?.depth} D cm`}</p>
            </div>
            <div className={style.description__block}>
              <p>Price:</p>
              <p className={style.info}>{`€ ${painting?.price}`}</p>
            </div>
          </div>

          {!isSoldPainting && (
            <div className={style.buttonContainer}>
              <button type="button" className={style.buttonDelete} onClick={onOpen}>
                Delete
              </button>

              <Link href={`/profile/${painting?.prettyId}/edit`} className={style.buttonEdit}>
                Edit
              </Link>
            </div>
          )}
        </div>
      </div>

      <hr className={style.line} />

      <div className={style.about}>
        <p className={style.title}>ABOUT</p>
        <p className={style.about__description}>{painting?.description}</p>
      </div>
    </section>
  );
};

const ProfilePaintingPage = ({ params }: { params: { slug: string } }) => {
  return (
    <NextUiProvider>
      <ProfilePaintingCard params={{ slug: params.slug }} />
    </NextUiProvider>
  );
};

export default ProfilePaintingPage;
