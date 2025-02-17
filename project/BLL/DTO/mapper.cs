using AutoMapper;
using DALL.models;
using DALL.func;
using DALL.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTO
{
    public class mapper:Profile
    {
        public mapper()
        {
            CreateMap<Offer, OfferDTO>();
            CreateMap<OfferDTO, Offer>();
            CreateMap<User, UserDTO>();
            CreateMap<UserDTO, User>();
            CreateMap<Comment, CommentDTO>()
                .ForMember(
                        p => p.Namecomment,
                        o => o.MapFrom(
                       k => k.CommentUser.FirstName + " " + k.CommentUser.LastName));
            CreateMap<CommentDTO, Comment>();
            CreateMap<DaysTowork, DaysToworkDTO>();
            CreateMap<DaysToworkDTO, DaysTowork>();
            CreateMap<RequestDTO, Request>();
            CreateMap<Request, RequestDTO>();






        }
    }
}
