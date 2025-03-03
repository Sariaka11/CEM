using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using MyApi.Data;
using MyApi.Models;
using System.Security.Cryptography;
using System.Text;
using BCrypt.Net;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.MotDePasse))
        {
            return BadRequest(new { message = "Email et mot de passe sont requis." });
        }

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        if (user == null)
        {
            return Unauthorized(new { message = "Utilisateur non trouvé." });
        }

        bool isPasswordValid = BCrypt.Net.BCrypt.Verify(request.MotDePasse, user.MotDePasse);
        if (!isPasswordValid)
        {
            return Unauthorized(new { message = "Mot de passe incorrect." });
        }

        return Ok(new
        {
            message = "Connexion réussie",
            user = new
            {
                id = user.Id,
                email = user.Email,
                nom = user.Nom,
                prenom = user.Prenom
            }
        });
    }
}

