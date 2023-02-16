import successIconPath from "../images/success-icon.svg";
import errorIconPath from "../images/error-icon.svg";

function InfoTooltip({ isOpen, onClose, isSuccess, statusMessages }) {
  return (
    <div
      className={`
                popup
                ${isOpen ? "popup_opened" : ""} 
                ${onClose ? "" : "popup_opened"}
            `}
    >
      <div className="popup__container popup__container_infotooltip">
        <button
          onClick={onClose}
          className="popup__close-button hover-opacity"
          type="button"
        />
        <img
          className="popup__image"
          alt="иконка"
          src={isSuccess ? successIconPath : errorIconPath}
        />
        <h2 className="popup__title">
          {isSuccess
            ? statusMessages.succes
            : statusMessages.fail}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
