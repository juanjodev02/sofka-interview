import { DateTime } from "luxon";

class _DateUtils {
  formatString(text: string) {
    if (!text) {
      return "";
    }
    const newValue = text.replace(/\D/g, "");

    if (newValue.length <= 2) {
      return newValue;
    }
    if (newValue.length <= 4) {
      return `${newValue.slice(0, 2)}/${newValue.slice(2)}`;
    }
    if (newValue.length <= 6) {
      return `${newValue.slice(0, 2)}/${newValue.slice(2, 4)}/${newValue.slice(4)}`;
    }
    return `${newValue.slice(0, 2)}/${newValue.slice(2, 4)}/${newValue.slice(4, 8)}`;
  }

  parseDate(date?: string) {
    if (!date) {
      return "";
    }

    return DateTime.fromISO(date, {
      zone: "utc",
    }).toFormat("dd/MM/yyyy");
  }

  addYears(date: string, years: number) {
    if (!date) {
      return "";
    }
    return DateTime.fromFormat(date, "dd/MM/yyyy")
      .plus({ years })
      .toFormat("dd/MM/yyyy");
  }

  parseToServicesFormat(date: string) {
    if (!date) {
      return "";
    }
    return DateTime.fromFormat(date, "dd/MM/yyyy").toFormat("yyyy-MM-dd");
  }
}

export const DateUtils = new _DateUtils();
