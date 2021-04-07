import { makeStyles } from '@material-ui/core/styles';
import Image from '../../../images/backgroundImage.png';
import { colors } from '../../../theme/colors';

const useStyles = makeStyles(() => ({
  backgroundImage: {
    height: '29rem',
    width: '30rem',
    backgroundImage: `url(${Image})`,
  },
  ceoImage: {
    height: '80%',
    width: '65%',
  },

  editIcon: {
    color: colors.secondary,
    cursor: 'pointer',
  },

  rightBox: {
    float: 'right',
  },
}));
export { useStyles };
