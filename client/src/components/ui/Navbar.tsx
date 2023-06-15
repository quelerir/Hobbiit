import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutThunk } from '../../redux/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import '../../../public/fonts.css';
import { selectSearchThunk } from '../../redux/slices/searchSlice';
import { List } from '@mui/material';
import OneSearchUser from './OneSearchUser';
import OneSearchTread from './OneSearchTread';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export default function Navbar({ darkMode, toggleDarkMode }: Props) {
  const [input, setInput] = useState('');

  const user = useAppSelector((state) => state.user);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logoutHandler = (): void => {
    handleMenuClose();
    dispatch(logoutThunk(navigate));
  };

  const { searchUserResult = [], searchTreadResult = [] } = useAppSelector((state) => state.search);

  const delayedDispatch = useCallback(
    debounce((input: string) => {
      dispatch(selectSearchThunk({ input }));
    }, 400),
    [],
  );

  useEffect(() => {
    delayedDispatch(input);
  }, [input, delayedDispatch]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/user/${user.id}`}>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Link>

      <MenuItem onClick={logoutHandler}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    ></Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        style={{ position: 'fixed', top: 0, zIndex: '2' }}
        sx={{ backgroundColor: '#155445' }}
        position="static"
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: 'none', sm: 'block' },
              fontFamily: 'Alana Pro RUS, sans-serif',
              fontSize: '28px',
            }}
          >
            HobbyIt
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={input}
              onChange={handleInputChange}
              name="input"
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          {((input && searchUserResult.length !== 0) ||
            (input && searchTreadResult.length !== 0)) && (
            <List
              dense
              sx={{
                width: '100%',
                maxWidth: 300,
                bgcolor: '#3E7065',
                position: 'absolute',
                top: '64px',
                left: '145px',
                zIndex: '2',
              }}
            >
              {searchUserResult.length !== 0 && (
                <span
                  style={{
                    justifyContent: 'center',
                    display: 'flex',
                    color: 'white',
                    opacity: '0.7',
                    fontSize: '18px',
                  }}
                >
                  User
                </span>
              )}
              {searchUserResult?.map((user) => (
                <OneSearchUser key={user.id} user={user} />
              ))}
              {searchTreadResult.length !== 0 && (
                <span
                  style={{
                    justifyContent: 'center',
                    display: 'flex',
                    color: 'white',
                    opacity: '0.7',
                    fontSize: '18px',
                  }}
                >
                  Treads
                </span>
              )}
              {searchTreadResult.map((tread) => (
                <OneSearchTread key={tread.id} tread={tread} />
              ))}
            </List>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              onClick={toggleDarkMode}
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              {darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
