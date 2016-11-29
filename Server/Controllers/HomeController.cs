using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace Server.Controllers
{
    public class HomeController : Controller
    {
        CarDatabaseEntities1 db = new CarDatabaseEntities1();

        public ActionResult Index()
        {
            ViewBag.Cars = db.Cars.ToList();
            ViewBag.Details = db.Details.ToList();
            ViewBag.Errors = db.Errors.ToList();

            return View();
        }
    }
}
