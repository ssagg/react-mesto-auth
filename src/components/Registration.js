import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import * as Auth from "./Auth.js";

function Registration({ handleRegistration }) {
  const [userData, setUserData] = useState();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();
  const [isRegSuccess, setIsRegSuccess] = useState(false);

  function openInfoTooltip(isRegSuccess) {
    handleRegistration(isRegSuccess);
  }

  function onSubmit(password, email) {
    Auth.signup(password, email)
      .then((res) => {
        if (res.data) {
          openInfoTooltip(res);
          navigate("/sign-in");
        } else {
          openInfoTooltip(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
          <p>
            Уже зарегистрированы?
            <Link to="/sign-in" className="login__signup">
              Войти
            </Link>
          </p>
        </div>
      </form>
      {/* </div> */}
    </div>
  );
}

export default Registration;
