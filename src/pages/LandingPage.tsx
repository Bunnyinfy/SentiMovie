import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { Film, Star, ThumbsUp, ThumbsDown, TrendingUp } from 'lucide-react';

const LandingPage: React.FC = () => {
  const controls = useAnimation();
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-800 dark:to-purple-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] opacity-20 bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Discover the Sentiment Behind Movie Reviews
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-indigo-100">
              Our advanced AI analyzes movie reviews to reveal the true sentiment, helping you make better viewing decisions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-3 text-lg font-medium rounded-lg bg-white text-indigo-600 hover:bg-indigo-50 transition-colors shadow-lg"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 text-lg font-medium rounded-lg bg-transparent border-2 border-white hover:bg-white/10 transition-colors"
              >
                Login
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-auto fill-current text-gray-50 dark:text-gray-900"
          >
            <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={featuresRef} 
        className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
            >
              Powerful Sentiment Analysis
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Our machine learning model analyzes movie reviews to determine sentiment, helping you understand audience reactions.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <ThumbsUp className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Positive Sentiment</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Identify positive reviews to find movies that audiences love and critics praise.
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <ThumbsDown className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Negative Sentiment</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Spot negative reviews to avoid movies that might disappoint you.
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <TrendingUp className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Sentiment Trends</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track sentiment over time to see how opinions evolve after a movie's release.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our sentiment analysis process is simple yet powerful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 rounded-full bg-indigo-600 text-white w-8 h-8 flex items-center justify-center font-bold">
                1
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-8 pt-10 rounded-xl shadow">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white text-center">
                  Input a Review
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Enter a movie review or paste text from a review you've found online.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 rounded-full bg-indigo-600 text-white w-8 h-8 flex items-center justify-center font-bold">
                2
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-8 pt-10 rounded-xl shadow">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white text-center">
                  AI Analysis
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Our machine learning model analyzes the text to determine sentiment.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 rounded-full bg-indigo-600 text-white w-8 h-8 flex items-center justify-center font-bold">
                3
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-8 pt-10 rounded-xl shadow">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white text-center">
                  Get Results
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  View the sentiment analysis results with confidence scores and save for future reference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-800 dark:to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Analyze Movie Sentiments?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-indigo-100">
            Join thousands of movie enthusiasts who use our platform to make informed viewing decisions.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-3 text-lg font-medium rounded-lg bg-white text-indigo-600 hover:bg-indigo-50 transition-colors shadow-lg"
          >
            Get Started for Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;