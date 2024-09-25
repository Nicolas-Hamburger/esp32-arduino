import mysql.connector
from fastapi import HTTPException
from config.db_config import get_db_connection
from models.users_model import Users
from fastapi.encoders import jsonable_encoder


class UsersController:

    def get_users(self):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users")
            result = cursor.fetchall()
            payload = []
            content = {}
            for data in result:
                content = {
                    'user:id': data[0],
                    'user_name': data[1],
                    'email': data[2],
                    'password': data[3],
                    'time_register': data[4]
                }
                payload.append(content)
                content = {}
            json_data = jsonable_encoder(payload)
            return {"resultado": json_data}
        except Exception as error:
            return {"resultado": str(error)}

    def get_users_id(self, user_id):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute(
                "SELECT * FROM users WHERE user_id = %s", (user_id,))
            result = cursor.fetchone()
            if result:
                user = {
                    'user_id': result[0],
                    'user_name': result[1],
                    'email': result[2],
                    'password': result[3],
                    'time_register': result[4]

                }
                return {"resultado": user}
            else:
                return {"resultado": "Usuario no encontrado"}
        except Exception as error:
            return {"resultado": str(error)}


users_controller = UsersController()
