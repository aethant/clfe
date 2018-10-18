import React from "react";
import ReactDOM from "react-dom";
import AppBar from "@material-ui/core/AppBar";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Media from "react-media";
import styled, { ThemeProvider } from "styled-components";
import { Router, Route, NavLink, Redirect, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";

import Navigation from "./Navigation";
import TabBar from "./TabBar";
import Discovery from "./Discovery";
import ContentWrapper from "./ContentWrapper";
import SectionHeader from "./SectionHeader";
import Helmet from "react-helmet";
import scTheme from "./theming";

const history = createHistory({
  basename: "/",
  initialEntries: ["/"],
  initialIndex: 1
});

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: window.localStorage
});

const gqlClient = new ApolloClient({
  cache,
  uri: "http://localhost:8080/" // @TODO prod/dev/etc.
});

const LilBar = () => (
  <LilBarWrapper>
    <LilBarArrowButton>
      {/* <i className="fas fa-arrow-left" /> */}
    </LilBarArrowButton>
    <img
      alt="NCSA logo"
      src="https://via.placeholder.com/150x50/ADD8E6?text=logo"
    />
  </LilBarWrapper>
);

const LilBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
`;

const LilBarArrowButton = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  top: 0;
  left: 0;
  height: 100%;
  width: 3rem;
`;

const BigBar = () => (
  <BigBarWrapper>
    <BigBarLogoImage
      alt="NCSA logo"
      src="https://via.placeholder.com/150x50/ADD8E6?text=logo"
    />
    <BigBarMenuWrapper>
      <StyledNavLink to="/events/discover" activeClassName="active">
        Discover
      </StyledNavLink>
      <StyledNavLink to="/events/my" activeClassName="active">
        My Events
      </StyledNavLink>
      <StyledNavLink to="/athlete" activeClassName="active">
        Athletes
      </StyledNavLink>
    </BigBarMenuWrapper>
    <BigBarProfileOption>
      <NavLink to="/profile" style={{ color: "#fff", textDecoration: "none" }}>
        <i className="far fa-user-circle" />
      </NavLink>
    </BigBarProfileOption>
  </BigBarWrapper>
);

const StyledNavLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  white-space: nowrap;
  font-weight: 400;
  position: relative;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }

  &:last-child {
    margin-right: 0.125rem;
  }

  @media (min-width: 760px) {
    &:not(:last-child) {
      margin-right: 1.5rem;
    }

    &:last-child {
      margin-right: 0.5rem;
    }
  }

  &.active {
    &:after {
      position: absolute;
      content: "";
      bottom: -0.25rem;
      left: 0;
      background: orange;
      width: 102%;
      height: 1px;
    }
  }
`;

const BigBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  justify-content: flex-start;
  align-items: center;

  flex-wrap: nowrap;
  width: 92vw;
  max-width: 1000px;

  @media (max-width: 481px) {
    width: 75vw;
  }
`;

const BigBarLogoImage = styled.img`
  margin-right: 1.5rem;
  position: relative;
  max-height: 100%;
  max-width: 100%;
`;

const BigBarMenuWrapper = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  padding: 5px;
  flex: auto;
  cursor: pointer;
`;

const BigBarProfileOption = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 0 0 5%;
  white-space: nowrap;
  font-size: 1.25rem;
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f98b38",
      dark: "#072d59",
      light: "#979690",
      tonalOffset: 0.2,
      contrastThreshold: 3
    }
  },
  typography: {
    fontFamily: ["Open Sans", "sans-serif"]
  },
  overrides: {
    MuiAppBar: {
      root: {
        background: "#072d59",
        color: "#fff",
        boxShadow: "none"
      }
    },
    MuiBottomNavigation: {
      root: {
        height: "4rem",
        paddingTop: "0.5rem"
      }
    },
    MuiTab: {
      root: {
        borderBottom: "1px solid #d8d8d8"
      }
    },
    MuiBottomNavigationAction: {
      root: {
        "&.selected": {
          color: "#f98b38"
        }
      }
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  }
});

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => <route.component {...props} routes={route.routes} />}
  />
);

const routes = [
  {
    path: "/events/",
    strict: true,
    component: props =>
      props.routes.map((route, key) => (
        <RouteWithSubRoutes key={key} {...route} />
      )),
    routes: [
      {
        path: "/events/discover",
        exact: true,
        component: () => <Discovery upcoming past />
      },
      {
        path: "/events/upcoming",
        exact: true,
        component: () => <Discovery upcoming expanded />
      },
      {
        path: "/events/past",
        exact: true,
        component: () => <Discovery past expanded />
      },
      {
        path: "/events/my",
        exact: true,
        component: () => (
          <ContentWrapper>
            <Helmet>
              <title>My Events</title>
            </Helmet>
            List of my events
          </ContentWrapper>
        )
      }
    ]
  },
  {
    path: "/profile",
    component: () => (
      <ContentWrapper>
        <Helmet>
          <title>My Profile</title>
        </Helmet>
        <div>Profile stuff</div>
      </ContentWrapper>
    )
  },
  {
    path: "/athlete",
    component: () => (
      <ContentWrapper>
        <Helmet>
          <title>My Athletes</title>
        </Helmet>
        <div>Athlete stuff</div>
      </ContentWrapper>
    )
  }
];

function App() {
  return (
    <ApolloProvider client={gqlClient}>
      <Router history={history}>
        <ThemeProvider theme={scTheme}>
          <MuiThemeProvider theme={theme}>
            <AppWrapper>
              <Helmet titleTemplate="%s | NCSA Coach Live" />
              <StyledAppBar position="fixed">
                <Media query="(max-width: 480px)">
                  {matches => (matches ? <LilBar /> : <BigBar />)}
                </Media>
              </StyledAppBar>
              <Content>
                <Media
                  query="(max-width: 480px)"
                  render={() => <SectionHeader />}
                />
                <Media query="(max-width: 480px)" render={() => <TabBar />} />
                <Switch>
                  {routes.map((route, key) => (
                    <RouteWithSubRoutes key={key} {...route} />
                  ))}
                  <Redirect path="/" to="/events/discover" push />
                  <Redirect path="/events" to="/events/discover" push />
                </Switch>
              </Content>
              <Media query="(max-width: 480px)" render={() => <Navigation />} />
            </AppWrapper>
          </MuiThemeProvider>
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  );
}

const Content = styled.div`
  width: 95vw;
  max-width: 1100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 2rem;
  position: relative;
  margin-top: 3.5rem;

  @media (min-width: 481px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  min-height: 99vh;
  justify-content: center;
  position: relative;
  background: ${props => props.theme.white};
  padding: 5px;

  @media (min-width: 481px) {
    background: ${props => props.theme.applicationBackground};
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const StyledAppBar = withStyles({
  root: {
    position: "fixed",
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 1,
    height: "3.5rem",
    backgroundColor: "#0f2B5b",
    boxShadow: "none",
    justifyContent: "center",
    alignItems: "center"
  }
})(AppBar);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
