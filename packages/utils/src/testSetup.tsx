import React from 'react';
import { render, RenderOptions } from '@testing-library/react';

const Wrapper = ({ children }) => {
  // Providers or other kind of wrappers might be needed
  return <>{children}</>;
};

const customRender = (
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  options?: RenderOptions
) => render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';
export { customRender as render };
