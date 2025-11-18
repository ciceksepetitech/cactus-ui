import { SyntheticEvent } from 'react';
import { mergeEventHandlers } from '..';
import { cleanup } from '../../../../utils/test-setup';

let userMockFn;
let libraryMockFn;
let mockEvent = {} as Event | SyntheticEvent<Element, Event>;

describe('useIsCSR hook tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  beforeEach(() => {
    userMockFn = jest.fn();
    libraryMockFn = jest.fn();
  });

  test('expect library provided function to be called', () => {
    mergeEventHandlers(undefined, libraryMockFn)(mockEvent);
    expect(libraryMockFn).toHaveBeenCalledTimes(1);
  });

  test('expect both provided function to be called', () => {
    mergeEventHandlers(userMockFn, libraryMockFn)(mockEvent);
    expect(userMockFn).toHaveBeenCalledTimes(1);
    expect(libraryMockFn).toHaveBeenCalledTimes(1);
  });

  test('expect only user function to be called when event.preventDefaulted', () => {
    mergeEventHandlers(
      userMockFn,
      libraryMockFn
    )({ defaultPrevented: true } as Event | SyntheticEvent<Element, Event>);

    expect(userMockFn).toHaveBeenCalledTimes(1);
    expect(libraryMockFn).toHaveBeenCalledTimes(0);
  });
});
