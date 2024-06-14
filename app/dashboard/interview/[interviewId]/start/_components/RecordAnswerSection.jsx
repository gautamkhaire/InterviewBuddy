import Image from "next/image";
import Webcam from "react-webcam";
import { Button } from "../../../../../../components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { useEffect, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { toast } from "react-toastify";
import { chatSession } from "../../../../../../utils/GeminiAIModel";
import { db } from "../../../../../../utils/db";
import { UserAnswer } from "../../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function RecordAnswerSection({
  mockInterviewQuestions,
  activeQuestionIndex,
  interviewData,
}) {
  const { user } = useUser();
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswerInDB();
    }
  }, [userAnswer]);

  const StartStopRecording = () => {
    if (isRecording) {
      stopSpeechToText();
      // if (userAnswer?.length < 10) {
      //   setLoading(false);
      //   toast.error("Error while saving your answer. Please record again!", {
      //     position: "bottom-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //   });
      //   return;
      // }
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswerInDB = async () => {
    setLoading(true);
    const feedbackPrompt =
      "Question:" +
      mockInterviewQuestions[activeQuestionIndex]?.question +
      ", User Answer:" +
      userAnswer +
      ", Depending on the question and user answer for given interview question please give us rating for answer and feedback as areaa of improvement in just 3 to 5 lines to improve it in Json format with rating field and feedback field";

    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    const JsonFeedbackResp = JSON.parse(mockJsonResp);

    const response = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestions[activeQuestionIndex]?.question,
      correctAnswer: mockInterviewQuestions[activeQuestionIndex]?.answer,
      userAnswer: userAnswer,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress.emailAddress,
      createdAt: moment().format("DD-MM-yyyy"),
    });

    if (response) {
      toast.success("User answer recorded successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    
    setUserAnswer("");
    setResults([]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-xl p-5">
        <Image
          src="/webcam.png"
          width={200}
          height={200}
          alt="Webcam Image"
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button
        className="my-10 hover:scale-105 transition-all"
        onClick={StartStopRecording}
        disabled={loading}
      >
        {isRecording ? (
          <div className="flex gap-2 items-center justify-center">
            <MicOff /> Stop Recording
          </div>
        ) : (
          <div className="flex gap-2 items-center justify-center">
            <Mic /> Record Answer
          </div>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
