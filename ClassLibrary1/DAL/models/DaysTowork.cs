using System;
using System.Collections.Generic;

namespace DALL.models;

public partial class DaysTowork
{
    public int DayCode { get; set; }

    public int? OfferCode { get; set; }

    public DateTime Date { get; set; }

    public double Hour { get; set; }

    public virtual Offer? OfferCodeNavigation { get; set; }
}
