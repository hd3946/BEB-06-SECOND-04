export const validate = () => {
  if (JSON.parse(localStorage["userData"] !== undefined)) {
    return true;
  } else {
    return false;
  }
};

export const validateData = () => {
  if (JSON.parse(localStorage["userData"] !== undefined)) {
    return JSON.parse(localStorage["userData"]);
  }
  return false;
};

export const postValidate = (postNickname) => {
  const name = validateData().nickname;
  if (name === postNickname) {
    return true;
  } else {
    return false;
  }
};

export const loginInfo = () => {
  if (JSON.parse(localStorage["userData"] !== undefined)) {
    return JSON.parse(localStorage["userData"]);
  }
};
