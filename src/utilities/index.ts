
// Pass only new dates, created for this function here
export const addHoursMutable = (inputDate: Date, hours: number) => {
  inputDate.setHours(inputDate.getHours() + hours);
  return inputDate;
};

export const hoursFromDays = (days: number) => days * 24;
