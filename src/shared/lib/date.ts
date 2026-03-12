export const formatDate = (dateString : string) =>{
      const [year, month, day] = dateString.split("-").map(Number);
      if(!year || !month || !day){
            throw new Error(`올바르지 않은 날짜 형식 : ${dateString}`)
      }
      return {year, month, day};
}

export const formatDateToKR = (dateString : string)=>{
      const {year, month, day} = formatDate(dateString);
      return `${year}년 ${month}월 ${day}일`
}