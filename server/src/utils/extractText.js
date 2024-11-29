/** PDF to text parsing */
import fs from "fs";
// PDF-parse does not work with import statements so you have to call it like this
import { createRequire } from "module";
import response from "./response.js";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

/** Function to extract text from a PDF file
 *
 * @param {string} pdfPath - path to file
 * @returns
 */
// async function extractTextFromPDF(pdfPath) {
//   try {
//     // Read the PDF file
//     const pdfData = fs.readFileSync(pdfPath);

//     // Parse the PDF
//     const data = await pdf(pdfData);

//     // Return the extracted text
//     return data.text;
//   } catch (error) {
//     console.error("Error extracting text from PDF:", error.message);
//     throw error;
//   }
//   // NOTE: Warning messages "TT: undefined function" are bad font recovery messages
//   // Means that the problem is with document fonts not the function
// }

async function extractTextFromPDF(filePath) {
  const pdfBuffer = fs.readFileSync(filePath);
  const pdfData = await pdfParse(pdfBuffer);

  //HANDLE TT WARNING ERROR PLEASE

  return response.buildSuccessResponse("Text Extracted", 200, pdfData.text);
}

async function deleteFile(filePath) {
  fs.unlinkSync(filePath);
}

export default { extractTextFromPDF, deleteFile };
