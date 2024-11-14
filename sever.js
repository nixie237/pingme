const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to get AI response
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // API request to OpenAI
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: "text-davinci-003", // Using the GPT-3 model
                prompt: userMessage,
                max_tokens: 150,
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer YOUR_API_KEY`, // Use your OpenAI API key here
                }
            }
        );

        const aiResponse = response.data.choices[0].text.trim();
        res.json({ message: aiResponse });
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
