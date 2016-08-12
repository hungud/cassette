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

namespace Cassette.Aspnet
{
    public static partial class CassetteBundleCollectionExtensions
    {
        private static IDirectory GetFileSystemPath(string applicationRelativePath)
        {
            var path = HostingEnvironment.MapPath("~/" + applicationRelativePath);
            return new FileSystemDirectory(path);
        }

        private static string AppendToRelativePath(string applicationRelativePath, IDirectory directory)
        {
            var directoryPath = directory.FullPath;
            var pathSeparator = Path.DirectorySeparatorChar.ToString(CultureInfo.InvariantCulture);

            if (directoryPath.EndsWith(pathSeparator))
                directoryPath = Path.GetDirectoryName(directoryPath);

            var directoryName = Path.GetFileName(directoryPath);

            if (!applicationRelativePath.EndsWith("/"))
                applicationRelativePath += "/";

            return applicationRelativePath + directoryName;
        }

        #region SCRIPTS
        private static void AddBundleJs<TBundle>(
            this BundleCollection bundles,
            string applicationRelativePath,
            Action<TBundle> customize)
            where TBundle : Bundle
        {
            var searcher = new FileSearch()
            {
                SearchOption = SearchOption.TopDirectoryOnly,
                Pattern = "*.js"
            };

            var directory = GetFileSystemPath(applicationRelativePath);

            var sub_dirs = directory.GetDirectories().ToList();

            if (sub_dirs.Count > 0)
            {
                foreach (var sub_dir in sub_dirs)
                {
                    var sub_dir_path = AppendToRelativePath(applicationRelativePath, sub_dir);

                    bundles.AddBundleCss(sub_dir_path, customize);
                }
            }
            else
            {
                bundles.Add(applicationRelativePath, searcher, customize);
            }
        }

        public static void AddScriptsRecursively(
           this BundleCollection bundles,
           string applicationRelativePath,
           Action<ScriptBundle> customize)
        {
            bundles.AddBundleJs<ScriptBundle>(applicationRelativePath,
                              bundle =>
                              {
                                  customize(bundle);                                  
                              });
        }

        public static void AddScriptsRecursively(
            this BundleCollection bundles,
            string applicationRelativePath)
        {
            bundles.AddScriptsRecursively(applicationRelativePath,
                                          bundle => { });
        }
        #endregion

        #region STYLES
        private static void AddBundleCss<TBundle>(
           this BundleCollection bundles,
           string applicationRelativePath,
           Action<TBundle> customize)
           where TBundle : Bundle
        {
            var searcher = new FileSearch()
            {
                SearchOption = SearchOption.TopDirectoryOnly,
                Pattern = "*.css"
            };

            var directory = GetFileSystemPath(applicationRelativePath);

            var sub_dirs = directory.GetDirectories().ToList();

            if (sub_dirs.Count > 0)
            {
                foreach (var sub_dir in sub_dirs)
                {
                    var sub_dir_path = AppendToRelativePath(applicationRelativePath, sub_dir);

                    bundles.AddBundleCss(sub_dir_path, customize);
                }
            }
            else
            {
                bundles.Add(applicationRelativePath, searcher, customize);
            }           
        }

        public static void AddStylesheetsRecursively(
           this BundleCollection bundles,
           string applicationRelativePath,
           Action<StylesheetBundle> customize)
        {
            bundles.AddBundleCss(applicationRelativePath,
                              customize);
        }

        public static void AddStylesheetsRecursively(
            this BundleCollection bundles,
            string applicationRelativePath)
        {
            bundles.AddStylesheetsRecursively(applicationRelativePath,
                                              bundle => { });
        }
        #endregion

        #region HTML_TEMPLATE
        private static void AddBundleHtml<TBundle>(
          this BundleCollection bundles,
          string applicationRelativePath,
          Action<TBundle> customize)
          where TBundle : Bundle
        {
            var searcher = new FileSearch()
            {
                SearchOption = SearchOption.TopDirectoryOnly,
                Pattern = "*.html"
            };

            var directory = GetFileSystemPath(applicationRelativePath);

            var sub_dirs = directory.GetDirectories().ToList();

            if (sub_dirs.Count > 0)
            {
                foreach (var sub_dir in sub_dirs)
                {
                    var sub_dir_path = AppendToRelativePath(applicationRelativePath, sub_dir);

                    bundles.AddBundleCss(sub_dir_path, customize);
                }
            }
            else
            {
                bundles.Add(applicationRelativePath, searcher, customize);
            }
        }
        public static void AddHtmlTemplatesRecursively(
            this BundleCollection bundles,
            string applicationRelativePath,
            Action<HtmlTemplateBundle> customize)
        {
            bundles.AddBundleHtml(applicationRelativePath,
                              customize);
        }

        public static void AddHtmlTemplatesRecursively(
            this BundleCollection bundles,
            string applicationRelativePath)
        {
            bundles.AddHtmlTemplatesRecursively(applicationRelativePath,
                                                bundle => { });
        }

        #endregion       
        
    }
}