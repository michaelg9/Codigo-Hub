import Widget from "../Widget";
import {Col, Row} from "reactstrap";
import React from "react";
import PropTypes from "prop-types";
import Profile from "../../model/Profile";

class ProfileWidget extends React.PureComponent {

  static propTypes = {
    item: PropTypes.objectOf(Profile).isRequired
  };

  render() {
    const profile = this.props.item;
    console.log(profile);
    return (
      <Widget
        title={<h5>Profile Name: <small className="text-muted">{profile.name}</small></h5>}
        close collapse>
        <p></p>
        <div className="widget-padding-md w-100 h-100 text-left border rounded">
          <Row>
            <Col sm={6}>
              <h6><span className="fw-semi-bold">Address: </span></h6>
            </Col>
            <Col sm={6}>
              <h6>{profile.address}</h6>
            </Col>
          </Row>
        </div>
      </Widget>
    );
  }
}

export default ProfileWidget;
