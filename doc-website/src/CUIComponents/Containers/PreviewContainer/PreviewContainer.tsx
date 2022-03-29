import React from 'react';

type ContainerProps = {
  title: string;
  children: React.ReactNode;
  contentType?: string;
};
const PreviewContainer = ({
  title,
  children,
  contentType = 'PREVIEW',
}: ContainerProps) => {
  return (
    <div className="preview">
      <small className="preview__header">{contentType}</small>
      {title !== '' && (
        <div className="preview__title mb-15 ">
          <span>{title}</span>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default PreviewContainer;
