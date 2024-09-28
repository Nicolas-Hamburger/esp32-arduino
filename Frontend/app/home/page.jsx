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

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("user"));

    if (usuario && usuario.user_name) {
      const horaActual = new Date().getHours();
      let saludoTemporal = "";

      if (horaActual >= 6 && horaActual < 18) {
        saludoTemporal = `¡Buenos días, ${usuario.user_name}! ☀️`;
      } else {
        saludoTemporal = `¡Buenas noches, ${usuario.user_name}! 🌙`;
      }

      setSaludo(saludoTemporal);
    }
  }, []);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(
          "http://192.168.64.73:8000/get/measurements/latest"
        );
        const data = response.data;
        setLedStatus(data.value_led === 1);
        setMotorStatus(data.value_motor === 1);
      } catch (error) {
        console.error("Error al obtener el estado:", error);
      }
    };

    fetchStatus(); 
    const intervalId = setInterval(fetchStatus, 1000); 

    return () => clearInterval(intervalId); 
  }, []);

  const handleLedToggle = async () => {
    try {
      const newStatus = !ledStatus;
      setLedStatus(newStatus);

      await axios.post("http://192.168.64.73:8000/post/measurements", {
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

      await axios.post("http://192.168.64.73:8000/post/measurements", {
        value_motor: newStatus ? 1 : 0,
        value_led: ledStatus ? 1 : 0,
      });
    } catch (error) {
      console.error("Error al cambiar el estado del Motor:", error);
    }
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
                        </div>
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
