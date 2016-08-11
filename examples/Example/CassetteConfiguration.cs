﻿using Cassette;
using Cassette.HtmlTemplates;
using Cassette.Scripts;
using Cassette.Stylesheets;
using OneTour.Admin.Mvc;

namespace Example
{
    public class CassetteConfiguration : IConfiguration<BundleCollection>
    {
        public void Configure(BundleCollection bundles)
        {            
            //bundles.AddPerSubDirectory<ScriptBundle>("Scripts");
            //bundles.AddUrlWithAlias(
            //    "http://platform.twitter.com/widgets.js",
            //    "twitter",
            //    b =>
            //    {
            //        b.PageLocation = "body";
            //        b.HtmlAttributes.Add(new { async = "async" });                    
            //    });
            
            //bundles.AddPerSubDirectory<HtmlTemplateBundle>("HtmlTemplates");
            //bundles.Add<StylesheetBundle>("Styles");


            bundles.AddScriptsRecursively("Scripts");
            bundles.AddUrlWithAlias(
                "http://platform.twitter.com/widgets.js",
                "twitter",
                b =>
                {
                    b.PageLocation = "body";
                    b.HtmlAttributes.Add(new { async = "async" });
                });

            bundles.AddPerSubDirectory<HtmlTemplateBundle>("HtmlTemplates");
            bundles.AddStylesheetsRecursively("Styles");
        }
    }
}