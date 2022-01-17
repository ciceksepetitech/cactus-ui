import { setRevertableStyle } from '..';
import { cleanup } from '@ciceksepeti/cui-utils';

describe('setRevertableStyle utility tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('expect setRevertableStyle to revert style to initial setting when callback is called', () => {
    const p = document.createElement('p');

    const revert = setRevertableStyle(p, 'visibility', 'hidden');
    expect(p).not.toBeVisible();

    revert();
    expect(p).not.toBeVisible();
  });
});
