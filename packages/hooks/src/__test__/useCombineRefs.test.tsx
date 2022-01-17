import React from 'react';
import { useCombinedRefs } from '..';
import { render, cleanup } from '@ciceksepeti/cui-utils';

const refFunctionMock = jest.fn(); // to simulate forwarded ref
const refMutableRefObject = { current: undefined }; // to simulate MutableRefObject

describe('useCombinedRefs hook tests', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  test('expect useCombinedRefs not to responde to null refs', () => {
    render(<ComponentWithNullRef />);
    expect(refFunctionMock).toHaveBeenCalledTimes(0);
    expect(refMutableRefObject.current).toBe(undefined);
  });

  test('expect useCombinedRefs combine internal ref and fowarded ref', () => {
    const { rerender } = render(<Component />);
    expect(refFunctionMock).toHaveBeenCalledTimes(1);
    expect(refMutableRefObject.current).not.toBe(null);

    rerender(<Component hidden />);
    expect(refFunctionMock).toHaveBeenCalledTimes(2); // @see https://github.com/facebook/react/issues/9328#issuecomment-291621897
    expect(refFunctionMock).toHaveBeenCalledWith(null);
    expect(refMutableRefObject.current).toBe(null);
  });
});

const Component = (props: any) => {
  const { hidden } = props;
  const ref = useCombinedRefs(refFunctionMock, refMutableRefObject);
  return hidden ? null : <div ref={ref}></div>;
};

const ComponentWithNullRef = (props: any) => {
  const { hidden } = props;
  const ref = useCombinedRefs(null, null);
  return hidden ? null : <div ref={ref}></div>;
};
