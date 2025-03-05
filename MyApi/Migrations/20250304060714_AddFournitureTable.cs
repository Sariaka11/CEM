using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyApi.Migrations
{
    /// <inheritdoc />
    public partial class AddFournitureTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FOURNITURES",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Designation = table.Column<string>(type: "NVARCHAR2(255)", maxLength: 255, nullable: false),
                    Quantite = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    QuantiteRest = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    PrixU = table.Column<decimal>(type: "DECIMAL(18,2)", nullable: false),
                    PrixTtl = table.Column<decimal>(type: "DECIMAL(18,2)", nullable: false),
                    Type = table.Column<string>(type: "NVARCHAR2(50)", maxLength: 50, nullable: false),
                    Montant = table.Column<decimal>(type: "DECIMAL(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FOURNITURES", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FOURNITURES");
        }
    }
}
