import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 mx-4 mt-4">
        <div className="backdrop-blur-md bg-white/10 dark:bg-gray-900/60 rounded-2xl shadow-lg px-6 py-4">
          <div className="container mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xl font-bold text-gray-900 dark:text-white">AI Virtual Interviewer</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Login
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              AI-Powered Interview<br />
              <span className="text-blue-600 dark:text-blue-400">Assessment System</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Elevate your hiring process with our cutting-edge AI interview platform.
              Get comprehensive candidate assessments powered by advanced artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105">
                Sign Up Now
              </button>
              <button className="px-8 py-3 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg border-2 border-gray-200 dark:border-gray-700 transition duration-300">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative h-[400px] w-full">
            <Image
              src="/ai-illustration.svg"
              alt="AI Interview Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Smart Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300">Advanced AI algorithms provide detailed insights into candidate responses and behavior.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Time-Efficient</h3>
              <p className="text-gray-600 dark:text-gray-300">Streamline your hiring process and save valuable time with automated interviews.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Unbiased Evaluation</h3>
              <p className="text-gray-600 dark:text-gray-300">Ensure fair and objective assessment of all candidates with AI-driven analysis.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
