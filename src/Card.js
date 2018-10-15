import React, { Fragment } from "react";
import styled from "styled-components";
import { rgba } from "polished";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag as faFlagRegular } from "@fortawesome/pro-regular-svg-icons";
import { faFlag as faFlagSolid } from "@fortawesome/pro-solid-svg-icons";
import { faCheck } from "@fortawesome/pro-light-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import format from "date-fns/format";

library.add(faFlagRegular, faFlagSolid, faCheck);

const Card = ({
  name,
  Location: { city, state },
  isGoing,
  isFlagged,
  event_date,
  logo
}) => {
  return (
    <CardWrapper className="card--element">
      <CardContent>
        <CardImage>
          <img alt="event logo" src={logo} />
        </CardImage>
        <CardDetails>
          <CardDetailsName>{name}</CardDetailsName>
          <CardDetailsDates>
            {format(Math.floor(event_date) * 1000, "MMMM D, YYYY")}
          </CardDetailsDates>
          <CardDetailsLocation>
            {city}, {state}
          </CardDetailsLocation>
        </CardDetails>
        <CardTracking active={isGoing || isFlagged}>
          {!isFlagged &&
            !isGoing && (
              <Fragment>
                <FontAwesomeIcon icon={["far", "flag"]} />
                <span className="label">Track</span>
              </Fragment>
            )}
          {isFlagged &&
            !isGoing && (
              <Fragment>
                <FontAwesomeIcon icon={["fas", "flag"]} />
                <span className="label">Following</span>
              </Fragment>
            )}
          {isGoing && (
            <div>
              <FontAwesomeIcon icon={["fal", "check"]} />
              &nbsp;I'm going
            </div>
          )}
        </CardTracking>
      </CardContent>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 0 0 20%;
  position: relative;
  height: 100%;
  border-bottom: 1px solid #d8d8d8;

  @media (min-width: 961px) {
    border: none;
  }
`;

const CardContent = styled.div`
  padding: 0.125rem;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  flex: 1;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  position: relative;
  height: 100%;

  @media (min-width: 961px) {
    padding: 0.5rem;
    flex-direction: column;
    flex-wrap: unset;
    height: 100%;
  }
`;

const CardImage = styled.div`
  display: flex;
  width: 5rem;
  height: 5rem;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-right: 1rem;

  @media (min-width: 961px) {
    width: 100%;
    height: 10rem;
    margin-right: unset;
  }

  img {
    position: relative;
    max-height: 100%;
    max-width: 100%;
  }
`;

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
  justify-content: flex-start;
  position: relative;
  line-height: 1.6;

  @media (min-width: 961px) {
    font-size: 1.25rem;
    flex: 0 0 auto;
    max-width: 10rem;
    padding: 4px;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
`;

const CardDetailsName = styled.div`
  max-width: 100%;
  font-size: 1rem;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const CardDetailsDates = styled.div`
  width: 100%;
  font-size: 0.9rem;
  font-weight: 400;
`;

const CardDetailsLocation = styled.div`
  font-size: 0.9rem;
  font-weight: 400;
`;

const CardTracking = styled.button.attrs({
  bg: props => (props.active ? "#f98b38" : "#d8d8d8"),
  fg: props => (props.active ? "#fff" : "#696969"),
  fgs: props => (props.active ? "#f98b38" : "#696969")
})`
  display: flex;
  flex: 1 0 1;
  justify-content: center;
  align-items: center;
  font-size: 0.85rem;
  color: ${props => props.fgs};
  border: none;
  outline: none;
  background: transparent;

  & .label {
    display: none;
  }

  @media (min-width: 961px) {
    flex: unset;
    padding: 0.5rem;
    color: ${props => props.fg};
    background: ${props => props.bg};
    border-radius: 3px;
    transform: background ease-in 0.2s;

    &:active {
      transform: background ease-in 0.2s;
      background: ${props => `${rgba(props.bg, 0.4)}`};
    }

    & .label {
      margin-left: 5px;
      display: block;
      font-weight: 600;
    }
  }
`;

export default Card;
