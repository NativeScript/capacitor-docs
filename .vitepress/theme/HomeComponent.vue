<template>
  <div class="bg-gradient-to-br from-sky-50 to-slate-50 min-h-screen">
    <div class="container mx-auto pt-32 pb-32">
      <!-- <div class="grid grid-cols-2 gap-20"> -->
      <div class="lg:py-20 text-center">
        <h1
          class="animate-move-bg bg-gradient-to-r from-fuchsia-400 via-[#53b9ff] to-fuchsia-400 bg-[length:400%] bg-clip-text text-5xl md:text-8xl font-bold text-transparent"
        >
          NativeScript for Capacitor
        </h1>

        <div class="text-2xl md:text-5xl mt-6">
          The platform at your fingertips.
        </div>

        <div class="mt-12">
          <a
            href="/installation"
            class="inline-block bg-blue-400 rounded-md text-white text-xl px-6 py-4 hover:no-underline hover:bg-blue-500"
            >Get Started &rightarrow;</a
          >
        </div>
      </div>

      <!-- <div class="">
          <img src="/assets/images/capacitor_home_graphic.png" alt="" />
        </div>
      </div> -->

      <div class="mt-4 lg:mt-24 mb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="mt-8 px-4 lg:px-0">
          <h3 class="text-5xl font-bold">
            Isolated
            <span class="text-blue-500 block">NativeScript</span> environment
          </h3>
          <p class="mt-6 text-lg">
            Use NativeScript within your existing Capacitor app.
          </p>
        </div>

        <div
          class="relative lg:col-span-2 rounded-3xl bg-gray-900 mx-4 lg:mx-0 lg:mr-24"
        >
          <div class="flex items-center space-x-2 mt-3 px-4">
            <div class="h-3 w-3 rounded-full bg-red-600"></div>
            <div class="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div class="h-3 w-3 rounded-full bg-green-600"></div>
            <div class="pl-6 text-sm text-gray-300">
              ./src/<span class="text-cyan-400">nativescript</span>/<span
                class="font-bold text-white"
                >zip.ts</span
              >
            </div>
          </div>
          <div
            class="-mt-3 overflow-y-auto font-mono text-sm leading-6 text-gray-300 lg:text-base"
          >
            <div
              class="text-xs text-white"
              style="--code-bg-color: transparent"
            >
              <slot name="box1" />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 lg:mt-24 mb-12 grid grid-colrs-1 lg:grid-cols-3 gap-8">
        <div
          class="relative lg:col-span-2 rounded-3xl bg-gray-900 mx-4 lg:mx-0 lg:ml-24 overflow-hidden"
        >
          <div class="flex items-center space-x-2 mt-3 px-4">
            <div class="h-3 w-3 rounded-full bg-red-600"></div>
            <div class="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div class="h-3 w-3 rounded-full bg-green-600"></div>
            <div class="pl-6 text-sm text-gray-300">
              ./src/<span class="text-cyan-400">app</span>
              <span class="hidden md:inline">/explore-container</span>/<span
                class="font-bold text-white"
                >explore-container.component.ts</span
              >
            </div>
          </div>
          <div
            class="-mt-3 overflow-y-auto font-mono text-sm leading-6 text-gray-300 lg:text-base"
          >
            <div
              class="text-xs text-white"
              style="--code-bg-color: transparent"
            >
              <slot name="box2" />
            </div>
          </div>
        </div>

        <div class="mt-8 order-first lg:-order-none px-4 lg:px-0">
          <h3 class="text-5xl font-bold">
            Use anywhere in your
            <span class="text-indigo-500">Ionic</span> codebase
          </h3>
          <p class="mt-6 text-lg">
            Completely inactive with <b>zero impact</b> on your
            <b>web</b> environment. It is only active when Capacitor is running.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
