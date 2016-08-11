using Cassette;
using Cassette.HtmlTemplates;
using Cassette.Scripts;
using Cassette.Stylesheets;
using System.IO;
using System.Web.Hosting;

namespace Example
{
    public class CassetteConfiguration : IConfiguration<BundleCollection>
    {
        public void Configure(BundleCollection bundles)
        {            
            bundles.AddPerSubDirectory<ScriptBundle>("Scripts");
            bundles.AddUrlWithAlias(
                "http://platform.twitter.com/widgets.js",
                "twitter",
                b =>
                {
                    b.PageLocation = "body";
                    b.HtmlAttributes.Add(new { async = "async" });                    
                });
            
            bundles.AddPerSubDirectory<HtmlTemplateBundle>("HtmlTemplates");
            bundles.Add<StylesheetBundle>("Styles");

            //auto add new view and action folder
            //string views_scripts_folder_bundle = "Scripts/Desktop/Views"; 
            //string scripts_views_folder = HostingEnvironment.MapPath("~/Scripts/Desktop/Views"); //get file path of asset folder
            //if (Directory.Exists(scripts_views_folder)) //if asset folder exists
            //{
            //    string views_directory = HostingEnvironment.MapPath("~/Views"); //get views directory
            //    foreach (string controller_directory in Directory.GetDirectories(views_directory)) //get all asset controller file paths
            //    {
            //        string controller_name = (new DirectoryInfo(controller_directory)).Name; //get the controller name

            //        //get action
            //        foreach (string controller_action_file in Directory.GetFiles(controller_directory))
            //        {
            //            string controller_action_file_name = Path.GetFileName(controller_action_file); //get view file name
            //            string controller_action_name = Path.GetFileNameWithoutExtension(controller_action_file_name);

            //            string scripts_action_folder = scripts_views_folder + "\\" + controller_name + "\\" + controller_action_name;
            //            if (Directory.Exists(scripts_action_folder))
            //            {
            //                string scripts_action_folder_bundle = views_scripts_folder_bundle + "/" + controller_name + "/" + controller_action_name;
            //                bundles.AddPerSubDirectory<ScriptBundle>(scripts_action_folder_bundle, b => b.PageLocation = "body");
            //            }
            //        }
            //    }
            //}
        }
    }
}