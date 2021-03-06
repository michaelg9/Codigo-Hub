import React from 'react';
import {
  Table,
  Badge,
} from 'reactstrap';

import Widget from '../../../components/Widget';
import s from '../DeviceOverview.module.scss';
import PropTypes from "prop-types";
import { isDeviceActive, subscribeToStatusChanges, unSubscribeFromStatusChanges } from '../../../mqtt/client';

class DeviceTable extends React.Component {

  constructor(props) {
    super(props);
    this.callback = () => {this.setState(this.state)};
  }

  componentDidMount = () => {
    this.props.deviceList.forEach(d => subscribeToStatusChanges(d.name, this.callback));
  }

  componentWillUnmount = () => {
    this.props.deviceList.forEach(d => unSubscribeFromStatusChanges(d.name, this.callback));
  }

  render() {
    return (
      <Widget
        title={<h5>Your <span className="fw-semi-bold">Devices</span></h5>} close
        bodyClass={s.mainTableWidget}
      >
        <Table striped>
          <thead>
          <tr className="fs-sm">
            <th className="hidden-sm-down">#</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Serial #</th>
            <th className="hidden-sm-down">Status</th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.deviceList.map((row, id) =>
              <tr key={row.serialNumber}>
                <td>{id+1}</td>
                <td>
                  <span className="fw-semi-bold">{row.brand}</span>
                </td>
                <td>
                  {row.model}
                </td>
                <td>
                  {row.serialNumber}
                </td>
                <td>
                  {isDeviceActive(row.name) ?
                    <Badge color="success" className="text-secondary" pill>Online</Badge>
                    :
                    <Badge color="info" className="text-secondary" pill>Offline</Badge>
                  }
                </td>
                <td align={"center"}>
                  <span className="glyphicon glyphicon-remove-circle" title={"Remove Device"} aria-hidden="true"
                        onClick={() => this.props.onDeleteDevice(row)} />
                </td>
              </tr>,
            )
          }
          </tbody>
        </Table>
      </Widget>
    );
  }
}

export default DeviceTable;

DeviceTable.propTypes = {
  deviceList: PropTypes.array.isRequired,
  onDeleteDevice: PropTypes.func.isRequired,
};
