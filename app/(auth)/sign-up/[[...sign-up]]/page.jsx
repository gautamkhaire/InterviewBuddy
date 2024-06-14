import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section class="h-screen">
      <div class="container h-full px-6 py-24">
        <div class="flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* Left column container */}
          <div class="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <Image src="./sign-up.svg" width={600} height={600} alt="Sign-Up" />
          </div>

          {/* Right column container */}
          <div class="md:w-8/12 lg:ms-6 lg:w-5/12">
            <SignUp forceRedirectUrl={"/dashboard"}/>
          </div>
        </div>
      </div>
    </section>
  );
}
