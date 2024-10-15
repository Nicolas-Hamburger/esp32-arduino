"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./style.css";

function Home() {
  const router = useRouter();
  const [saludo, setSaludo] = useState("");
  const [ledStatus, setLedStatus] = useState(false);
  const [motorStatus, setMotorStatus] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false); 

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("user"));

    if (usuario && usuario.user_name) {
      const horaActual = new Date().getHours();
      let saludoTemporal = "";

      if (horaActual >= 6 && horaActual < 18) {
        saludoTemporal = `¡Buenos días, ${usuario.user_name}! ☀️`;
      } else {
        saludoTemporal = `¡Buenos noches, ${usuario.user_name}! 🌙`;
      }

      setSaludo(saludoTemporal);
    }
  }, []);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(
          "http://192.168.212.73:8000/get/measurements/latest"
        );
        const data = response.data;
        setLedStatus(data.value_led === 1);
        setMotorStatus(data.value_motor === 1);
      } catch (error) {
        console.error("Error al obtener el estado:", error);
      }
    };

    fetchStatus();
    const intervalId = setInterval(fetchStatus, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLedToggle = async () => {
    try {
      const newStatus = !ledStatus;
      setLedStatus(newStatus);

      await axios.post("http://192.168.212.73:8000/post/measurements", {
        value_motor: motorStatus ? 1 : 0,
        value_led: newStatus ? 1 : 0,
      });
    } catch (error) {
      console.error("Error al cambiar el estado del LED:", error);
    }
  };

  const handleMotorToggle = async () => {
    try {
      const newStatus = !motorStatus;
      setMotorStatus(newStatus);

      await axios.post("http://192.168.212.73:8000/post/measurements", {
        value_motor: newStatus ? 1 : 0,
        value_led: ledStatus ? 1 : 0,
      });
    } catch (error) {
      console.error("Error al cambiar el estado del Motor:", error);
    }
  };

  const handleLogout = async () => {
    setConfirmLogout(false); 

    const user = JSON.parse(localStorage.getItem("user"));
    const endTime = new Date().toISOString(); 

   
    try {
      await axios.post("http://127.0.0.1:8000/post/sessions", {
        user_id: user.user_id, 
        start_time: user.start_time, 
        end_time: endTime,
      });
      localStorage.removeItem("user");
      router.push("/login"); 
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleConfirmLogout = () => {
    setConfirmLogout(true); 
  };

  return (
    <div className="forms">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="container-forms">
                <div className="row justify-content-center h-100">
                  <div className="col-lg-5">
                    <div className="card">
                      <div className="card-header">
                        <p className="title-card">Home</p>
                        <p>Hola, {saludo}</p>
                        <div></div>
                      </div>
                      <div className="card-body">
                        <p>Led: {ledStatus ? "Encendido" : "Apagado"}</p>
                        <p>Motor: {motorStatus ? "Encendido" : "Apagado"}</p>
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <button
                            className="btn btn-primary"
                            onClick={handleLedToggle}
                          >
                            {ledStatus ? "Apagar Led" : "Encender Led"}
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={handleMotorToggle}
                          >
                            {motorStatus ? "Apagar Motor" : "Encender Motor"}
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={handleConfirmLogout}
                          >
                            Cerrar Sesión
                          </button>
                        </div>
                        {confirmLogout && (
                          <div className="confirm-logout">
                            <p>¿Estás seguro de que deseas cerrar sesión?</p>
                            <button
                              className="btn btn-secondary"
                              onClick={handleLogout}
                            >
                              Sí
                            </button>
                            <button
                              className="btn btn-secondary"
                              onClick={() => setConfirmLogout(false)}
                            >
                              No
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Home;
