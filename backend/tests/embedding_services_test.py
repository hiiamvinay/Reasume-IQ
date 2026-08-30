from app.services.embedding_service import EmbeddingService


embedding_service = EmbeddingService()

resume_text = """
I developed REST APIs using Python and FastAPI.
I worked with PostgreSQL and Docker for backend deployment.
"""

job_requirement = """
Looking for a backend engineer experienced in Python,
REST APIs, FastAPI, PostgreSQL and containerization.
"""

score = embedding_service.similarity(
    resume_text,
    job_requirement
)

print(f"Similarity: {score:.2f}")





def test_embedding_returns_vector():
    service = EmbeddingService()

    text = "Python backend developer"

    embedding = service.embed(text)

    assert embedding is not None
    assert len(embedding) > 0


def test_similar_texts_have_high_similarity():
    service = EmbeddingService()

    text1 = "Python backend developer"
    text2 = "Backend engineer experienced in Python"

    score = service.similarity(text1, text2)

    assert score > 0.5


def test_different_texts_have_lower_similarity():
    service = EmbeddingService()

    text1 = "Python backend developer"
    text2 = "Chocolate cake recipe"

    score = service.similarity(text1, text2)

    assert score < 0.5


def test_similarity_is_between_zero_and_one():
    service = EmbeddingService()

    score = service.similarity(
        "FastAPI backend development",
        "Python REST API development"
    )

    assert 0 <= score <= 1