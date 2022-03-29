import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
};
export default function InfoContainer({ children }: ContainerProps) {
  return (
    <div className="info">
      <p className="info__text">{children}</p>
    </div>
  );
}
