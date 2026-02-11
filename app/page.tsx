import Threads from "../components/Threads";
import Link from "next/link";

const Page = () => {
  return (
    <main className="relative min-h-screen w-full bg-background transition-colors duration-500 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-50">
        <Threads amplitude={1} distance={0} enableMouseInteraction />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <div className="container shadow-2xl w-full max-w-xl p-8 border border-border bg-card/50 backdrop-blur-sm mx-auto rounded-2xl">
          <h1 className="text-6xl font-josefin font-bold text-foreground mb-6">
            Inventory
          </h1>

          <p className="text-xl font-josefin text-muted-foreground max-w-2xl mx-auto">
            Streamline your inventory tracking with our powerful, easy to use
            management system. Track products, monitor stock levels, and gain
            valuable insights in real time.
          </p>

          <div className="flex justify-center mt-6 p-4 gap-3">
            <Link
              href={"/sign-in"}
              className="px-8 py-2 rounded border border-primary bg-background text-primary duration-300 cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              Sign In
            </Link>
            <Link
              href={"/sign-in"}
              className="px-4 py-2 rounded cursor-pointer text-primary-foreground bg-primary hover:bg-background hover:text-primary border border-primary duration-200"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-4"></div>
        </div>
      </div>
    </main>
  );
};

export default Page;
