"use client";

import { useEffect, useState } from "react";
import { db } from "../../../../../utils/db";
import { UserAnswer } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../../components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "../../../../../lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "../../../../../components/ui/button";
import { LayoutDashboard } from "lucide-react";

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState();
  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);
    console.log(result);
    setFeedbackList(result);
  };

  const router = useRouter();

  return (
    <div className="p-10">
      {feedbackList?.length === 0 ? (
        <h2 className="text-3xl font-bold text-red-500 my-10">
          No Interview record Found
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">
            Congratulation!! 🎉
          </h2>
          <h2 className="font-bold text-2xl">
            Here is your interview feedback
          </h2>

          <h2 className="text-purple-500 text-xl my-3 font-semibold">
            Your overall interview rating: <strong>{feedbackList && feedbackList[0]?.rating}/10</strong>
          </h2>
          <h2 className="text-sm text-gray-500">
            Find below interview question with correct answer, your answer and
            feedback for improvement
          </h2>
          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-5">
                <CollapsibleTrigger className="w-full p-2 bg-purple-400/90 text-white font-semibold rounded-lg my-3 text-left flex flex-row justify-between gap-7">
                  {item.question} <ChevronsUpDown size={28}/>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2
                      className={cn(
                        `bg-red-500 text-white p-2 border rounded-full w-1/12 text-center ${
                          item.rating >= 5 && "bg-green-500"
                        }`
                      )}
                    >
                      <strong>Rating: </strong>
                      {item.rating}
                    </h2>
                    <h2 className="bg-red-100 p-2 border rounded-lg font-medium">
                      <strong>Your Answer: </strong>
                      {item.userAnswer}
                    </h2>
                    <h2 className="bg-green-100 p-2 border rounded-lg font-medium">
                      <strong>Correct Answer: </strong>
                      {item.correctAnswer}
                    </h2>
                    <h2 className="bg-blue-100 p-2 border rounded-lg font-medium">
                      <strong>Feedback: </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}

      <Button
        onClick={() => router.replace("/dashboard")}
        className="hover:scale-105 flex items-center justify-center gap-2 my-4"
      >
        <LayoutDashboard />
        Go To Dashboard
      </Button>
    </div>
  );
}

export default Feedback;
