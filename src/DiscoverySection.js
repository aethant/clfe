import React, { Component, createRef } from "react";
import Media from "react-media";
import Divider from "@material-ui/core/Divider";
import Card from "./Card";
import { StyledPaper } from "./Paper";
import { StyledPaperContent, StyledPaperHeader } from "./Paper";
import { Link } from "react-router-dom";
import styled from "styled-components";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class DiscoverySection extends Component {
  state = {
    showHelpers: false
  };
  constructor(props) {
    super(props);
    this.cardholder = createRef();
  }
  _updateDimensions = () => {
    const { cardholder: { current: el } = {} } = this;
    const showHelpers = el.scrollWidth > el.clientWidth;
    this.setState({ showHelpers });
  };
  componentWillMount() {
    window.addEventListener("resize", this._updateDimensions);
  }
  componentDidMount() {
    this._updateDimensions();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this._updateDimensions);
  }
  render() {
    const {
      prefix,
      expanded,
      loading,
      error,
      data: { allEvents }
    } = this.props;
    return (
      <SuperStyledPaper showHelpers={this.state.showHelpers}>
        <StyledPaperContent>
          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "space-between"
            }}
          >
            <StyledPaperHeader>{prefix} Events</StyledPaperHeader>
            {!expanded && (
              <Link
                style={{ textDecoration: "none" }}
                to={`/events/${prefix.toLowerCase()}`}
              >
                View all
              </Link>
            )}
          </div>
          <Media query="(min-width: 481px)" render={() => <Divider />} />
          <CardHolder
            expanded={expanded}
            innerRef={this.cardholder}
            id={`${prefix.toLowerCase()}__card--holder`}
          >
            {loading && <div>Loading</div>}
            {!loading &&
              error &&
              ![...(allEvents || [])].length && (
                <div
                  style={{
                    display: "flex",
                    color: "#d8d8d8",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    marginTop: "4rem",
                    width: "100%"
                  }}
                >
                  No events available
                </div>
              )}
            {!loading &&
              !error &&
              [...(allEvents || [])].map((card, _key) => (
                <Card key={_key} {...card} />
              ))}
          </CardHolder>
        </StyledPaperContent>
      </SuperStyledPaper>
    );
  }
}

// TODO if we need scroll fins
const SuperStyledPaper = styled(StyledPaper).attrs({
  helper: props =>
    props.showHelpers
      ? `&:before {
        position: absolute;
        content: '';
        height: 3rem;
        width: 3rem;
        background: red;
        top: 45%;
        right: -1rem;
        border-radius: 50%;
        z-index: 100;
  }`
      : null
})`
  @media (min-width: 481px) {
  }
`;

const CardHolder = styled.div.attrs({
  wrap: props => (props.expanded ? "wrap" : "nowrap")
})`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: ${props => props.wrap};
  flex: auto;
  justify-content: flex-start;
  height: inherit;
  overflow-y: hidden;
  overflow-x: auto;

  @media (min-width: 961px) {
    flex-direction: row;
  }
`;

CardHolder.displayName = "CardHolder";

const EVENTS_QUERY = gql`
  query Events($page: Int, $perPage: Int, $filter: EventFilter) {
    allEvents(page: $page, perPage: $perPage, filter: $filter) {
      id
      name
      event_date
      logo
      Location {
        city
        state
      }
      isGoing
      isFlagged
    }
    _allEventsMeta(page: $page, perPage: $perPage, filter: $filter) {
      count
    }
  }
`;

const gqlDiscoverySection = graphql(EVENTS_QUERY, {
  options: ({ isPastEvents, eventsPerPage: perPage = null, refetch }) => {
    const dateFilterValue = Math.floor(Date.now() / 1000);
    return {
      fetchPolicy: refetch ? "cache-and-network" : "cache-first",
      variables: {
        page: 0,
        perPage,
        filter: {
          [isPastEvents ? `event_date_lte` : `event_date_gte`]: dateFilterValue
        }
      }
    };
  }
})(DiscoverySection);

export default gqlDiscoverySection;
