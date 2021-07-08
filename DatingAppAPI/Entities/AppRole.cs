namespace DatingAppAPI.Entities
{
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Identity;

    public class AppRole : IdentityRole<int>
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}