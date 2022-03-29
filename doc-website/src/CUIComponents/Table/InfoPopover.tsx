import Popover from '@ciceksepeti/cui-popover';
import React, { useRef, useState } from 'react';

const InfoIcon = () => {
  return (
    <svg
      width="14"
      height="14"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24 "
      className="info-icon"
    >
      <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z" />{' '}
    </svg>
  );
};

const InfoPopover = ({ children }: InfoPopoverProps) => {
  const typeRef = useRef(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <span
        ref={typeRef}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="info-icon"
      >
        <InfoIcon />
      </span>
      {open && (
        <Popover targetRef={typeRef} as="span" className="popover" placement='top'>
          {children}
        </Popover>
      )}
    </>
  );
};

export default InfoPopover;

type InfoPopoverProps = { children: React.ReactNode };
