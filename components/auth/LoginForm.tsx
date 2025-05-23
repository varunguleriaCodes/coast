import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

export async function SignInPage() {
  const session = await getSession();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="min-h-screen w-screen text-white flex items-center justify-center py-12 bg-gradient-to-br from-black via-indigo-900 to-purple-800 bg-opacity-75">
      <div className="mx-auto w-[600px] space-y-8 backdrop-blur-lg bg-black bg-opacity-30 p-8 rounded-xl shadow-2xl ">
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-600 animate-pulse">
            Get Started
          </h1>
          <p className="text-lg text-gray-300">Your gateway to Coast</p>
        </div>

        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <Button
            type="submit"
            variant="outline"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg py-3 px-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            <FaGoogle className="w-5 h-5" />
            <span>Continue with Google</span>
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-400">
            By signing in, you agree to our{" "}
            <a href="#" className="text-cyan-400 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-cyan-400 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
