import moment from "moment";

export const calcMonth = (date) => {
  const oneMonthsPlus = moment(date).add(1, "months");

  return oneMonthsPlus.format(); //2015-10-13T09:37:35+02:00 - readable format
};
