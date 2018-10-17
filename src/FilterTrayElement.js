import React, { PureComponent } from "react";
import styled from "styled-components";

class FilterTrayElement extends PureComponent {
  render() {
    return <FilterElement>{this.props.label}</FilterElement>;
  }
}

const FilterElement = styled.button`
  margin: 5px;
  background: transparent;
  outline: none;
  border: none;
  box-shadow: 1px 1px 1px ${props => props.theme.defaultShadow},
    -1px -1px 1px ${props => props.theme.defaultShadow};
  border-radius: 3px;
  padding: 3px 10px;
  font-size: 0.85rem;
  color: ${props => props.theme.noice};

  &:active {
    background: ${props => props.theme.defaultShadow};
  }

  &:first-child {
    margin-left: 0;
  }
`;

export default FilterTrayElement;
