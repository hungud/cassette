using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cassette
{
    public class ErrorCollectingException : Exception
    {
        public IList<Exception> Exceptions { get; set; }

        public ErrorCollectingException()
        {
            Exceptions = new List<Exception>();
        }

        public override string Message
        {
            get { return GenerateMessage(); }
        }

        string GenerateMessage()
        {
            return String.Format("{0} exceptions collected:\n\n----- Collected exceptions start:\n{1}\n\n----- Collected exceptions end\n",
                Exceptions.Count,
                string.Join("\n- next -\n", Exceptions.Select(x => x.ToString()).ToArray()));
        }
    }
}
