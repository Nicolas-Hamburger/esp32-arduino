import mysql.connector
from fastapi import HTTPException
from config.db_config import get_db_connection
from models.measurements_model import measurements
from fastapi.encoders import jsonable_encoder


class MeasurementController:

    async def get_all_measurements(self):
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute("""
                SELECT * FROM measurements
            """)
            result = cursor.fetchall()
            conn.close()
            return result
        except Exception as error:
            raise HTTPException(status_code=500, detail=str(error))

    async def get_measurement_by_id(self, measurement_id: int):
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute("""
                SELECT * FROM measurements
                WHERE measurement_id = %s
            """, (measurement_id,))
            result = cursor.fetchone()
            conn.close()
            if result:
                return result
            else:
                return {"detail": "Medición no encontrada"}
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

    async def update_measurement(self, measurement_id: int, updated_measurement: measurements):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            value_motor = updated_measurement.value_motor
            value_led = updated_measurement.value_led
            cursor.execute("""
            UPDATE measurements
            SET value_motor = %s, value_led = %s
            WHERE measurement_id = %s
        """, (value_motor, value_led, measurement_id))
            conn.commit()
            conn.close()
            return {"informacion": "Medición actualizada"}
        except Exception as error:
            raise HTTPException(status_code=500, detail=str(error))

    def delete_measurement(self, measurement_id: int):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute(
                "SELECT measurement_id FROM measurement WHERE measurement_id = %s", (measurement_id,))
            resultado = cursor.fetchone()
            if not resultado:
                return {"informacion": "El movimiento no se encuentra en la base de datos"}
            cursor.execute(
                "DELETE FROM measurement WHERE measurement_id = %s", (measurement_id,))
            conn.commit()
            cursor.close()
            cursor = conn.cursor()
            cursor.execute("ALTER TABLE measurement AUTO_INCREMENT = 1")
            conn.commit()
            return {"informacion": "movimiento eliminado"}
        except Exception as error:
            return {"resultado": str(error)}


measurement_controller = MeasurementController()
