using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace RestApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            string origin = "http://localhost:8080";

            EnableCorsAttribute cors = new EnableCorsAttribute(origin, "*", "*");

            config.EnableCors(cors);
            // Serviços e configuração da API da Web

            // Rotas da API da Web
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
