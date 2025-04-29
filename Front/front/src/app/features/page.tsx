'use client';

export default function FeaturesPage() {
  const features = [
    {
      title: 'AI-Powered Interviews',
      description: 'Experience realistic interview simulations with our advanced AI that adapts to your responses and provides natural conversations.',
      icon: '🤖'
    },
    {
      title: 'Real-time Feedback',
      description: 'Receive instant feedback on your interview performance, including analysis of your responses, body language, and communication skills.',
      icon: '📊'
    },
    {
      title: 'Customized Practice Sessions',
      description: 'Practice with industry-specific questions and scenarios tailored to your target role and experience level.',
      icon: '🎯'
    },
    {
      title: 'Performance Analytics',
      description: 'Track your progress over time with detailed analytics and insights to help you improve your interview skills.',
      icon: '📈'
    },
    {
      title: 'Interview Recording',
      description: 'Review your interview sessions with video playback and detailed transcripts to identify areas for improvement.',
      icon: '🎥'
    },
    {
      title: 'Expert Tips & Resources',
      description: 'Access a comprehensive library of interview tips, common questions, and best practices from industry experts.',
      icon: '📚'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <main className="container mx-auto px-4 py-16 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">Platform Features</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how our AI-powered platform revolutionizes interview preparation
          </p>
        </section>

        {/* Features Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-300 transform hover:scale-105"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </section>

        {/* Call to Action */}
        <section className="text-center bg-blue-600 rounded-xl p-8 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Interview Skills?
          </h2>
          <p className="text-lg mb-6">
            Start practicing with our AI interviewer today and boost your confidence.
          </p>
          <button
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            onClick={() => window.location.href = '/signup'}
          >
            Get Started Now
          </button>
        </section>
      </main>
    </div>
  );
}