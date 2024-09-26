from fastapi import APIRouter, HTTPException
from controllers.measurements_controller import MeasurementController
from models.measurements_model import measurements

router = APIRouter()
controller = MeasurementController()


@router.post("/post/measurements")
async def post_measurement(new_measurement: measurements):
    rpta = await controller.post_measurement(new_measurement)
    return rpta
