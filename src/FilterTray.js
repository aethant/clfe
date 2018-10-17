import React, { PureComponent } from "react";
import styled from "styled-components";

class FilterTray extends PureComponent {
  render() {
    return <FilterTrayWrapper>{this.props.children}</FilterTrayWrapper>;
  }
}

const FilterTrayWrapper = styled.div`
  padding-left: 2px;
  margin: 0;
  margin-bottom: 0.75rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export default FilterTray;
