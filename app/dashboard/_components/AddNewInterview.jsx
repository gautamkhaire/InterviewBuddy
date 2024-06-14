"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Plus, Minus, LoaderCircle } from "lucide-react";
import { chatSession } from "../../../utils/GeminiAIModel";
import { db } from "../../../utils/db";
import { MockInterview } from "../../../utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [jobExperience, setJobExperience] = useState(0);
  const [loading, setLoading] = useState(false);
  const [JsonResponse, setJsonResponse] = useState();

  const { user } = useUser();

  const router = useRouter();

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    console.log(jobPosition, jobDescription, jobExperience);

    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description & Years of Experience give me 5 Interview question along with answer in json format. Give me question and answer field in json.`;

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
  
    setJsonResponse(MockJsonResponse);

    if (MockJsonResponse) {
      // Database insertion
      const response = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResponse: MockJsonResponse,
          jobPosition: jobPosition,
          jobDescription: jobDescription,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        })
        .returning({ mockId: MockInterview.mockId });

      console.log("Inserted Id:", response);

      if(response){
        setOpenDialog(false);
        router.push(`/dashboard/interview/${response[0]?.mockId}`);
      }
      
    } else {
      console.log("Error");
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center text-purple-500">
          + Add New
        </h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-purple-600">
              Tell us more about your job interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit}>
                <div>
                  <h2>
                    Add Details about your job position/role, job description
                    and years of experience
                  </h2>
                  <div className="mt-7 my-3">
                    <label className="text-lg text-gray-500">
                      Job Role/Job Position
                    </label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      className="focus:ring-offset-purple-500 focus-visible:ring-0"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label className="text-lg text-gray-500">
                      Job Description/Tech Stack{" "}
                      <span className="text-sm">(In Short)</span>
                    </label>
                    <Textarea
                      placeholder="Ex. React, Angular, NodeJs, MySql etc..."
                      className="focus:ring-offset-purple-500 focus-visible:ring-0"
                      required
                      onChange={(event) =>
                        setJobDescription(event.target.value)
                      }
                    />
                  </div>
                  <div className="my-3">
                    <label className="text-lg text-gray-500">
                      Years of Experience
                    </label>
                    {/* <br />
                  <div className="flex gap-2 items-center my-2">
                    <button
                    className="h-6 w-6 border rounded-full bg-purple-500 text-white hover:bg-purple-600 hover:scale-105 transition-all flex items-center justify-center"
                      onClick={() => {
                        if(jobExperience > 0)
                            setJobExperience((prev)=>prev-1)
                      }}
                    >
                      <Minus size={24}/>
                    </button>
                    <span className="text-lg">{jobExperience}</span>
                    <button
                      onClick={() => {
                        if(jobExperience < 80)
                            setJobExperience((prev)=>prev+1)
                     }}
                      className="h-6 w-6 border rounded-full bg-purple-500 text-white hover:bg-purple-600 hover:scale-105 transition-all flex items-center justify-center"
                    >
                      <Plus size={24}/>
                    </button>
                  </div> */}

                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      className="focus:ring-offset-purple-500 focus-visible:ring-0"
                      onChange={(event) => setJobExperience(event.target.value)}
                      required
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                    className="text-red-500 hover:text-red-500 hover:scale-105"
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="hover:scale-105 transition-all"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex gap-2 items-center justify-center">
                        <LoaderCircle className="animate-spin" /> Generating
                        from AI
                      </span>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
