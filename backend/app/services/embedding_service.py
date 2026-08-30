# services/embedding_service.py

from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


class EmbeddingService:
    def __init__(self):
        # Good lightweight model for an MVP
        self.model = SentenceTransformer("all-MiniLM-L6-v2")

    def embed(self, text: str):
        """
        Convert text into an embedding vector.
        """
        return self.model.encode(text)

    def similarity(self, text1: str, text2: str) -> float:
        """
        Calculate semantic similarity between two texts.
        Returns a value between 0 and 1.
        """
        embedding1 = self.embed(text1)
        embedding2 = self.embed(text2)

        score = cosine_similarity(
            [embedding1],
            [embedding2]
        )[0][0]

        return float(score)