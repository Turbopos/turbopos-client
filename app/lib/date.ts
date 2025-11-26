import moment from "moment";

export function formatDate(date: Date | string | undefined | null) {
  moment(date).locale("id").format("DD MMMM YYYY");
}
