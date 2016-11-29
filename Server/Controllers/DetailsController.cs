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

        public IEnumerable<Detail> GetAll()
        {
            return db.Details;
        }

        public IHttpActionResult Get(int id)
        {
            IEnumerable<Detail> product = db.Details.Where(p => p.CarId == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        public IHttpActionResult GetLast(int id)
        {
            Detail product = db.Details.Where(p => p.CarId == id).OrderByDescending(p => p.DetailId).FirstOrDefault();
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        public IHttpActionResult GetLastDetailForEachCar()
        {
            IEnumerable<Car> cars = db.Cars.Distinct();
            List<Detail> details = new List<Detail>();
            Detail temp;
            foreach (var car in cars)
            {
                temp = db.Details.Where(p => p.CarId == car.CarId).OrderByDescending(p => p.DetailId).FirstOrDefault();
                if (temp != null)
                {
                    details.Add(temp);
                }
            }

            if (details == null)
            {
                return NotFound();
            }
            return Ok(details);
        }


        [System.Web.Http.HttpPost]
        public void Post(Detail lol)
        {
            lol.CreateDate = DateTime.Now;
            db.Details.Add(lol);
            db.SaveChanges();
        }

    }
}