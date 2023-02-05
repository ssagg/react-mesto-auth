import React from "react";
import failed from "../images/failed.svg";
import success from "../images/success.svg";

function InfoTooltip({ name, onClose, isOpen, title, isRegSuccess }) {
  console.log(isRegSuccess);
  return (
    <div className={`popup  ${isOpen && "popup_opened"}`} id="popup-edit">
      <div className="popup__container">
        <button
          aria-label="Закрыть"
          className={`popup__button-close popup-${name}__button-close`}
          type="button"
          onClick={onClose}
        />
        {isRegSuccess ? (
          <div className="popup__elements">
            <img className="popup__logo" src={success} alt="удача" />
            <h2 className="popup__subtitle">Вы успешно зарегистрировались!</h2>
          </div>
        ) : (
          <div className="popup__elements">
            <img className="popup__logo" src={failed} alt="неудача" />
            <h2 className="popup__subtitle">
              Что-то пошло не так! Попробуйте ещё раз.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoTooltip;
