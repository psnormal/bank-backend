using Duende.IdentityServer.Models;
using Duende.IdentityServer;
using IdentityModel;
using System.Security.Claims;

namespace authentication_service
{
    public class Configuration
    {
        public static IEnumerable<ApiScope> ApiScopes =>
            new List<ApiScope>
            {
                new ApiScope("WebAPI", "Web API")
            };

        public static IEnumerable<IdentityResource> IdentityResources =>
            new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResource
                {
                    Name = "role",
                    UserClaims = new List<string> {"role"}
                },
                new IdentityResource()
                {
                    Name = ClaimTypes.Role,
                    UserClaims = new List<string>
                        {
                            JwtClaimTypes.Role,
                        }
                }
            };

        public static IEnumerable<ApiResource> ApiResources =>
            new List<ApiResource>
            {
                /*new ApiResource("NotesWebAPI", "Web API", new []
                    { JwtClaimTypes.Name})
                {
                    Scopes = {"NotesWebAPI"}
                }*/

                new ApiResource
                {
                    Name = "WebAPI",
                    DisplayName = "WebAPI",
                    Description = "Allow the application to access WebAPI",
                    Scopes = new List<string> {"WebAPI"},
                    UserClaims = new List<string> { JwtClaimTypes.Role },
                    ApiSecrets = new List<Secret> {new Secret("string123".Sha256())},
                }
            };

        public static IEnumerable<Client> Clients =>
            new List<Client>
            {
                new Client
                {
                    ClientId = "notes-web-app",
                    ClientName = "Notes Web",
                    AllowedGrantTypes = GrantTypes.Code,
                    RequireClientSecret = true,
                    ClientSecrets = {new Secret("string123".Sha256())},
                    RequirePkce = false,
                    RedirectUris =
                    {
                        "https://oauth.pstmn.io/v1/callback", "http://localhost:3000/signin-oidc"
                    },
                    AllowedCorsOrigins =
                    {
                        "http://localhost:3000"
                    },
                    /*PostLogoutRedirectUris =
                    {
                        "http://localhost:3000/signout-oidc"
                    },*/
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "WebAPI"
                    },
                    AllowAccessTokensViaBrowser = true
                }
            };
    }
}
