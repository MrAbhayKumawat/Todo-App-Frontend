import React from "react";

const PageNotFound = () => {
  return (
    <>
      <main class="grid min-h-full place-items-center bg-transparent px-6 py-24 sm:py-32 lg:px-8">
        <div class="text-center">
          <p class="text-2xl font-semibold text-[#3E1671]">404</p>
          <h1 class="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Page not found
          </h1>
          <p class="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              class="rounded-md bg-[#9E78CF] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default PageNotFound;