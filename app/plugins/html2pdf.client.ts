import html2pdf from "html2pdf.js";

export default defineNuxtPlugin({
  name: "html2pdf",
  setup() {
    return {
      provide: {
        html2pdf: html2pdf(),
      },
    };
  },
});
