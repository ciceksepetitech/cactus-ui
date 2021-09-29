/**
 * checks platform according to provided regexp
 * @param regExp
 * @returns boolean
 */
const checkPlatform = (regExp: RegExp) => {
  return typeof window !== 'undefined' && window.navigator != null
    ? regExp.test(window.navigator.platform) // browsers still support navigator.platform but need to be careful about deprecation!
    : false;
};

/**
 * checks user agent according to provided regexp
 * @param regExp
 * @returns boolean
 */
function checkUserAgent(regExp: RegExp) {
  return typeof window !== 'undefined' && window.navigator != null
    ? regExp.test(window.navigator.userAgent)
    : false;
}

/**
 * checks if platform is mac or not
 * @returns boolean
 */
export const isMac = () => {
  return checkPlatform(/^Mac/);
};

/**
 * checks if platform is iphone or not
 * @returns boolean
 */
export const isIPhone = () => {
  return checkPlatform(/^iPhone/);
};

/**
 * checks if user-agent is chrome or not
 * @returns boolean
 */
export const isChrome = () => {
  return checkUserAgent(/Chrome/);
};

/**
 * checks if platform is apple device or not
 * @returns boolean
 */
export const isAppleDevice = () => {
  return isIOS() || isMac();
};

/**
 * checks if user-agent is android or not
 * @returns boolean
 */
export const isAndroid = () => {
  return checkUserAgent(/Android/);
};

/**
 * checks if platform is ipad or not
 * @returns boolean
 */
export const isIPad = () => {
  return checkPlatform(/^iPad/) || (isMac() && navigator.maxTouchPoints > 1); // maxTouchPoints check is for iPadOS 13
};

/**
 * checks if platform is ios or not
 * @returns boolean
 */
export const isIOS = () => {
  return isIPhone() || isIPad();
};
