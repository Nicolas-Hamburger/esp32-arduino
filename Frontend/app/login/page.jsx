"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./style.css";

function Formulario() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [saludo, setSaludo] = useState("");

  useEffect(() => {
    const horaActual = new Date().getHours();
    if (horaActual >= 6 && horaActual <= 12) {
      setSaludo("¡Buenos días! 🌄");
    }
    if (horaActual > 12 && horaActual < 18) {
      setSaludo("¡Buenos tardes! ☀️");
    }
    if (horaActual > 18 && horaActual < 6) {
      setSaludo("¡Buenos noches! 🌃");
    }
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    axios
      .post("http://127.0.0.1:8000/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("token_type", response.data.token_type);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`;
        return axios.get("http://127.0.0.1:8000/usuario");
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setError(null);
        const user = JSON.parse(localStorage.getItem("user"));
        const user_id = user.user_id;
        const startTime = new Date().toLocaleString("es-CO", {
          timeZone: "America/Bogota",
        });
        localStorage.setItem("start_time", startTime);
        return axios.post("http://127.0.0.1:8000/post/sessions", {
          user_id: user_id,
          start_time: startTime,
          end_time: "",
        });
      })
      .then(() => {
        router.push(`/info`);
      })
      .catch((error) => {
        console.error(error);
        setError("Correo Electrónico o Contraseña Incorrectos");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="forms">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="container-forms">
                <div className="row justify-content-center h-100">
                  <div className="col-lg-5">
                    <div className="card">
                      <div className="card-header">
                        <p className="title-card">Inicio de Sesión</p>
                        <p>
                          Hola, {saludo} <br></br> Por favor ingresa con tus
                          credenciales otorgadas
                        </p>
                      </div>
                      <div className="card-body">
                        {error && (
                          <div className="alert alert-danger" role="alert">
                            {error}
                          </div>
                        )}

                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            id="inputUsername"
                            type="text"
                            placeholder="Nombre de usuario"
                            value={username}
                            onChange={handleUsernameChange}
                          />
                          <label htmlFor="inputUsername">
                            Correo Electronico
                          </label>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            id="inputPassword"
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={handlePasswordChange}
                          />
                          <label htmlFor="inputPassword">Contraseña</label>
                        </div>
                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            id="inputRememberPassword"
                            type="checkbox"
                            value=""
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inputRememberPassword"
                          >
                            Recordar Contraseña
                          </label>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <button className="btn btn-primary" type="submit">
                            Entrar
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
    </form>
  );
}

export default Formulario;
