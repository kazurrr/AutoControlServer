using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace Server.Utils
{
    public class Simulator
    {
        private CancellationTokenSource simulatorCancellationTokenSource;
        private CancellationToken simulatorCancellationToken;
        private static Simulator instance;

        private Simulator()
        {
            simulatorCancellationTokenSource = new CancellationTokenSource();
            simulatorCancellationToken = simulatorCancellationTokenSource.Token;
        }

        public static Simulator Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new Simulator();
                }
                return instance;
            }
        }
        public void StartSimulation()
        {
            Task.Run(() =>
            {
                startSimJob();
            }, simulatorCancellationToken);
        }

        private void startSimJob()
        {
            CarDatabaseEntities1 db = new CarDatabaseEntities1();

            Detail detail = new Detail()
            {
                CarId = 1,
                Speed = 50,
                Rpm = 1500,
                EngineLoad = 50,
                Voltage = 14,
                Lat = 54.387059,
                Lon = 18.591215,
                CreateDate = DateTime.Now
            };

            while (true)
            {
                if (simulatorCancellationToken.IsCancellationRequested)
                {
                    return;
                }

                detail.Lat -= 0.0001;
                detail.Lon -= 0.0001;
                detail.CreateDate = DateTime.Now;

                db.Details.Add(detail);
                db.SaveChanges();
                Thread.Sleep(3000);
            }

        }
        public void StopSimulation()
        {
            simulatorCancellationTokenSource.Cancel();
        }
    }
}