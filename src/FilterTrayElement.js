import React, { Fragment, PureComponent } from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";

class FilterTrayElement extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      selections: props.values.reduce((aggregator, element) => {
        return {
          ...aggregator,
          [`${element.value}`]: false
        };
      }, {})
    };
  }

  _handleOnClick = () => this.setState({ open: !this.state.open });

  _handleSelectionClick = event => {
    this.setState({
      selections: {
        ...this.state.selections,
        [event.target.value]: !this.state.selections[event.target.value]
      }
    });
  };

  _handleApplyClick = () => {
    const filterValues = Object.keys(this.state.selections).filter(
      k => this.state.selections[k]
    );

    this.props.onApplyFilter(filterValues);
    this._handleOnClick();
  };

  render() {
    const { label, values } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        {open && (
          <Dialog onClose={this._handleOnClick} open={open} fullWidth>
            <FilterValues>
              {values.map(({ value, label }, key) => (
                <FilterValueElement
                  selected={this.state.selections[value]}
                  onClick={this._handleSelectionClick}
                  key={`${label}_${key}`}
                  value={value}
                >
                  {label}
                </FilterValueElement>
              ))}
              <div onClick={this._handleApplyClick}>show results</div>
            </FilterValues>
          </Dialog>
        )}
        <FilterElement onClick={this._handleOnClick}>{label}</FilterElement>
      </Fragment>
    );
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

const FilterValues = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  height: auto;
  min-height: 2rem;
  padding: 1rem;
`;

const FilterValueElement = styled.button.attrs({
  bg: props => (props.selected ? props.theme.selectedFilter : "transparent"),
  fg: props => (props.selected ? props.theme.white : props.theme.noice)
})`
  margin: 5px;
  background: ${props => props.bg};
  color: ${props => props.fg};
  outline: none;
  border: none;
  box-shadow: 1px 1px 1px ${props => props.theme.defaultShadow},
    -1px -1px 1px ${props => props.theme.defaultShadow};
  border-radius: 3px;
  padding: 3px 10px;
  font-size: 0.85rem;
  min-width: 2rem;
  max-width: 2rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  &:active {
    background: ${props => props.theme.defaultShadow};
  }
`;

export default FilterTrayElement;
