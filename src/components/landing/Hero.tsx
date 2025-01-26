import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 min-h-[60vh] flex items-center">
      <div className="mx-auto max-w-2xl py-20 sm:py-28 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">
            Create Memorable Events with Ease
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Plan, organize, and manage your events in one place. From birthdays
            to corporate gatherings, we make event planning simple and
            delightful.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              className="text-lg px-8"
              onClick={() =>
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
              }
            >
              Start Planning <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
