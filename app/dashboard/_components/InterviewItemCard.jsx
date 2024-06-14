import { Button } from "../../../components/ui/button";
import Link from "next/link";

function InterviewItemCard({ interview }) {
    
  return (
    <div className="border shadow-sm rounded-lg p-4">
      <h2 className="font-bold text-purple-500 text-lg">
        {interview?.jobPosition}
      </h2>
      <h2 className="text-sm text-gray-600">
        {interview?.jobExperience} Years of Experience
      </h2>
      <h2 className="text-xs text-gray-400">
        Created At: {interview?.createdAt}
      </h2>
      <div className="flex justify-between mt-2 gap-4">
        <Link href={`/dashboard/interview/${interview?.mockId}/feedback`} className="w-full">
          <Button
            size="sm"
            className="w-full hover:text-white hover:bg-purple-600 transition-all"
            variant="outline"
          >
            Feedback
          </Button>
        </Link>
        <Link
          href={`/dashboard/interview/${interview?.mockId}`}
          className="w-full"
        >
          <Button size="sm" className="w-full hover:scale-105 transition-all">
            Start
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default InterviewItemCard;
