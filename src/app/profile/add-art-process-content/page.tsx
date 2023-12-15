'use client';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import ButtonLoader from '@/app/components/button-loader/button-loader';
import { AddIcon } from '@/app/icons/icon-add';
import { ArrowLeft } from '@/app/icons/icon-arrow-left';
import { ArtProcessData } from '@/types/Painting';
import { createArtProcess, getSignature, uploadImage, validateData } from '@/utils/api';
import createHeaders from '@/utils/getAccessToken';
import { validation } from './form';

import style from './page.module.scss';

const AddArtProcessContent = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, route } = useAuthenticator((context) => [context.route]);
  const isAuthenticated = route === 'authenticated';
  const headers = createHeaders(user);
  const URL = 'artProcess/getFolder';

  const upload_preset = process.env.NEXT_APP_CLOUDINARY_UPLOAD_PRESET!;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const cloudinaryApiKey = process.env.NEXT_APP_CLOUDINARY_API_KEY!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(validation),
  });

  const handleCreatePainting = async (data: ArtProcessData) => {
    if (!data.image) {
      return;
    }

    setIsLoading(true);

    const { folder } = await validateData(URL, data, headers);

    const cloudinaryParams = {
      upload_preset,
      folder,
    };

    const cloudinaryResponse = await getSignature(cloudinaryParams, headers);

    const formData = new FormData();
    formData.append('file', data.image);
    formData.append('folder', folder);
    formData.append('signature', cloudinaryResponse.signature);
    formData.append('timestamp', cloudinaryResponse.timestamp);
    formData.append('upload_preset', upload_preset);
    formData.append('api_key', cloudinaryApiKey);

    const { public_id, version, signature, width, height, moderation, secure_url } =
      await uploadImage(formData, cloudName);

    const moderationStatus = moderation[0].status === 'approved' ? 'APPROVED' : 'PENDING';

    const artProcessData = {
      description: data.description,
      image: {
        publicId: public_id,
        moderationStatus,
        version,
        signature,
        width,
        height,
        secureUrl: secure_url,
      },
    };

    // const { public_id, version, signature, width, height } = await uploadImage(formData, cloudName);

    // const artProcessData = {
    //   description: data.description,
    //   image: {
    //     publicId: public_id,
    //     moderationStatus: 'APPROVED',
    //     version,
    //     signature,
    //     width,
    //     height,
    //   },
    // };

    toast.promise(
      createArtProcess(artProcessData, headers)
        .then(() => {
          router.push('/profile?tab=Art+Process');
        })
        .catch((error) => {
          console.error('Error creating the painting:', error);
          throw error;
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        loading: 'Creating...',
        success: <b>The image has been uploaded!</b>,
        error: <b>Could not upload image.</b>,
      },
      {
        style: {
          borderRadius: '10px',
          background: '#262728',
          padding: '10px',
          color: '#eff0f1',
          border: '1px solid #b3b4b5',
        },
      },
    );
  };

  const onSubmit = (data: any) => {
    if (!data || !isAuthenticated) {
      return;
    }

    const dataToUpload: ArtProcessData = {
      ...data,
      image: data.image[0],
    };

    handleCreatePainting(dataToUpload);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImagePreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  return (
    <section className={style.section}>
      <div className={style.titleWrapper}>
        <div onClick={() => router.back()} className={style.titleWrapper__arrow}>
          <ArrowLeft />
        </div>
        <h1 className={style.title}>Art Process</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <div className={style.formImageWrapper}>
          <label
            className={`${style.uploadSection} ${
              errors?.image?.message && style.uploadSection__error
            }`}
            draggable={true}
          >
            <input
              type="file"
              className={style.uploadSection__input}
              accept="image/*"
              {...register('image', {
                onChange: handleFileChange,
              })}
            />
            {imagePreview ? (
              <div className={style.preview}>
                <Image
                  src={imagePreview}
                  alt="Art process previous view"
                  className={style.image}
                  fill
                />
              </div>
            ) : (
              <>
                <AddIcon className={style.uploadSection__icon} isDark={false} />
                <p className={style.uploadSection__text}>Choose a file</p>
                {errors?.image?.message && (
                  <div className={style.error}>{errors.image?.message}</div>
                )}
              </>
            )}
          </label>
        </div>

        <div className={style.formAction}>
          <label className={style.label}>
            <p className={style.label__text}>Description</p>
            <div className={style.input}>
              <textarea
                className={`${style.inputText} ${style.inputTextArea} ${
                  errors?.description?.message && style.inputText__error
                }`}
                placeholder="Add image description"
                {...register('description')}
              />
              {errors?.description?.message && (
                <div className={style.error}>{errors.description?.message}</div>
              )}
            </div>
          </label>
          <div className={style.buttons}>
            <button type="submit" className={`${style.button} ${style.button__save}`}>
              {isLoading ? (
                <div className={style.buttonLoader}>
                  <span> Saving...</span>
                  <ButtonLoader darkLoader={true} />
                </div>
              ) : (
                <span>Save</span>
              )}
            </button>
            <button
              type="reset"
              className={`${style.button} ${style.button__cancel}`}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddArtProcessContent;
