cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.pdsuk.cordova.bluetoothle/www/bluetoothle.js",
        "id": "com.pdsuk.cordova.bluetoothle.BluetoothLe",
        "clobbers": [
            "window.bluetoothle"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.pdsuk.cordova.bluetoothle": "1.0.2"
}
// BOTTOM OF METADATA
});