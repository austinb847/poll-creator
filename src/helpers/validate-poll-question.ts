export type PollValidationResult = {
  isValid: boolean;
  message: string;
};

/**
 * Validates if the input text qualifies as a valid poll question.
 */
export function validatePollQuestion(question: string): PollValidationResult {
  const trimmedQuestion = question.trim();

  if (trimmedQuestion === "") {
    return { isValid: false, message: "Question is required." };
  }

  if (!trimmedQuestion.endsWith('?')) {
    return { isValid: false, message: "Question should end with a question mark." };
  }

  const questionKeywords = ['who', 'what', 'where', 'when', 'why', 'how', 'should', 'do'];
  const containsKeyword = questionKeywords.some(keyword => trimmedQuestion.toLowerCase().includes(keyword));
  if (!containsKeyword) {
    return { isValid: false, message: "Question should include a keyword like 'who', 'what' etc." };
  }

  return { isValid: true, message: "Valid question." };
}
