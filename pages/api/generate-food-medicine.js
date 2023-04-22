// this is an API endpoint, that will be executed on the server side as a normal NodeJS-API
// all the communication with openai-API happens in this generate.js

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    const { symptom } = req.body;
    const prompt = generatePrompt(symptom);

    console.log(prompt);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 2048,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(symptom) {
  return `suggest 3 foods I should consume and 3 foods I should avoid to prevent ${symptom}`;
}
