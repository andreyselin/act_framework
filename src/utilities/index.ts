
// Pass only new dates, created for this function here
export const addDaysMutable = (inputDate: Date, days: number) => {
  inputDate.setDate(inputDate.getDate() + days);
  return inputDate;
};
