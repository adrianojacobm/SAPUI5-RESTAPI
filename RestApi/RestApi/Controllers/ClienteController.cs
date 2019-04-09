using RestApi.Models;
using RestApi.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace RestApi.Controllers
{

    public class ClienteController : ApiController
    {
        private ClienteService _clienteService = new ClienteService();

        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("Cliente")]
        [HttpGet]
        public List<Cliente> Get()
        {
            try
            {
                return _clienteService.GetClientes();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("Cliente/{id}")]
        [HttpGet]
        public Cliente Get(int id)
        {
            try
            {
                return _clienteService.GetCliente(id);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }

        }

        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("Cliente")]
        [HttpPost]
        public bool Post([FromBody]Cliente cliente)
        {
            try
            {
                return _clienteService.InserirCliente(cliente);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }

        }

        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("Cliente")]
        [HttpPut]
        public bool Put([FromBody]Cliente cliente)
        {
            try
            {
                return _clienteService.AtualizarCliente(cliente);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("Cliente/{id}")]
        [HttpDelete]
        public bool Delete(int id)
        {
            try
            {
                return _clienteService.ExcluirCliente(id);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
