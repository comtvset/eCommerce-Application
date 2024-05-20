import styles from 'src/components/modalWindow/modalWindow.module.scss';
import { IResponse } from 'src/components/tempFolderForDevelop/redirect.ts';
import PropTypes from 'prop-types';

interface ModalWindowProps {
  data: IResponse;
}

const ModalWindow: React.FC<ModalWindowProps> = ({ data }) => {
  const { status, token } = data;
  return (
    <div className={styles.parent}>
      <div className={styles.children}>
        <span>{status}</span>
        <span>{token}</span>
      </div>
    </div>
  );
};

ModalWindow.propTypes = {
  data: PropTypes.shape({
    status: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }).isRequired,
};

export { ModalWindow };
