import React, { useState } from "react";
import Imagendoc from "../imagenes/Imagendoc.png";
import logo from "../imagenes/logo.png";
import ojoA from "../imagenes/ojoA.png";
import ojoC from "../imagenes/ojoC.png";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function useHandleSubmit(event) {
    event.preventDefault();
    try {
      await fetch(`http://localhost:3100/usuarios/login`, {
        method: "POST", // Utilizamos el método POST
        headers: {
          "Content-Type": "application/json", // Indicamos que estamos enviando JSON
        },
        body: JSON.stringify({
          // Convertimos el objeto a JSON
          correoReq: email,
          contrasenaReq: password,
        }),
      }).then(response => {
        // Convertimos el objeto Response a JSON
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json(); // Devuelve una promesa que se resuelve a JSON
      })
      .then((data) => {
        console.log("DATA: " + data);
        if (data != null ) {
          sessionStorage.setItem("authenticated", "true");
          navigate("/home");
        } else {
          setError("Correo o Contraseña incorrectos");
          setTimeout(() => {
            setError("");
          }, 2000);
        }
      });
    } catch (error) {
      console.error("Error en la validación de inicio de sesión:", error);
    }
  }

  return (
    <div className="login-container">
      <div className="background">
        <div className="top-side">
          <div className="top-text-container">
            <div className="top-text">
              Blockchain
              <br />
              Medicina Forense
            </div>
            <div className="vertical-line"></div>
            <img src={logo} className="imgLogo" alt="Logo" />
          </div>
        </div>
        <div className="middle-container">
          <div className="form-container">
            <h2>Bienvenido</h2>
            {error && <div className="error-message">{error}</div>} {}
            <form onSubmit={useHandleSubmit}>
              <div className="input-correo">
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-contraseña">
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="ojo-password"
                    onClick={PasswordVisibility}
                  >
                    <img
                      src={showPassword ? ojoA : ojoC}
                      alt="Password Visibility"
                    />
                  </button>
                </div>
              </div>
              <button className="submit" type="submit">
                Iniciar Sesión
              </button>
            </form>
            <div className="image-container">
              <img src={Imagendoc} alt="Imagen del documento" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
