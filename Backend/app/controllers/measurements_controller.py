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
            value_motor = new_measurement.value_motor
            value_led = new_measurement.value_led
            cursor.execute("""
                INSERT INTO measurements (value_motor, value_led)
                VALUES (%s, %s)
            """, (value_motor, value_led))
            conn.commit()
            conn.close()
            return {"informacion": "Medición registrada"}
        except Exception as error:
            raise HTTPException(status_code=500, detail=str(error))

    async def get_latest_measurements(self):
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute("""
                SELECT value_motor, value_led
                FROM measurements
                ORDER BY measurement_id DESC
                LIMIT 1
            """)
            result = cursor.fetchone()
            conn.close()
            if result:
                return result
            else:
                return {"value_motor": None, "value_led": None}
        except Exception as error:
            raise HTTPException(status_code=500, detail=str(error))


measurement_controller = MeasurementController()
