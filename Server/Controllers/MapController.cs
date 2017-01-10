using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Server.Controllers
{
    public class MapController : Controller
    {
        // GET: Map
        public ActionResult Index()
        {
            bool isAuthenticated = (System.Web.HttpContext.Current.User != null) && System.Web.HttpContext.Current.User.Identity.IsAuthenticated;

            if (!isAuthenticated)
            {
                return RedirectToAction("Index", "Account");
            }

            ViewBag.User = System.Web.HttpContext.Current.User.Identity.Name;

            return View();
        }
    }
}