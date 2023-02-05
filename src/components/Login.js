import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Auth from "./Auth.js";

function Login({ handleLogin, loadUserEmail }) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });

  const navigate = useNavigate();
  function handelEmail(res) {
    loadUserEmail(res);
  }

  function onSubmit(password, email) {
    Auth.signin(password, email)
      .then((data) => {
        if (data.token) {
          reset();

          Auth.userValidation(data.token)
            .then((res) => {
              console.log(res);
              handleLogin();
              handelEmail(res);
              navigate("/cards");
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="login">
      {/* <div className="popup__container"> */}
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
            required: "Заполните поле",
            minLength: { value: 2, message: "Минимум 2 символа максимум 40" },
            maxLength: {
              value: 40,
              message: "Минимум 2 символа максимум 40",
            },
          })}
        />
        <span
          className="login__error
        login__error_visible"
          id="profile-name-error"
        >
          {errors?.name && <p>{errors?.name.message || "Ощибка"}</p>}
        </span>
        <input
          type="password"
          className="login__input login__input_type_about"
          placeholder="Пароль"
          id="profile-about"
          {...register("password", {
            required: "Заполните поле",
            minLength: { value: 2, message: "Минимум 2 символа максимум 8" },
            maxLength: {
              value: 8,
              message: "Минимум 2 символа максимум 48",
            },
          })}
        />
        <span
          className="login__error
        login__error_visible"
          id="profile-name-error"
        >
          {errors?.about && <p>{errors?.about.message || "Ошибка"}</p>}
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
      {/* </div> */}
    </div>
  );
}

export default Login;
