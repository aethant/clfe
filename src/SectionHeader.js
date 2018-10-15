import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const SectionHeader = ({ location: { pathname } }) => (
  <StyledSectionHeader>
    {(pathname === "/events/discover" || pathname === "/events/my") && `EVENTS`}
    {pathname === "/myathletes" && `MY ATHLETES`}
    {pathname === "/profile" && `PROFILE`}
  </StyledSectionHeader>
);

const StyledSectionHeader = styled.h3`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0;
  align-self: flex-start;
`;

export default withRouter(SectionHeader);
