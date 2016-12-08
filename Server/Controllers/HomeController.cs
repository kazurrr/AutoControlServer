﻿using System;
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

        public ActionResult DeleteCar(int id)
        {
            var car = db.Cars.FirstOrDefault(c => c.CarId == id);

            if (car != null)
            {
                db.Cars.Remove(car);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            else
            {
                return HttpNotFound();
            }
        }

        public ActionResult DeleteDetail(int id)
        {
            var detail = db.Details.FirstOrDefault(c => c.DetailId == id);

            if (detail != null)
            {
                db.Details.Remove(detail);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            else
            {
                return HttpNotFound();
            }
        }

        public ActionResult DeleteError(int id)
        {
            var error = db.Errors.FirstOrDefault(c => c.ErrorId == id);

            if (error != null)
            {
                db.Errors.Remove(error);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            else
            {
                return HttpNotFound();
            }
        }

        public ActionResult AddCar(string vin, string brand, string model)
        {
            Car car = new Car { VIN = vin, Brand = brand, Model = model };

            car.CreateDate = DateTime.Now;

            db.Cars.Add(car);
            db.SaveChanges();

            return RedirectToAction("Index");
        }
    }
}
