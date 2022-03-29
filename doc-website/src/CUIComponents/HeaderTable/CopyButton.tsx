/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Popover from '@ciceksepeti/cui-popover';
import React, { useRef, useState } from 'react';

type CopyButtonProps = {
  text: string;
};

function CopyIcon() {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 330 330"
      xmlSpace="preserve"
      height="13px"
      className="copy-icon"
    >
      <g>
        <path
          d="M35,270h45v45c0,8.284,6.716,15,15,15h200c8.284,0,15-6.716,15-15V75c0-8.284-6.716-15-15-15h-45V15
		c0-8.284-6.716-15-15-15H35c-8.284,0-15,6.716-15,15v240C20,263.284,26.716,270,35,270z M280,300H110V90h170V300z M50,30h170v30H95
		c-8.284,0-15,6.716-15,15v165H50V30z"
        />
        <path d="M155,120c-8.284,0-15,6.716-15,15s6.716,15,15,15h80c8.284,0,15-6.716,15-15s-6.716-15-15-15H155z" />
        <path d="M235,180h-80c-8.284,0-15,6.716-15,15s6.716,15,15,15h80c8.284,0,15-6.716,15-15S243.284,180,235,180z" />
        <path
          d="M235,240h-80c-8.284,0-15,6.716-15,15c0,8.284,6.716,15,15,15h80c8.284,0,15-6.716,15-15C250,246.716,243.284,240,235,240z
		"
        />
      </g>
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
    </svg>
  );
}

function CopyButton({ text }: CopyButtonProps) {
  const iconRef = useRef();
  const [popover, setPopover] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setCopied(true);
    setPopover(false);
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  if (copied) {
    return <span className="copy-icon__text fw-400">Copied!</span>;
  }

  return (
    <span
      ref={iconRef}
      onMouseEnter={() => {
        setPopover(true);
      }}
      onMouseLeave={() => setPopover(false)}
      onClick={handleClick}
      className={popover ? 'copy-icon__hover' : ''}
    >
      <CopyIcon />
      {popover && (
        <Popover as="span" targetRef={iconRef} className="popover">
          <span className="popover__context fw-400">Copy!</span>
        </Popover>
      )}
    </span>
  );
}
export default CopyButton;
