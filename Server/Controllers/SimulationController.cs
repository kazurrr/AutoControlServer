using Server.Utils;
using System.Linq;
using System.Web.Mvc;

namespace Server.Controllers
{
    public class SimulationController : Controller
    {
        CarDatabaseEntities1 db = new CarDatabaseEntities1();

        public ActionResult Simulation()
        {
            bool isAuthenticated = (System.Web.HttpContext.Current.User != null) && System.Web.HttpContext.Current.User.Identity.IsAuthenticated;

            if (!isAuthenticated)
            {
                return RedirectToAction("Index", "Account");
            }

            ViewBag.User = System.Web.HttpContext.Current.User.Identity.Name;

            var sim = Simulator.Instance;
            ViewBag.IsSimulatorRunning = sim.SimulationRunning;

            ViewBag.Details = db.Details.Where(x => x.CarId == 1).ToList().OrderByDescending(x => x.CreateDate);
            
            return View();
        }

        public ActionResult StartSimulation()
        {
            bool isAuthenticated = (System.Web.HttpContext.Current.User != null) && System.Web.HttpContext.Current.User.Identity.IsAuthenticated;

            if (!isAuthenticated)
            {
                return RedirectToAction("Index", "Account");
            }

            ViewBag.User = System.Web.HttpContext.Current.User.Identity.Name;

            var sim = Simulator.Instance;
            sim.StartSimulation();
            ViewBag.IsSimulatorRunning = sim.SimulationRunning;
            ViewBag.Details = db.Details.Where(x => x.CarId == 1).ToList().OrderByDescending(x => x.CreateDate);
            return RedirectToAction("Simulation");
        }


        public ActionResult StopSimulation()
        {
            bool isAuthenticated = (System.Web.HttpContext.Current.User != null) && System.Web.HttpContext.Current.User.Identity.IsAuthenticated;

            if (!isAuthenticated)
            {
                return RedirectToAction("Index", "Account");
            }

            ViewBag.User = System.Web.HttpContext.Current.User.Identity.Name;

            var sim = Simulator.Instance;
            sim.StopSimulation();
            ViewBag.IsSimulatorRunning = sim.SimulationRunning;
            ViewBag.Details = db.Details.Where(x => x.CarId == 1).ToList().OrderByDescending(x => x.CreateDate);
            return RedirectToAction("Simulation");
        }
    }
}
