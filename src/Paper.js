import styled from "styled-components";

export const StyledPaper = styled.section`
  height: auto;
  width: 100%;
  margin-bottom: 1rem;
  background: ${props => props.theme.white};
  position: relative;
  display: flex;
  flex: 0 0 1;
  flex-direction: column;

  @media (min-width: 961px) {
    min-height: 35vh;
  }

  @media (min-width: 481px) {
    box-shadow: 2px 2px 3px ${props => props.theme.defaultShadow},
      -2px -2px 3px ${props => props.theme.defaultShadow};
    border: 1px solid ${props => props.theme.paperBorder};
  }
`;

export const StyledPaperContent = styled.div`
  padding: 5px;
  height: 95%;
  position: relative;

  @media (min-width: 481px) {
    padding: 2rem;
  }
`;

export const StyledPaperHeader = styled.h4.attrs({
  fsize: props => (props.expanded ? "1.5rem" : "1rem"),
  topmargin: props => (props.expanded ? props.theme.headerTopMargin : "unset"),
  expander: props =>
    props.expanded
      ? `
    text-transform: uppercase;
  `
      : null
})`
  font-size: ${props => props.fsize};
  font-weight: 600;
  padding-left: 2px;
  margin-top: ${props => props.topmargin};
  margin-bottom: 0.5rem;
  flex: 1 0 50%;

  ${props => props.expander};

  @media (min-width: 461px) {
    margin-top: unset;
  }
`;
