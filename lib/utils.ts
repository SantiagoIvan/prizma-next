import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {format} from "date-fns";
import {es} from 'date-fns/locale/es'

const environment = process.env.NEXT_ENV

export const formatDateWithLocale = (date: Date | number | string | undefined) => {
  if(date) return format(date, 'yyyy-MM-dd', {locale: es})
}

export type FilterOptions = {
  origin?: string,
  dateFrom?: string,
  dateTo?: string,
}

export const INITIAL_MOVEMENT_VALUE = {
  id: '',
  origin: '',
  amount: '0',
  description: '',
  date: formatDateWithLocale(new Date()),
}

export const INITIAL_FILTER_VALUE = {
  origin: '',
  dateFrom: '',
  dateTo: ''
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getBaseURL()  {
  if(environment == 'prod') return process.env.NEXT_BACKEND_BASE_URL_PROD
  return process.env.NEXT_BACKEND_BASE_URL_DEV
}