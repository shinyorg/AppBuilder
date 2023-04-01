import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CopyToClipboardButton from './CopyToClipboardButton';

const AppleEntitlements = () => {
  let src = `
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
  <dict>
    <key>aps-environment</key>
    <string>development</string>
  </dict>
  </plist>  
  `;
  return (
    <>
      <SyntaxHighlighter language="xml" style={docco}>{src}</SyntaxHighlighter>
      <CopyToClipboardButton text={src} />
    </>
  );
};
export default AppleEntitlements;