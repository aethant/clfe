import styled from "styled-components";

export const StyledPaper = styled.section`
  height: auto;
  width: 100%;
  margin-bottom: 1rem;
  background: #fff;
  position: relative;
  display: flex;
  flex: 0 0 1;
  flex-direction: column;

  @media (min-width: 961px) {
    min-height: 35vh;
  }

  @media (min-width: 481px) {
    box-shadow: 2px 2px 3px #eaeaea, -2px -2px 3px #eaeaea;
    border: 1px solid #d2d2d2;
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

export const StyledPaperHeader = styled.h4`
  font-weight: 600;
  padding-left: 2px;
  margin: 0;
  margin-bottom: 1rem;
  flex: 0 0 50%;
`;
