'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

interface Question {
  _id: string;
  text: string;
  type: 'technical' | 'behavioral';
  timeLimit: number;
}

export default function InterviewPage() {
  const { jobId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [userResponse, setUserResponse] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch(`/api/questions/${jobId}`);
      const data = await res.json();
      setQuestions(data);
    };
    if (jobId) {
      fetchQuestions();
    }
  }, [jobId]);

  useEffect(() => {
    if (questions.length > 0) {
      setTimeLeft(questions[currentQuestionIndex].timeLimit);
    }
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => setIsRecording(true);
  const handleStopRecording = () => setIsRecording(false);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserResponse('');
      setIsRecording(false);
    }
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Sidebar role="candidate" />
      <div className="flex-1 pt-16 pb-12 pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Progress Bar and Timer */}
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                    <span>{formatTime(timeLeft)}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                    className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Video Feed */}
                <div className="space-y-6">
                    <div className="bg-gray-800 rounded-xl aspect-video overflow-hidden">
                        <div className="flex items-center justify-center h-full text-gray-400">
                            Camera Feed
                        </div>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={isRecording ? handleStopRecording : handleStartRecording}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                        >
                            {isRecording ? 'Stop Recording' : 'Start Recording'}
                        </button>
                    </div>
                </div>

                {/* Question and Response */}
                <div className="space-y-6">
                    <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                        <h2 className="text-xl font-semibold text-white mb-4">
                            {questions[currentQuestionIndex].text}
                        </h2>
                        <div className="text-sm text-blue-400 mb-4">
                            Type: {questions[currentQuestionIndex].type}
                        </div>
                        <textarea
                            value={userResponse}
                            onChange={(e) => setUserResponse(e.target.value)}
                            placeholder="Type your response here..."
                            className="w-full h-40 bg-gray-800 text-white rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={handleNextQuestion}
                            disabled={currentQuestionIndex >= questions.length - 1}
                            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next Question
                        </button>
                    </div>
                </div>
            </div>

            {/* Interview Tips */}
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Interview Tips</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Maintain good eye contact with the camera.</li>
                <li>• Speak clearly and at a moderate pace.</li>
                <li>• Structure your responses (e.g., STAR method).</li>
                <li>• Take a moment to think before answering.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 