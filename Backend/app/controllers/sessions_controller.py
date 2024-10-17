import mysql.connector
from fastapi import HTTPException
from config.db_config import get_db_connection
from models.sessions_model import sessions
from fastapi.encoders import jsonable_encoder


class sessionsController:

    async def post_sessions(self, new_session: sessions):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            user_id = new_session.user_id
            start_time = new_session.start_time
            end_time = new_session.end_time
            cursor.execute("""
            INSERT INTO sessions (user_id, start_time, end_time)
            VALUES (%s, %s, %s)
        """, (user_id, start_time, end_time))
            conn.commit()
            conn.close()
            return {"informacion": "Sesión registrada"}
        except Exception as error:
            return {"resultado": str(error)}


sessions_controller = sessionsController()
