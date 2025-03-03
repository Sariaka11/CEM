using System.ComponentModel.DataAnnotations;

namespace MyApi.Models
{
   public class User
{
    public int Id { get; set; }

    public required string Nom { get; set; }
    public required string Prenom { get; set; }
    public required string Email { get; set; }
    public required string MotDePasse { get; set; }
    public required string Agence { get; set; }

    // Constructeur pour initialiser les propriétés "required"
    
}

}
