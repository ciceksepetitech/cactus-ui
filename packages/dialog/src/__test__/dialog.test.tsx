import { cleanup } from '@cs/component-utils';

describe('dialog component tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('dialog test', () => {
    expect(5).toBe(5);
  });
});
