import sys
import json

# This is a placeholder for your actual ML model
# In a real application, you would load your trained model here
# For example:
# import pickle
# model = pickle.load(open('model.pkl', 'rb'))

def analyze_sentiment(text):
    """
    Analyze the sentiment of the given text.
    
    This is a placeholder implementation. In a real application,
    you would use your trained model to predict the sentiment.
    
    Args:
        text (str): The text to analyze
        
    Returns:
        dict: A dictionary containing the sentiment and confidence
    """
    # Simple rule-based sentiment analysis for demonstration
    # In a real application, you would use your ML model here
    
    positive_words = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'love', 'enjoy', 'best']
    negative_words = ['bad', 'terrible', 'awful', 'worst', 'hate', 'poor', 'disappointing', 'boring']
    
    text = text.lower()
    words = text.split()
    
    positive_count = sum(1 for word in words if word in positive_words)
    negative_count = sum(1 for word in words if word in negative_words)
    
    total_count = positive_count + negative_count
    
    if total_count == 0:
        sentiment = "neutral"
        confidence = 0.5
    elif positive_count > negative_count:
        sentiment = "positive"
        confidence = positive_count / (positive_count + negative_count)
    else:
        sentiment = "negative"
        confidence = negative_count / (positive_count + negative_count)
    
    return {
        "sentiment": sentiment,
        "confidence": confidence
    }

if __name__ == "__main__":
    if len(sys.argv) > 1:
        # Get the review text from command line arguments
        review_text = sys.argv[1]
        
        # Analyze sentiment
        result = analyze_sentiment(review_text)
        
        # Print the result as JSON
        print(json.dumps(result))
    else:
        print(json.dumps({"error": "No text provided"}))