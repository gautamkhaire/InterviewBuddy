import Image from "next/image";
import Link from "next/link";

function NotFound() {
  return (
    <div className="p-10 flex flex-col gap-y-4 justify-center items-center">
      <Image
        src="/404Error.png"
        height={600}
        width={600}
        alt="Page Not Found"
      />
      <Link href="/" className="w-1/4 border text-white p-2 rounded-full bg-purple-500 text-center hover:scale-105 transition-all">Go to Home Page</Link>
    </div>
  );
}

export default NotFound;
