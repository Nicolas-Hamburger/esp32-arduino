from pydantic import BaseModel
from datetime import datetime

class sessions (BaseModel):
 user_id:int
 start_time: datetime
 end_time: datetime
