export const getDateTimeString = () => {
  const now = new Date();
  const yearNow = now.getFullYear();
  const monthNow =
    now.getMonth().toString().length > 1
      ? now.getMonth() + 1
      : `0${now.getMonth() + 1}`;
  const dayNow =
    now.getDate().toString().length > 1 ? now.getDate() : `0${now.getDate()}`;
  const nowDateTimeString = `${yearNow}-${monthNow}-${dayNow}`;
  return nowDateTimeString;
};

export const checkVisitValue = (el, minValue, maxValue) => {
  if (+el.value < minValue || +el.value > maxValue || el.value === '') {
    el.style.borderColor = 'red';
    return '';
  } else {
    el.style.borderColor = '#006196';
    return el.value;
  }
};
