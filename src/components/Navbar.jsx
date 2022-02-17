import React, { useState } from "react";
import { Avatar, Divider, Stack, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import { NavLink } from "react-router-dom";

import "../style.css";

const Navbar = () => {
  const [isToggled, setIsToggled] = useState(false);
  const isLaptop = useMediaQuery("(min-width:769px)");
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  const closeMenu = () => {
    setIsToggled(false);
  };
  return (
    <>
      {isLaptop ? (
        <div className="nav-container">
          <div className="navbar-container">
            <div className="navbar-logo">
              <NavLink to="/">
                <Stack direction="row" sx={{ px: 2 }} alignItems="center">
                  <Avatar
                    sx={{ mr: 1 }}
                    src="https://i.ibb.co/Z11pcGG/cryptocurrency.png"
                  />
                  <Typography variant="h5" sx={{}}>
                    Cryptoverse
                  </Typography>
                </Stack>
              </NavLink>
            </div>
            <Divider sx={{ backgroundColor: "whitesmoke", opacity: "0.1" }} />
          </div>
          <div>
            <MenuList>
              <NavLink to="/">
                <MenuItem sx={{ mb: 1 }}>
                  <ListItemIcon>
                    <HomeOutlinedIcon
                      fontSize="small"
                      sx={{ color: "lightgray" }}
                    />
                  </ListItemIcon>
                  <ListItemText>Home</ListItemText>
                </MenuItem>
              </NavLink>
              <NavLink to="/cryptocurrencies">
                <MenuItem sx={{ mb: 1 }}>
                  <ListItemIcon>
                    <PaymentsOutlinedIcon
                      fontSize="small"
                      sx={{ color: "lightgray" }}
                    />
                  </ListItemIcon>
                  <ListItemText>Cryptocurrencies</ListItemText>
                </MenuItem>
              </NavLink>
              <NavLink to="/news">
                <MenuItem sx={{ mb: 1 }}>
                  <ListItemIcon>
                    <NewspaperOutlinedIcon
                      fontSize="small"
                      sx={{ color: "lightgray" }}
                    />
                  </ListItemIcon>
                  <ListItemText>News</ListItemText>
                </MenuItem>
              </NavLink>
            </MenuList>
          </div>
        </div>
      ) : (
        <>
          <div className="mobile-navbar-container">
            <div className="mobile-navbar-logo">
              <NavLink to="/">
                <div className="navicon-container">
                  <Avatar
                    sx={{ mr: 1, width: "40px", height: "40px" }}
                    src="https://i.ibb.co/Z11pcGG/cryptocurrency.png"
                  />
                  <Typography variant="h5" onClick={closeMenu}>
                    Cryptoverse
                  </Typography>
                </div>
              </NavLink>
            </div>
            <div className="toggler" onClick={handleToggle}>
              {isToggled ? <CloseIcon /> : <MenuIcon />}
            </div>
          </div>
          <div
            className={`mobile-main-nav-container ${isToggled && "toggled"}`}
          >
            <MenuList>
              <NavLink to="/">
                <MenuItem onClick={closeMenu} sx={{ mb: 1 }}>
                  <ListItemIcon>
                    <HomeOutlinedIcon
                      fontSize="small"
                      sx={{ color: "lightgray" }}
                    />
                  </ListItemIcon>
                  <ListItemText>Home</ListItemText>
                </MenuItem>
              </NavLink>
              <NavLink to="/cryptocurrencies">
                <MenuItem onClick={closeMenu} sx={{ mb: 1 }}>
                  <ListItemIcon>
                    <PaymentsOutlinedIcon
                      fontSize="small"
                      sx={{ color: "lightgray" }}
                    />
                  </ListItemIcon>
                  <ListItemText>Cryptocurrencies</ListItemText>
                </MenuItem>
              </NavLink>
              <NavLink to="/news">
                <MenuItem onClick={closeMenu} sx={{ mb: 1 }}>
                  <ListItemIcon>
                    <NewspaperOutlinedIcon
                      fontSize="small"
                      sx={{ color: "lightgray" }}
                    />
                  </ListItemIcon>
                  <ListItemText>News</ListItemText>
                </MenuItem>
              </NavLink>
            </MenuList>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
