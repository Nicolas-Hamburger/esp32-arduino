"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./style.css";

function Info() {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/home");
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
                        <p className="title-card">Información</p>
                        <div></div>
                      </div>
                      <div className="card-body">
                        <p>
                          ¡Has accedido al menú controlador de tu circuito
                          electrónico! Aquí puedes gestionar tanto el encendido
                          del LED como del motor. Podrás controlar fácilmente
                          cuándo encender o apagar cada uno y, además,
                          visualizar su estado actual para asegurarte de que
                          todo esté funcionando correctamente. ¡Es un sistema
                          sencillo y eficiente para tener todo bajo control!
                        </p>
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                            onClick={handleButtonClick}
                          >
                          Siguiente
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

export default Info;
