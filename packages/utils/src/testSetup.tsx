import React, { FC } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';

/**
 * wrapper for test environment
 * might contain some providers etc
 *
 * @param param0
 * @returns
 */
const Wrapper = ({ children }) => {
  // Providers or other kind of wrappers might be needed
  return <>{children}</>;
};

/**
 * extends default render function of @testing-library/react
 *
 * @param ui
 * @param options
 * @returns
 */
const customRender = (
  ui: React.ReactElement,
  options?: RenderOptions
): RenderResult => render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';
export { customRender as render };
