

export const dateDiff = (start:Date,end:Date) => {
  const diffDate = (end.getTime() - start.getTime()) / (1000*60*60*24);

  return diffDate;
}

export const datePlus = (start:Date,day:number) => {
  const plusDate = new Date(start.getFullYear(),start.getMonth()+1,start.getDate()+day)
  const plusMonth = plusDate.getMonth() === 0 ? 12 : plusDate.getMonth()

  return plusDate.getFullYear()+"-"+String(plusMonth).padStart(2,'0')+"-"+String(plusDate.getDate()).padStart(2,'0');
}

export const dateArray = (date:Date) => {
  if(!date) return;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2,'0');
  const day = String(date.getDate()).padStart(2,'0');

  return [year+"년",month+"월",day+"일"]
}