'use client';

import Image from 'next/image';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <main className="container mx-auto px-4 py-16 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">How It Works</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get ready for your next interview with our AI-powered platform
          </p>
        </section>

        {/* Steps Section */}
        <section className="space-y-12">
          {/* Step 1 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">1</span>
                <h2 className="text-2xl font-bold">Create Your Profile</h2>
              </div>
              <p className="text-gray-300 text-lg">
                Sign up and create your profile by providing your background, experience,
                and the type of interviews you want to practice.
              </p>
            </div>
            <div className="relative h-[250px] rounded-lg overflow-hidden">
              <Image
                src="/images/step1.svg"
                alt="Create profile illustration"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
            <div className="space-y-4 md:order-2">
              <div className="flex items-center space-x-4">
                <span className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">2</span>
                <h2 className="text-2xl font-bold">Select Interview Type</h2>
              </div>
              <p className="text-gray-300 text-lg">
                Choose from various interview types including behavioral, technical,
                and industry-specific interviews.
              </p>
            </div>
            <div className="relative h-[250px] rounded-lg overflow-hidden md:order-1">
              <Image
                src="/images/step2.svg"
                alt="Select interview type illustration"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">3</span>
                <h2 className="text-2xl font-bold">Practice with AI</h2>
              </div>
              <p className="text-gray-300 text-lg">
                Engage in realistic interview simulations with our AI interviewer.
                Get real-time feedback and suggestions for improvement.
              </p>
            </div>
            <div className="relative h-[250px] rounded-lg overflow-hidden">
              <Image
                src="/images/step3.svg"
                alt="Practice with AI illustration"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Step 4 */}
          <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
            <div className="space-y-4 md:order-2">
              <div className="flex items-center space-x-4">
                <span className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">4</span>
                <h2 className="text-2xl font-bold">Review and Improve</h2>
              </div>
              <p className="text-gray-300 text-lg">
                Get detailed feedback on your performance, including analysis of your
                responses, body language, and areas for improvement.
              </p>
            </div>
            <div className="relative h-[250px] rounded-lg overflow-hidden md:order-1">
              <Image
                src="/images/step4.svg"
                alt="Review and improve illustration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-lg space-y-4">
              <h3 className="text-xl font-bold">AI-Powered Feedback</h3>
              <p className="text-gray-300">
                Get instant, personalized feedback on your interview performance
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg space-y-4">
              <h3 className="text-xl font-bold">Industry-Specific Questions</h3>
              <p className="text-gray-300">
                Practice with questions tailored to your industry and role
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg space-y-4">
              <h3 className="text-xl font-bold">Progress Tracking</h3>
              <p className="text-gray-300">
                Monitor your improvement over time with detailed analytics
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}