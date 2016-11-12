using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace Server.Controllers
{
    public class ErrorsController : ApiController
    {
        CarDatabaseEntities1 db = new CarDatabaseEntities1();

        public IEnumerable<Error> GetAllProducts()
        {
            return db.Errors;
        }

        public IHttpActionResult GetProduct(int id)
        {
            IEnumerable<Error> product = db.Errors.Where(p => p.CarId == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [System.Web.Http.HttpPost]
        public void PostProduct(Error lol)
        {
            db.Errors.Add(lol);
            db.SaveChanges();
        }
    }
}