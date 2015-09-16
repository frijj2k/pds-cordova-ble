PDS Bluetooth LE (BLE) a.k.a Bluetooth Smart Cordova Plugin
===========================================================

This is a Cordova Bluetooth LE plugin based on [mutualmobile/cordova-bluetoothle](https://github.com/mutualmobile/cordova-bluetoothle) which was originally based on
[randdusing/BluetoothLE](https://github.com/randdusing/BluetoothLE).

The plugin was originally rewritten by Mutual Mobileto be more robust, support
multiple devices, and have a more comfortable API (Promise-based, each method
does exactly one thing). The API is based on the Chrome Bluetooth low energy API.

## Features

1. Promise API for asynchronous code.
2. Bonding support for encrypted communications.

There are two parts of that API needed to interact with Bluetooth low
energy devices:


[chrome.bluetooth](https://developer.chrome.com/apps/bluetooth)
---------------------------------------------------------------


### Methods

* getAdapterState () : AdapterState
* getDevice (String deviceAddress) : Device
* getDevices () : [Device]
* startDiscovery () : void
* stopDiscovery () : void

### Types

#### AdapterState

* address : String
* name : String
* enabled : boolean
* discovering : boolean

#### Device

* address : String
* name : String
* rssi : int
* connected : boolean
* uuids : [Service]
  - list of services either from advertisement data during a scan or from
    discovered services on connected devices

### Events

* 'onDeviceAdded' : Device
  - called when a device has been discovered
* 'onDeviceDropped' : Device
  - (not in Chrome) called when a connected Device is disconnected, e.g. going
    out of range. Boils down to "a device disconnected, but nobody asked for it
    to be"
* 'onAdapterStateChanged' : AdapterState
  - called when the Bluetooth adapter turns on or off



[chrome.bluetoothLowEnergy](https://developer.chrome.com/apps/bluetoothLowEnergy)
---------------------------------------------------------------------------------


### Methods

* connect (String deviceAddress) : Device
* disconnect (String deviceAddress) : void
* getService (String deviceAddress, String serviceId) : Service
* getServices (String deviceAddress) : [Service]
* getCharacteristic (String deviceAddress, String serviceId, String characteristicId) : Characteristic
* getCharacteristics (String deviceAddress, String serviceId) : [Characteristic]
* getIncludedServices (String deviceAddress, String serviceId) : [Service]
* getDescriptor (String deviceAddress, String serviceId, String characteristicId, String descriptorId) : Descriptor
* getDescriptors (String deviceAddress, String serviceId, String characteristicId) : [Descriptor]
* readCharacteristicValue (String deviceAddress, String serviceId, String characteristicId) : ArrayBuffer
* writeCharacteristicValue (String deviceAddress, String serviceId, String characteristicId, ArrayBuffer value) : void
* startCharacteristicNotifications (String deviceAddress, String serviceId, String characteristicId) : void
* stopCharacteristicNotifications (String deviceAddress, String serviceId, String characteristicId) : void
* readDescriptorValue (String deviceAddress, String serviceId, String characteristicId, String descriptorId) : ArrayBuffer
* writeDescriptorValue (String deviceAddress, String serviceId, String characteristicId, String descriptorId, ArrayBuffer value) : Descriptor

### Types

#### Service

* uuid : String
* isPrimary : boolean
* instanceId : String
* deviceAddress : String

#### Characteristic

* uuid : String
* service : String
  - UUID of the parent Service
* properties : Array
  - one or more of: "broadcast", "read", "writeWithoutResponse", "write",
    "notify", "indicate", "authenticatedSignedWrites", "extendedProperties",
    "reliableWrite", or "writableAuxiliaries"
* instanceId : String
* value : ArrayBuffer

#### Descriptor

* uuid : String
* characteristic : String
  - UUID of the parent Characteristic
* value : ArrayBuffer

### Events

* 'onCharacteristicValueChanged' : Characteristic
  - callback for a Characteristic notification/indication
* 'onDescriptorValueChanged' : Descriptor
  - callback for a Descriptor notification/indication


Extras
------

* isSupported () : boolean
  - `true` if the current device supports Bluetooth LE communication
* isConnected (String deviceAddress) : boolean
  - `true` if the specified device is connected to the phone's bluetooth adapter


License
-------

[Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.html)

A derivative work of [randdusing/BluetoothLE](https://github.com/randdusing/BluetoothLE)
