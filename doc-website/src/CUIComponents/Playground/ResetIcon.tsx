import Popover from '@ciceksepeti/cui-popover';
import React, { useRef, useState } from 'react';

function ResetIconSvg({ className, height, width, fill }: ResetIconSvgProps) {
  return (
    <svg
      className={className}
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1084 1024"
    >
      <path
        fill={fill}
        d="M788.804292 977.500541a503.543363 503.543363 0 0 0 162.507176-119.862595 509.687074 509.687074 0 0 0 103.780528-174.312738 515.047762 515.047762 0 0 0 28.550186-194.068985 514.385205 514.385205 0 0 0-45.53574-190.816432 508.663122 508.663122 0 0 0-118.657945-164.193685A501.676156 501.676156 0 0 0 554.921651 0.530046 503.904757 503.904757 0 0 0 203.585714 166.530704a509.807538 509.807538 0 0 0-94.564962 150.159522L0 290.187944l45.174345 154.014399 45.234577 154.0144 109.382147-116.610042L309.173215 365.056891l-103.057738-24.936238a411.387699 411.387699 0 0 1 69.990118-106.611453 405.846313 405.846313 0 0 1 576.906499-25.960191c166.181356 153.592772 177.625524 415.001647 25.659027 582.869512a406.087243 406.087243 0 0 1-577.026963 25.899958l-66.315938 73.302904a502.097784 502.097784 0 0 0 364.707543 133.836525 499.387323 499.387323 0 0 0 188.768529-45.957367z"
      />
    </svg>
  );
}

function ResetIcon({ onClick }: ResetIconProps) {
  const [iconColor, setIconColor] = useState('#5c5c5c');
  const resetIcoRef = useRef();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <button
      ref={resetIcoRef}
      className="sandbox-button--reset"
      onMouseEnter={() => {
        setIconColor('#268e6c');
        setIsPopoverOpen(true);
      }}
      onMouseLeave={() => {
        setIconColor('#5c5c5c');
        setIsPopoverOpen(false);
      }}
      onClick={() => onClick(null)}
      aria-label="reset"
    >
      <ResetIconSvg fill={iconColor} />
      {isPopoverOpen && (
        <Popover as="div" targetRef={resetIcoRef} className="popover">
          Reset Playground
        </Popover>
      )}
    </button>
  );
}

type ResetIconSvgProps = {
  className?: string;
  height?: string;
  width?: number;
  fill?: string;
};

type ResetIconProps = {
  onClick: (value: null) => void;
};

export default ResetIcon;
