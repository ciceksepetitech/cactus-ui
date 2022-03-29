import React from 'react';

import { CautionIcon, DangerIcon, NoteIcon, TipIcon } from './Icons';

type AdmonitionVariants = 'note' | 'info' | 'tip' | 'caution' | 'danger';

type AdmonitionContainerProps = {
  type?: AdmonitionVariants;
  children: React.ReactNode | string;
};

const AdmonitionIcons: {
  [key in AdmonitionVariants]: { icon: React.ReactNode; alertType: string };
} = {
  note: { icon: <NoteIcon />, alertType: 'secondary' },
  info: { icon: <NoteIcon />, alertType: 'info' },
  tip: { icon: <TipIcon />, alertType: 'success' },
  caution: { icon: <CautionIcon />, alertType: 'warning' },
  danger: { icon: <DangerIcon />, alertType: 'danger' },
};

function AdmonitionContainer({ type, children }: AdmonitionContainerProps) {
  const selectedType = type || 'note';

  return (
    <div
      className={`admonition admonition-${selectedType} alert alert--${AdmonitionIcons[selectedType].alertType}`}
    >
      <div className="admonition__heading">
        <p>
          <span className="admonition-icon">
            {AdmonitionIcons[selectedType].icon}
          </span>
          {selectedType}
        </p>
      </div>
      <div className="admonition-content">{children}</div>
    </div>
  );
}

export default AdmonitionContainer;
