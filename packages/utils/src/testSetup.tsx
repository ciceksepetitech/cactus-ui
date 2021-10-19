import React, { FC } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';

const Wrapper: FC = ({ children }) => {
  // Providers or other kind of wrappers might be needed
  return <>{children}</>;
};

const customRender = (
  ui: React.ReactElement,
  options?: RenderOptions
): RenderResult => render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';
export { customRender as render };
