import generateQuizWithGemini from './gemini/quiz.gemini.service.js';
// import generateQuizWithOpenAI from "./openAI/quiz.openai.service.js";
// import generateQuizWithGroq from "./groq/quiz.groq.service.js";

const quizServices = [
	generateQuizWithGemini,
	// generateQuizWithOpenAI,
	// generateQuizWithGroq,
];

export const generateQuizFromAI = async (quizConfig) => {
	for (const service of quizServices) {
		try {
			console.log(`Trying ${service.name}...`);

			const quiz = await service(quizConfig);

			console.log('Quiz generated successfully:', quiz);

			return quiz;
		} catch (error) {
			console.error(`${service.name} failed:`, error.message);
		}
	}

	throw new Error('Sorry, all AI services are currently unavailable.');
};