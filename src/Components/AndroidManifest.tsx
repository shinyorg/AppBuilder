import { ShinyComponent, Data } from '../Types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CopyToClipboardButton from './CopyToClipboardButton';

export interface Props {
  components: ShinyComponent[]
}

const AndroidManifest = (props: Props) => {
  if (props.components.length === 0) 
    return (<div>Nothing Extra Needed</div>);

  let src = `
    <?xml version="1.0" encoding="utf-8"?>
    <manifest xmlns:android="http://schemas.android.com/apk/res/android">
      <application android:allowBackup="true" android:icon="@mipmap/appicon" android:roundIcon="@mipmap/appicon_round" android:supportsRtl="true">
      </application>
      <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
      <uses-permission android:name="android.permission.INTERNET" />      
    `;

  const addP = (toString: string, perm:  string, maxSdk?: number) => {
    toString += `<uses-permission android:name="android.permission.${perm.toUpperCase()}" `;
    if (maxSdk !== undefined) {
      toString += `android:maxSdkVersion="${maxSdk}" `;
    }
    toString += `/>`;
    console.log(toString);
  };
  const addF = (toString: string, feature:  string) => {
    toString += `<uses-feature android:name="android.permission.${feature.toUpperCase()}" android:required="false" />`;
  };
  const has = (feature: string): boolean => {
    return Data.hasComponent(feature, props.components);
  };

  if (has('ble') || has('blehosting') || has('beacons')) {
    addF(src, 'bluetooth_le');
    addP(src, 'bluetooth', 30);
    addP(src, 'bluetooth_admin', 30);
    addP(src, 'bluetooth_connect');
  }
  if (has('ble') && !has('beacons')) {
    src += `<uses-permission android:name="android.permission.BLUETOOTH_SCAN" android:usesPermissionFlags="neverForLocation" />`;
  }
  if (!has('ble') && has('beacons')) {
    src += `<uses-permission android:name="android.permission.BLUETOOTH_SCAN" />`;
  } 
  if (has('blehosting')) {
    addP(src, 'BLUETOOTH_ADVERTISE');
  }
  
  if (has('gps') || has('geofences')) {
    addP(src, 'ACCESS_BACKGROUND_LOCATION');
    addF(src, "location.gps");
    addF(src, "location.network");
  }

  if (has('ble') || has('gps') || has('geofencing') || has('beacons')) {
    addP(src, 'ACCESS_COARSE_LOCATION');
    addP(src, 'ACCESS_FINE_LOCATION');
  }  

  if (has('notifications') || Data.usesPush(props.components) || has('gps') || has('ble') || has('beacons') || has('httptransfers')) {
    addP(src, 'POST_NOTIFICATIONS');
  }  
  if (has('gps') || has('ble') || has('beacons') || has('httptransfers')) {
    addP(src, 'FOREGROUND_SERVICE');
  }
  if (has('speech')) {
    addP(src, "RECORD_AUDIO");
  }

  src += `</manifest>`;
  return (
    <>
      <SyntaxHighlighter language="xml" style={docco}>{src}</SyntaxHighlighter>
      <CopyToClipboardButton text={src} />
    </>);
};
export default AndroidManifest;