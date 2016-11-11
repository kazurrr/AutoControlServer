using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Server.Controllers
{
    public class WebApiController : ApiController
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
    }
}
