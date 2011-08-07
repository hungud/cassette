﻿using System;
using System.IO;
using System.Linq;
using Moq;
using Xunit;

namespace Cassette.Persistence
{
    public class ModuleContainerWriter_Tests
    {
        public ModuleContainerWriter_Tests()
        {
            fileSystem = new Mock<IFileSystem>();
            fileSystem.Setup(fs => fs.OpenWrite(It.IsAny<string>())).Returns(Stream.Null);
        }

        readonly Mock<IFileSystem> fileSystem;

        [Fact]
        public void SaveWritesContainerXmlFile()
        {
            
            var now = DateTime.UtcNow;
            var modules = new[] {
                new ScriptModule("", _ => null)
            };
            var asset1 = new Mock<IAsset>();
            asset1.SetupGet(a => a.SourceFilename).Returns("asset.js");
            asset1.Setup(a => a.OpenStream()).Returns(Stream.Null);
            modules[0].Assets.Add(asset1.Object);
            var container = new ModuleContainer<ScriptModule>(modules, now);

            var writer = new ModuleContainerWriter<ScriptModule>(fileSystem.Object);
            writer.Save(container);

            fileSystem.Verify(fs => fs.OpenWrite("container.xml"));
            fileSystem.Verify(fs => fs.OpenWrite(".module"));
        }

        [Fact]
        public void SaveDeletesAllCurrentFileSystemContent()
        {
            var writer = new ModuleContainerWriter<ScriptModule>(fileSystem.Object);
            writer.Save(new ModuleContainer<ScriptModule>(Enumerable.Empty<ScriptModule>(), DateTime.UtcNow));
            fileSystem.Verify(fs => fs.DeleteAll());
        }
    }
}