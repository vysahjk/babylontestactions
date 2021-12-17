// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

export function getDateAtMidnight(date) {
  if (date === undefined || date === null) {
    return date;
  }
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
}
