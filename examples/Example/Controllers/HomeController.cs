using CacheManager.Core;
using System;
using System.Web.Mvc;

namespace Example.Controllers
{
    public class HomeController : Controller
    {
        private readonly ICacheManager<int> cache;

        public HomeController()
        {
            if (this.cache == null)
            {
                this.cache = CacheFactory.Build<int>("cacheName", settings => settings
           .WithUpdateMode(CacheUpdateMode.Full)
           .WithSystemRuntimeCacheHandle("handleName")
               .WithExpiration(ExpirationMode.Sliding, TimeSpan.FromHours(1)));
            }
        }

        public ActionResult Index()
        {
            var bundle_cache_count = cache.Get<int>("key");
            cache.AddOrUpdate("key", bundle_cache_count, v => v + 1);

            ViewBag.BundleCacheCount = bundle_cache_count;

            return View();
        }

        public ActionResult Index4()
        {
            var bundle_cache_count = 0;
            if (OneTour.Class.Helper.Core.MemCache.GlobalMemCache.IsSet("BUNDLE"))
            {
                bundle_cache_count = OneTour.Class.Helper.Core.MemCache.GlobalMemCache.Get("BUNDLE");
                bundle_cache_count++;
            }

            OneTour.Class.Helper.Core.MemCache.GlobalMemCache.Set("BUNDLE", bundle_cache_count);

            ViewBag.BundleCacheCount = bundle_cache_count;

            return View();
        }

        public ActionResult Index3()
        {
            var bundle_cache_count = 0;
            if (OneTour.Class.Helper.Core.MemCache.GlobalMemCache.IsSet("BUNDLE"))
            {
                bundle_cache_count = OneTour.Class.Helper.Core.MemCache.GlobalMemCache.Get("BUNDLE");
                bundle_cache_count++;
            }

            OneTour.Class.Helper.Core.MemCache.GlobalMemCache.Set("BUNDLE", bundle_cache_count);

            ViewBag.BundleCacheCount = bundle_cache_count;

            return View(new
            {
               // colorsUrl = Url.RouteUrl("Colors")
            });
        }

        public ActionResult Index2()
        {
            return View(new
            {
                //colorsUrl = Url.RouteUrl("Colors")
            });
        }
    }
}

