import { useAuthenticator } from "@aws-amplify/ui-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from 'react-icons/fa';

import { AddIcon } from "@/app/icons/icon-add";
import { ResponseImage, UploadedPaintingData } from "@/types/Painting";
import { deleteAdditionalImages, getAdditionalImages, saveAdditionalPhotos } from "@/utils/api";
import createHeaders from "@/utils/getAccessToken";
import { uploadAdditionalImages } from "@/utils/profile";

import style from "./additional-info.module.scss";

type Props = {
  uploaded: UploadedPaintingData;
}

const AdditionalInfo: FC<Props> = ({ uploaded }) => {
  const [imagePreviews, setImagePreviews] = useState<(any)[]>([null, null, null]);
  const [images, setImages] = useState<File[]>([]);

  const { user } = useAuthenticator((context) => [context.user]);
  const router = useRouter();
  const pathname = usePathname();
  const headers = createHeaders(user);

  const {
    id,
    image,
    title,
    price,
    width,
    height,
    depth,
    weight,
    styles,
    mediums,
    supports,
    subjects,
    prettyId,
    collection,
    description,
    yearOfCreation,
  } = uploaded;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imagesToUpload = images.filter(image => image.name !== file?.name);

    setImages([...imagesToUpload, file]);

    const reader = new FileReader();

    reader.onload = () => {
      const newImagePreviews = [...imagePreviews];
      newImagePreviews[index] = reader.result as string;
      setImagePreviews(newImagePreviews);
    };

    reader.readAsDataURL(file);
  };

  const resetFileInputs = () => {
    setImagePreviews([null, null, null]);

    if (pathname.includes('profile')) {
      router.replace(`/profile/${prettyId}`);
    } else {
      router.replace(`/gallery/${prettyId}`);
    }
  };

  const handleSaveImages = async (
    images: File[],
    headers: { Authorization?: string },
    paintingId: number,
  ) => {
    const uploaded = await uploadAdditionalImages(images, headers, paintingId);

    if (!uploaded.length) return;

    toast.promise(
      saveAdditionalPhotos(uploaded, headers, paintingId),
      {
        loading: "Creating...",
        success: <b>Painting created!</b>,
        error: <b>Could not create.</b>,
      },
      {
        style: {
          borderRadius: "10px",
          background: "#1c1d1d",
          color: "#b3b4b5",
        },
      }
    );
  }

  const handleDeleteAdditionalImage = async (id: number) => {
    await toast.promise(
      deleteAdditionalImages(headers, id),
      {
        loading: "Deleting...",
        success: <b>Image deleted!</b>,
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

    setImagePreviews(current => current.map(item => item?.id === id ? null : item))
  };

  const onDeletePreview = (index: number) => {
    const previews = imagePreviews.filter(item => item !== null)

    const updatedImages = images.map((item, idx) => {
      if (previews[idx] === imagePreviews[index]) {
        return null;
      }

      return item;
    }).filter(item => item !== null);

    // @ts-ignore
    setImages(updatedImages)
    setImagePreviews(current => current.map((item, i) => i === index ? null : item));
  };

  const getImagesFromServer = async () => {
    const headers = createHeaders(user);

    try {
      const fetchedImages: ResponseImage[] = await getAdditionalImages(headers, prettyId);

      if (fetchedImages.length) {
        setImagePreviews([fetchedImages[0], fetchedImages[1] || null, fetchedImages[2] || null])
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const onSubmit = async () => {
    if (!images.length) {
      router.replace(`/profile/${prettyId}`);

      return;
    }

    const headers = createHeaders(user);

    await handleSaveImages(images, headers, id);

    if (pathname.includes('profile')) {
      router.replace(`/profile/${prettyId}`);
    } else {
      router.replace(`/gallery/${prettyId}`);
    }
  };

  useEffect(() => {
    getImagesFromServer();
  }, []);

  return (
    <section className={style.additionalInfo}>
      <div className={style.navigationContainer}>
        <div className={style.page}>
          General Information
        </div>

        <div className={`${style.page} ${style.current}`}>Additional information</div>
      </div>

      <h2 className={style.title}>
        {title}
      </h2>

      <div className={style.painting}>
        <div className={style.imageContainer}>
          <Image
            src={image.imageUrl}
            alt="main image of painting"
            className={style.image}
            fill
          />
        </div>

        <div className={style.paramsContainer}>
          <div className={style.params}>
            <div className={style.subject}>Subject:</div>
            <div className={style.value}>
              {subjects.join(', ')}
            </div>
          </div>

          <div className={style.params}>
            <div className={style.subject}>Style:</div>
            <div className={style.value}>
              {styles.join(', ')}
            </div>
          </div>

          <div className={style.params}>
            <div className={style.subject}>Medium:</div>
            <div className={style.value}>
              {mediums.join(', ')}
            </div>
          </div>

          <div className={style.params}>
            <div className={style.subject}>Support:</div>
            <div className={style.value}>
              {supports.join(', ')}
            </div>
          </div>

          <div className={style.params}>
            <div className={style.subject}>Size:</div>
            <div className={style.value}>
              {`${width} W x ${height} H x ${depth} D cm`}
            </div>
          </div>

          <div className={style.params}>
            <div className={style.subject}>Weight:</div>
            <div className={style.value}>{`${weight} grm`}</div>
          </div>

          <div className={style.params}>
            <div className={style.subject}>Year:</div>
            <div className={style.value}>{yearOfCreation}</div>
          </div>

          <div className={style.params}>
            <div className={style.subject}>Price:</div>
            <div className={style.value}>{`€ ${price}`}</div>
          </div>
        </div>
      </div>

      <div className={style.deviderWrapper}>
        <div className={style.devider}/>
      </div>

      <div className={style.aboutContainer}>
        <div className={style.aboutTitle}>About</div>
        <div className={style.aboutDescription}>{description}</div>
      </div>

      <div className={style.deviderWrapper}>
        <div className={style.devider}/>
      </div>

      <div className={style.additional}>
        <div className={style.titles}>
          <div className={style.title}>Additional photos</div>
          <div className={style.subtitle}>You can add additional detailed photos of the painting</div>
        </div>

        <div className={style.photos}>
          <div className={style.wrapper}>
            {imagePreviews.map((item, index) => (
              <label className={style.file} key={index}>
                <input
                  type="file"
                  className={style.file__input}
                  onChange={(e) => handleFileChange(e, index)}
                />
                {item
                  ? (
                    <div className={style.preview}>
                      <Image src={item?.imageUrl || item} alt="Preview" className={style.image} fill />

                      <button
                        type="button"
                        onClick={() => (
                          item?.id
                            ? handleDeleteAdditionalImage(item?.id)
                            : onDeletePreview(index)
                        )}
                      >
                        <FaTimes className={style.closeIcon} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <AddIcon className={style.file__icon} />
                      <span className={style.file__label}>Choose a file</span>
                    </>
                )}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className={style.buttons}>
        <button className={style.submit} onClick={onSubmit}>
          Submit
        </button>

        <button className={style.cancel} onClick={resetFileInputs}>
            Cancel
        </button>
      </div>
    </section>
  );
};

export default AdditionalInfo;
