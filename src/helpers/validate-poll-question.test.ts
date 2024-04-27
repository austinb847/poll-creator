import { validatePollQuestion } from './validate-poll-question';

describe('validatePollQuestion', () => {
  it('returns false if the question is empty', () => {
    const result = validatePollQuestion('');
    expect(result).toEqual({ isValid: false, message: "Question is required." });
  });

  it('returns false if the question does not end with a question mark', () => {
    const result = validatePollQuestion('What time is it');
    expect(result).toEqual({ isValid: false, message: "Question should end with a question mark." });
  });

  it('returns false if the question does not contain a keyword', () => {
    const result = validatePollQuestion('Time?');
    expect(result).toEqual({ isValid: false, message: "Question should include a keyword like 'who', 'what' etc." });
  });

  it('returns true for a valid question containing a keyword and ending with a question mark', () => {
    const result = validatePollQuestion('What time is it?');
    expect(result).toEqual({ isValid: true, message: "Valid question." });
  });

  it('returns true for a valid question containing different casing for keywords', () => {
    const result = validatePollQuestion('HOW are you?');
    expect(result).toEqual({ isValid: true, message: "Valid question." });
  });

  it('checks minimal valid question containing only a keyword and a question mark', () => {
    const result = validatePollQuestion('Why?');
    expect(result).toEqual({ isValid: true, message: "Valid question." });
  });
});