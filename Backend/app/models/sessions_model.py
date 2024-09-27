from pydantic import BaseModel


class sessions (BaseModel):

    session_id: int
    user_id: int
    start_time: int
