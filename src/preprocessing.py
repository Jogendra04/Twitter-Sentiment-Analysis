import re
import pandas as pd

from sklearn.base import BaseEstimator, TransformerMixin

from nltk.corpus import stopwords

# Load stopwords
stop_words = set(stopwords.words("english"))


# Text Preprocessing Function
def preprocess_text(text):

    text = str(text).lower()

    # Remove URLs
    text = re.sub(r"http\S+|www\S+", "", text)

    # Remove special characters and numbers
    text = re.sub(r"[^a-zA-Z\s]", "", text)

    # Remove extra spaces
    text = re.sub(r"\s+", " ", text).strip()

    # Remove custom words
    custom_words = {"im", "ill", "ive"}

    words = [
        word
        for word in text.split()
        if word not in custom_words
    ]

    # Remove stopwords
    words = [
        word
        for word in words
        if word not in stop_words
    ]

    return " ".join(words)


class TextPreprocessor(BaseEstimator, TransformerMixin):

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        return pd.Series(X).apply(preprocess_text)