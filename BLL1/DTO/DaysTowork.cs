using System;
using System.Collections.Generic;

namespace BLL.DTO;

public partial class DaysToworkDTO
{
    public int DayCode { get; set; }

    public int? OfferCode { get; set; }

    public string ?Date { get; set; }

    public double Fromhour { get; set; }

    public double? Tohour { get; set; }


}
