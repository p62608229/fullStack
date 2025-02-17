using System;
using System.Collections.Generic;

namespace BLL.DTO;
public partial class UserDTO
{
    public string Id { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Address { get; set; } = null!;

    public int HouseNumber { get; set; }

    public string City { get; set; } = null!;

    public int? Postalcode { get; set; }

    public string Mail { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Password { get; set; } = null!;



    
}
