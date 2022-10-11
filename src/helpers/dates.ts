export function fromUniversityToUTC(date: string) {
    const dateSplitted = date.split('/')
    const parsed = `${dateSplitted[2]}-${dateSplitted[1]}-${dateSplitted[0]}`
    return parsed
}

export function compateTwoDates(date1: Date, date2: Date) {
    // return date1.getUTCFullYear() === date2.getUTCFullYear() && date1.getUTCDate() === date2.getUTCDate() && date1.getUTCMonth() === date2.getUTCMonth();
    return new Date(date1).getFullYear() === new Date(date2).getFullYear() && new Date(date1).getDate() === new Date(date2).getDate() && new Date(date1).getMonth() === new Date(date2).getMonth();
}

//https://stackabuse.com/javascript-get-number-of-days-between-dates/
export function getNumberOfDays(date1: Date, date2: Date) {

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
}

export function diffDates(date1: Date, date2: Date) {
    return date2.getTime() - date1.getTime();
}