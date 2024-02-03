import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen max-w-screen flex-row items-center justify-center p-24">
      <div
        className="relative flex place-items-center before:absolute before:h-[350px] before:w-[480px] 
      before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:via-transparent
      before:blur-2xl before:content-[''] after:absolute after:-z-45 after:h-[180px] after:w-[240px] after:translate-x-1/3 
      after:bg-gradient-conic after:from-sky-200 after:via-blue-500 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br 
      before:dark:from-transparent before:dark:to-fuchsia-400 before:dark:opacity-45 after:dark:from-fuchsia-400 after:dark:via-slate-600
      after:dark:opacity-100 before:lg:h-[320px] before:lg:w-[480px] z-[-1] after:animate-pulse"
      >
        <span
          className="relative flex place-items-center before:absolute before:h-[180px] before:w-[280px] 
      before:-translate-x-[-200px] before:translate-y-[30px] before:rounded-full before:bg-gradient-radial before:from-pink-500 
      before:to-transparent before-animate before:delay-300 before:blur-2xl
      after:absolute after:-z-45 after:h-[280px] after:w-[240px] after:rounded-full after:translate-x-[150px] after:translate-y-[-50px]
      after:bg-gradient-conic after:from-pink-800 after:via-purple-800 after:content-[''] after:blur-2xl after-animate"
        />
        <span className="text-5xl z-50 bg-blur drop-shadow-2xl">
          Starting soon
        </span>
      </div>
    </main>
  );
}
