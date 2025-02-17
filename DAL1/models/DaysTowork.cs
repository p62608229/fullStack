using System;
using System.Collections.Generic;

namespace DAL1.models;

public partial class DaysTowork
{
    public int DayCode { get; set; }

    public int? OfferCode { get; set; }

    public string Date { get; set; } = null!;

    public double Fromhour { get; set; }

    public double? Tohour { get; set; }

    public virtual Offer? OfferCodeNavigation { get; set; }
}
