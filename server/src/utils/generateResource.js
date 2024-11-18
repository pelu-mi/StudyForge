/** ========================================================================= */
/* OpenAI API */
/** ========================================================================= */
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI({
  apiKey:
    "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",
});

async function parseTextWithGPT(source_text, num_questions) {
  // Get text from PDF
  //const source_text = await extractTextFromPDF(pdfPath);
  // Initalize system text
  const system_text = `You are a study helper. \
  Extract the information into different sections, \
  providing a summary not more than 200 words, \
  a list of key concepts to take note of and \
  ${num_questions} multiple choice questions identifying the correct answer. `;

  // Add more context using frontend values here
  if (false) {
    system_text =
      "Take into consideration the following: {params and values from frontend}" +
      system_text;
  }

  // Specify zod JSON Schema format for Reesource object
  const questionSchema = z.object({
    question: z.string(),
    option_A: z.string(),
    option_B: z.string(),
    option_C: z.string(),
    option_D: z.string(),
    correct_option: z.string(),
  });

  const conceptSchema = z.object({
    concept: z.string(),
    concept_summary: z.string(),
  });

  const resourceSchema = z.object({
    summary: z.string(),
    key_concepts: z.array(conceptSchema),
    quiz: z.array(questionSchema),
  });

  // Access GPT API
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o",
    messages: [
      { role: "system", content: system_text },
      { role: "user", content: source_text },
    ],
    temperature: 0.65,
    response_format: zodResponseFormat(resourceSchema, "resources"),
  });

  const event = completion.choices[0].message.parsed;
  return event; // Print the response to console
}

export default parseTextWithGPT;
/**/
