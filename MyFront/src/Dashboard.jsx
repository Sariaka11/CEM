import { useState } from "react";
import "./dashboard.css";
import { MdStore, MdCleaningServices } from "react-icons/md";
import { PiDeskBold, PiDesktopTowerBold } from "react-icons/pi";
import { AiOutlineStock } from "react-icons/ai";
import { FaHouseUser } from "react-icons/fa6";
import { MdLogin, MdAppRegistration, MdAddBusiness } from "react-icons/md"

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stockData, setStockData] = useState([])

  const [showConsommables, setShowConsommables] = useState(false)

  const [filterDesignation, setFilterDesignation] = useState("")
  const [newRow, setNewRow] = useState({
    id: null,
    designation: "",
    stockAvantQuantite: 0,
    stockAvantCMUP: 0,
    stockApresQuantite: 0,
    stockApresPrixUnitaire: 0,
    categorie: "Fournitures de Magasin", // Nouvelle colonne pour lier aux boxes
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const handleDelete = (id) => {
    setStockData(stockData.filter((item) => item.id !== id))
  }

  const handleModify = (id) => {
    handleEditRow(id)
  }

  const handleAddRow = () => {
    if (newRow.designation.trim() === "") return

    const newId = stockData.length > 0 ? Math.max(...stockData.map((item) => item.id)) + 1 : 1
    const rowToAdd = { ...newRow, id: newId }
    setStockData([...stockData, rowToAdd])
    setNewRow({
      id: null,
      designation: "",
      stockAvantQuantite: 0,
      stockAvantCMUP: 0,
      stockApresQuantite: 0,
      stockApresPrixUnitaire: 0,
      categorie: "Fournitures de Magasin",
    })
    setIsEditing(false)
  }

  const handleCreateRow = () => {
    setIsEditing(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewRow({ ...newRow, [name]: name.includes("Prix") || name.includes("CMUP") ? Number.parseFloat(value) : value })
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddRow()
    }
  }

  const handleEditRow = (id) => {
    setEditingId(id)
    const rowToEdit = stockData.find((item) => item.id === id)
    if (rowToEdit) {
      // Créer une copie pour l'édition
      setNewRow({ ...rowToEdit })
    }
  }

  const handleUpdateRow = () => {
    if (editingId) {
      setStockData(stockData.map((item) => (item.id === editingId ? newRow : item)))
      setEditingId(null)
      setNewRow({
        id: null,
        designation: "",
        stockAvantQuantite: 0,
        stockAvantCMUP: 0,
        stockApresQuantite: 0,
        stockApresPrixUnitaire: 0,
        categorie: "Fournitures de Magasin",
      })
    }
  }

  const filteredData = stockData.filter((item) =>
    item.designation.toLowerCase().includes(filterDesignation.toLowerCase()),
  )

  const calculateStats = () => {
    const stats = {
      "Fournitures de Magasin": 0,
      "Fournitures de Bureau": 0,
      "Matériel Informatiques": 0,
      "Produits Entretien": 0,
    }

    stockData.forEach((item) => {
      if (item.categorie in stats) {
        stats[item.categorie] += item.stockApresQuantite
      }
    })

    return stats
  }

  const stats = calculateStats()

  return (
    <div className="dashboard">
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h1>Dashboard</h1>
        <nav>
          <ul>
            <li>
              <a href="./Login">
                <MdLogin /> Connexion
              </a>
            </li>
            <li>
              <a href="./Inscription">
                <MdAppRegistration /> Inscription
              </a>
            </li>

            <li className="sidebar-item" onClick={() => setShowConsommables(!showConsommables)}>
              <AiOutlineStock /> Gestion des Consommables
              {showConsommables && (
                <ul className="submenu">
                  <li className="submenu-item">
                    <a href="#inventaire">Inventaire</a>
                  </li>
                  <li className="submenu-item">
                    <a href="#stock">Stock</a>
                  </li>
                  <li className="submenu-item">
                    <a href="#dispatche">Dispatche</a>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <a href="#gestion-immobiliers">
                <MdAddBusiness /> Gestion des Immobiliers
              </a>
            </li>

            <li>
              <a href="#">
                <FaHouseUser /> Profil
              </a>
            </li>

          </ul>
        </nav>
      </aside>


      <main className="main-content">
        <header>
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <div className="user-info">
            <span>John Doe</span>
          </div>
        </header>

        <section className="dashboard-content">
          <h2>Tableau de bord</h2>

          <div className="stats-grid">
            <div className="stat-card">
              <MdStore color="red" className="stat-icon" />
              <p className="stat-value">{stats["Fournitures de Magasin"]}</p>
              <h3>Fournitures de Magasin</h3>
            </div>

            <div className="stat-card">
              <PiDeskBold color="red" className="stat-icon" />
              <p className="stat-value">{stats["Fournitures de Bureau"]}</p>
              <h3>Fournitures de Bureau</h3>
              </div>

            <div className="stat-card">
              <PiDesktopTowerBold color="red" className="stat-icon" />
              <p className="stat-value">{stats["Matériel Informatiques"]}</p>
              <h3>Matériel Informatiques</h3>
              </div>
            
            <div className="stat-card">
              <MdCleaningServices color="red" className="stat-icon" />
              <p className="stat-value">{stats["Produits Entretien"]}</p>
              <h3>Produits Entretien</h3>
              </div>
          </div>

          <div className="stock-table">
            <h3>Gestion des stocks</h3>
            <div className="table-actions">
              <input
                type="text"
                placeholder="Filtrer par désignation"
                value={filterDesignation}
                onChange={(e) => setFilterDesignation(e.target.value)}
              />
            </div>
            <div className="create-actions">
              <button onClick={handleCreateRow} className="btn-create">
                Créer
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Désignation</th>
                  <th colSpan="3">Stock Avant</th>
                  <th colSpan="3">Stock Après</th>
                  <th>Catégorie</th>
                  <th>Actions</th>
                </tr>
                <tr>
                  <th></th>
                  <th>Quantité</th>
                  <th>CMUP</th>
                  <th>Montant</th>
                  <th>Quantité</th>
                  <th>Prix Unitaire</th>
                  <th>Montant</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {isEditing && (
                  <tr>
                    <td>
                      <input
                        type="text"
                        name="designation"
                        value={newRow.designation}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Désignation"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="stockAvantQuantite"
                        value={newRow.stockAvantQuantite}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="stockAvantCMUP"
                        value={newRow.stockAvantCMUP}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        step="0.01"
                      />
                    </td>
                    <td>{(newRow.stockAvantQuantite * newRow.stockAvantCMUP).toFixed(2)} Ar</td>
                    <td>
                      <input
                        type="number"
                        name="stockApresQuantite"
                        value={newRow.stockApresQuantite}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="stockApresPrixUnitaire"
                        value={newRow.stockApresPrixUnitaire}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        step="0.01"
                      />
                    </td>
                    <td>{(newRow.stockApresQuantite * newRow.stockApresPrixUnitaire).toFixed(2)} Ar</td>
                    <td>
                      <select
                        name="categorie"
                        value={newRow.categorie}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                      >
                        <option value="Fournitures de Magasin">Fournitures de Magasin</option>
                        <option value="Fournitures de Bureau">Fournitures de Bureau</option>
                        <option value="Matériel Informatiques">Matériel Informatiques</option>
                        <option value="Produits Entretien">Produits Entretien</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={handleAddRow} className="btn-add">
                        Ajouter
                      </button>
                    </td>
                  </tr>
                )}
                {filteredData.map((item) => (
                  <tr key={item.id}>
                    {editingId === item.id ? (
                      <>
                        <td>
                          <input
                            type="text"
                            name="designation"
                            value={newRow.designation}
                            onChange={handleInputChange}
                            onKeyDown={(e) => e.key === "Enter" && handleUpdateRow()}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="stockAvantQuantite"
                            value={newRow.stockAvantQuantite}
                            onChange={handleInputChange}
                            onKeyDown={(e) => e.key === "Enter" && handleUpdateRow()}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="stockAvantCMUP"
                            value={newRow.stockAvantCMUP}
                            onChange={handleInputChange}
                            onKeyDown={(e) => e.key === "Enter" && handleUpdateRow()}
                            step="0.01"
                          />
                        </td>
                        <td>{(newRow.stockAvantQuantite * newRow.stockAvantCMUP).toFixed(2)} Ar</td>
                        <td>
                          <input
                            type="number"
                            name="stockApresQuantite"
                            value={newRow.stockApresQuantite}
                            onChange={handleInputChange}
                            onKeyDown={(e) => e.key === "Enter" && handleUpdateRow()}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="stockApresPrixUnitaire"
                            value={newRow.stockApresPrixUnitaire}
                            onChange={handleInputChange}
                            onKeyDown={(e) => e.key === "Enter" && handleUpdateRow()}
                            step="0.01"
                          />
                        </td>
                        <td>{(newRow.stockApresQuantite * newRow.stockApresPrixUnitaire).toFixed(2)} Ar</td>
                        <td>
                          <select
                            name="categorie"
                            value={newRow.categorie}
                            onChange={handleInputChange}
                            onKeyDown={(e) => e.key === "Enter" && handleUpdateRow()}
                          >
                            <option value="Fournitures de Magasin">Fournitures de Magasin</option>
                            <option value="Fournitures de Bureau">Fournitures de Bureau</option>
                            <option value="Matériel Informatiques">Matériel Informatiques</option>
                            <option value="Produits Entretien">Produits Entretien</option>
                          </select>
                        </td>
                        <td>
                          <button onClick={handleUpdateRow} className="btn-add">
                            Mettre à jour
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{item.designation}</td>
                        <td>{item.stockAvantQuantite}</td>
                        <td>{item.stockAvantCMUP.toFixed(2)} Ar</td>
                        <td>{(item.stockAvantQuantite * item.stockAvantCMUP).toFixed(2)} Ar</td>
                        <td>{item.stockApresQuantite}</td>
                        <td>{item.stockApresPrixUnitaire.toFixed(2)} €</td>
                        <td>{(item.stockApresQuantite * item.stockApresPrixUnitaire).toFixed(2)} Ar</td>
                        <td>{item.categorie}</td>
                        <td>
                          <button onClick={() => handleModify(item.id)} className="btn-modify">
                            Modifier
                          </button>
                          <button onClick={() => handleDelete(item.id)} className="btn-delete">
                            Supprimer
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

         
        </section>
      </main>
    </div>
  )
}

