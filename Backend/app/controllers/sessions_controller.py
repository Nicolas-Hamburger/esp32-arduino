import mysql.connector
from fastapi import HTTPException
from config.db_config import get_db_connection
from models.sessions_model import sessions
from fastapi.encoders import jsonable_encoder
# from datetime import datetime


class sessionsController:

    async def post_sessions(self, new_session: sessions):

        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            user_id = new_session.user_id
            cursor.execute("""
              INSERT INTO sessions (user_id)
               VALUES (%s)
                 """, (user_id,))

            conn.commit()
            conn.close()
            return {"informacion": "Sesión registrada"}
        except Exception as error:
            return {"resultado": str(error)}


sessions_controller = sessionsController()
