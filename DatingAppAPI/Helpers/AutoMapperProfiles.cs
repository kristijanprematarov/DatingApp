namespace DatingAppAPI.Helpers
{
    using System.Linq;
    using AutoMapper;
    using DatingAppAPI.DTOs;
    using DatingAppAPI.Entities;
    using DatingAppAPI.Extensions;

    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
            .ForMember(destinationMember => destinationMember.PhotoUrl, opt =>
                opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
            .ForMember(destinationMember => destinationMember.Age, opt =>
                opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<Photo, PhotoDto>();
            CreateMap<RegisterDto, AppUser>();
        }
    }
}