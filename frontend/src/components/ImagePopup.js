function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_view-photo ${
        props.card ? "popup_opened" : ""
      } `}
    >
      {props.card && (
        <div className="popup__photo-container">
          <button
            onClick={props.onClose}
            className="popup__close-button hover-opacity"
            type="button"
          />
          <figure className="popup__photo">
            <img
              className="popup__photo-pic"
              src={props.card.link}
              alt={props.card.name}
            />
            <figcaption className="popup__photo-caption">
              {props.card.name}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}

export default ImagePopup;
