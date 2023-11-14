// Import constants and utility functions/modules
import { DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE } from '@/utils/app/const';
import { OpenAIError, OpenAIStream } from '@/utils/server';

// Import types for chat
import { ChatBody, Message } from '@/types/chat';

// @ts-expect-error: Import the WebAssembly module required for tiktoken
import wasm from '../../node_modules/@dqbd/tiktoken/lite/tiktoken_bg.wasm?module';

// Import tiktokenModel and tiktoken initialization from @dqbd/tiktoken
import tiktokenModel from '@dqbd/tiktoken/encoders/cl100k_base.json';
import { Tiktoken, init } from '@dqbd/tiktoken/lite/init';

// Configuration specifying the runtime as 'edge'
export const config = {
  runtime: 'edge',
};

// Define the main serverless function handler
const handler = async (req: Request): Promise<Response> => {
  try {
    // Extract relevant data from the request body
    const { model, messages, key, prompt, temperature } = (await req.json()) as ChatBody;

    await init((imports) => WebAssembly.instantiate(wasm, imports)); // Initialize tiktoken with WebAssembly support
    // Create tiktoken encoding using the provided model's parameters
    const encoding = new Tiktoken(
      tiktokenModel.bpe_ranks,
      tiktokenModel.special_tokens,
      tiktokenModel.pat_str,
    );

    // Set a default prompt if none is provided
    let promptToSend = prompt;
    if (!promptToSend) {
      promptToSend = DEFAULT_SYSTEM_PROMPT;
    }
    // Set a default temperature if none is provided
    let temperatureToUse = temperature;
    if (temperatureToUse == null) {
      temperatureToUse = DEFAULT_TEMPERATURE;
    }

    // Encode the prompt to tokens
    const prompt_tokens = encoding.encode(promptToSend);

    // Initialize token count with the length of prompt tokens
    let tokenCount = prompt_tokens.length;
    // Initialize an array to store messages to be sent
    let messagesToSend: Message[] = [];

    // Iterate over messages in reverse order
    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];
      const tokens = encoding.encode(message.content);

      // Check if adding the tokens exceeds the model's token limit
      if (tokenCount + tokens.length + 1000 > model.tokenLimit) {
        break;
      }
      // Update token count and add the message to the array
      tokenCount += tokens.length;
      messagesToSend = [message, ...messagesToSend];
    }

    encoding.free(); // Free up resources used by tiktoken encoding

    // Call the OpenAIStream function to generate a response stream
    const stream = await OpenAIStream(model, promptToSend, temperatureToUse, key, messagesToSend);

    // Return the generated stream as the response
    return new Response(stream);
  } catch (error) {
    // Handle errors during execution
    console.error(error);
    // If the error is an OpenAIError, return a response with an error message and status code
    if (error instanceof OpenAIError) {
      return new Response('Error', { status: 500, statusText: error.message });
    } else {
      // For other types of errors, return a generic error response
      return new Response('Error', { status: 500 });
    }
  }
};

export default handler; // Export the serverless function handler as the default export of the module
