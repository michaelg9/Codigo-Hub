import Widget from "../Widget";
import {Col, Row} from "reactstrap";
import React from "react";
import PropTypes from "prop-types";
import Firmware from "../../model/Firmware";
import {initFirmwareView} from "../../actions/view";
import { downloadFirmwareBinary } from '../../filecoin/client';

class FirmwareWidget extends React.PureComponent {

  static propTypes = {
    item: PropTypes.objectOf(Firmware).isRequired
  };

  constructor(props) {
    super(props);
    this.openFirmwareView = this.openFirmwareView.bind(this);
  }

  openFirmwareView() {
    this.props.dispatch(initFirmwareView({firmwareObj: this.props.item, history: this.props.history}));
  }

  render() {
    const firmware = this.props.item;
    console.log(firmware);
    return (
      <Widget
        title={<h5>Firmware Name:
          <small className="text-muted">WHAT_IS_THIS?</small>
          <span className={'glyphicon glyphicon-cloud-download'}
                onClick={() => downloadFirmwareBinary(firmware.IPFS_link, 'binary.bin', 'application/octet-stream') }
                style={{paddingLeft:'10px'}} /></h5>}
        close collapse onClick={this.openFirmwareView}>
        <div className="widget-padding-md w-100 h-100 text-left border rounded">
          <Row>
            <Col sm={6}>
              <h6><span className="fw-semi-bold">Developer: </span></h6>
              <h6><span className="fw-semi-bold">Version: </span></h6>
              <h6><span className="fw-semi-bold">Description: </span></h6>
              <h6><span className="fw-semi-bold">Device Type: </span></h6>
            </Col>
            <Col sm={6}>
              <h6>{firmware.developer}</h6>
              <h6>NOT_YET_IMPL</h6>
              <h6>{firmware.description}</h6>
              <h6>{firmware.device_type}</h6>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <span className={'glyphicon glyphicon-thumbs-up'}
                    style={{fontSize: '20px', paddingRight:' 5px'}}
                    // onClick={() => thumbsUpFirmware(firmware.developer, firmware.device_type)}
              />{ firmware.thumbs_up }
            </Col>
            <Col sm={6}>
              <span
                className={'glyphicon glyphicon-thumbs-down'}
                style={{fontSize: '20px', paddingRight:' 5px'}}
                // onClick={() => thumbsDownFirmware(firmware.developer, firmware.device_type)}
              />{ firmware.thumbs_down }
            </Col>
          </Row>
        </div>
      </Widget>
    );
  }
}

export default FirmwareWidget;
