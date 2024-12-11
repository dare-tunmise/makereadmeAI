const express = require('express');
const bodyParser = require('body-parser');
const openAI = require('openai');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const openai = new openAI({
    apiKey: process.env.OPENAI_API_KEY
});

//endpoint
app.post('/create-readme', async(req, res)=> {
    const { projectName, description, features, installation, usage } = req.body;

    if(!projectName || !description) {
        return res.status(400).json({error: 'You must provide project name and description!'})
    }

    const prompt = `
        Generate a professional README file for a project with the following details:
        - Project Name: ${projectName}
        - Description: ${description}
        - Features: ${features || 'Not provided'}
        - Installation Steps: ${installation || 'Not provided'}
        - Usage Instructions: ${usage || 'Not provided'}
        Make it concise and well-formatted.
    `;

    try {
        const response = await openai.chat.completions.create({
            message: [{role: "system", content: "you are a helpful assistant"}],
            model: 'gpt-3.5-turbo',
            prompt: prompt,
            temperature: 0.7
        });

        res.json({ readme: response.data.choices[0].text.trim() });
    } catch (error) {
        console.log('Error generating README:', error.message);
        res.status(500).json({error: 'Failed to generate README. Please try again.'})
    }

})


app.listen(port, ()=> {
    console.log(`app is listening at http;//localhost:${port}`);
})