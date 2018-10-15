import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import ContentWrapper from "./ContentWrapper";
import DiscoverySection from "./DiscoverySection";

class Discovery extends PureComponent {
  state = {
    eventsPerPage: 3
  };

  _updateEventsPerPage = () => {
    const { expanded } = this.props;
    let eventsPerPage = 3;
    if (window && window.matchMedia("(max-width: 960px)").matches) {
      eventsPerPage = 5;
    } else if (window && window.matchMedia("(min-width: 961px)").matches) {
      eventsPerPage = expanded ? 10 : 5;
    }

    this.setState({ eventsPerPage });
  };

  componentWillMount() {
    window.addEventListener("resize", this._updateEventsPerPage);
  }

  componentDidMount() {
    this._updateEventsPerPage();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._updateEventsPerPage);
  }

  render() {
    const { past, upcoming, expanded } = this.props;
    const { eventsPerPage } = this.state;

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
  }
}

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
