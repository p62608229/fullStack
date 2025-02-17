using DALL.models;
using DALL.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DALL.func
{
    public class DaysForWork : IDaysForWork

    {
        ProjectdbContext projectdb;
        public DaysForWork(ProjectdbContext db)
        {
            projectdb = db;
        }
        public bool AddDays(DaysTowork d)
        {

            Offer? e = projectdb.Offers.FirstOrDefault(y => y.OfferCode == d.OfferCode);
            {
                try

                {
                    if (e != null)
                    {
                        projectdb.DaysToworks.Add(d);
                        projectdb.SaveChanges();
                        return true;

                    }
                    return false;
                }
                catch
                {
                    return false;
                }
            }
        }
    }
        
    }
