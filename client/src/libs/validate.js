export const validate = () => {
  if (JSON.parse(localStorage["userData"] !== undefined)) {
    return true;
  } else {
    return false;
  }
};
