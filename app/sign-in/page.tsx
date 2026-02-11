import { SignIn } from "@stackframe/stack";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="shadow-2xl max-sm:w-[90%] md:w-full md:max-w-xl flex flex-col gap-1  items-center justify-center p-8 border border-border bg-card/50 backdrop-blur-sm mx-auto rounded-2xl">
        <SignIn />
        <Link href={"/"} className="">
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
