using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.Data;
using MyApi.Models;
using System.Linq;
using System.Threading.Tasks;

namespace MyApi.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Lire tous les utilisateurs
        [HttpGet]
        public async Task<ActionResult> GetUsers()
        {
            // Utilisation de ToListAsync() pour obtenir tous les utilisateurs
            var users = await _context.Users.ToListAsync();
            return Ok(users);  // Retourne les utilisateurs dans la réponse
        }
        [HttpGet("{id}")]
public async Task<ActionResult<User>> GetUser(int id)
{
    var user = await _context.Users.FindAsync(id);

    if (user == null)
    {
        return NotFound();
    }

    return Ok(user);
}


        // ✅ Ajouter un utilisateur
        [HttpPost]
        public async Task<ActionResult> AddUser(User user)
        {
            // Hachage du mot de passe avant d'enregistrer dans la base de données
            user.MotDePasse = BCrypt.Net.BCrypt.HashPassword(user.MotDePasse);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUsers), new { id = user.Id }, user);
        }

        // ✅ Modifier un utilisateur
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUser(int id, User user)
        {
            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null) return NotFound();

            // Mise à jour des propriétés
            existingUser.Nom = user.Nom;
            existingUser.Prenom = user.Prenom;
            existingUser.Email = user.Email;
            existingUser.Agence = user.Agence;

            // Hachage du mot de passe avant la mise à jour
            existingUser.MotDePasse = BCrypt.Net.BCrypt.HashPassword(user.MotDePasse);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // ✅ Login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == user.Email);

            if (existingUser == null || !BCrypt.Net.BCrypt.Verify(user.MotDePasse, existingUser.MotDePasse))
                return Unauthorized("Identifiants incorrects");

            return Ok("Connexion réussie !");
        }

        // ✅ Supprimer un utilisateur
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
