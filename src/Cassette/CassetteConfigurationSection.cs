﻿using System.Configuration;

namespace Cassette
{
    public sealed class CassetteConfigurationSection : ConfigurationSection
    {
        [ConfigurationProperty("debug", DefaultValue = null)]
        public bool? Debug
        {
            get { return (bool?)this["debug"]; }
            set { this["debug"] = value; }
        }

        [ConfigurationProperty("rewriteHtml", DefaultValue = true)]
        public bool RewriteHtml
        {
            get { return (bool)this["rewriteHtml"]; }
            set { this["rewriteHtml"] = value; }
        }

        [ConfigurationProperty("allowRemoteDiagnostics", DefaultValue = false)]
        public bool AllowRemoteDiagnostics
        {
            get { return (bool)this["allowRemoteDiagnostics"]; }
            set { this["allowRemoteDiagnostics"] = value; }
        }

        [ConfigurationProperty("cacheDirectory", DefaultValue = null)]
        public string CacheDirectory
        {
            get { return (string)this["cacheDirectory"]; }
            set { this["cacheDirectory"] = value; }
        }

        [ConfigurationProperty("isolatedStoragePerDomain", DefaultValue = false)]
        public bool IsolatedStoragePerDomain
        {
            get { return (bool)this["isolatedStoragePerDomain"]; }
            set { this["isolatedStoragePerDomain"] = value; }
        }

        [ConfigurationProperty("cassetteHandlerPrefix", DefaultValue = "cassette.axd")]
        public string CassetteHandlerPrefix
        {
            get { 
                return (string)this["cassetteHandlerPrefix"]; 
            }
            set { this["cassetteHandlerPrefix"] = value; }
        }

        [ConfigurationProperty("diagnosticPageName", DefaultValue = "hud")]
        public string DiagnosticPageName
        {
            get
            {
                return (string)this["diagnosticPageName"];
            }
            set { this["diagnosticPageName"] = value; }
        }
    }
}