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
            var sim = Simulator.Instance;
            ViewBag.IsSimulatorRunning = sim.SimulationRunning;

            ViewBag.Details = db.Details.Where(x => x.CarId == 1).ToList().OrderByDescending(x => x.CreateDate);
            
            return View();
        }

        public ActionResult StartSimulation()
        {
            var sim = Simulator.Instance;
            sim.StartSimulation();
            ViewBag.IsSimulatorRunning = sim.SimulationRunning;
            ViewBag.Details = db.Details.Where(x => x.CarId == 1).ToList().OrderByDescending(x => x.CreateDate);
            return RedirectToAction("Simulation");
        }


        public ActionResult StopSimulation()
        {
            var sim = Simulator.Instance;
            sim.StopSimulation();
            ViewBag.IsSimulatorRunning = sim.SimulationRunning;
            ViewBag.Details = db.Details.Where(x => x.CarId == 1).ToList().OrderByDescending(x => x.CreateDate);
            return RedirectToAction("Simulation");
        }
    }
}
