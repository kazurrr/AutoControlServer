using Server.Utils;
using System.Web.Mvc;

namespace Server.Controllers
{
    public class SimulationController : Controller
    {
        public ActionResult Simulation()
        {
            return View();
        }

        public ActionResult StartSimulation()
        {
            var sim = Simulator.Instance;
            sim.StartSimulation();
            return View("Simulation");
        }


        public ActionResult StopSimulation()
        {
            var sim = Simulator.Instance;
            sim.StopSimulation();
            return View("Simulation");
        }
    }
}
