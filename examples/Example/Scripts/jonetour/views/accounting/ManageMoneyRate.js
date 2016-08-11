(function () {

    VA.views.accounting.ManageMoneyRate = function () {

        var _configs = {
        }

        var getArgumentValue = function (argumentName, callback) {

            jwm.Alert.ShowAjaxProcessing(_configs.form_id, true);
            jQuery.ajax({
                url: _configs.service_wss_galileo_vietair_tv_url + "/Core.asmx/GetPackageData",
                dataType: 'json',
                type: 'POST',
                data: {
                    package_name: 'PK_SYSTEM',
                    object_name: 'GET_SYSTEM_ARG',
                    P_ARG_NAME: argumentName
                },
                success: function (resp) {

                    jwm.Alert.HideAjaxProcessing(_configs.form_id, true);

                    if (resp != null && resp.TypeMsg > 0) {

                        if (callback) callback(resp);

                    }

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id, true);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;


        }

        var updateArgumentValue = function (argSqId, argName, argValue, callback) {

            var data_post = {};

            data_post.package_name = 'PK_SYSTEM';

            data_post.object_name = 'UPDATE_SYSTEM_ARG';

            data_post.P_SQ_ID = argSqId;

            data_post.P_ARG_NAME = argName;

            data_post.P_ARG_VALUE = argValue;

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: _configs.service_wss_galileo_vietair_tv_url + "/Core.asmx/CallPackage",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');
                    if (resp.TypeMsg > 0) {
                        if (callback) callback(resp);
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var clearSystemArgumentsCache = function () {
            var urls = [
            '/home/ClearSystemArgumentsCache',
            _configs.service_wss_vietair_tv_url + '/core.asmx/ClearSystemArgumentsCache',
            _configs.service_wss_vietair_tv_url + '/AT/core.asmx/ClearSystemArgumentsCache',
            _configs.service_wss_galileo_vietair_tv_url + '/core.asmx/ClearSystemArgumentsCache',
            _configs.service_wss_galileo_vietair_tv_url + '/Galileo/core.asmx/ClearSystemArgumentsCache'
            ];
            for (var i = 0; i < urls.length; i++) {
                var itm_url = urls[i];
                clearSystemArgumentsCacheItem(itm_url);
            }
        }

        var clearSystemArgumentsCacheItem = function (itmUrl) {


            jQuery.ajax({
                url: itmUrl,
                dataType: 'json',
                type: 'POST',
                data: {},
                async: false,
                success: function (data) {
                },
                error: function (http, message, exc) {
                    console.log(message);
                }
            });

        }

        var batchUpdate = function () {

            //--------------------------------------
            //update RATE_USD_VND_INFO
            var input = $('#RATE_USD_VND_INFO');

            var arg_value = input.val();

            var arg_name = input.attr('data-arg-name');

            var arg_sq_id = input.attr('data-arg-sq-id');

            updateArgumentValue(arg_sq_id, arg_name, arg_value, function () {
            });


            //--------------------------------------
            //update RATE_USD_VND
            var input = $('#RATE_USD_VND');

            var arg_value = input.autoNumeric('get');

            var arg_name = input.attr('data-arg-name');

            var arg_sq_id = input.attr('data-arg-sq-id');

            updateArgumentValue(arg_sq_id, arg_name, arg_value, function () {

                clearSystemArgumentsCache();
                window.location.reload(true);

            });


        }

        var initControls = function () {

            getArgumentValue("RATE_USD_VND", function (resp) {

                var input = $('#RATE_USD_VND');

                input.autoNumeric('set', parseFloat(resp.Data.CURSOR_DATA[0].ARG_VALUE));

                input.attr('data-arg-name', resp.Data.CURSOR_DATA[0].ARG_NAME);

                input.attr('data-arg-sq-id', resp.Data.CURSOR_DATA[0].SQ_ID);

            });

            getArgumentValue("RATE_USD_VND_INFO", function (resp) {

                var input = $('#RATE_USD_VND_INFO');

                input.val(resp.Data.CURSOR_DATA[0].ARG_VALUE);

                input.attr('data-arg-name', resp.Data.CURSOR_DATA[0].ARG_NAME);

                input.attr('data-arg-sq-id', resp.Data.CURSOR_DATA[0].SQ_ID);

            });


            $('#btnAddUpdate').unbind('click');
            $('#btnAddUpdate').click(function () {

                batchUpdate();

                return false;

            });

        }


        var init = function (options) {

            _configs = $.extend({}, _configs, {}, options);

            initControls();

        }

        return ({

            "init": init

        });

    };

}());