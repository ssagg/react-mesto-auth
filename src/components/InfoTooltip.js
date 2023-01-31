import React from "react";

function InfoTooltip({ name, onClose, isOpen, title }) {
  return (
    <div
      className={`popup popup-${name} ${isOpen && "popup_opened"}`}
      id="popup-edit"
    >
      <div className="popup__container">
        <button
          aria-label="Закрыть"
          className={`popup__button-close popup-${name}__button-close`}
          type="button"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
