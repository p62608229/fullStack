using System;
using System.Collections.Generic;

namespace BLL.DTO;

public partial class DaysToworkDTO
{
    public int DayCode { get; set; }

    public int? OfferCode { get; set; }

    public DateTime Date { get; set; }

    public Double Hour { get; set; }

}
