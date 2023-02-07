import React from "react";
import { useForm } from "react-hook-form";

function Login({ handleLogin }) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });

  function onSubmit(password, email) {
    handleLogin(password, email);
    reset();
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form
        className={`login__form`}
        name={`login`}
        id={`login`}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="email"
          className="login__input login__input_type_name"
          placeholder="Email"
          id="login-name"
          {...register("email", {
            required: "Введите email",
            minLength: { value: 2, message: "Минимум 2 символа максимум 40" },
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Введите корректный email",
            },
            maxLength: {
              value: 40,
              message: "Минимум 2 символа максимум 40",
            },
          })}
        />
        <span
          className="login__error
        login__error_visible"
          id="login-name-error"
        >
          {errors?.email && <p>{errors?.email.message || "Ошибка"}</p>}
        </span>
        <input
          type="password"
          className="login__input login__input_type_about"
          placeholder="Пароль"
          id="password-about"
          {...register("password", {
            required: "Введите пароль",
            minLength: { value: 2, message: "Минимум 2 символа максимум 8" },
            maxLength: {
              value: 8,
              message: "Минимум 2 символа максимум 8",
            },
          })}
        />
        <span
          className="login__error
        login__error_visible"
          id="password-name-error"
        >
          {errors?.password && <p>{errors?.password.message || "Ошибка"}</p>}
        </span>
        <button
          disabled={!isValid}
          className={`login__button ${!isValid && "login__button_disabled"}`}
          type="submit"
          id={`button-login`}
        >
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
