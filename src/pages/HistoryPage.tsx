import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader, Search, ThumbsUp, ThumbsDown, Gauge } from 'lucide-react';

interface Review {
  id: number;
  movie_title: string;
  review_text: string;
  sentiment: string;
  confidence: number;
  created_at: string;
}

const HistoryPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState('all');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/reviews');
        
        // Format dates and sort by most recent
        const formattedReviews = response.data.map((review: any) => ({
          ...review,
          created_at: new Date(review.created_at).toLocaleString()
        }));
        
        setReviews(formattedReviews);
        setFilteredReviews(formattedReviews);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error fetching reviews');
        console.error('Fetch reviews error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, []);

  useEffect(() => {
    // Apply filters
    let result = reviews;
    
    // Search filter
    if (searchTerm) {
      result = result.filter(
        (review) => 
          review.movie_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.review_text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sentiment filter
    if (sentimentFilter !== 'all') {
      result = result.filter((review) => review.sentiment === sentimentFilter);
    }
    
    setFilteredReviews(result);
  }, [searchTerm, sentimentFilter, reviews]);

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'negative':
        return <ThumbsDown className="h-5 w-5 text-red-600 dark:text-red-400" />;
      default:
        return <Gauge className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Your Review History
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          View and search through your past movie review analyses
        </p>
      </div>

      {error && (
        <div className="mb-8 bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Search by movie title or review content..."
            />
          </div>
          
          <div className="flex-shrink-0">
            <select
              value={sentimentFilter}
              onChange={(e) => setSentimentFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Sentiments</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>
        </div>

        {filteredReviews.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Movie
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Review Excerpt
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Sentiment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Confidence
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredReviews.map((review) => (
                  <tr key={review.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {review.movie_title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                      {review.review_text}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        {getSentimentIcon(review.sentiment)}
                        <span className={`ml-2 ${
                          review.sentiment === 'positive' ? 'text-green-600 dark:text-green-400' : 
                          review.sentiment === 'negative' ? 'text-red-600 dark:text-red-400' : 
                          'text-gray-600 dark:text-gray-400'
                        }`}>
                          {review.sentiment.charAt(0).toUpperCase() + review.sentiment.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {Math.round(review.confidence * 100)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {review.created_at}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              {reviews.length === 0 
                ? "You haven't analyzed any reviews yet." 
                : "No reviews match your search criteria."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;