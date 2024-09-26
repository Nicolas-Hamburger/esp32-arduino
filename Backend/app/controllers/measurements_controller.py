import mysql.connector
from fastapi import HTTPException
from config.db_config import get_db_connection
from models.measurements_model import measurements
from fastapi.encoders import jsonable_encoder

class MeasurementController:

    async def post_measurement(self, new_measurement: measurements):

        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            user_id = new_measurement.user_id
            value = new_measurement.value
            cursor.execute("""
                INSERT INTO measurements (user_id, value)
                VALUES (%s, %s)
            """, (user_id, value))
            conn.commit()
            conn.close()
            return {"informacion": "Medición registrada"}
        except Exception as error:
            raise HTTPException(status_code=500, detail=str(error))


measurement_controller = MeasurementController()
