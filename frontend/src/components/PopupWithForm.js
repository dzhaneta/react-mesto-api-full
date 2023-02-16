function PopupWithForm(props) {

    return (
        <div 
            className={`
                popup popup_type_${props.name} 
                ${ props.isOpen? 'popup_opened' : ''} 
                ${ props.onClose? '' : 'popup_opened'}
            `}  
        >
            <div className="popup__container">
            <button 
                onClick={props.onClose} 
                className="popup__close-button hover-opacity" 
                type="button"
            />
            <form 
                onSubmit={props.onSubmit}
                className={`form form_type_${props.name}`} 
                name={`${props.name}-form`} 
            >
                <h2 className="form__title">{props.title}</h2>
                {props.children}
                <button className="form__save-button" type="submit">{props.button}</button>
            </form>
            </div>
        </div>
    );
  }
  
  export default PopupWithForm;