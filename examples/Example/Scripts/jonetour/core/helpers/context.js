(function () {

    SS.core.helpers.context = function () {
        var _configs = {
        }
        var init = function (options) {
            configs = $.extend({}, configs, {}, options);
        }
        var getQueryString = function (name) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(window.location.href);
            if (results == null)
                return "";
            else
                return decodeURIComponent(results[1].replace(/\+/g, " "));
        }
        var getQueryStringFromUrl = function (name, url) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(url);
            if (results == null)
                return "";
            else
                return decodeURIComponent(results[1].replace(/\+/g, " "));
        }
        return ({
            "init": init,
            "getQueryString": getQueryString,
            "getQueryStringFromUrl": getQueryStringFromUrl
        });

    };

})();

