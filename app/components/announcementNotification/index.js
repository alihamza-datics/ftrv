import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import CancelIcon from '@material-ui/icons/Cancel';
import useStyles from './style';
import { H6, BodyText } from '../typography';
import { useAuthContext } from '../../context/authContext';
import { colors } from '../../theme/colors';

export function AnnouncementNotification({ item }) {
  let notificationBackgroundColor;
  if (item.priority === 'high') {
    notificationBackgroundColor = colors.red;
  } else if (item.priority === 'medium') {
    notificationBackgroundColor = colors.orange;
  } else if (item.priority === 'low') {
    notificationBackgroundColor = colors.green;
  }
  const classes = useStyles();
  const { user, setUser } = useAuthContext();
  const closedAnnouncement = (user && user.announcement) || [];

  const onClose = (itemAnnouncement) => {
    closedAnnouncement.push(itemAnnouncement);
    setUser({ ...user, announcement: closedAnnouncement });
  };

  return (
    <>
      <Box
        width={1}
        height={1}
        p={2}
        justifyContent="center"
        display="flex"
        className={classes.mainBox}
      >
        <Box width="0.22" alignSelf="center">
          <Box
            width="0.76"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor={notificationBackgroundColor}
            className={classes.iconBox}
          >
            <NotificationsActiveIcon className={classes.icon} />
          </Box>
        </Box>

        <Box
          width="0.67"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box mb={2}>
            <H6 color="dark">{item.title}</H6>
          </Box>
          <Box className={classes.textBox}>
            <BodyText color="dark">{item.description}</BodyText>
          </Box>
        </Box>
        <Box width="0.02" mb={2}>
          <CancelIcon onClick={() => onClose(item)} />
        </Box>
      </Box>
    </>
  );
}

export default memo(AnnouncementNotification);
