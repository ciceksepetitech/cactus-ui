import React, { useState } from 'react';

import ResetIcon from './ResetIcon';
import SandboxIframe from './SandboxIframe';

type PlaygroundProps = {
  urls: {
    [key: string]: string;
  };
};

function Playground({ urls }: PlaygroundProps) {
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  const createButton = (urls): React.ReactNode => {
    return Object.keys(urls).map((key: string) => {
      return (
        <div className="sandbox-button" key={`button-${key}`}>
          <img src={`/img/${key}-icon.svg`} alt={`/img/${key}-icon`} />
          <button onClick={() => setSelectedUrl(urls[key])}>
            Start {key.toString()}
          </button>
        </div>
      );
    });
  };

  const handleReset = (): void => {
    const prevUrl = selectedUrl;
    (async () => {
      await setSelectedUrl('');
      setSelectedUrl(prevUrl);
    })();
  };

  return (
    <>
      <div className="sandbox-buttons">
        {createButton(urls)}
        <ResetIcon onClick={handleReset} />
      </div>

      <div className="sandbox">
        <div className={selectedUrl ? 'isOpen' : 'isClosed'}>
          {selectedUrl && <SandboxIframe url={selectedUrl} />}
        </div>
      </div>
    </>
  );
}

export default Playground;
