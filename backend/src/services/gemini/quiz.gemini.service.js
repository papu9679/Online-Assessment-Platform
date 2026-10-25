import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY,
});

const quizSchema = {
	type: 'object',

	properties: {
		title: {
			type: 'string',
		},

		tags: {
			type: 'array',
			items: {
				type: 'string',
			},
		},

		questions: {
			type: 'array',

			items: {
				type: 'object',

				properties: {
					question: {
						type: 'string',
					},

					options: {
						type: 'array',
						items: {
							type: 'string',
						},
						minItems: 4,
						maxItems: 4,
					},

					correctOption: {
						type: 'integer',
						minimum: 0,
						maximum: 3,
					},
				},

				required: ['question', 'options', 'correctOption'],
			},
		},
	},

	required: ['title', 'tags', 'questions'],
};

const generateQuizWithGemini = async (quizConfig) => {
	const { topic, difficulty, numberOfQuestions } = quizConfig;
	const prompt = `
                    Generate a multiple-choice quiz.

                    Topic: ${topic}
                    Difficulty: ${difficulty}
                    Number of Questions: ${numberOfQuestions}

                    Requirements:

                    - Generate exactly ${numberOfQuestions} questions.
                    - Every question must have exactly 4 options.
                    - correctOption must be the index of the correct option.
                    - correctOption must be between 0 and 3.
                    - Generate a suitable title for the quiz.
                    - Generate 3 to 5 relevant tags.
                    - Questions should match the requested difficulty.
                    - Avoid duplicate questions.
                    `;

	try {
		const response = await ai.models.generateContent({
			model: 'gemini-3.8-flash',

			contents: prompt,

			config: {
				responseMimeType: 'application/json',
				responseSchema: quizSchema,
			},
		});

		const quiz = JSON.parse(response.text);

		return quiz;
	} catch (error) {
		console.error('Gemini Quiz Generation Error:', error.message);

		throw new Error('Failed to generate quiz using Gemini', {
			cause: error,
		});
	}
};

export default generateQuizWithGemini;
