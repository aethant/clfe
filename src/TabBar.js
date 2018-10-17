import React, { Fragment } from "react";
import styled from "styled-components";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { NavLink as Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const TabBar = ({ location: { pathname } }) => {
  const isVisible = Boolean(
    ["/events/discover", "/events/my"].includes(pathname)
  );
  return (
    <Fragment>
      {isVisible ? (
        <StyledTabsContainer
          fullWidth
          style={{ width: "100%" }}
          value={pathname}
          indicatorColor="primary"
          textColor="primary"
        >
          <StyledTab
            activeClassName="active"
            component={Link}
            to="/events/discover"
            value="/events/discover"
            label="Discover"
          />
          <StyledTab
            activeClassName="active"
            component={Link}
            to="/events/my"
            value="/events/my"
            label="My Events"
          />
        </StyledTabsContainer>
      ) : (
        <div />
      )}
    </Fragment>
  );
};

const StyledTab = styled(Tab)`
  font-size: 1.25rem;
  color: ${props => props.theme.noice};
  text-transform: capitalize;
  border-bottom: 1px solid ${props => props.theme.default};
  overflow: none !important;

  &.active {
    border-bottom: none;
    font-weight: 600;
  }
`;

const tabsStyles = () => ({
  root: {
    marginTop: "0.45rem",
    marginBottom: "1rem",
    borderBottom: "1px solid transparent"
  },
  indicator: {
    height: "3px",
    bottom: 0,
    zIndex: 200
  }
});

const StyledTabsContainer = withStyles(tabsStyles)(Tabs);

export default withRouter(TabBar);
