"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./style.css";

function Info() {
  const router = useRouter();
  const usuarios = [
    {
      id: 1,
      nombre: "Omar",
      email: "nicolas@example.com",
      rol: "Administrador",
    },
  ];

  const handleButtonClick = () => {
    router.push('/home');
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
                        <p>Usuario: </p>
                        <p>Correo: </p>
                        <p>Fecha de inicio de sesión: </p>
                        <p></p>
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <button className="btn btn-primary w-100" type="submit"
                          onClick={handleButtonClick}>
                            Ir al siguiente menu
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
