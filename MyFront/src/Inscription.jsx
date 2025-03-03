
import { useState } from "react";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";

export function Inscription() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [agence, setAgence] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmMotDePasse, setConfirmMotDePasse] = useState("");
  const [motDePasseMatch, setMotDePasseMatch] = useState(true); // Vérification des mots de passe
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (motDePasse !== confirmMotDePasse) {
      setMotDePasseMatch(false);
      return;
    }

    const userData = {
      nom,
      prenom,
      agence,
      email,
      motDePasse,
    };

    try {
      const response = await fetch("http://localhost:5037/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("Inscription réussie !");
        navigate("/login"); // Redirige vers la page de connexion
      } else {
        const errorData = await response.json();
        console.error("Erreur d'inscription :", errorData);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  const handleMotDePasseChange = (e) => {
    setMotDePasse(e.target.value);
    checkPasswordsMatch(e.target.value, confirmMotDePasse);
  };

  const handleConfirmMotDePasseChange = (e) => {
    setConfirmMotDePasse(e.target.value);
    checkPasswordsMatch(motDePasse, e.target.value);
  };

  const checkPasswordsMatch = (motDePasse, confirmMotDePasse) => {
    setMotDePasseMatch(motDePasse === confirmMotDePasse);
  };

  return (
    <div className="Inscription">
      <h1 className="h1-inscri">Formulaire inscription</h1>
      <form onSubmit={handleSubmit}>
        <div className="groupe-champ">
          <label htmlFor="nom" className="etiquette">Nom:</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="champ"
            required
          />
        </div>
        <div className="groupe-champ">
          <label htmlFor="prenom" className="etiquette">Prenom:</label>
          <input
            type="text"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="champ"
            required
          />
        </div>
        <div className="groupe-champ">
          <label htmlFor="agence" className="etiquette">Agence numero:</label>
          <input
            type="text"
            id="agence"
            value={agence}
            onChange={(e) => setAgence(e.target.value)}
            className="champ"
            required
          />
        </div>
        <div className="groupe-champ">
          <label htmlFor="email" className="etiquette">Votre Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="champ"
            required
          />
        </div>
        <div className="groupe-champ">
          <label htmlFor="motDePasse" className="etiquette">Mot de Passe:</label>
          <input
            type="password"
            id="motDePasse"
            value={motDePasse}
            onChange={handleMotDePasseChange}
            className="champ"
            required
          />
        </div>
        <div className="groupe-champ">
          <label htmlFor="confirmMotDePasse" className="etiquette">
            Entrer de nouveau le mot de passe :
          </label>
          <input
            type="password"
            id="confirmMotDePasse"
            value={confirmMotDePasse}
            onChange={handleConfirmMotDePasseChange}
            className={`champ ${motDePasseMatch ? 'champ-valide' : 'champ-erreur'}`}
            required
          />
          {!motDePasseMatch && (
            <span className="alerte-erreur">Les mots de passe ne correspondent pas.</span>
          )}
        </div>
        <div className="button-container">
          <button className="login-button login-button-red" type="submit">Enregistrer</button>
          <Link to="/login">
            <button className="login-button login-button-white" type="button">Connexion</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
