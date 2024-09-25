from fastapi import APIRouter, HTTPException
from controllers.sessions_controller import sessionsController
from models.sessions_model import sessions

router = APIRouter()
controller = sessionsController()


@router.post("/post/sessions")
async def post_sessions(new_session: sessions):
    rpta = await controller.post_sessions(new_session)
    return rpta
