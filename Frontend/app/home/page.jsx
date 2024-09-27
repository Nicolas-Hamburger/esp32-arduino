"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./style.css";


function Home() {
  const router = useRouter();
  const [saludo, setSaludo] = useState("");

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
                        <p>Led: </p>
                        <p>Motor: </p>
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <button className="btn btn-primary" type="submit">
                            Encender Led
                          </button>
                          <button className="btn btn-primary" type="submit">
                            Encender Motor
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
