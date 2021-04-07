export const parseDate = (date) => {
  const parsedDate = new Date(date);
  let parseMonth = parsedDate.getMonth();
  parseMonth += 1;
  if (parseMonth < 10) {
    parseMonth = `0${parseMonth}`;
  }
  return `${parseMonth}-${parsedDate.getDate()}-${parsedDate.getFullYear()}`;
};
