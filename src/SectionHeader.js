import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

class SectionHeader extends PureComponent {
  dict = {
    "/events/discover": "EVENTS",
    "/events/my": "EVENTS",
    "/athletes/my": "MY ATHLETES",
    "/profile": "MY PROFILE"
  };
  render() {
    const { location: { pathname } = {} } = this.props;
    const label = this.dict[pathname] || null;
    return label ? <StyledSectionHeader>{label}</StyledSectionHeader> : null;
  }
}

SectionHeader.propTypes = {
  location: PropTypes.object.isRequired
};

const StyledSectionHeader = styled.h3`
  margin-top: ${props => props.theme.headerTopMargin};
  margin-bottom: 0.5rem;
  padding: 2px;
  align-self: flex-start;
`;

export default withRouter(SectionHeader);
