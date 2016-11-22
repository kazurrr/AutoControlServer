using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace Server.Controllers
{
    public class CarsController : ApiController
    {
        CarDatabaseEntities1 db = new CarDatabaseEntities1(); 

        public IEnumerable<car> GetAllProducts()
        {
            return db.cars;
        }

        public IHttpActionResult GetProduct(int id)
        {
            var product = db.cars.FirstOrDefault(p => p.CarId == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [System.Web.Http.HttpPost]
        public IHttpActionResult PostProduct([FromBody]car carData)
        {
            if (carData == null)
            {
                return BadRequest();
            }

            db.cars.Add(carData);
            db.SaveChanges();

            return Created("post", carData);
        }
    }
}
