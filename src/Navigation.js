import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faUserCircle,
  faChild
} from "@fortawesome/free-solid-svg-icons";

const Navigation = () => (
  <NavWrapper>
    <BottomNavigation showLabels style={{ paddingTop: 0 }}>
      <BottomNavigationAction
        component={Link}
        to="/events/discover"
        label="Events"
        icon={<FontAwesomeIcon icon={faCalendar} size="lg" />}
      />
      <BottomNavigationAction
        component={Link}
        to="/athlete"
        label="Athletes"
        icon={<FontAwesomeIcon icon={faChild} size="lg" />}
      />
      } />
      <BottomNavigationAction
        label="Profile"
        to="/profile"
        component={Link}
        icon={<FontAwesomeIcon icon={faUserCircle} size="lg" />}
      />
    </BottomNavigation>
  </NavWrapper>
);

const NavWrapper = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid #d8d8d8;
`;

export default Navigation;
