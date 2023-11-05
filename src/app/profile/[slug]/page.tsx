"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { useAuthenticator } from "@aws-amplify/ui-react";

import { deletePaintingById, getAuthorPaintingById } from "@/utils/api";
import PaintingGallery from "./paintingGallery/paintingGallery";

import style from "./page.module.scss";
import createHeaders from "@/utils/getAccessToken";
import { UploadedPaintingData } from "@/types/Painting";
import NextUiProvider from "@/app/nextui/nextuiProvider";
import ModalComponent from "./modal/modal";
import { useDisclosure } from "@nextui-org/modal";

const ProfilePaintingCard = ({ params }: { params: { slug: string } }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [painting, setPainting] = useState<UploadedPaintingData | null>(null);
  const headers = createHeaders(user);
  const router = useRouter();

  const getPaintingFromServer = async () => {
    const fetched = await getAuthorPaintingById(headers, params.slug);
    console.log('painting from server', fetched)

    setPainting(fetched);
  }

  const handleDeletePainting = () => {
    onClose();

    toast.promise(
      deletePaintingById(headers, params.slug)
      .finally(() => {
        router.replace('/profile');
      }),
      {
        loading: "Deleting...",
        success: <b>Painting deleted!</b>,
        error: <b>Could not delete.</b>,
      },
      {
        style: {
          borderRadius: "10px",
          background: "#1c1d1d",
          color: "#b3b4b5",
        },
      }
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
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onAction={handleDeletePainting}
      />

      <h1 className={style.paintingTitle}>{painting?.title}</h1>

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
                <Link
                  href={`/artists/${painting?.author.prettyId}`}
                  className={style.link}
                >
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
                {painting && painting?.subjects.map(({ id, value}, index) => (
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
                {painting?.styles.map(({ id, value}, index) => (
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
                {painting?.mediums.map(({ id, value}, index) => (
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
                {painting?.supports.map(({ id, value}, index) => (
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

          <div className={style.buttonContainer}>
            <button
              type="button"
              className={style.buttonDelete}
              onClick={onOpen}
              // onClick={() => painting && handleDeletePainting(painting.prettyId)}
            >
              Delete
            </button>

            <Link
              href={`/profile/${painting?.prettyId}/edit`}
              className={style.buttonEdit}
            >
              Edit
            </Link>
          </div>
        </div>
      </div>

      <hr className={style.line} />

      <div className={style.about}>
        <p className={style.title}>ABOUT</p>
        <p className={style.about__description}>{painting?.description}</p>
      </div>

      {/* <hr className={style.line} />

      <div className={style.more}>
        <p className={style.title}>
          {`MORE FROM `}
          <span>
            <Link href={`/artists/${painting?.author.prettyId}`} className={style.link}>
              {`${painting?.author.fullName}`}
            </Link>
          </span>
        </p>

        <MorePaintings prettyId={paintingsList?.prettyId} />
      </div>

      <hr className={style.line} />

      <Link href={`/artists/${painting?.author.prettyId}`}>
        <button className={style.buttonExplore}>Explore</button>
      </Link>

      <div className={style.shipping}>
        <p className={style.title}>SHIPPING</p>
        <div className={style.shipping__wrapper}>
          <div className={style.shipping__info}>
            <p>Delivery Time:</p>
            <p>
              Typically 5-7 business days for domestic shipments, 10-14 business
              days for international shipments.
            </p>
          </div>
          <div className={style.shipping__info}>
            <p>Delivery Cost:</p>
            <p>
              Shipping is not included and will depend on chosen option of
              delivery.
            </p>
          </div>
          <div className={style.shipping__info}>
            <p>Handling:</p>
            <p>
              Artists are responsible for packaging and adhering to “Art vs War”
              packing guidelines.
            </p>
          </div>
        </div>
      </div>

      <hr className={style.line} />

      <div className={style.question}>
        <p className={`${style.question__title} ${style.title}`}>
          HAVE ADDITIONAL QUESTION?
        </p>
        <p className={style.question__info}>
          Please visit our{" "}
          <Link href="/contacts" className={style.question__help}>
            help section
          </Link>{" "}
          or{" "}
          <Link href="/contacts" className={style.question__help}>
            contact us
          </Link>
        </p>
      </div> */}
    </section>
  );
};

const ProfilePaintingPage = ({ params }: { params: { slug: string } }) => {
  return (
    <NextUiProvider>
      <ProfilePaintingCard params={{ slug: params.slug}} />
    </NextUiProvider>
  )
}

export default ProfilePaintingPage;
