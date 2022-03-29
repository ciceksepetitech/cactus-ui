import VisuallyHidden from '@ciceksepeti/cui-visually-hidden';
import React, { useState } from 'react';

import PreviewContainer from '../Containers/PreviewContainer/PreviewContainer';

function CUIVisuallyHiddenDefault() {
  const [disable, setDisable] = useState(false);
  return (
    <PreviewContainer title="Visually Hidden Default">
      <VisuallyHidden disabled={disable}>
        Should not be seen! <hr />
      </VisuallyHidden>
      Disabled State : {disable.toString()} <br />
      <button onClick={() => setDisable(!disable)}>Toggle Disable</button>
    </PreviewContainer>
  );
}

export default CUIVisuallyHiddenDefault;
