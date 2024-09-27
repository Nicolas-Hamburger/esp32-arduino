from fastapi import APIRouter, HTTPException
from controllers.measurements_controller import MeasurementController
from models.measurements_model import measurements

router = APIRouter()
controller = MeasurementController()


@router.get("/get/measurements")
async def get_all_measurements():
    return await controller.get_all_measurements()


@router.get("/get/measurements/{measurement_id}")
async def get_measurement_by_id(measurement_id: int):
    return await controller.get_measurement_by_id(measurement_id)


@router.get("/get/measurements/latest")
async def get_latest_measurements():
    return await controller.get_latest_measurements()


@router.post("/post/measurements")
async def post_measurement(new_measurement: measurements):
    rpta = await controller.post_measurement(new_measurement)
    return rpta


@router.put("/update/measurements/{measurement_id}")
async def update_measurement(measurement_id: int, updated_measurement: measurements):
    return await controller.update_measurement(measurement_id, updated_measurement)


@router.delete("/delete/measurement/{measurement_id}")
async def delete_measurement(measurement_id: int):
    try:
        rpta = controller.delete_measurement(measurement_id)
        return rpta
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))
