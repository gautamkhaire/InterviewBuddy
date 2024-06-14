"use client";

import { Button } from "../../../../components/ui/button";
import { db } from "../../../../utils/db";
import { MockInterview } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import Link from "next/link";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  useEffect(() => {
    console.log(params.interviewId);
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    console.log(result);
    setInterviewData(result[0]);
  };
  return (
    <div className="my-10 flex justify-center flex-col items-center">
      <h2 className="font-bold text-3xl text-purple-500">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job Role/ Job Position:</strong>{" "}
              {interviewData?.jobPosition}{" "}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/ Tech Stack:</strong>{" "}
              {interviewData?.jobDescription}{" "}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience:</strong>{" "}
              {interviewData?.jobExperience}{" "}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb size={24} />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-gray-500">
              Enable Video Webcam and Microphone to start your AI Generated Mock
              Interview. It has 5 questions which you can answer and at the last
              you will get the report on the basis of your answer. <br />
              <br />
              <strong>Note:</strong> We never record your video, Webcam access
              you can disable at any time if you want.
            </h2>
          </div>
        </div>

        <div>
          <div className="flex justify-center items-center">
            {webcamEnabled ? (
              <div className="mt-10 border rounded-xl p-5 bg-black flex justify-center items-center">
                <Webcam
                  onUserMedia={() => setWebcamEnabled(true)}
                  onUserMediaError={() => setWebcamEnabled(false)}
                  mirrored={true}
                  style={{
                    height: 300,
                    width: "100%",
                  }}
                />
              </div>
              
            ) : (
              <div className="flex flex-col justify-center items-center">
                {/* <WebcamIcon className="h-72 w-full p-20 bg-secondary rounded-lg border my-4" /> */}
                <Image
                  src="/webcam.png"
                  width={300}
                  height={300}
                  alt="Webcam Logo"
                  className="p-20 bg-secondary rounded-lg my-4 border shadow-md"
                />
                <Button
                  onClick={() => setWebcamEnabled(true)}
                  className="mt-1 mb-3"
                >
                  Enable Webcam and Microphone
                </Button>
              </div>
            )}
          </div>
          <div className="flex justify-end items-center mt-3">
          <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button className="flex justify-center items-center gap-2">
              <span className="text-lg">Start Interview</span>{" "}
              <MoveRight size={20} />
            </Button>{" "}
          </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interview;
