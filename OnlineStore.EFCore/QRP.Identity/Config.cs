using IdentityServer4.Models;
using IdentityServer4.Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace QRP.Identity
{
    public static class Config
    {
        public static List<TestUser> GetUsers()
        {
            return new List<TestUser>
            {
                new TestUser
                {
                    SubjectId = "b7539694-97e7-4dfe-84da-b4256e1ff5c7",
                    Username = "Simon",
                    Password = "password",
                    Claims = new List<Claim>
                    {
                        new Claim("given_name", "Simon"),
                        new Claim("family_name", "Bradecina"),
                    }
                },
                new TestUser
                {
                    SubjectId = "c8640705-97e7-4dfe-84da-b4256e1ff5c7",
                    Username = "Ezekiel",
                    Password = "password",
                    Claims = new List<Claim>
                    {
                        new Claim("given_name", "Ezekiekl"),
                        new Claim("family_name", "Natividad"),
                    }
                }
            };
        }
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile()
            };
        }
        public static IEnumerable<Client> GetClents()
        {
            return new List<Client>();
            

         
        }
    }
}

