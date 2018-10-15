import styled from "styled-components";

export default styled.main`
  width: inherit;
  height: inherit;
  min-height: 50vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 2rem;
  position: relative;

  @media (min-width: 481px) {
    width: 75vw;
  }
`;
