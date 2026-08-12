from slugify import slugify


def generate_unique_slug(db, model, name: str, field: str = "slug") -> str:
    """
    Generate a unique slug for any SQLAlchemy model.

    Example:
        CarePlus Texas -> careplus-texas
        CarePlus Texas -> careplus-texas-2
    """

    base_slug = slugify(name)
    slug = base_slug
    counter = 2

    column = getattr(model, field)

    while db.query(model).filter(column == slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1

    return slug
