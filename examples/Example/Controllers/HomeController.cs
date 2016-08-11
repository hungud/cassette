using System.Web.Mvc;

namespace Example.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
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

