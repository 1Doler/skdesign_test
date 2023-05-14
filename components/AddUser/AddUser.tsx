import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import {
  UseFormRegisterReturn,
  FieldError,
  RegisterOptions,
} from "react-hook-form";
import InputMask from "react-input-mask";
import { InputHTMLAttributes } from "react";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addUser } from "../../redux/slice/users";

import styles from "./AddUser.module.scss";

type FormValues = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  streetAddress: string;
  city: string;
  state: string;
  zip: number;
  description: string;
};

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  register: any;
  error?: any;
  rules: any;
};

const getErrorBlock = (error: any) => {
  if (error?.type === "required") {
    return <span className={styles.err}>This field is required</span>;
  } else if (error?.type === "pattern") {
    return <span className={styles.err}>Invalid input format</span>;
  } else {
    return <span className={styles.err}> </span>;
  }
};

const Input = ({ label, register, error, rules, ...rest }: InputProps) => {
  return (
    <label>
      {label}
      {rest.name === "phone" ? (
        <InputMask mask="+7 (999) 999-99-99" {...register(rest.name, rules)}>
          {() => <input {...rest} className={styles.input} id={rest.name} />}
        </InputMask>
      ) : (
        <input
          {...register(rest.name, rules)}
          {...rest}
          className={styles.input}
          id={rest.name}
        />
      )}
      {getErrorBlock(error)}
    </label>
  );
};

export const AddUser = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      streetAddress: "",
      city: "",
      state: "",
      zip: null,
      description: "",
    },
  });

  const watchedFields = watch();

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const {
      id,
      firstName,
      lastName,
      email,
      phone,
      streetAddress,
      city,
      state,
      zip,
      description,
    } = data;
    dispatch(
      addUser({
        id,
        firstName,
        lastName,
        email,
        phone,
        description,
        address: {
          streetAddress,
          city,
          state,
          zip,
        },
      })
    );
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_input}>
      <div className={styles.flex}>
        <div>
          <Input
            label="ID:"
            name="id"
            register={register}
            error={errors.id}
            rules={{ required: true, pattern: /^[0-9]+$/ }}
          />
          <Input
            label="First Name:"
            name="firstName"
            register={register}
            rules={{ required: true, pattern: /^([A-Za-z]+|[А-Яа-я]+)$/i }}
            error={errors.firstName}
          />
          <Input
            label="Last Name:"
            name="lastName"
            register={register}
            rules={{ required: true, pattern: /^([A-Za-z]+|[А-Яа-я]+)$/i }}
            error={errors.lastName}
          />
          <Input
            label="Email:"
            name="email"
            register={register}
            rules={{
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            }}
            error={errors.email}
          />
          <Input
            label="Phone:"
            name="phone"
            register={register}
            rules={{
              required: true,
              pattern: /^\+7 \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/,
            }}
            error={errors.phone}
          />
        </div>
        <div>
          <Input
            label="Адрес проживания:"
            name="streetAddress"
            register={register}
            error={errors.streetAddress}
            rules={{ required: true }}
          />
          <Input
            label="City:"
            name="city"
            register={register}
            rules={{ required: true, pattern: /^([A-Za-z]+|[А-Яа-я]+)$/i }}
            error={errors.city}
          />
          <Input
            label="State:"
            name="state"
            register={register}
            rules={{ required: true, pattern: /^([A-Za-z]+|[А-Яа-я]+)$/i }}
            error={errors.state}
          />
          <Input
            label="Zip:"
            name="zip"
            register={register}
            rules={{
              required: true,
              pattern: /^[0-9]+$/,
            }}
            error={errors.zip}
          />
          <Input
            label="Description:"
            name="description"
            register={register}
            rules={{
              required: true,
            }}
            error={errors.description}
          />
        </div>
      </div>
      <button
        type="submit"
        className={
          Object.values(watchedFields).every((field) => !!field)
            ? styles.btn + " " + styles.btn_active
            : styles.btn
        }
      >
        Submit
      </button>
    </form>
  );
};
