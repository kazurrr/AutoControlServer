using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace Server.Controllers
{
    public class DetailsController : ApiController
    {
        CarDatabaseEntities1 db = new CarDatabaseEntities1();

        public IEnumerable<detail> GetAllProducts()
        {
            return db.details;
        }

        public IHttpActionResult GetProduct(int id)
        {
            IEnumerable<detail> product = db.details.Where(p => p.CarId == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        //public IHttpActionResult GetProduct1(String id)
        //{
        //    Debug.WriteLine("KOKOS " + id);

        //    IEnumerable<detail> product = db.details.Where(p => p.CarId == 1);
        //    if (product == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(product);
        //}

        [System.Web.Http.HttpPost]
        public void PostProduct(detail lol)
        {
            db.details.Add(lol);
            db.SaveChanges();
        }
    }
}