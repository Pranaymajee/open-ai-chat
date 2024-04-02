import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey : process.env.REACT_APP_API_KEY,
    dangerouslyAllowBrowser:true
});

export async function sendMsgToOpenAi(message) {

    const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: message,
        temperature: 0.7,
        max_tokens: 250,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    });
    return response.choices[0].text;

}