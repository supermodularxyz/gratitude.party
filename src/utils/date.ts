import { format } from "date-fns";

export const toYear = (d: number = Date.now()) =>
  format(new Date(d), "yyyy-MM-dd");
