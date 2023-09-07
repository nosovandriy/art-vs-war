import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import style from './accout.module.scss';

import { ArrowLeft } from '../icons/icon-arrow-left';

const Account = () => {
  const router = useRouter();
  const {
    handleSubmit,
    setValue,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = () => {};

  return (
    <section>
      <div className={style.titleContainer}>
        <button
          type="button"
          className={style.arrow}
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </button>

        <h2 className={style.title}>
          Account
        </h2>
      </div>

      <div>
        Already have an account?
        <span>Log in</span>
      </div>

      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
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
              {...register("fullName", { required: 'This field is required!' })}
            />

            {typeof errors?.fullName?.message === 'string' && (
              <div className={style.error}>{errors.fullName.message}</div>
            )}
          </div>
        </label>

        <label className={style.label}>
          <div>
            Last Name
            <span className={style.star}>*</span>
          </div>
          <div className={style.input}>
            <input
              type="text"
              className={style.text}
              placeholder="Enter your last name"
              {...register("lastName", { required: 'This field is required!' })}
            />

            {typeof errors?.lastName?.message === 'string' && (
              <div className={style.error}>{errors.lastName.message}</div>
            )}
          </div>
        </label>

        <label className={style.label}>
          <div>
            Phone number
            <span className={style.star}>*</span>
          </div>
          <div className={style.input}>
            <input
              type="number"
              className={style.text}
              placeholder="+XX XXX XXX XX XX"
              {...register("phoneNumber", { required: 'This field is required!' })}
            />

            {typeof errors?.phoneNumber?.message === 'string' && (
              <div className={style.error}>{errors.phoneNumber.message}</div>
            )}
          </div>
        </label>

        <div>
          <button>Submit</button>
          <button>Cancel</button>
        </div>
      </form>

      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className={style.label}>
          <div>
            Adress
            <span className={style.star}>*</span>
          </div>
          <div className={style.input}>
            <input
              type="text"
              className={style.text}
              placeholder="Enter your adress"
              {...register("adress", { required: 'This field is required!' })}
            />

            {typeof errors?.adress?.message === 'string' && (
              <div className={style.error}>{errors.adress.message}</div>
            )}
          </div>
        </label>

        <label className={style.label}>
          <div>
            Country
            <span className={style.star}>*</span>
          </div>
          <div className={style.input}>
            <input
              type="text"
              className={style.text}
              placeholder="Choose country"
              {...register("country", { required: 'This field is required!' })}
            />

            {typeof errors?.country?.message === 'string' && (
              <div className={style.error}>{errors.country.message}</div>
            )}
          </div>
        </label>

        <label className={style.label}>
          <div>
            State / Region
            <span className={style.star}>*</span>
          </div>
          <div className={style.input}>
            <input
              type="text"
              className={style.text}
              placeholder="Enter state/region name"
              {...register("state", { required: 'This field is required!' })}
            />

            {typeof errors?.state?.message === 'string' && (
              <div className={style.error}>{errors.state.message}</div>
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
              placeholder="Enter the city name"
              {...register("city", { required: 'This field is required!' })}
            />

            {typeof errors?.city?.message === 'string' && (
              <div className={style.error}>{errors.city.message}</div>
            )}
          </div>
        </label>

        <label className={style.label}>
          <div>
            Postcode
            <span className={style.star}>*</span>
          </div>
          <div className={style.input}>
            <input
              type="number"
              className={style.text}
              placeholder="Enter your postcode"
              {...register("postcode", { required: 'This field is required!' })}
            />

            {typeof errors?.postcode?.message === 'string' && (
              <div className={style.error}>{errors.postcode.message}</div>
            )}
          </div>
        </label>

        <div>
          <button>Submit</button>
          <button>Cancel</button>
        </div>
      </form>
    </section>
  );
};

export default Account;
