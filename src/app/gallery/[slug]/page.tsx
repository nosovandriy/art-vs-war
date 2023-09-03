import Link from "next/link";

import { CartItem } from "@/types/CartItem";
import { getPainting } from "@/utils/api";
import MorePaintings from "./morePainting/morePaintings";
import AddToCartButton from "./paintingGallery/button/button";
import PaintingGallery from "./paintingGallery/paintingGallery";

import style from "./page.module.scss";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const paintingsList = await getPainting(params.slug);
    if (!paintingsList) {
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist",
      };
    }
    return {
      title: `${paintingsList.title} by ${paintingsList.author.fullName}`,
      description: paintingsList.description,
      alternates: {
        canonical: `/gallery/${paintingsList.prettyId}`,
      },
      openGraph: {
        title: `${paintingsList.title} by ${paintingsList.author.fullName}`,
        description: paintingsList.description,
        url: `https://artvswar.gallery/gallery/${paintingsList.prettyId}`,
        siteName: "Art vs War GALLERY",
        images: [
          {
            url: `${paintingsList.image.imageUrl}`,
          },
        ],
        type: "website",
      },
    };
  } catch (error) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist",
    };
  }
}

const PaintingCard = async ({ params }: { params: { slug: string } }) => {
  const paintingsList = await getPainting(params.slug);

  const {
    id,
    image,
    title,
    prettyId,
    price,
    paymentStatus,
    height,
    width,
    depth,
    yearOfCreation,
    description,
    author,
    subjects,
    styles,
    mediums,
    supports,
  } = paintingsList;

  const orderData: CartItem = {
    id: id,
    prettyId: prettyId,
    title: title,
    price: price,
    author: author.fullName,
    authorId: author.prettyId,
    country: author.country,
    image: image.imageUrl,
    width: width,
    height: height,
    depth: depth,
  };

  const isSoldPainting = paymentStatus === "SOLD";

  return (
    <section className={style.card}>
      <h1 className={style.paintingTitle}>{title}</h1>

      <div className={style.gallery}>
        <div className={style.gallery__slider}>
          <PaintingGallery
            paintings={image.views}
            title={title}
            author={author.fullName}
          />
        </div>

        <div className={style.paintingInfo}>
          <div className={style.description}>
            <div className={style.description__block}>
              <p>Artist:</p>
              <p className={style.info}>
                <Link
                  href={`/artists/${author.prettyId}`}
                  className={style.link}
                >
                  {author.fullName}
                </Link>
              </p>
            </div>
            <div className={style.description__block}>
              <p>Subject:</p>
              <div>
                {subjects.map((subject: string, index: number) => (
                  <span key={index}>
                    {subject}
                    {index !== subjects.length - 1 && `,  `}
                  </span>
                ))}
              </div>
            </div>
            <div className={style.description__block}>
              <p>Style:</p>
              <div>
                {styles.map((style: string, index: number) => (
                  <span key={index}>
                    {style}
                    {index !== styles.length - 1 && `,  `}
                  </span>
                ))}
              </div>
            </div>
            <div className={style.description__block}>
              <p>Medium:</p>
              <div>
                {mediums.map((medium: string, index: number) => (
                  <span key={index}>
                    {medium}
                    {index !== mediums.length - 1 && `,  `}
                  </span>
                ))}
              </div>
            </div>
            <div className={style.description__block}>
              <p>Support:</p>
              <div>
                {supports.map((support: string, index: number) => (
                  <span key={index}>
                    {support}
                    {index !== supports.length - 1 && `,  `}
                  </span>
                ))}
              </div>
            </div>
            <div className={style.description__block}>
              <p>Year:</p>
              <p className={style.info}>{yearOfCreation}</p>
            </div>
            <div className={style.description__block}>
              <p>Size:</p>
              <p
                className={style.info}
              >{`${width} W x ${height} H x ${depth} D cm`}</p>
            </div>
            <div className={style.description__block}>
              <p>Price:</p>
              <p className={style.info}>{`€ ${price}`}</p>
            </div>
          </div>
          <div>
            {isSoldPainting ? (
              <button className={style.soldButton}>SOLD OUT</button>
            ) : (
              <AddToCartButton orderData={orderData} />
            )}
          </div>
        </div>
      </div>

      <hr className={style.line} />

      <div className={style.about}>
        <p className={style.title}>ABOUT</p>
        <p className={style.about__description}>{description}</p>
      </div>

      <hr className={style.line} />

      <div className={style.more}>
        <p className={style.title}>
          {`MORE FROM `}
          <span>
            <Link href={`/artists/${author.prettyId}`} className={style.link}>
              {`${author.fullName}`}
            </Link>
          </span>
        </p>

        <MorePaintings prettyId={prettyId} />
      </div>

      <hr className={style.line} />

      <Link href={`/artists/${author.prettyId}`}>
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
            <p>Shipping is included.</p>
          </div>
          <div className={style.shipping__info}>
            <p>Handling:</p>
            <p>
              Ships rolled in a tube. Artists are responsible for packaging and
              adhering to “Art vs War” packing guidelines.
            </p>
          </div>
          <div className={style.shipping__info}>
            <p>Ships From:</p>
            <p>Ukraine</p>
          </div>
          <div className={style.shipping__info}>
            <p>Customs:</p>
            <p>
              Shipments from Ukraine may experience delays due to country&apos;s
              regulations for exporting valuable artworks.
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
      </div>
    </section>
  );
};

export default PaintingCard;
