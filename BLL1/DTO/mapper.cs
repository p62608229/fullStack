using AutoMapper;
using DAL1.models;
using DAL1.func;
using DAL1.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;

namespace BLL.DTO
{
    public class mapper : Profile
    {
        public mapper()
        {
            CreateMap<Offer, OfferDTO>()
                .ForMember(p => p.DaysToworks, o => o.MapFrom(k => k.DaysToworks))
                .ForMember(p => p.userO, o => o.MapFrom(k => k.OfferUser != null ? k.OfferUser : null))
                .ForMember(p => p.Profession, o => o.MapFrom(k => k.Profession));

            CreateMap<OfferDTO, Offer>();
            CreateMap<User, UserDTO>();
            CreateMap<UserDTO, User>();

            CreateMap<Comment, CommentDTO>()
                .ForMember(p => p.Namecomment, o => o.MapFrom(k => k.CommentUser.FirstName + " " + k.CommentUser.LastName));
            CreateMap<CommentDTO, Comment>();

            CreateMap<DaysTowork, DaysToworkDTO>();
            CreateMap<DaysToworkDTO, DaysTowork>();

            CreateMap<RequestDTO, Request>();
            CreateMap<Request, RequestDTO>()
                .ForMember(p => p.userR, o => o.MapFrom(k => k.RequestUser))
                .ForMember(p => p.userO, o => o.MapFrom(k => k.UserCodeOffersNavigation != null ? k.UserCodeOffersNavigation.OfferUser : null));

            CreateMap<ProfessionDTO, Profession>();
            CreateMap<Profession, ProfessionDTO>();
        }
    }
}
