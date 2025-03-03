using System.ComponentModel.DataAnnotations;

namespace MyApi.Models
{
    public class LoginRequest
    {
        public required string Email { get; set; }
        public required string MotDePasse { get; set; }
    }
}
