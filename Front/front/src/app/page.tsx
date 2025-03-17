/*import Image from "next/image";*/

import HowItWorks from "../components/HowItWorks";
import Hero from "../components/Hero";
export default function Home() {
  return (
    <div className="min-h-screen bg-radin gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      </main>
      <Hero />
      <HowItWorks />
    </div>
  );
}
