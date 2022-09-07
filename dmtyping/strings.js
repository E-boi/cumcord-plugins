export const DTMI_TYPING_USERS_COUNT = new String('{count} typing...');

DTMI_TYPING_USERS_COUNT.format = function (obj) {
  let str = DTMI_TYPING_USERS_COUNT.toString();
  Object.entries(obj).forEach(p => (str = str.replace(`{${p[0]}}`, p[1])));
  return str;
};
