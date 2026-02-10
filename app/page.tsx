import Threads from "../components/Threads";
import Link from "next/link";

const Page = () => {
  return (
    <main className="relative min-h-screen w-full bg-[#0A0A0A] overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Threads amplitude={1} distance={0} enableMouseInteraction />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col  items-center justify-center min-h-screen p-6 text-center">
        <div className="container  shadow-2xl    w-2/5 p-5 border-white mx-auto">
          <h1 className="text-6xl font-josefin font-bold text-white mb-6">
            Inventory
          </h1>
          <p className="text-xl font-josefin text-gray-300 max-w-2xl mx-auto">
            Streamline your inventory tracking with our powerful, easy to use
            management system. Track products, monitor stock levels, and gain
            valuable insights in real time.
          </p>
          <div className="flex justify-center mt-6 p-4 gap-3">
            <Link
              href={"/sign-in"}
              className="px-8 py-2 rounded border-blue-800 border bg-white text-blue-800 duration-300 cursor-pointer   hover:text-white hover:bg-blue-800 "
            >
              Sign In
            </Link>
            <Link
              href={"/sign-in"}
              className="px-4 py-2 rounded   cursor-pointer   text-white bg-blue-800 hover:bg-white hover:text-blue-800 duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
