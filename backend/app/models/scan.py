from sqlalchemy import (
    Column,
    Integer,
    Text,
    Numeric,
    DateTime,
    ForeignKey
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.base import Base


class Scan(Base):
    __tablename__ = "scans"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    resume_id = Column(
        Integer,
        ForeignKey("resumes.id", ondelete="CASCADE"),
        nullable=False
    )

    job_description = Column(Text, nullable=False)

    overall_score = Column(Numeric(5, 2))
    skills_score = Column(Numeric(5, 2))
    keyword_score = Column(Numeric(5, 2))

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    user = relationship(
        "User",
        back_populates="scans"
    )

    resume = relationship(
        "Resume",
        back_populates="scans"
    )