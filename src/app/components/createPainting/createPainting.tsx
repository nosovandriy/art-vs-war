import { Dispatch, FC, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

import style from "./createPainting.module.scss";
import { stylesSelect } from "./stylesSelect";

import { Add } from "@/app/icons/icon-add";
import { SubjectType, mediums, styles, subjects, supports } from "./subjects";
import { uploadImageToServer } from "@/utils/profile";
import createHeaders from "@/utils/getAccessToken";
import {
  PaintingData,
  PaintingDataToSave,
  PaintingForm,
  UploadedPaintingData,
} from "@/types/Painting";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const URL = "paintings/checkInputAndGet";

type Props = {
  setNextStep: Dispatch<SetStateAction<boolean>>;
  setUploaded: Dispatch<SetStateAction<UploadedPaintingData | null>>;
};

const CreatePainting: FC<Props> = ({
  setNextStep,
  setUploaded,
}) => {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<PaintingForm>({
    defaultValues: {
      styleIds: [],
      mediumIds: [],
      supportIds: [],
      subjectIds: [],
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<SubjectType[]>([]);
  const [selectedMediums, setSelectedMediums] = useState<SubjectType[]>([]);
  const [selectedSupports, setSelectedSupports] = useState<SubjectType[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectType[]>([]);

  const { user, route } = useAuthenticator((context) => [context.route]);
  const isAuthenticated = route === "authenticated";
  const headers = createHeaders(user);
  const router = useRouter();

  const checkOptions = (options: SubjectType[]) => {
    if (options.length === 3) {
      return true;
    }

    return false;
  };

  const onReset = () => {
    reset();
    setImagePreview(null);
    setSelectedStyles([]);
    setSelectedMediums([]);
    setSelectedSubjects([]);
    setSelectedSupports([]);
  };

  const handleCreatePainting = async (data: PaintingData) => {
    if (data.image instanceof File) {
      await uploadImageToServer(data, URL, headers).then((imageData) => {
        const paintingData: PaintingDataToSave = {
          ...data,
          image: imageData,
        };
        toast.promise(
          axios.post(BASE_URL + "paintings", paintingData, { headers })
          .then(({ data }) => {
            setUploaded(data);
            setNextStep(true);
          })
          .finally(() => {
            onReset();
          }),
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
      })
    }
  };

  const onSubmit = (data: PaintingForm | any) => {
    if (!data || !isAuthenticated) {
      return;
    }

    const dataToUpload: PaintingData = {
      ...data,
      image: data.image[0],
      weight: +data.weight,
      width: +data.width,
      height: +data.height,
      depth: +data.depth,
      price: +data.price,
      yearOfCreation: +data.yearOfCreation,
    };

    handleCreatePainting(dataToUpload);
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

  return (
    <section className={style.createPainting}>
      <div className={style.navigationContainer}>
        <div className={`${style.page} ${style.current}`}>
          General Information
        </div>

        <div className={style.page}>Additional information</div>
      </div>

      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className={style.topContainer}>
          <label className={style.file}>
            <input
              type="file"
              className={style.file__input}
              {...register("image", {
                required: "Image is required!",
                onChange: handleFileChange,
              })}
            />
            {imagePreview ? (
              <div className={style.preview}>
                <Image
                  src={imagePreview}
                  alt="Preview"
                  className={style.image}
                  fill
                />
              </div>
            ) : typeof errors?.image?.message === "string" ? (
              <div className={`${style.error} ${style.error__file}`}>
                {errors.image.message}
              </div>
            ) : (
              <>
                <Add className={style.file__icon} />
                <span className={style.file__label}>Choose a file</span>
              </>
            )}
          </label>
          <div className={style.desktopContainer}>
            <label className={style.label}>
              <div>
                Title
                <span className={style.star}>*</span>
              </div>
              <div className={style.input}>
                <input
                  type="text"
                  className={style.text}
                  placeholder="Painting title"
                  {...register("title", {
                    required: "This field is required!",
                  })}
                />

                {typeof errors?.title?.message === "string" && (
                  <div className={style.error}>{errors.title.message}</div>
                )}
              </div>
            </label>

            <div className={style.container}>
              <div className={style.container__left}>
                <label className={style.label}>
                  <div>
                    Year
                    <span className={style.star}>*</span>
                  </div>
                  <div className={style.input}>
                    <input
                      type="number"
                      className={style.text}
                      placeholder="Year of creation"
                      onWheel={(e) => e.currentTarget.blur()}
                      {...register("yearOfCreation", {
                        required: "This field is required!",
                      })}
                    />

                    {typeof errors?.yearOfCreation?.message === "string" && (
                      <p className={style.error}>
                        {errors.yearOfCreation.message}
                      </p>
                    )}
                  </div>
                </label>

                <label className={style.label}>
                  <div>
                    Weight
                    <span className={style.star}>*</span>
                  </div>
                  <div className={style.input}>
                    <input
                      type="number"
                      className={style.text}
                      placeholder="Weight grm"
                      onWheel={(e) => e.currentTarget.blur()}
                      {...register("weight", {
                        required: "This field is required!",
                      })}
                    />

                    {typeof errors?.weight?.message === "string" && (
                      <p className={style.error}>{errors.weight.message}</p>
                    )}
                  </div>
                </label>

                <label className={style.label}>
                  <div>
                    Width
                    <span className={style.star}>*</span>
                  </div>
                  <div className={style.input}>
                    <input
                      type="number"
                      className={style.text}
                      placeholder="Width cm"
                      onWheel={(e) => e.currentTarget.blur()}
                      {...register("width", {
                        required: "This field is required!",
                      })}
                    />

                    {typeof errors?.width?.message === "string" && (
                      <p className={style.error}>{errors.width.message}</p>
                    )}
                  </div>
                </label>

                <label className={style.label}>
                  <div>
                    Height
                    <span className={style.star}>*</span>
                  </div>
                  <div className={style.input}>
                    <input
                      type="number"
                      className={style.text}
                      placeholder="Height cm"
                      onWheel={(e) => e.currentTarget.blur()}
                      {...register("height", {
                        required: "This field is required!",
                      })}
                    />

                    {typeof errors?.height?.message === "string" && (
                      <p className={style.error}>{errors.height.message}</p>
                    )}
                  </div>
                </label>

                <label className={style.label}>
                  <div>
                    Depth
                    <span className={style.star}>*</span>
                  </div>
                  <div className={style.input}>
                    <input
                      type="number"
                      className={style.text}
                      placeholder="Depth cm"
                      step="0.1"
                      onWheel={(e) => e.currentTarget.blur()}
                      {...register("depth", {
                        required: "This field is required!",
                        max: {
                          value: 9.9,
                          message: "Max value allowed 9.9",
                        },
                      })}
                    />

                    {typeof errors?.depth?.message === "string" && (
                      <p className={style.error}>{errors.depth.message}</p>
                    )}
                  </div>
                </label>
              </div>

              <div className={style.container__right}>
                <label className={style.label}>
                  <div>
                    Styles
                    <span className={style.star}>*</span>
                  </div>
                  <div className={style.input}>
                    <Controller
                      name="styleIds"
                      control={control}
                      rules={{ required: "This field is required!" }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          options={styles}
                          isMulti
                          isOptionDisabled={() => checkOptions(selectedStyles)}
                          value={styles.filter((option) =>
                            value.includes(option.value)
                          )}
                          onChange={(newValues) => {
                            setSelectedStyles(newValues as SubjectType[]);

                            return onChange(
                              newValues.map((newValue) => newValue.value)
                            );
                          }}
                          closeMenuOnSelect={false}
                          className={style.select}
                          placeholder="Choose styles"
                          styles={stylesSelect}
                        />
                      )}
                    />

                    {typeof errors?.styleIds?.message === "string" && (
                      <p className={style.error}>{errors.styleIds.message}</p>
                    )}
                  </div>
                </label>
                <label className={style.label}>
                  <div>
                    Mediums
                    <span className={style.star}>*</span>
                  </div>
                  <div className={style.input}>
                    <Controller
                      name="mediumIds"
                      control={control}
                      rules={{ required: "This field is required!" }}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          options={mediums}
                          isOptionDisabled={() => checkOptions(selectedMediums)}
                          value={mediums.filter((option) =>
                            value.includes(option.value)
                          )}
                          onChange={(newValues) => {
                            setSelectedMediums(newValues as SubjectType[]);
                            return onChange(
                              newValues.map((newValue) => newValue.value)
                            );
                          }}
                          isMulti
                          closeMenuOnSelect={false}
                          className={style.select}
                          placeholder="Choose mediums"
                          styles={stylesSelect}
                        />
                      )}
                    />

                    {typeof errors?.mediumIds?.message === "string" && (
                      <p className={style.error}>{errors.mediumIds.message}</p>
                    )}
                  </div>
                </label>
                <label className={style.label}>
                  <div>
                    Supports
                    <span className={style.star}>*</span>
                  </div>
                  <div className={style.input}>
                    <Controller
                      name="supportIds"
                      control={control}
                      rules={{ required: "This field is required!" }}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          options={supports}
                          isOptionDisabled={() =>
                            checkOptions(selectedSupports)
                          }
                          value={supports.filter((option) =>
                            value.includes(option.value)
                          )}
                          onChange={(newValues) => {
                            setSelectedSupports(newValues as SubjectType[]);
                            return onChange(
                              newValues.map((newValue) => newValue.value)
                            );
                          }}
                          isMulti
                          closeMenuOnSelect={false}
                          className={style.select}
                          placeholder="Choose supports"
                          styles={stylesSelect}
                        />
                      )}
                    />

                    {typeof errors?.supportIds?.message === "string" && (
                      <p className={style.error}>{errors.supportIds.message}</p>
                    )}
                  </div>
                </label>
                <label className={style.label}>
                  <div>
                    Subjects
                    <span className={style.star}>*</span>
                  </div>
                  <div className={style.input}>
                    <Controller
                      name="subjectIds"
                      control={control}
                      rules={{ required: "This field is required!" }}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          options={subjects}
                          isOptionDisabled={() =>
                            checkOptions(selectedSubjects)
                          }
                          value={subjects.filter((option) =>
                            value.includes(option.value)
                          )}
                          onChange={(newValues) => {
                            setSelectedSubjects(newValues as SubjectType[]);
                            return onChange(
                              newValues.map((newValue) => newValue.value)
                            );
                          }}
                          isMulti
                          closeMenuOnSelect={false}
                          className={style.select}
                          placeholder="Choose subjects"
                          styles={stylesSelect}
                        />
                      )}
                    />

                    {typeof errors?.subjectIds?.message === "string" && (
                      <p className={style.error}>{errors.subjectIds.message}</p>
                    )}
                  </div>
                </label>
                <label className={style.label}>
                  <div>
                    Price
                    <span className={style.star}>*</span>
                  </div>
                  <div className={style.input}>
                    <input
                      type="number"
                      className={style.text}
                      placeholder="Price €"
                      onWheel={(e) => e.currentTarget.blur()}
                      {...register("price", {
                        required: "This field is required!",
                      })}
                    />

                    {typeof errors?.price?.message === "string" && (
                      <p className={style.error}>{errors.price.message}</p>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className={style.devider} />

        <label className={style.about}>
          <div className={style.about__label}>
            About
            <span className={style.star}>*</span>
            {typeof errors?.description?.message === "string" && (
              <p className={style.error}>{errors.description.message}</p>
            )}
          </div>

          <textarea
            className={style.about__input}
            placeholder="Write some description about the painting"
            {...register("description", {
              required: "This field is required!",
            })}
          />
        </label>

        <div className={style.buttonContainer}>
          <button
            type="reset"
            className={style.cancel}
            onClick={() => router.push('/profile')}
          >
            Cancel
          </button>
          <button type="submit" className={style.forward}>
            Forward
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePainting;
