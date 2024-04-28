import TextField from "../text-field/TextField"
import OptionsTextField from "../options-text-field/OptionsTextField"
import toast from 'react-hot-toast';
import { useState, useCallback } from "react"
import { validatePollQuestion } from "../../helpers/validate-poll-question";
import { createPoll } from "../../api/polls";

const defaultMaxOptions = 10;

interface PollCreatorProps {
  maxOptions?: number;
}

function PollCreator(props: PollCreatorProps) {
  const { maxOptions = defaultMaxOptions } = props;
  const [options, setOptions] = useState<string[]>([])
  const [question, setQuestion] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [optionsError, setOptionsError] = useState<string>("")
  const [questionError, setQuestionError] = useState<string>("")

  const resetInputFields = () => {
    setOptions([])
    setQuestion("")
  }

  const validateOptions = useCallback((currentOptions: string[]) => {
    const uniqueOptions = new Set(currentOptions);

    if (uniqueOptions.size !== currentOptions.length) {
      setOptionsError("All options must be unique.");
      return false;
    } else if (currentOptions.length < 2) {
      setOptionsError("At least 2 options are required.");
      return false;
    } else if (currentOptions.length > maxOptions) {
      setOptionsError(`No more than ${maxOptions} options are allowed.`);
      return false;
    } else {
      setOptionsError("");
      return true;
    }
  }, [setOptionsError, maxOptions]);

  const validateQuestion = useCallback((currentQuestion: string) => {
    if (currentQuestion.trim() === "") {
      setQuestionError("Question is required.");
      return false;
    }
    setQuestionError("");
    return true;
  }, [setQuestionError]);

  const handleAddOption = useCallback((value: string) => {
    setOptions(prevOptions => {
      const newOptions = [...prevOptions, value];
      if (newOptions.length > 1) {
        validateOptions(newOptions);
      }
      return newOptions;
    });
  }, [setOptions, validateOptions]);

  const handleRemoveOption = useCallback((index: number) => {
    setOptions((prev) => {
      const newOptions = prev.filter((_, i) => i !== index);
      validateOptions(newOptions);
      return newOptions;

    });
  }, [setOptions, validateOptions]);

  const handleQuestionChange = useCallback((value: string) => {
    setQuestion(value);
    validateQuestion(value);
  }, [setQuestion, validateQuestion]);

  const handleSubmit = useCallback(async () => {
    const { isValid: isQuestionValid, message } = validatePollQuestion(question);
    if (!isQuestionValid) {
      setQuestionError(message);
    }
    const isOptionsValid = validateOptions(options);

    if (!isQuestionValid || !isOptionsValid) {
      return;
    }
    setLoading(true);
    try {
      await createPoll({ question, options });
      resetInputFields();
      toast.success("Poll created successfully!");
    } catch (error) {
      toast.error("Failed to create poll. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [question, options, validateQuestion, validateOptions, resetInputFields]);

  return (
    <div className="max-w-[448px] mx-4 sm:mx-auto mt-10 rounded-lg border border-offwhite shadow-md">
      <div className="p-4">
        <h1 className="font-semibold text-lg">Create Your Poll</h1>
        <div className="mt-6">
          <TextField label="Poll Question" placeholder="Ex: What should we have for lunch tomorrow?" value={question} onChange={handleQuestionChange} />
          {questionError && <div className="text-red-500 text-xs">{questionError}</div>}
        </div>
        <div className="mt-6">
          <OptionsTextField label="Poll Options" placeholder="Ex: Pizza" onPlusButtonClick={handleAddOption} />
          {optionsError && <div className="text-red-500 text-xs">{optionsError}</div>}
        </div>
        {options.length > 0 && (
          <div className="mt-6 border border-offwhite ">
            <div className="w-full">
              {options.map((option, index) => (
                <div key={index} className="flex justify-between py-2 px-4 border-b border-offwhite last:border-b-0">
                  <span className="font-medium">{option}</span>
                  <button
                    onClick={() => handleRemoveOption(index)}
                    className="text-teal hover:text-teal-dark text-xs"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="p-4 flex justify-end border-t border-offwhite mt-6">
        <button
          className={`text-white py-1 px-6 rounded text-sm ${loading ? 'bg-offwhite cursor-not-allowed' : 'bg-teal hover:bg-teal-dark'}`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>

      </div>
    </div>
  )
}

export default PollCreator
