import { cleanup } from '@cs/component-utils';

describe('dialog component tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('utils test', () => {
    expect(5).toBe(5);
  });
});
