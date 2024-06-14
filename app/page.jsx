"use client";
import { TypewriterEffect } from "../components/ui/typewriter-effect";
import { Button } from "../components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const words = [
    {
      text: "Your",
      className: "text-gray-600",
    },
    {
      text: "Path",
      className: "text-gray-600",
    },
    {
      text: "to",
      className: "text-gray-600",
    },
    {
      text: "Interview",
      className: "text-purple-500",
    },
    {
      text: "Mastery",
      className: "text-purple-500",
    },
    {
      text: "Starts",
      className: "text-purple-500",
    },
    {
      text: "Now!",
      className: "text-purple-500",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="my-2 mx-10 flex flex-row items-center justify-between">
        <div className="flex justify-center items-center gap-2">
          <Image src="/logo.png" width={56} height={56} alt="Logo" />
          <h2 className="font-bold text-2xl text-purple-600">
            Interview Buddy
          </h2>
        </div>

        <div className="flex gap-5">
          <Link href={"/sign-in"}>
            <Button className="border rounded-full hover:scale-105">
              Login
            </Button>
          </Link>
          <Link href={"/sign-up"}>
            <Button className="border rounded-full hover:scale-105">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
      <hr className="h-0.5 bg-gray-500" />

      {/* Hero Section */}
      <div className="h-screen pt-6 px-12">
        <TypewriterEffect
          words={words}
          className="hidden md:flex justify-center"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-700 mt-8 md:mt-28 md:leading-10 p-4 md:p-10">
            The platform helps you
            <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent text-3xl md:text-5xl">
              Identify your Mistakes
            </span>{" "}
            <br />
            by providing <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent text-3xl md:text-5xl">
              Instant Feedback
            </span>{" "}
            <br />
            before any of your upcoming <br />
            Technical Interviews 🎯
          </h2>
          <Image
            src="/Hired.gif"
            width={900}
            height={900}
            alt="Hired"
            className="-mt-10 md:mt-1"
          />
        </div>
      </div>

      {/* Preview Section */}
      <div className="px-8 grid grid-cols-1 md:grid-cols-2 gap-5 -mt-20 md:-mt-8">
        <Image src="/JobOffers.png" width={800} height={800} alt="Job Offer" />
        <div>
          <div className="text-xl md:text-2xl font-semibold text-center text-gray-700 md:mt-24 mb-16">
            Ensure you never miss a hiring opportunity due to poor interview
            performance. Our platform provides you with the tools and insights
            you need to excel in your interviews. With instant feedback and
            personalized tips, you'll be able to{" "}
            <div className="my-4">
            <span className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent text-2xl md:text-3xl">
              Identify and Correct your mistakes,
            </span>
            <br />
            <span className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent text-2xl md:text-3xl">
              {" "}
              Boosting your Confidence and
            </span>{" "}
            <br />
            <span className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent text-2xl md:text-3xl">
              Increasing your Chances of Success.
            </span>{" "}
            <br /> 
            </div>Don't let a lack of preparation hold you back from landing
            your dream job.
          </div>
          <Link href={"/sign-in"} className="flex justify-center items-center mb-6 md:mb-0">
            <Button className="border rounded-full w-1/2 hover:scale-110 transition-all font-extrabold">Ace Your Interview</Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-purple-500 text-white text-center font-semibold">Copyright @ 2024 InterviewBuddy</div>
    </div>
  );
}
