import { cn } from "../../../../../../lib/utils";
import { Lightbulb, Volume2 } from "lucide-react";

function QuestionsSection({ mockInterviewQuestions, activeQuestionIndex }) {

  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech!");
    }
  };

  return (
    mockInterviewQuestions && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestions.map((question, index) => (
            <div
              className={cn(
                `p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
                  activeQuestionIndex === index &&
                  "bg-purple-500 font-semibold text-white"
                }`
              )}
            >
              Question #{index + 1}
            </div>
          ))}
        </div>
        <h2 className="my-5 text-md md:text-lg flex flex-row items-center justify-center gap-3">
          <div>{mockInterviewQuestions[activeQuestionIndex]?.question}</div>
          <Volume2
            onClick={() =>
              textToSpeech(
                mockInterviewQuestions[activeQuestionIndex]?.question
              )
            }
            className="cursor-pointer hover:scale-110 hover:text-green-500 transition-all"
            size={80}
          />
        </h2>

        <div className="border rounded-lg p-5 bg-blue-100 mt-20">
          <h2 className="flex gap-2 items-center text-purple-500">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <div className="ml-2 mt-1 text-gray-600">
            {" "}
            Click on Record Answer when you want to answer the question. At the
            end of interview we will give you the feedback along with correct
            answer for each of the question and your answer to compare it.
          </div>
        </div>
      </div>
    )
  );
}

export default QuestionsSection;
