from pydantic import BaseModel
from datetime import datetime


class measurements (BaseModel):

    user_id = int
    value = bin
    measurement_date = datetime
