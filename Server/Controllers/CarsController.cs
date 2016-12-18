using System;
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

        public IEnumerable<Car> GetAll()
        {
            return db.Cars;
        }

        public IHttpActionResult Get(int id)
        {
            Car product = db.Cars.FirstOrDefault(p => p.CarId == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        public IHttpActionResult GetLast()
        {
            Car product = db.Cars.OrderByDescending(p => p.CarId).FirstOrDefault();
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [System.Web.Http.HttpPost]
        public IHttpActionResult Post(Car lol)
        {
            lol.CreateDate = DateTime.Now;
            db.Cars.Add(lol);
            db.SaveChanges();
            return Ok("The car has been properly added");
        }
    }
}
