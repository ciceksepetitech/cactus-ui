import React from 'react';

type SandboxIframeProps = {
  url: string,
};

function SandboxIframe({ url }: SandboxIframeProps) {
  return (
    <iframe
      src={url}
      style={{
        width: '100%',
        height: '500px',
        border: '0',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
      title="AlertComponentPlayground"
      allow="accelerometer;  camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    />
  );
}

export default SandboxIframe;
