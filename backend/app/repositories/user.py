from sqlalchemy.orm import Session

from app.models.user import User


def create_user(
    db: Session,
    email: str,
    name: str | None = None
) -> int:

    user = User(
        email=email,
        name=name
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()