using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Dapper;
using RestApi.Models;

namespace RestApi.Service
{
    public class ClienteService : IClienteService
    {
        public bool AtualizarCliente(Cliente cliente)
        {
            var sql = $@"SET DATEFORMAT dmy; update Cliente set Nome = '{cliente.Nome}',DataNasc = CAST('{cliente.DataNasc}' AS DATE),
                        Email = '{cliente.Email}', Cpf = '{cliente.Cpf}' where Id = {cliente.Id}";

            using (var conexao = new SqlConnection((ConfigurationManager.ConnectionStrings["ConexaoBanco"].ConnectionString)))
            {
                var linhasAlteradas = conexao.Execute(sql);

                if (linhasAlteradas > 0)
                    return true;
                else
                    return false;
            }
        }

        public bool ExcluirCliente(int clienteId)
        {
            var sql = $"delete from cliente where Id = {clienteId}";

            using (var conexao = new SqlConnection((ConfigurationManager.ConnectionStrings["ConexaoBanco"].ConnectionString)))
            {
                var linhasAlteradas = conexao.Execute(sql);

                if (linhasAlteradas > 0)
                    return true;
                else
                    return false;
            }
        }

        public Cliente GetCliente(int clienteId)
        {
            var sql = $"select * from Cliente where Id = {clienteId}";

            using (var conexao = new SqlConnection((ConfigurationManager.ConnectionStrings["ConexaoBanco"].ConnectionString)))
            {
                var cliente = conexao.Query<Cliente>(sql).SingleOrDefault();

                return cliente;
            }
        }

        public List<Cliente> GetClientes()
        {
            var sql = $"select * from cliente";

            using (var conexao = new SqlConnection((ConfigurationManager.ConnectionStrings["ConexaoBanco"].ConnectionString)))
            {
                var clientes = conexao.Query<Cliente>(sql).ToList();
                return clientes;
            }
        }

        public bool InserirCliente(Cliente cliente)
        {
            var sql = $"SET DATEFORMAT dmy; INSERT INTO Cliente Values ('{cliente.Nome}',CAST('{cliente.DataNasc}' AS DATE),'{cliente.Email}','{cliente.Cpf}')";

            using (var conexao = new SqlConnection((ConfigurationManager.ConnectionStrings["ConexaoBanco"].ConnectionString)))
            {
                var linhasAlteradas = conexao.Execute(sql);

                if (linhasAlteradas > 0)
                    return true;
                else
                    return false;
            }

        }
    }
}