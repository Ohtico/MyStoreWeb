import html2pdf from "html2pdf.js";

/**
 *  ExportPdf - Funcion para exportar documento PDF
 *
 * @component
 * @param {String } id Id del div que se va a exportar.
 * @param {String} name Nombre que llevara el documento al exportar.
 * @param {String} orien Orientacion del archivo
 *
 * @return {Function} Retorna Documento PDF.
 */

export const ExportPdf = (id, name, orien) => {
  // landscape horizontal
  let element = window.document.getElementById(id).innerHTML;
  let opt = {
    Margin: 10,
    filename: `${name}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 3, letterRendering: true },
    jsPDF: {
      unit: "in",
      format: "A4",
      orientation: orien ? orien : "portrait",
    },
  };
  html2pdf().set(opt).from(element).save();
};
