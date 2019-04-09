using RestApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestApi.Service
{
    public interface IClienteService
    {
        List<Cliente> GetClientes();

        Cliente GetCliente (int clienteId);

        bool InserirCliente(Cliente cliente);

        bool ExcluirCliente(int clienteId);

        bool AtualizarCliente(Cliente cliente);
    }
}
