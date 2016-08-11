using Cassette;
using Cassette.HtmlTemplates;
using Cassette.IO;
using Cassette.Scripts;
using Cassette.Stylesheets;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace OneTour.Admin.Mvc
{
    public static partial class CassetteBundleCollectionExtensions
    {
        /// <summary>
        /// Registers script bundles for views.
        /// </summary>
        /// <param name="bundle">The BundleCollection to add script bundles to.</param>
        public static void RegisterViewScriptBundles(this BundleCollection bundles, string viewScriptsFolderBundle = "")
        {
            //auto add new view and action folder
            string views_scripts_folder_bundle = viewScriptsFolderBundle;
            string scripts_views_folder = HostingEnvironment.MapPath("~/" + views_scripts_folder_bundle); //get file path of asset folder
            if (Directory.Exists(scripts_views_folder)) //if asset folder exists
            {
                string views_directory = HostingEnvironment.MapPath("~/Views"); //get views directory
                foreach (string controller_directory in Directory.GetDirectories(views_directory)) //get all asset controller file paths
                {
                    string controller_name = (new DirectoryInfo(controller_directory)).Name; //get the controller name

                    //get action
                    foreach (string controller_action_file in Directory.GetFiles(controller_directory))
                    {
                        string controller_action_file_name = Path.GetFileName(controller_action_file); //get view file name
                        string controller_action_name = Path.GetFileNameWithoutExtension(controller_action_file_name);

                        string scripts_action_folder = scripts_views_folder + "\\" + controller_name + "\\" + controller_action_name;
                        if (Directory.Exists(scripts_action_folder))
                        {
                            string scripts_action_folder_bundle = views_scripts_folder_bundle + "/" + controller_name + "/" + controller_action_name;
                            bundles.AddPerSubDirectory<ScriptBundle>(scripts_action_folder_bundle, b => b.PageLocation = "body");
                        }
                    }
                }
            }
        }


        /// <summary>
        /// Registers style bundles for views.
        /// </summary>
        /// <param name="bundle">The BundleCollection to add style bundles to.</param>
        public static void RegisterViewStyleBundles(this BundleCollection bundles, string viewStylesFolderBundle = "")
        {
            //auto add new view and action folder
            string views_styles_folder_bundle = viewStylesFolderBundle;
            string styles_views_folder = HostingEnvironment.MapPath("~/" + views_styles_folder_bundle); //get file path of asset folder
            if (Directory.Exists(styles_views_folder)) //if asset folder exists
            {
                string views_directory = HostingEnvironment.MapPath("~/Views"); //get views directory
                foreach (string controller_directory in Directory.GetDirectories(views_directory)) //get all asset controller file paths
                {
                    string controller_name = (new DirectoryInfo(controller_directory)).Name; //get the controller name

                    //get action
                    foreach (string controller_action_file in Directory.GetFiles(controller_directory))
                    {
                        string controller_action_file_name = Path.GetFileName(controller_action_file); //get view file name
                        string controller_action_name = Path.GetFileNameWithoutExtension(controller_action_file_name);

                        string styles_action_folder = styles_views_folder + "\\" + controller_name + "\\" + controller_action_name;
                        if (Directory.Exists(styles_action_folder))
                        {
                            string styles_action_folder_bundle = views_styles_folder_bundle + "/" + controller_name + "/" + controller_action_name;
                            bundles.AddPerSubDirectory<StylesheetBundle>(styles_action_folder_bundle);
                        }
                    }
                }
            }
        }    
    }
}