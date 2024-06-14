"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../utils/db";
import { MockInterview } from "../../../utils/schema";
import { eq, desc } from "drizzle-orm";
import InterviewItemCard from "./InterviewItemCard";
import { LoaderCircle } from "lucide-react";

function InterviewList() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && getInterviewList();
  }, [user]);

  const [interviewList, setInterviewList] = useState();

  const getInterviewList = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(MockInterview.id));

    setInterviewList(result);
    setLoading(false);
  };

  return (
    <div>
      <h2 className="font-medium text-xl text-gray-500">
        Previous Mock Interviews
      </h2>

      {loading ? (
        <div className="w-full flex justify-center items-center mt-10">
          <LoaderCircle className="animate-spin text-purple-500" size={64} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          {interviewList && interviewList.map((item,index)=>(
          <InterviewItemCard key={index} interview={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default InterviewList;
