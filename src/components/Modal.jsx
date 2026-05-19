import ReactDOM from "react-dom";

function Modal({
  children,
  onClose,
}) {
  return ReactDOM.createPortal(
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <button
          className="close-btn"
          onClick={onClose}
        >
          ×
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;