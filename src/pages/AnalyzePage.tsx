import React, { useState } from 'react';
import axios from 'axios';
import { Loader, ThumbsUp, ThumbsDown, Gauge } from 'lucide-react';

interface SentimentResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
}

const AnalyzePage: React.FC = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reviewText.trim()) {
      setError('Please enter a review to analyze');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:5000/api/analyze', {
        review: reviewText,
        movieTitle
      });
      
      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error analyzing sentiment');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 dark:text-green-400';
      case 'negative':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="h-12 w-12 text-green-600 dark:text-green-400" />;
      case 'negative':
        return <ThumbsDown className="h-12 w-12 text-red-600 dark:text-red-400" />;
      default:
        return <Gauge className="h-12 w-12 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.8) return 'Very High';
    if (confidence >= 0.6) return 'High';
    if (confidence >= 0.4) return 'Moderate';
    if (confidence >= 0.2) return 'Low';
    return 'Very Low';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Movie Review Sentiment Analysis
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Enter a movie review to analyze its sentiment
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="movieTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Movie Title (optional)
            </label>
            <input
              type="text"
              id="movieTitle"
              value={movieTitle}
              onChange={(e) => setMovieTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter movie title"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Review Text
            </label>
            <textarea
              id="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter or paste a movie review here..."
            ></textarea>
          </div>
          
          {error && (
            <div className="mb-4 bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2 inline" />
                  Analyzing...
                </>
              ) : (
                'Analyze Sentiment'
              )}
            </button>
          </div>
        </form>
      </div>

      {result && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-fade-in">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Analysis Result
            </h2>
            {movieTitle && (
              <p className="text-gray-600 dark:text-gray-300">
                for "{movieTitle}"
              </p>
            )}
          </div>
          
          <div className="flex flex-col items-center">
            <div className="mb-4">
              {getSentimentIcon(result.sentiment)}
            </div>
            
            <div className="text-center mb-6">
              <h3 className={`text-3xl font-bold mb-2 ${getSentimentColor(result.sentiment)}`}>
                {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Confidence: <span className="font-semibold">{getConfidenceLabel(result.confidence)}</span> ({Math.round(result.confidence * 100)}%)
              </p>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-6">
              <div 
                className={`h-4 rounded-full ${
                  result.sentiment === 'positive' ? 'bg-green-500' : 
                  result.sentiment === 'negative' ? 'bg-red-500' : 
                  'bg-gray-500'
                }`}
                style={{ width: `${Math.round(result.confidence * 100)}%` }}
              ></div>
            </div>
            
            <div className="text-center text-gray-600 dark:text-gray-300">
              <p className="mb-2">Review excerpt:</p>
              <p className="italic bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                "{reviewText.length > 150 ? reviewText.substring(0, 150) + '...' : reviewText}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyzePage;