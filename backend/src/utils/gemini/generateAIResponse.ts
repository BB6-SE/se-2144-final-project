import { AIInputType, AIOutputOption } from "../../types/ai.types";
import { config, model } from "./initializeGemini";

const generateAIResponse = async (
  input: AIInputType,
  outputOption: AIOutputOption,
) => {
  try {
    model.generationConfig.responseSchema = config[outputOption].schema;

    // if input is text
    if (typeof input === "string") {
      const result = await model
        .generateContent(config[outputOption].prompt + input)
        .catch((error) => {
          throw new Error(
            error instanceof Error
              ? error.message
              : "Unknown error on generating summary",
          );
        });

      return result.response.text();
    }
    // if input is a list of files
    else {
      const result = await model
        .generateContent([
          ...input.filter((file) => file !== null),
          { text: config["flashcards"].prompt },
        ])
        .catch((error) => {
          throw new Error(
            error instanceof Error
              ? error.message
              : "Unknown error on generating flashcards",
          );
        });

      return result.response.text();
    }
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : `An unknown error occurred while generating ${outputOption}`,
    );
  }
};

export default generateAIResponse;