import React, { FC, useState } from "react";
import Image from "next/image";

import style from "./additional-info.module.scss";

import { Add } from "@/app/icons/icon-add";
import { UploadedPaintingData } from "@/types/Painting";
import { uploadAdditionalImages } from "@/utils/profile";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { saveAdditionalPhotos } from "@/utils/api";
import createHeaders from "@/utils/getAccessToken";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  uploaded: UploadedPaintingData;
}

const AdditionalInfo: FC<Props> = ({ uploaded }) => {
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([null, null, null]);
  const [images, setImages] = useState<File[]>([]);
  const { user } = useAuthenticator((context) => [context.user]);
  const router = useRouter();

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
    collection,
    description,
    yearOfCreation,
  } = uploaded;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imagesToUpload = images.filter(image => image.name !== file?.name);
    const reader = new FileReader();

    setImages([...imagesToUpload, file]);

    reader.onload = () => {
      const newImagePreviews = [...imagePreviews];
      newImagePreviews[index] = reader.result as string;
      setImagePreviews(newImagePreviews);
    };
  
    reader.readAsDataURL(file);
  };
  
  const resetFileInputs = () => {
    setImagePreviews([null, null, null]);
  };

  const handleSaveImages = async (
    images: File[],
    paintingId: number,
    headers: { Authorization?: string },
  ) => {
    const uploaded = await uploadAdditionalImages(headers, paintingId, images);

    if (!uploaded) return;

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

  const onSubmit = async () => {
    const headers = createHeaders(user);

    await handleSaveImages(images, id, headers);
    router.replace('/profile');
  };

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

      <p className={style.links}>
        To sell your paintings you need to create a
        <span className={style.link}> Stripe account</span> and fill in
        <span className={style.link}> address data.</span>
      </p>

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
              {subjects.join(' ')}
            </div>
          </div>

          <div className={style.params}>
            <div className={style.subject}>Style:</div>
            <div className={style.value}>
              {styles.join(' ')}
            </div>
          </div>

          <div className={style.params}>
            <div className={style.subject}>Medium:</div>
            <div className={style.value}>
              {mediums.join(' ')}
            </div>
          </div>

          <div className={style.params}>
            <div className={style.subject}>Support:</div>
            <div className={style.value}>
              {supports.join(' ')}
            </div>
          </div>

          <div className={style.params}>
            <div className={style.subject}>Size:</div>
            <div className={style.value}>
              {`${width} x ${height} x ${depth} cm`}
            </div>
          </div>

          <div className={style.params}>
            <div className={style.subject}>Weight:</div>
            <div className={style.value}>{`${weight} grm`}</div>
          </div>

          <div className={style.params}>
            <div className={style.subject}>Collection:</div>
            <div className={style.value}>None</div>
          </div>

          <div className={style.params}>
            <div className={style.subject}>Year:</div>
            <div className={style.value}>{yearOfCreation}</div>
          </div>

          <div className={style.params}>
            <div className={style.subject}>Price:</div>
            <div className={style.value}>{`$ ${price}`}</div>
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
            {imagePreviews.map((preview, index) => (
              <label className={style.file} key={index}>
                <input
                  type="file"
                  className={style.file__input}
                  onChange={(e) => handleFileChange(e, index)}
                />
                {preview
                  ? (
                    <div className={style.preview}>
                      <Image src={preview} alt="Preview" className={style.image} fill />
                    </div>
                  ) : (
                    <>
                      <Add className={style.file__icon} />
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