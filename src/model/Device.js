class Device {
  constructor(name, brand, model, serialNumber) {
    this.name = name;
    this.brand = brand;
    this.model = model;
    this.serialNumber = serialNumber;
  }
  // TODO need to add in device location to make it tonally consistent with the dashboard
}

export class DeviceWithStatus extends Device {
  constructor(name, brand, model, serialNumber, isActive) {
    super(name, brand, model, serialNumber);
    this.isActive = isActive
  }

}

export default Device;
