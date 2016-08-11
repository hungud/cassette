using System;
using System.Collections.Generic;
using System.Runtime.Caching;
using System.Text.RegularExpressions;

namespace OneTour.Class.Helper.Core
{
    public class MemoryCacheManager
    {
        public void Clear()
        {
            foreach (KeyValuePair<string, object> pair in (IEnumerable<KeyValuePair<string, object>>)this.Cache)
            {
                this.Remove(pair.Key);
            }
        }

        public dynamic Get(string key)
        {
            return this.Cache[key];
        }

        public T Get<T>(string key)
        {
            if (this.Cache[key] == null)
                return default(T);

            Type t = typeof(T);
            Type u = Nullable.GetUnderlyingType(t);
            if (u != null)
            {
                return (T)Convert.ChangeType(this.Cache[key], u);
            }
            else
            {
                try
                {
                    return (T)Convert.ChangeType(this.Cache[key], t);
                }
                catch
                {
                    //exception on dynamic
                }
            }

            return (T)this.Cache[key];
        }

        public bool IsSet(string key)
        {
            return this.Cache.Contains(key, null);
        }

        public void Remove(string key)
        {
            this.Cache.Remove(key, null);
        }

        public void RemoveByPattern(string pattern)
        {
            Regex regex = new Regex(pattern, RegexOptions.Singleline | RegexOptions.Compiled | RegexOptions.IgnoreCase);
            List<string> list = new List<string>();
            foreach (KeyValuePair<string, object> pair in (IEnumerable<KeyValuePair<string, object>>)this.Cache)
            {
                if (regex.IsMatch(pair.Key))
                {
                    list.Add(pair.Key);
                }
            }
            foreach (string str in list)
            {
                this.Remove(str);
            }
        }

        public void Set(string key, object data)
        {
            if (data != null)
            {
                this.Cache[key] = data;
            }
        }

        public void Set(string key, object data, int cacheTimeMinutes)
        {
            if (data != null)
            {
                CacheItemPolicy policy = new CacheItemPolicy
                {
                    AbsoluteExpiration = DateTime.Now + TimeSpan.FromMinutes((double)cacheTimeMinutes)
                };
                this.Cache.Add(new CacheItem(key, data), policy);
            }
        }

        public void SetBySecond(string key, object data, int cacheTimeSeconds)
        {
            if (data != null)
            {
                CacheItemPolicy policy = new CacheItemPolicy
                {
                    AbsoluteExpiration = DateTime.Now + TimeSpan.FromSeconds((double)cacheTimeSeconds)
                };
                this.Cache.Add(new CacheItem(key, data), policy);
            }
        }

        public void SetByMilliseconds(string key, object data, int cacheTimeMilliseconds)
        {
            if (data != null)
            {
                CacheItemPolicy policy = new CacheItemPolicy
                {
                    AbsoluteExpiration = DateTime.Now + TimeSpan.FromMilliseconds((double)cacheTimeMilliseconds)
                };
                this.Cache.Add(new CacheItem(key, data), policy);
            }
        }

        protected ObjectCache Cache
        {
            get
            {
                return MemoryCache.Default;
            }
        }
    }
}
