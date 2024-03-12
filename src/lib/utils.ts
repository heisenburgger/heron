import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatDate(date: Date) {
	let day: string | number = date.getDate();
	let month: string | number = date.getMonth() + 1;
	const year = date.getFullYear();
	if (day < 10) {
		day = '0' + day;
	}
	if (month < 10) {
		month = '0' + month;
	}
	return day + '-' + month + '-' + year;
}

export function getInterval(start: number, end: number, incr: number) {
  const interval = [start]
  for(let i = start + incr; i < end; i += incr) {
    interval.push(i)
  }
  return interval
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
