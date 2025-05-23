import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import TabAnimation from "./tabanimation";
import { getSession } from "@/lib/getSession";
import { Zap } from "lucide-react";

const Header = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    <header className="w-full mx-auto">
      <div className="flex justify-between py-3 items-center uppercase text-sm">
        <div className="flex items-center gap-1 px-16">
        <Link href="/" className="flex items-center gap-2">
              <div className="relative flex items-center justify-center w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-xl blur-sm opacity-50" />
                <div className="relative bg-black rounded-xl p-2 border border-white/10">
                  <Zap className="w-6 h-6 text-[#14F195]" />
                </div>
              </div>
              <span className="text-xl font-bold text-white">
                Coast
              </span>
          </Link>

          <TabAnimation />
        </div>

        {!user ? (
          <div className="flex items-center gap-4">
            <Button className="rounded-full uppercase font-medium text-sm">
              <Link href="/auth/signin">Login</Link>
            </Button>
            <Link href="/auth/signin">
              <Button className="rounded-full uppercase font-medium text-sm">
                Sign up
              </Button>
            </Link>
          </div>
        ) : (
          <Link href="/dashboard">
            <Button className="rounded-full uppercase font-medium text-sm">
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
