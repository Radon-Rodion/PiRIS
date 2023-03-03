using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PiRiSback.Migrations
{
    /// <inheritdoc />
    public partial class DebetContractOptionModelChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsRequestable",
                table: "DebetContractOptions",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsRequestable",
                table: "DebetContractOptions");
        }
    }
}
