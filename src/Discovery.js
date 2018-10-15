import React, { Fragment } from "react";
import PropTypes from "prop-types";
import ContentWrapper from "./ContentWrapper";
import DiscoverySection from "./DiscoverySection";
import Media from "react-media";

const Discovery = ({ past, upcoming, expanded }) => {
  let eventsPerPage = 3;
  if (window && window.matchMedia("(max-width: 960px)").matches) {
    eventsPerPage = 5;
  } else if (window && window.matchMedia("(min-width: 961px)").matches) {
    eventsPerPage = expanded ? 10 : 5;
  }

  return (
    <ContentWrapper>
      {upcoming ? (
        <DiscoverySection
          prefix="Upcoming"
          expanded={expanded}
          eventsPerPage={eventsPerPage}
        />
      ) : null}
      {past ? (
        <Fragment>
          <DiscoverySection
            prefix="Past"
            expanded={expanded}
            eventsPerPage={eventsPerPage}
            isPastEvents
          />
        </Fragment>
      ) : null}
    </ContentWrapper>
  );
};

Discovery.propTypes = {
  past: PropTypes.bool,
  upcoming: PropTypes.bool,
  expanded: PropTypes.bool
};

Discovery.defaultProps = {
  past: false,
  upcoming: false,
  expanded: false
};

export default Discovery;
