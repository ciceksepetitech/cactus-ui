import React, { useState, useEffect } from 'react';
import { useIsMounted } from '..';
import { cleanup, screen, render } from '../../../../utils/test-setup';

const fnMock = jest.fn();
const fnSpecificMock = jest.fn();

describe('useEventListener hook tests', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('expect isMounted to be true', () => {
    render(<Component />);
    screen.getByText(/mounted/i);
  });
});

const Component = () => {
  const [text, setText] = useState('');
  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted()) setText('mounted');
    else setText('not mounted');
  }, [isMounted]);

  return <div>{text}</div>;
};
