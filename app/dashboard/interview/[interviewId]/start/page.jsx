"use client";

import { act, useEffect, useState } from "react";
import { db } from "../../../../../utils/db";
import { MockInterview } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "../../../../../components/ui/button";
import { ArrowBigRight, ArrowBigLeft } from "lucide-react";
import Link from "next/link";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const jsonMockResponse = JSON.parse(result[0].jsonMockResponse);
    console.log(jsonMockResponse);
    setMockInterviewQuestions(jsonMockResponse);
    setInterviewData(result[0]);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions Section*/}
        <QuestionsSection
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video/Audio Recording Section*/}
        <RecordAnswerSection
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex flex-row justify-end items-center gap-6">
        {activeQuestionIndex > 0 && (
          <Button className="hover:scale-105 flex justify-center items-center gap-2" onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>
          <ArrowBigLeft size={24}/> Previous Question 
          </Button>
        )}
        {activeQuestionIndex != mockInterviewQuestions?.length - 1 && (
          <Button className="hover:scale-105 flex justify-center items-center gap-2" onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>
            Next Question <ArrowBigRight size={24}/>
          </Button>
        )}
        {activeQuestionIndex == mockInterviewQuestions?.length - 1 && (
          <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}><Button className="hover:scale-105" >End Interview</Button></Link>
          
        )}
      </div>
    </div>
  );
}

export default StartInterview;
