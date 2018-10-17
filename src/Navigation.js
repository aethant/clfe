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
      <StyledBottomNavigationAction
        activeClassName="active"
        component={Link}
        to="/events"
        label="Events"
        icon={<FontAwesomeIcon icon={faCalendar} size="lg" />}
      />
      <StyledBottomNavigationAction
        activeClassName="active"
        component={Link}
        to="/athlete"
        label="Athletes"
        icon={<FontAwesomeIcon icon={faChild} size="lg" />}
      />
      } />
      <StyledBottomNavigationAction
        activeClassName="active"
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
  border-top: 1px solid ${props => props.theme.default};
`;

const StyledBottomNavigationAction = styled(BottomNavigationAction)`
  &.active {
    color: ${props => props.theme.bright};
    font-weight: 700;
  }
`;

export default Navigation;
