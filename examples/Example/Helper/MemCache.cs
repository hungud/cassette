using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OneTour.Class.Helper.Core
{
    public static class MemCache
    {
        public static readonly MemoryCacheManager GlobalMemCache;

        static MemCache()
        {
            GlobalMemCache = new MemoryCacheManager();
        }
    }
}
