from pydantic import BaseModel


class measurements (BaseModel):

    user_id: int
    value:  int
