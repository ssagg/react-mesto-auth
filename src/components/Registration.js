import React from "react";
import { useNavigate, Link, redirect } from "react-router-dom";

import { useForm } from "react-hook-form";
import * as Auth from "./Auth.js";

function Registration() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();

  function onSubmit(password, email) {
    Auth.signup(password, email)
      .then(
        (res) => {
          navigate("/sign-in");
        }
        //   setRegSuccess(true)
        // openInfoTooltip()
      )
      .catch(
        (err) => console.log(err)
        //   setRegSuccess()
        // openInfoTooltip()
      );
  }

  return (
    <div className="login">
      {/* <div className="popup__container"> */}
      <h2 className="login__title">Регистрация</h2>
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
            minLength: { value: 2, message: "Минимум 2 символа максимум 40" },
            maxLength: {
              value: 200,
              message: "Минимум 2 символа максимум 40",
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
          Зарегистрироваться
        </button>
        <div className="login__signup">
          <p>Ещё не зарегистрированы?</p>
          <Link to="/sign-in" className="signup__link">
            Войти
          </Link>
        </div>
      </form>
      {/* </div> */}
    </div>
  );
}

export default Registration;
