using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PiRiSback.Migrations
{
    /// <inheritdoc />
    public partial class AddedCredits : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.CreateTable(
                name: "CreditContractOptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsDifferentive = table.Column<bool>(type: "bit", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AvailableCurrencies = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SumFrom = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    SumTo = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    MinDurationInMonth = table.Column<int>(type: "int", nullable: true),
                    MaxDurationInMonth = table.Column<int>(type: "int", nullable: true),
                    PercentPerYear = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CreditContractOptions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CreditContracts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreditContractOptionId = table.Column<int>(type: "int", nullable: false),
                    Account1Id = table.Column<int>(type: "int", nullable: false),
                    Account2Id = table.Column<int>(type: "int", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PersonName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PersonSurname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PersonMiddlename = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrencyId = table.Column<int>(type: "int", nullable: false),
                    Sum = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PercentPerYear = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CreditContracts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CreditContracts_Accounts_Account1Id",
                        column: x => x.Account1Id,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CreditContracts_Accounts_Account2Id",
                        column: x => x.Account2Id,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CreditContracts_CreditContractOptions_CreditContractOptionId",
                        column: x => x.CreditContractOptionId,
                        principalTable: "CreditContractOptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CreditContracts_Currencies_CurrencyId",
                        column: x => x.CurrencyId,
                        principalTable: "Currencies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CreditContracts_Account1Id",
                table: "CreditContracts",
                column: "Account1Id");

            migrationBuilder.CreateIndex(
                name: "IX_CreditContracts_Account2Id",
                table: "CreditContracts",
                column: "Account2Id");

            migrationBuilder.CreateIndex(
                name: "IX_CreditContracts_CreditContractOptionId",
                table: "CreditContracts",
                column: "CreditContractOptionId");

            migrationBuilder.CreateIndex(
                name: "IX_CreditContracts_CurrencyId",
                table: "CreditContracts",
                column: "CurrencyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropTable(
                name: "CreditContracts");

            migrationBuilder.DropTable(
                name: "CreditContractOptions");
        }
    }
}
