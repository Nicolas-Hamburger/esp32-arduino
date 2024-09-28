import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.sessions_routes import router as sessions_routes
from routes.auth_routes import router as Auth_routes
from routes.measurements_routes import router as measurements_routes

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://192.168.88.0/24",  
    "*"  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Incluir rutas
app.include_router(sessions_routes)
app.include_router(Auth_routes)
app.include_router(measurements_routes)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
