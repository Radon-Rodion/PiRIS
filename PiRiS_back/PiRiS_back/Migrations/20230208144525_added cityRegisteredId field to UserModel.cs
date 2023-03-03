using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PiRiSback.Migrations
{
    /// <inheritdoc />
    public partial class addedcityRegisteredIdfieldtoUserModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CityRegisteredId",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_CityRegisteredId",
                table: "AspNetUsers",
                column: "CityRegisteredId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Cities_CityRegisteredId",
                table: "AspNetUsers",
                column: "CityRegisteredId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Cities_CityRegisteredId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_CityRegisteredId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "CityRegisteredId",
                table: "AspNetUsers");
        }
    }
}
