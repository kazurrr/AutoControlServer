using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Server.Controllers
{
    public class WebApiController : ApiController
    {
        CarDataModel[] cardata = new CarDataModel[]
        {
            new CarDataModel { Id = "1", Speed = "20"},
            new CarDataModel { Id = "2", Speed = "25"},
            new CarDataModel { Id = "3", Speed = "40"},
        };

        public IEnumerable<CarDataModel> GetAllProducts()
        {
            return cardata;
        }

        public IHttpActionResult GetProduct(int id)
        {
            var product = cardata.FirstOrDefault((p) => p.Id == id.ToString());
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
    }
}
