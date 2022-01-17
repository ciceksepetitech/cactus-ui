import { isMac, isChrome, isAppleDevice, isAndroid, isIPad } from '..';
import { cleanup } from '@ciceksepeti/cui-utils';

let platformGetter;
let userAgentGetter;

describe('platform utility tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  beforeEach(() => {
    platformGetter = jest.spyOn(window.navigator, 'platform', 'get');
    userAgentGetter = jest.spyOn(window.navigator, 'userAgent', 'get');
  });

  test('expect isMac to return true', () => {
    platformGetter.mockReturnValue('MacIntel');

    const result = isMac();
    expect(result).toBe(true);
  });

  test('expect isChrome to return true', () => {
    userAgentGetter.mockReturnValue(
      'Mozilla/5.0 (X11; CrOS x86_64 10066.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
    );

    const result = isChrome();
    expect(result).toBe(true);
  });

  test('expect isAppleDevice to return true', () => {
    platformGetter.mockReturnValue('iPhone');

    const result = isAppleDevice();
    expect(result).toBe(true);
  });

  test('expect isAndroid to return true', () => {
    userAgentGetter.mockReturnValue(
      'Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30'
    );

    const result = isAndroid();
    expect(result).toBe(true);
  });

  test('expect isIPad to return true', () => {
    platformGetter.mockReturnValue('iPad');

    const result = isIPad();
    expect(result).toBe(true);
  });

  test('expect isIPad to return true with ontouchstart', () => {
    platformGetter.mockReturnValue('Mac');

    document.documentElement.ontouchstart = () => {};

    const result = isIPad();
    expect(result).toBe(true);

    delete document.documentElement.ontouchstart;
  });

  test('expect isMac to return false', () => {
    platformGetter.mockReturnValue('iPhone');

    const result = isMac();
    expect(result).toBe(false);
  });

  test('expect isChrome to return false', () => {
    userAgentGetter.mockReturnValue(
      'Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30'
    );

    const result = isChrome();
    expect(result).toBe(false);
  });

  test('expect isAppleDevice to return false', () => {
    platformGetter.mockReturnValue('Chrome');

    const result = isAppleDevice();
    expect(result).toBe(false);
  });

  test('expect isAndroid to return false', () => {
    userAgentGetter.mockReturnValue(
      'Mozilla/5.0 (X11; CrOS x86_64 10066.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
    );

    const result = isAndroid();
    expect(result).toBe(false);
  });

  test('expect isIPad to return false while navigator is null', () => {
    const navigatorMock = jest.spyOn(window, 'navigator', 'get');
    navigatorMock.mockReturnValueOnce(null);

    const result = isIPad();
    expect(result).toBe(false);

    navigatorMock.mockClear();
  });

  test('expect isMac to return false while navigator is null', () => {
    const navigatorMock = jest.spyOn(window, 'navigator', 'get');
    navigatorMock.mockReturnValueOnce(null);

    const result = isMac();
    expect(result).toBe(false);

    navigatorMock.mockClear();
  });

  test('expect isChrome to return false', () => {
    const navigatorMock = jest.spyOn(window, 'navigator', 'get');
    navigatorMock.mockReturnValueOnce(null);

    const result = isChrome();
    expect(result).toBe(false);

    navigatorMock.mockClear();
  });
});
