/**
 * checks platform according to provided regexp
 *
 * @param regExp
 * @returns boolean
 */
const checkPlatform = (regExp: RegExp): boolean => {
  return typeof window !== 'undefined' && window.navigator != null
    ? regExp.test(window.navigator.platform) // browsers still support navigator.platform but need to be careful about deprecation!
    : false;
};

/**
 * checks user agent according to provided regexp
 *
 * @param regExp
 * @returns boolean
 */
function checkUserAgent(regExp: RegExp): boolean {
  return typeof window !== 'undefined' && window.navigator != null
    ? regExp.test(window.navigator.userAgent)
    : false;
}

/**
 * checks if platform is mac or not
 *
 * @returns boolean
 */
export const isMac = (): boolean => {
  return checkPlatform(/^Mac/);
};

/**
 * checks if platform is iphone or not
 *
 * @returns boolean
 */
export const isIPhone = (): boolean => {
  return checkPlatform(/^iPhone/);
};

/**
 * checks if user-agent is chrome or not
 *
 * @returns boolean
 */
export const isChrome = (): boolean => {
  return checkUserAgent(/Chrome/);
};

/**
 * checks if platform is apple device or not
 *
 * @returns boolean
 */
export const isAppleDevice = (): boolean => {
  return isIOS() || isMac();
};

/**
 * checks if user-agent is android or not
 *
 * @returns boolean
 */
export const isAndroid = (): boolean => {
  return checkUserAgent(/Android/);
};

/**
 * checks if platform is ipad or not
 *
 * @returns boolean
 */
export const isIPad = (): boolean => {
  return (
    checkPlatform(/^iPad/) ||
    (isMac() && 'ontouchstart' in document.documentElement)
  );
};

/**
 * checks if platform is ios or not
 *
 * @returns boolean
 */
export const isIOS = (): boolean => {
  return isIPhone() || isIPad();
};
