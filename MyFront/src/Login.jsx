import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5037/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, motDePasse }),
      });

      if (response.ok) {
        console.log("Connexion réussie !");
        navigate("/dashboard");
      } else {
        setErreur("Email ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setErreur("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">MEMBRE</h2>
        {erreur && <p className="login-error">{erreur}</p>}
        <form onSubmit={handleLogin}>
          <label className="login-label">Email</label>
          <input
            type="email"
            placeholder="Entrer votre email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="login-label">Mot de passe</label>
          <input
            type="password"
            placeholder="Entrer votre mot de passe"
            className="login-input"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />

          <button type="submit" className="login-button login-button-red">
            Se connecter
          </button>
        </form>

        <Link to="/inscription">
          <button className="login-button login-button-white">inscrire</button>
        </Link>
      </div>
    </div>
  );
}
