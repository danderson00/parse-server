var NotificationHubService = require('azure-sb').NotificationHubService,
    hub;

module.exports = {
    setConnection: function (hubName, connectionString) {
        hub = new NotificationHubService(hubName, connectionString);
    },
    createOrUpdateInstallation: function (installation) {
        if(hub)
            return new Promise(function (resolve, reject) {
                hub.createOrUpdateInstallation(convertInstallation(installation), function (error, res) {
                    if(error) {
                        console.log("Failed to create or update installation: ", error);
                        reject(error);
                    } else {
                        console.log("Successfully created or updated installation: " + installation.installationId);
                        resolve(res);
                    }
                });
            });
    },
    deleteInstallation: function (installationId) {
        if(hub)
            return new Promise(function (resolve, reject) {
                hub.deleteInstallation(installationId, function (error, res) {
                    if(error)
                        reject(error);
                    else
                        resolve(res);
                });
            });
    },
    send: function () {
        if(hub) {

        }
    }
};

function convertInstallation(installation) {
    return {
        installationId: installation.installationId,
        pushChannel: installation.deviceToken || installation.channelUris,
        platform: ({
            "ios": "apns",
            "android": "gcm",
            "winrt": "wns",
            "winphone": "wns",
            "dotnet": "wns"
        })[installation.deviceType]
    }
}
/*
{
    installationId: this.installationId,
    pushChannel: pushChannel,
    platform: platform,
    templates: stringifyTemplateBodies(templates),
    secondaryTiles: stringifyTemplateBodies(secondaryTiles)
}
*/

/*
badge: is a number field representing the last known application badge for iOS installations.
channels: An array of the channels to which a device is currently subscribed.
timeZone: The current time zone where the target device is located. This should be an IANA time zone identifier.
deviceType: The type of device, "ios", "android", "winrt", "winphone", or "dotnet"(readonly).
pushType: This field is reserved for directing Parse to the push delivery network to be used. If the device is registered to receive pushes via GCM, this field will be marked "gcm". If this device is not using GCM, and is using Parse's push notification service, it will be blank (readonly).
GCMSenderId: This field only has meaning for Android installations that use the GCM push type. It is reserved for directing Parse to send pushes to this installation with an alternate GCM sender ID. This field should generally not be set unless you are uploading installation data from another push provider. If you set this field, then you must set the GCM API key corresponding to this GCM sender ID in your Parse application's push settings.
installationId: Universally Unique Identifier (UUID) for the device used by Parse. It must be unique across all of an app's installations. (readonly).
deviceToken: The Apple or Google generated token used to deliver messages to the APNs or GCM push networks respectively.
channelUris: The Microsoft-generated push URIs for Windows devices.
appName: The display name of the client application to which this installation belongs.
appVersion: The version string of the client application to which this installation belongs.
parseVersion: The version of the Parse SDK which this installation uses.
appIdentifier: A unique identifier for this installation's client application. In iOS, this is the Bundle Identifier.
*/
