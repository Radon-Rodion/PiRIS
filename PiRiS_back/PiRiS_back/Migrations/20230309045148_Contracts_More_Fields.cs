using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PiRiSback.Migrations
{
    /// <inheritdoc />
    public partial class ContractsMoreFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<string>(
                name: "AddressLiving",
                table: "DebetContracts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "CityLivingId",
                table: "DebetContracts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Number",
                table: "DebetContracts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PassportIdentityNumber",
                table: "DebetContracts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PassportNumber",
                table: "DebetContracts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PassportSeria",
                table: "DebetContracts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AddressLiving",
                table: "CreditContracts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "CityLivingId",
                table: "CreditContracts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Number",
                table: "CreditContracts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PassportIdentityNumber",
                table: "CreditContracts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PassportNumber",
                table: "CreditContracts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PassportSeria",
                table: "CreditContracts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Pin",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_DebetContracts_CityLivingId",
                table: "DebetContracts",
                column: "CityLivingId");

            migrationBuilder.CreateIndex(
                name: "IX_CreditContracts_CityLivingId",
                table: "CreditContracts",
                column: "CityLivingId");

            migrationBuilder.AddForeignKey(
                name: "FK_CreditContracts_Cities_CityLivingId",
                table: "CreditContracts",
                column: "CityLivingId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DebetContracts_Cities_CityLivingId",
                table: "DebetContracts",
                column: "CityLivingId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropForeignKey(
                name: "FK_CreditContracts_Cities_CityLivingId",
                table: "CreditContracts");

            migrationBuilder.DropForeignKey(
                name: "FK_DebetContracts_Cities_CityLivingId",
                table: "DebetContracts");

            migrationBuilder.DropIndex(
                name: "IX_DebetContracts_CityLivingId",
                table: "DebetContracts");

            migrationBuilder.DropIndex(
                name: "IX_CreditContracts_CityLivingId",
                table: "CreditContracts");

            migrationBuilder.DropColumn(
                name: "AddressLiving",
                table: "DebetContracts");

            migrationBuilder.DropColumn(
                name: "CityLivingId",
                table: "DebetContracts");

            migrationBuilder.DropColumn(
                name: "Number",
                table: "DebetContracts");

            migrationBuilder.DropColumn(
                name: "PassportIdentityNumber",
                table: "DebetContracts");

            migrationBuilder.DropColumn(
                name: "PassportNumber",
                table: "DebetContracts");

            migrationBuilder.DropColumn(
                name: "PassportSeria",
                table: "DebetContracts");

            migrationBuilder.DropColumn(
                name: "AddressLiving",
                table: "CreditContracts");

            migrationBuilder.DropColumn(
                name: "CityLivingId",
                table: "CreditContracts");

            migrationBuilder.DropColumn(
                name: "Number",
                table: "CreditContracts");

            migrationBuilder.DropColumn(
                name: "PassportIdentityNumber",
                table: "CreditContracts");

            migrationBuilder.DropColumn(
                name: "PassportNumber",
                table: "CreditContracts");

            migrationBuilder.DropColumn(
                name: "PassportSeria",
                table: "CreditContracts");

            migrationBuilder.DropColumn(
                name: "Pin",
                table: "Accounts");
        }
    }
}
