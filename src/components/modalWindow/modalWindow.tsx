import styles from 'src/components/modalWindow/modalWindow.module.scss';
import { IResponse } from 'src/components/tempFolderForDevelop/responseHandler.ts';
import PropTypes from 'prop-types';
import { ErrorType, WarningType } from 'src/utils/error/RequestErrors.ts';

interface ModalWindowProps {
  data: IResponse;
}

const ModalWindow: React.FC<ModalWindowProps> = ({ data }) => {
  const { status, message } = data;
  return (
    <div className={styles.parent}>
      {ErrorType.includes(status) && (
        <div className={`${styles.children}  ${styles.error}`}>
          <span>{status}</span>
          <span>{message}</span>
        </div>
      )}
      {WarningType.includes(status) && (
        <div className={`${styles.children}  ${styles.warning}`}>
          <span>{status}</span>
          <span>{message}</span>
        </div>
      )}
      {!WarningType.includes(status) && !ErrorType.includes(status) && (
        <div className={`${styles.children}  ${styles.positive}`}>
          <span>{status}</span>
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

ModalWindow.propTypes = {
  data: PropTypes.shape({
    status: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export { ModalWindow };
