from pydantic import BaseModel


class measurements (BaseModel):

    user_id: int
    value_motor:  int
    value_led: int
