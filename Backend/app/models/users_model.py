from pydantic import BaseModel
from datetime import datetime


class users (BaseModel):
    user_id:int
    user_name: str
    email: str
    password: str
    time_register: datetime
