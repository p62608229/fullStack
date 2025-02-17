using System;
using System.Collections.Generic;

namespace DALL.models;

public partial class User
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

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<Offer> Offers { get; set; } = new List<Offer>();

    public virtual ICollection<Profession> Professions { get; set; } = new List<Profession>();

    public virtual ICollection<Request> RequestOfferUsers { get; set; } = new List<Request>();

    public virtual ICollection<Request> RequestUserCodeOffersNavigations { get; set; } = new List<Request>();
}
