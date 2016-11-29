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

        public IEnumerable<Error> GetAll()
        {
            return db.Errors;
        }

        public IHttpActionResult Get(int id)
        {
            IEnumerable<Error> product = db.Errors.Where(p => p.CarId == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        public IHttpActionResult GetLast(int id)
        {
            Error product = db.Errors.Where(p => p.CarId == id).OrderByDescending(p => p.ErrorId).FirstOrDefault();
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [System.Web.Http.HttpPost]
        public void Post(Error lol)
        {
            lol.CreateDate = DateTime.Now;
            db.Errors.Add(lol);
            db.SaveChanges();
        }
    }
}