'use client';

import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <main className="container mx-auto px-4 py-16 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">About AI Virtual Interviewer</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Revolutionizing the hiring process through AI-powered interview simulations
          </p>
        </section>

        {/* Mission Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-gray-300 text-lg">
              We're on a mission to make interview preparation more accessible, effective, and
              less stressful for job seekers worldwide. Our AI-powered platform provides
              realistic interview simulations that help candidates build confidence and improve
              their interview skills.
            </p>
          </div>
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <Image
              src="/images/mission.svg"
              alt="Mission illustration"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Values Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-lg space-y-4">
              <h3 className="text-xl font-bold">Innovation</h3>
              <p className="text-gray-300">
                We leverage cutting-edge AI technology to create the most realistic and
                helpful interview experience possible.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg space-y-4">
              <h3 className="text-xl font-bold">Accessibility</h3>
              <p className="text-gray-300">
                We believe everyone should have access to quality interview preparation
                tools, regardless of their background.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg space-y-4">
              <h3 className="text-xl font-bold">Growth</h3>
              <p className="text-gray-300">
                We're committed to helping both candidates and companies grow through
                better hiring practices.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {/* Team Member Cards */}
            <div className="text-center space-y-4">
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden">
                <Image
                  src="/images/team/member1.svg"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold">Sarah Johnson</h3>
              <p className="text-gray-300">CEO & Founder</p>
            </div>
            <div className="text-center space-y-4">
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden">
                <Image
                  src="/images/team/member2.svg"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold">Michael Chen</h3>
              <p className="text-gray-300">CTO</p>
            </div>
            <div className="text-center space-y-4">
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden">
                <Image
                  src="/images/team/member3.svg"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold">Emily Rodriguez</h3>
              <p className="text-gray-300">Head of AI Research</p>
            </div>
            <div className="text-center space-y-4">
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden">
                <Image
                  src="/images/team/member4.svg"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold">David Kim</h3>
              <p className="text-gray-300">Product Director</p>
            </div>
            <div className="text-center space-y-4">
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden">
                <Image
                  src="/images/team/member5.svg"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold">Alexandra Foster</h3>
              <p className="text-gray-300">UX Design Lead</p>
            </div>
            <div className="text-center space-y-4">
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden">
                <Image
                  src="/images/team/member6.svg"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold">James Wilson</h3>
              <p className="text-gray-300">Head of Operations</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}