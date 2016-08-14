using System.Web.Mvc;
using System.Web.Routing;
using CacheManager.Core;
using System;

namespace Example
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Color",
                "colors/{id}",
                new { controller = "Color", action = "item" }
            );
            routes.MapRoute(
                "Colors",
                "colors",
                new { controller = "Color", action = "list" }
            );
            routes.MapRoute(
                "Default", // Route name
                "{controller}/{action}/{id}", // URL with parameters
                new { controller = "Home", action = "Index", id = UrlParameter.Optional } // Parameter defaults
            );

        }

        public static ICacheManager<int> DEFAULT_CACHE;

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            RegisterGlobalFilters(GlobalFilters.Filters);
            RegisterRoutes(RouteTable.Routes);

            DEFAULT_CACHE = CacheFactory.Build<int>("defaultCache", settings => settings
           .WithUpdateMode(CacheUpdateMode.Full)
           .WithSystemRuntimeCacheHandle("defaultCacheHandle")
           .WithExpiration(ExpirationMode.Sliding, TimeSpan.FromHours(1)));
        }
    }
}
