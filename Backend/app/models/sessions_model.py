from pydantic import BaseModel
from datetime import datetime


class sessions (BaseModel):
    user_id: int
