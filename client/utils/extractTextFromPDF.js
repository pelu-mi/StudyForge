import axios from "axios";

/**
 * Function to extract text from a PDF file using APYHub API
 *
 * @param {Object} fileData - File object containing name, uri, and type
 * @returns {Promise<string>} - Extracted text from the PDF
 */
export async function extractTextFromPDF(fileData) {
  try {
    const form = new FormData();
    form.append("file", {
      uri: fileData.uri, // File URI
      name: fileData.name, // File name
      type: fileData.type, // MIME type
    });
    form.append("preserve_paragraphs", "true");

    const options = {
      method: "POST",
      url: "https://api.apyhub.com/extract/text/pdf-file",
      headers: {
        "apy-token": process.env.EXPO_PUBLIC_APY_API_KEY,
        "Content-Type": "multipart/form-data",
      },
      data: form,
    };

    const response = await axios.request(options);

    console.log("response", response);
    // Return extracted text
    return response.data.data;
  } catch (error) {
    console.error("Error extracting text from PDF:", error.message);
    throw error;
  }
}
