from sqlalchemy.orm import Session

from app.models.oauth_account import OAuthAccount


def get_user_id_by_provider(
    db: Session,
    provider: str,
    provider_user_id: str
):
    account = (
        db.query(OAuthAccount)
        .filter(
            OAuthAccount.provider == provider,
            OAuthAccount.provider_user_id == provider_user_id
        )
        .first()
    )

    if account:
        return account.user_id

    return None

def create_oauth_account(
    db: Session,
    user_id: int,
    provider: str,
    provider_user_id: str
):
    new_account = OAuthAccount(
        user_id=user_id,
        provider=provider,
        provider_user_id=provider_user_id
    )
    db.add(new_account)
    db.commit()
    db.refresh(new_account)
    return new_account