import Link from "next/link";

import { buttonVariants } from "@hermes/ui/components/button";
import { cn } from "@hermes/ui/utils";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center p-6">
      <div className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
        <div className="max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
            <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
              <h1 className="text-4xl font-medium tracking-tight text-gray-900">
                Transport your files witout password
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi
                temporibus error, explicabo at blanditiis quas facere doloribus
                alias magni reiciendis nostrum perferendis accusantium corrupti
                provident rerum reprehenderit mollitia minus ratione!
              </p>
              <Link
                href="/dashboard"
                className={cn(buttonVariants({ variant: "default" }), "mt-8")}
              >
                Dashboard
              </Link>
            </div>
            <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
