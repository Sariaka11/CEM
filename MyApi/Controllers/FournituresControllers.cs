using Microsoft.AspNetCore.Mvc;
using MyApi.Data;
using MyApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace MyApi.Controllers
{
    [Route("api/fournitures")]
    [ApiController]
    public class FournituresController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FournituresController(AppDbContext context)
        {
            _context = context;
        }

        // Récupérer toutes les fournitures
        [HttpGet]
        public ActionResult<IEnumerable<Fourniture>> GetFournitures()
        {
            return _context.Fournitures.ToList();
        }

        // Récupérer une fourniture par ID
        [HttpGet("{id}")]
        public ActionResult<Fourniture> GetFourniture(int id)
        {
            var fourniture = _context.Fournitures.Find(id);
            if (fourniture == null) return NotFound();
            return fourniture;
        }

        // Ajouter ou mettre à jour une fourniture
        [HttpPost]
        public ActionResult<Fourniture> CreateOrUpdateFourniture(Fourniture newFourniture)
        {
            var existingFourniture = _context.Fournitures.FirstOrDefault(f => f.Designation == newFourniture.Designation);

            if (existingFourniture != null)
            {
                // 🔹 Mise à jour de la quantité (remplacement)
                existingFourniture.Quantite = newFourniture.Quantite;

                // 🔹 Mise à jour de la quantité restante
                existingFourniture.QuantiteRest += newFourniture.Quantite;

                // 🔹 Calcul du montant (Quantite * PrixU)
                existingFourniture.Montant = existingFourniture.Quantite * existingFourniture.PrixU;

                // 🔹 Calcul du prix total (QuantiteRest * PrixU)
                existingFourniture.PrixTtl = existingFourniture.QuantiteRest * existingFourniture.PrixU;

                _context.Fournitures.Update(existingFourniture);
                _context.SaveChanges();
                
                return Ok(existingFourniture);
            }
            else
            {
                // Nouvelle fourniture : Initialisation des valeurs correctes
                newFourniture.QuantiteRest = newFourniture.Quantite;
                newFourniture.Montant = newFourniture.Quantite * newFourniture.PrixU;
                newFourniture.PrixTtl = newFourniture.QuantiteRest * newFourniture.PrixU;

                _context.Fournitures.Add(newFourniture);
                _context.SaveChanges();

                return CreatedAtAction(nameof(GetFourniture), new { id = newFourniture.Id }, newFourniture);
            }
        }

        // Mettre à jour une fourniture
      [HttpPut("{id}")]
public IActionResult UpdateFourniture(int id, [FromBody] Fourniture fourniture)
{
    var existingFourniture = _context.Fournitures.Find(id);
    if (existingFourniture == null) return NotFound(new { message = "Fourniture non trouvée." });

    // 🔹 Mettre à jour uniquement les champs modifiables
    existingFourniture.Designation = fourniture.Designation;
    existingFourniture.Quantite = fourniture.Quantite;
    existingFourniture.PrixU = fourniture.PrixU;
    existingFourniture.QuantiteRest = fourniture.QuantiteRest;

    // 🔹 Recalculer les valeurs
    existingFourniture.Montant = existingFourniture.Quantite * existingFourniture.PrixU;
    existingFourniture.PrixTtl = existingFourniture.QuantiteRest * existingFourniture.PrixU;

    _context.Fournitures.Update(existingFourniture);
    _context.SaveChanges();

    return Ok(existingFourniture);
}


        // Supprimer une fourniture
        [HttpDelete("{id}")]
        public IActionResult DeleteFourniture(int id)
        {
            var fourniture = _context.Fournitures.Find(id);
            if (fourniture == null) return NotFound();

            _context.Fournitures.Remove(fourniture);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
