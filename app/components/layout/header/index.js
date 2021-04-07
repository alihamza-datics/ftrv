import {
  AppBar,
  Avatar,
  Box,
  Hidden,
  Menu,
  MenuItem,
  Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useState } from 'react';
import styled from 'styled-components';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { PowerSettingsNew, AccountCircle } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import { H5, H6 } from 'components';
import { useAuthContext } from '../../../context/authContext';
import Logo from '../../../images/logo.png';

const StyledMenuItem = styled(MenuItem)`
  &&& {
    padding: 5px 20px;
  }
`;
const StyledListItemIcon = styled(ListItemIcon)`
  &&& {
    min-width: 24px;
    margin-right: 18px;
    font-size: 24px;
  }
`;
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'white',
    height: theme.defaultHeights.header,
    color: theme.palette.primary.main,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: { display: 'flex', justifyContent: 'space-between' },
  title: {
    flexGrow: 1,
  },
  logoStyle: {
    width: 150,
  },
  profileBox: {
    display: 'flex',
  },
  titleBox: { display: 'flex', marginInline: '1em', alignItems: 'flex-end' },
  welcomeTextBox: { marginTop: '0.2rem' },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, setUser } = useAuthContext();
  const userAvatar =
    user.data && user.data.avatar
      ? process.env.API_ASSETS_URL + user.data.avatar
      : 'http://www.gravatar.com/avatar/?d=mp';
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    history.push('/profile');
  };
  const handleLogout = () => {
    setUser({
      announcement: [],
      data: {},
      isAuthenticated: false,
      token: null,
    });
  };
  return (
    <>
      <AppBar position="absolute" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Link to="/home">
            <img src={Logo} alt="intranet logo" className={classes.logoStyle} />
          </Link>
          {user.isAuthenticated && (
            <Box className={classes.profileBox}>
              <Hidden xsDown>
                <Box className={classes.titleBox}>
                  <Box className={classes.welcomeTextBox} mr={2}>
                    <H6 regular color="primary">
                      Welcome Back,
                    </H6>
                  </Box>
                  <H5 medium color="primary">
                    {user.data.name}!
                  </H5>
                </Box>
              </Hidden>
              <>
                <Button onClick={handleClick}>
                  <Avatar alt="avatar" src={userAvatar} />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  elevation={0}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                >
                  <StyledMenuItem onClick={handleClose}>
                    <StyledListItemIcon>
                      <AccountCircle />
                    </StyledListItemIcon>
                    Profile
                  </StyledMenuItem>
                  <StyledMenuItem onClick={handleLogout}>
                    <StyledListItemIcon>
                      <PowerSettingsNew />
                    </StyledListItemIcon>
                    Logout
                  </StyledMenuItem>
                </Menu>
              </>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
