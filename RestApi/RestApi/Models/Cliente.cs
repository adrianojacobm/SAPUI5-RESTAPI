using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RestApi.Models
{
    public class Cliente
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public DateTime DataNasc { get; set; }
        public string Email { get; set; }
        public string Cpf { get; set; }
    }
}