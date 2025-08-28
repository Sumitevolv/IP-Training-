import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import spacy
from nltk.corpus import stopwords
import nltk

# Download NLTK stopwords if not already downloaded
nltk.download('stopwords')

# Load spaCy model for Named Entity Recognition (NER)
nlp = spacy.load("en_core_web_sm")

# Sample job description and resumes
job_description = """We are looking for a software engineer with experience in Python, Django, JavaScript, and cloud computing."""

resumes = [
    """I am a software engineer with 3 years of experience working with Python, Django, and machine learning. I have worked on several cloud-based projects with AWS and GCP.""",
    """Looking for a job in data science. Proficient in Python, machine learning algorithms, SQL, and data visualization using tools like Tableau and Power BI.""",
    """Experienced software developer with expertise in Java, Spring Boot, and cloud platforms like AWS. I have worked in Agile teams delivering software solutions."""
]

# Preprocess the text (optional - removing stopwords, punctuation, etc.)
def preprocess_text(text):
    # Lowercase the text
    text = text.lower()
    # Tokenize and remove stopwords
    stop_words = set(stopwords.words('english'))
    text_tokens = [word for word in text.split() if word not in stop_words]
    return " ".join(text_tokens)

# Apply preprocessing to the job description and resumes
job_description = preprocess_text(job_description)
resumes = [preprocess_text(resume) for resume in resumes]

# Convert the job description and resumes to TF-IDF vectors
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform([job_description] + resumes)

# Compute the cosine similarity between the job description and each resume
cosine_similarities = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()

# Print the similarity scores for each resume
for idx, score in enumerate(cosine_similarities):
    print(f"Resume {idx + 1} Similarity Score: {score}")

# Rank and filter resumes
threshold = 0.2  # Define a threshold for filtering
relevant_resumes = [(idx + 1, score) for idx, score in enumerate(cosine_similarities) if score > threshold]

print("\nFiltered Relevant Resumes:")
for resume_num, score in relevant_resumes:
    print(f"Resume {resume_num} with Similarity Score: {score}")
