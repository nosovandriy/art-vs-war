import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import Select from "react-select";
import { useAuthenticator } from "@aws-amplify/ui-react";
import jwt_decode from 'jwt-decode';
import toast from "react-hot-toast";

import style from "./editProfile.module.scss";

import { AddIcon } from "@/app/icons/icon-add";
import { CountryType, countries } from "./countries";
import { ArrowLeft } from "@/app/icons/icon-arrow-left";
import { Artist } from "@/types/Artist";
import { Action, CustomJwtPayload, ProfileForm, UserData, UserDataToSave } from "@/types/Profile";
import { uploadImageToServer, validateDataOnServer } from "@/utils/profile";
import { createProfile, updateProfile } from "@/utils/api";
import { styles } from "./stylesSelect";
import createHeaders from "@/utils/getAccessToken";
import ArtistInfo from "@/app/artists/[slug]/artistInfo/artistInfo";
import ArtistTabs from "@/app/artists/[slug]/artistTabs/artistTabs";
import { FaTimes } from "react-icons/fa";

const URL = 'authors/checkInputAndGet';

type Props = {
  author: Artist | null;
  setAuthor: Dispatch<SetStateAction<Artist | null>>;
};

const EditProfile: FC<Props> = ({
  author,
  setAuthor,
}) => {
  const {
    handleSubmit,
    setValue,
    register,
    control,
    reset,
    resetField,
    formState: { errors },
  } = useForm<ProfileForm>({
    values: {
      fullName: author?.fullName || '',
      city: author?.city || '',
      country: author?.country || '',
      aboutMe: author?.aboutMe || '',
      image: '',
    },
    mode: "onTouched",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(author?.imageUrl || null);
  const { user, route } = useAuthenticator((context) => [context.route]);
  const idToken = user.getSignInUserSession()?.getIdToken().getJwtToken();
  const refreshToken = user.getSignInUserSession()?.getRefreshToken();
  const decoded = idToken ? (jwt_decode(idToken) as CustomJwtPayload) : '';
  const userEmail = decoded && decoded.email;
  const isAuthenticated = route === 'authenticated';
  const headers = createHeaders(user);
  const router = useRouter();

  const getValue = (value: string) => (
    value ? countries.find(county => county.value === value) : ''
  );

  const refreshAccessToken = () => {
    if (refreshToken) {
      user.refreshSession(refreshToken, (err, session) => {});
    }
  };

  const handleCreateProfile = async (userData: UserDataToSave) => {
    const createdAuthor = await createProfile(userData, headers);

    refreshAccessToken();
    setAuthor(createdAuthor);
  };

  const handleUpdateProfile = async (userData: UserDataToSave) => {
    const updatedAuthor = await updateProfile(userData, headers);

    setAuthor(updatedAuthor);
  };

  const handleEditProfile = async (action: Action, data: UserData) => {
    let authorData: UserDataToSave;

    if (data.image instanceof File) {
      const {
        publicId,
        version,
        signature,
        moderationStatus,
      } = await uploadImageToServer(data, URL, headers, userEmail);

      const profileImage = {
        publicId,
        version,
        signature,
        moderationStatus,
      };

      authorData = {
        ...data,
        email: userEmail,
        image: profileImage,
      };

      action === 'create' ? handleCreateProfile(authorData) : handleUpdateProfile(authorData);
    } else {
      await validateDataOnServer(data, URL, headers, userEmail)
      .then(() => {
        authorData = {
          ...data,
          email: userEmail,
          image: { publicId: author?.imagePublicId || '' },
        };

        action === 'create' ? handleCreateProfile(authorData) : handleUpdateProfile(authorData);
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImagePreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const onReset = () => {
    reset();
    setValue('country', '');
    setImagePreview(null);
    router.back();
  };

  const handleResetPreview = () => {
    resetField('image');
    setImagePreview(null);
  };

  const onSubmit = async (data: ProfileForm) => {
    if (!isAuthenticated || !data) {
      return;
    };

    const dataToUpload: UserData = {
      ...data,
      image: data.image[0],
    };

    author
      ? await toast.promise(
        handleEditProfile('update', dataToUpload),
        {
          loading: 'Updating...',
          success: <b>Profile edited!</b>,
          error: <b>Could not edit.</b>,
        }, {
          style: {
            borderRadius: '10px',
            background: '#1c1d1d',
            color: '#b3b4b5',
          }
        }
      )
      : await toast.promise(
        handleEditProfile('create', dataToUpload),
        {
          loading: 'Creating...',
          success: <b>Profile created!</b>,
          error: <b>Could not create.</b>,
        }, {
          style: {
            borderRadius: '10px',
            background: '#1c1d1d',
            color: '#b3b4b5',
          }
        }
      );

      router.push('/profile')
  };

  useEffect(() => {
    if (!author) return;

    setValue('image', author.imageUrl)
  }, [author]);

  return (
    <section className={style.editProfile}>
      <div className={style.titleContainer}>
        {author && (
          <button
            type="button"
            className={style.arrow}
            onClick={() => router.back()}
          >
            <ArrowLeft />
          </button>
        )}

        <h2 className={style.title}>
          {author
            ? 'Edit your profile'
            : 'Welcome to Art vs War'
          }
        </h2>
      </div>

      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={style.container}>
          <div className={style.fileContainer}>
            <label className={style.file}>
              <input
                type="file"
                className={style.file__input}
                {...register("image", {
                  onChange: handleFileChange,
                  validate: (inputValue) => {
                    if (inputValue) return true;

                    return 'Image is required!';
                  },
                })}
              />
              {imagePreview ? (
                <div className={style.preview}>
                  <Image
                    src={imagePreview}
                    style={{ padding: '20px', objectFit: 'contain' }}
                    alt="Preview"
                    fill
                  />

                  <button
                    type="button"
                    onClick={handleResetPreview}
                  >
                    <FaTimes className={style.closeIcon} />
                  </button>
                </div>
              ) : (
                typeof errors?.image?.message === 'string' ? (
                  <div className={`${style.error} ${style.error__file}`}>
                    {errors.image.message}
                  </div>
                ) : (
                    <>
                      <AddIcon className={style.file__icon}/>
                      <span className={style.file__label}>Choose a file</span>
                    </>
                )
            )}
            </label>
            <div className={style.recomendations}>
              **Please add a photo with a large resolution (!!!!!!!!!!!!!)
              and proportions close to 3:4. we want art connoisseurs to be closer
              to artists and we are sure that people who create masterpieces deserve
              to be shown vividly. Don’t be shy!
            </div>
          </div>
          <div className={style.inputsContainer}>
            <label className={style.label}>
              <div>
                Full Name
                <span className={style.star}>*</span>
              </div>
              <div className={style.input}>
                <input
                  type="text"
                  className={style.text}
                  placeholder="Enter your full name"
                  {...register("fullName", {
                    required: 'This field is required!',
                    maxLength: {
                      value: 40,
                      message: 'Full name must be between 1 and 40 characters',
                    },
                    pattern: {
                      value: /^[A-Za-z ',-]+$/,
                      message: 'Only Latin letters, spaces, hyphens, and apostrophes are allowed',
                    },
                  })}
                />

                {typeof errors?.fullName?.message === 'string' && (
                  <div className={style.error}>{errors.fullName.message}</div>
                )}
              </div>
            </label>
            <label className={style.label}>
              <div>
                City
                <span className={style.star}>*</span>
              </div>
              <div className={style.input}>
                <input
                  type="text"
                  className={style.text}
                  placeholder="Enter a city of your current stay"
                  {...register("city", {
                    required: 'This field is required!',
                    maxLength: {
                      value: 40,
                      message: 'City must be between 1 and 40 characters',
                    },
                    pattern: {
                      value: /^[A-Za-z ',-]+$/,
                      message: 'Only Latin letters, spaces, hyphens, and apostrophes are allowed',
                    },
                    validate: {
                      startsWithCapital: (value) =>
                        /^[A-Z]/.test(value) || 'City should start with a capital letter',
                    },
                  })}
                />

                {typeof errors?.city?.message === 'string' && (
                  <div className={style.error}>{errors.city.message}</div>
                )}
              </div>
            </label>
            <label className={style.label}>
              <div>
                Country
                <span className={style.star}>*</span>
              </div>
              <div className={style.input}>
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: 'This field is required!' }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      options={countries}
                      value={getValue(value)}
                      onChange={newValue => onChange((newValue as CountryType).value)}
                      isSearchable={false}
                      className={style.select}
                      placeholder="A country of your current stay"
                      styles={styles}
                    />
                  )}
                />

                {typeof errors?.country?.message === 'string' && (
                  <div className={style.error}>{errors.country.message}</div>
                )}
              </div>
            </label>
            <label className={style.label}>
              <div>
                About Me
                <span className={style.star}>*</span>
              </div>
              <div className={style.input}>
                <textarea
                  className={style.about}
                  placeholder="Tell us about yourself. Don't be shy!"
                  {...register("aboutMe", {
                    required: 'This field is required!',
                    minLength: {
                      value: 3,
                      message: 'Must be between 3 and 1000 characters',
                    },
                    maxLength: {
                      value: 1000,
                      message: 'Must be between 3 and 1000 characters',
                    },
                  })}
                />

                {typeof errors?.aboutMe?.message === 'string' && (
                  <div className={style.error__about}>{errors.aboutMe.message}</div>
                )}
              </div>
            </label>
            <div className={style.buttonContainerLaptop}>
              <button
                type="reset"
                className={style.cancel}
                onClick={onReset}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={style.submit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className={style.buttonContainer}>
          <button
            type="reset"
            className={style.cancel}
            onClick={onReset}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={style.submit}
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditProfile;
