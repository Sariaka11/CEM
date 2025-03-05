using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApi.Models
{
    [Table("FOURNITURES")] // Nom de la table dans la base de données
    public class Fourniture
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Designation { get; set; } = string.Empty;

        [Required]
        public int Quantite { get; set; }

        [Required]
        public int QuantiteRest { get; set; }

        [Required]
        [Column(TypeName = "DECIMAL(18,2)")]
        public decimal PrixU { get; set; }

        [Required]
        [Column(TypeName = "DECIMAL(18,2)")]
        public decimal PrixTtl { get; set; }

        [Required]
        [MaxLength(50)]
        public string Type { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "DECIMAL(18,2)")]
        public decimal Montant { get; set; }
     [Required]
        public DateTime Date { get; set; }
    }
}
