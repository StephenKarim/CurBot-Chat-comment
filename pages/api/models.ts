// Import constants related to OpenAI API configuration
import { OPENAI_API_HOST, OPENAI_API_TYPE, OPENAI_API_VERSION, OPENAI_ORGANIZATION } from '@/utils/app/const';

// Import OpenAI model-related types
import { OpenAIModel, OpenAIModelID, OpenAIModels } from '@/types/openai';

// Configuration for the Next.js API route
export const config = {
  runtime: 'edge',
};

// Define the API route handler
const handler = async (req: Request): Promise<Response> => {
  try {
    // Parse the request body to extract the API key
    const { key } = (await req.json()) as {
      key: string;
    };

    // Initialize the URL for fetching OpenAI models
    let url = `${OPENAI_API_HOST}/v1/models`;
    // Adjust the URL for Azure deployments if the API type is set to 'azure'
    if (OPENAI_API_TYPE === 'azure') {
      url = `${OPENAI_API_HOST}/openai/deployments?api-version=${OPENAI_API_VERSION}`;
    }

    // Fetch the list of models from the OpenAI API
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        // Set headers based on the API type (OpenAI or Azure)
        ...(OPENAI_API_TYPE === 'openai' && {
          Authorization: `Bearer ${key ? key : process.env.OPENAI_API_KEY}`
        }),
        ...(OPENAI_API_TYPE === 'azure' && {
          'api-key': `${key ? key : process.env.OPENAI_API_KEY}`
        }),
        // Include organization header if OpenAI organization is configured
        ...((OPENAI_API_TYPE === 'openai' && OPENAI_ORGANIZATION) && {
          'OpenAI-Organization': OPENAI_ORGANIZATION,
        }),
      },
    });

    // Handle unauthorized (401) response by returning a 500 Internal Server Error
    if (response.status === 401) {
      return new Response(response.body, {
        status: 500,
        headers: response.headers,
      });
    } else if (response.status !== 200) {
      // Log and throw an error if the OpenAI API returns an unexpected status code
      console.error(
        `OpenAI API returned an error ${
          response.status
        }: ${await response.text()}`,
      );
      throw new Error('OpenAI API returned an error');
    }

    // Parse the JSON response from the OpenAI API
    const json = await response.json();

    // Extract relevant information about the models and format it
    const models: OpenAIModel[] = json.data
      .map((model: any) => {
        // Determine the model name based on the API type
        const model_name = (OPENAI_API_TYPE === 'azure') ? model.model : model.id;
        // Map the model name to the corresponding OpenAIModelID and retrieve name
        for (const [key, value] of Object.entries(OpenAIModelID)) {
          if (value === model_name) {
            return {
              id: model.id,
              name: OpenAIModels[value].name,
            };
          }
        }
      })
      .filter(Boolean);// Filter out any undefined values from the mapping

    // Return a JSON response with the formatted list of models
    return new Response(JSON.stringify(models), { status: 200 });
  } catch (error) {
    console.error(error); // Handle errors by logging them and returning a 500 Internal Server Error response
    return new Response('Error', { status: 500 });
  }
};

export default handler; // Export the API route handler
