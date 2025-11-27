import moment from "moment";

export function formatDate(date: Date | string | undefined | null) {
  return moment(date).locale("id").format("DD MMMM YYYY");
}
