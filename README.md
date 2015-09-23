PDS Bluetooth LE (BLE) / Bluetooth Smart Cordova Plugin
=======================================================

This is a Cordova Bluetooth LE plugin based on [mutualmobile/cordova-bluetoothle](https://github.com/mutualmobile/cordova-bluetoothle) which was originally based on
[randdusing/BluetoothLE](https://github.com/randdusing/BluetoothLE).

The plugin was originally rewritten by Mutual Mobileto be more robust, support
multiple devices, and have a more comfortable API (Promise-based, each method
does exactly one thing). The API is based on the Chrome Bluetooth low energy API.

## Features

1. Promise API for asynchronous code
2. Bonding support for encrypted communications


Quick Usage
---------------------------------------------------------------------------------


### Scan Devices

```js

   bluetoothle.on('deviceAdded', function (device) {
   	console.log(device.name);
   }
   
   bluetoothle.isSupported()
   	.then(function (result) {
        if (result == true) {
            console.log('BLE support detected OK')

            bluetoothle.startDiscovery().then(function (state) {
                console.log("startDiscovery state: " + state);
                
                // Example: stop discovery after 10 seconds
                setTimeout(function () {
                    bluetoothle.stopDiscovery().then(function (state) {
                        console.log("stopDiscovery state: " + state);
                    })
                }, 10000);
            });

        } else {
            console.log('### ERROR ### BLE support NOT found!')
        }
	}, function (error) {
    	console.log('### ERROR ### An unknown error has occurred!')
	});

```

### Connect to Device, Listen for Characteristic Value Change

```js

    bluetoothle.on('characteristicValueChanged', function (event) {
        function ab2str(buf) {
            return String.fromCharCode.apply(null, new Uint8Array(buf));
        }
        console.log('CHARACTERISTIC CHANGE', event);
        console.log('VALUE', ab2str(event.value));
    });

    bluetoothle.isConnected(device.address)
        .then(function (result) {
            if (result == false)
                return bluetoothle.connect(device.address)
            return device;
        })
        .then(function (device) {
            console.log('CONNECTED', device);

            return bluetoothle.getService(
                device.address,
				   ServiceUUID);        // UUID defined elsewhere
        })
        .then(function (service) {
            if (service == null) {
                console.log('ERROR - Service not found!');
                throw 'Service not found!';
            }
            console.log('SERVICE', service);

            bluetoothle.startCharacteristicNotifications(
                service.deviceAddress,
                service.uuid,
                CharacteristicUUID    // UUID defined elsewhere
            );

            // Anything else here such as writing to device etc.
        })
        .error(function (err) {
            console.log('ERROR', err);
        });
        
```

		
Module: bluetoothle
---------------------------------------------------------------------------------


### Methods

* getAdapterState () : AdapterState
* getDevice (String deviceAddress) : Device
* getDevices () : [Device]
* startDiscovery () : void
* stopDiscovery () : void
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

* 'onDeviceAdded' : Device
  - called when a device has been discovered
* 'onDeviceDropped' : Device
  - (not in Chrome) called when a connected Device is disconnected, e.g. going
    out of range. Boils down to "a device disconnected, but nobody asked for it
    to be"
* 'onAdapterStateChanged' : AdapterState
  - called when the Bluetooth adapter turns on or off
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

A derivative work of [mutualmobile/cordova-bluetoothle](https://github.com/mutualmobile/cordova-bluetoothle) and [randdusing/BluetoothLE](https://github.com/randdusing/BluetoothLE)
