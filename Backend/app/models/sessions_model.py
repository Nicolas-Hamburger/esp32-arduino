from pydantic import BaseModel


class sessions (BaseModel):
    user_id: int
    start_time: str
    end_time: str