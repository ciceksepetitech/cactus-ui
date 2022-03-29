import React from 'react';

import { IDescriptionProps } from './interfaces';

function HeaderTableDescription({ data }: IDescriptionProps) {
  return (
    <div>
      <p key={data.name} className="fs-18 mb-40">
        {data.description}
      </p>
    </div>
  );
}

export default HeaderTableDescription;
