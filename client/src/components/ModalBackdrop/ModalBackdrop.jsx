import PropTypes from 'prop-types';
import './ModalBackdrop.css';

const ModalBackdrop = ({ onClick, children }) => {
  return (
    <div className="modal-backdrop" onClick={onClick}>
      {children}
    </div>
  );
};

ModalBackdrop.propTypes = {
  onClick: PropTypes.func.isRequired, // клик по фону
  children: PropTypes.node.isRequired, // дочірні елементи (контент модального вікна)
};

export default ModalBackdrop;