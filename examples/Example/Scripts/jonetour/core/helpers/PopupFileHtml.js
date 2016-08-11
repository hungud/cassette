/**************** Code File Header ******************
Author: hungudgm@gmail.com
Date: 02/02/2014
Version: 1.0
Description: show popup html 
****************************************************/
(function () {

    SS.core.helpers.PopupFileHtml = function () {

        var _configs = {
            id_popup_container: '#popup_content',
            id_popup: '#popup',
            file_url: '',
            function_inline_popup: 'initControl',
            function_inline_close_popup: 'closePopup',
            configs_inline_popup: null,
            args: null,
            height: 0,
            width: 0,
            popup_css: function () {
                return {
                    top: ($(window).height() - _configs.height) / 2 + 'px',
                    left: ($(window).width() - _configs.width) / 2 + 'px',
                    textalign: 'center',
                    FontWeight: 'bold',
                    FontFamily: 'Arial, Helvetica, sans-serif',
                    border: '0px',
                    cursor: 'arrow',
                    backgroundColor: 'transparent'
                }
            },
            id_tmp_popup: null,
            popup: function () {
                return $(_configs.id_popup).data('popup');
            },
            extendConfigs: function (configs) {

                configs.args = _configs.args;

                _configs = $.extend({}, _configs, {}, configs);

                _configs.args = configs.args;

                return _configs;
            },
            attachClosePopupEvent: function () {

                $('.closePopup', _configs.id_popup).unbind('click');
                $('.closePopup', _configs.id_popup).bind('click', function () {

                    //get functions from file html
                    var func_close_popup = window[_configs.function_inline_close_popup];

                    if (func_close_popup) func_close_popup(_configs);

                    if (!$.unblockUI2) {
                        if (console) console.error("No unblockUI2 - plugin popupFileHtml", null);
                        return;
                    }

                    $.unblockUI2();

                });

            }
        }

        var isEmpty = function (obj) {
            if (typeof obj == 'undefined' || obj === null || obj === '') return true;
            if (typeof obj == 'number' && isNaN(obj)) return true;
            if (obj instanceof Date && isNaN(Number(obj))) return true;
            return false;
        }

        var init = function (options) {

            _configs = $.extend({}, _configs, {}, options);

            if (isEmpty(_configs.file_url)) {
                if (console) console.error("Error file_url - plugin popupFileHtml", null);
                return;
            }

            if (isEmpty(_configs.id_popup)) {
                if (console) console.error("No id_popup - plugin popupFileHtml", null);
                return;
            }

            if (isEmpty(_configs.id_popup_container)) {
                if (console) console.error("No id_popup_container - plugin popupFileHtml", null);
                return;
            }

            if ($(_configs.id_popup).length == 0) $("<div style='display:none' id='" + _configs.id_popup.replace('#', '') + "'></div>").appendTo('body');

            if ($(_configs.id_popup_container).length == 0) $("<div style='display:none' id='" + _configs.id_popup_container.replace('#', '') + "'></div>").appendTo('body');

            $(_configs.id_popup).data('popup', this);

            $(_configs.id_popup).data('config', _configs);

            initPopup();

        }

        var fillTemplate = function (options) {

            $(_configs.id_popup).empty();

            $(_configs.id_tmp_popup).tmpl(_configs.args).appendTo(_configs.id_popup).slideDown("fast");

        }

        function initPopup() {

            if ($(_configs.id_popup_container).data('key-url') == _configs.file_url) {

                callFunctionInlinePopup();

            }
            else {

                $.get(_configs.file_url, function (data) {

                    $(_configs.id_popup_container).html(data);

                    $(_configs.id_popup_container).data('key-url', _configs.file_url);

                    callFunctionInlinePopup();

                });
            }

            return false;
        }

        function showPopup() {

            if (!$.blockUI2) {
                if (console) console.error("No blockUI2 - plugin popupFileHtml", null);
                return;
            }

            $.blockUI2({
                message: $(_configs.id_popup),
                css: _configs.popup_css()
            });
        }

        /*API*/

        /*
       
        Get Popup and function execute

        configs_popup.popup().fillTemplate();
        
        */

        function callFunctionInlinePopup() {

            //get configs from file html
            var configs_popup = window['_configs'];

            configs_popup = _configs.extendConfigs(configs_popup);

            //get functions from file html
            var func_popup = window[configs_popup.function_inline_popup];

            fillTemplate();

            if (func_popup) func_popup(configs_popup);

            //attach close event
            configs_popup.attachClosePopupEvent();

            showPopup();
        }

        /*
        Get FileName only no extension ex: .exe, .txt
        */
        function getFileName() {

            if (isEmpty(_configs.file_url)) return "";

            var v1 = _configs.file_url.lastIndexOf('/') + 1;

            var v2 = _configs.file_url.substr(v1);

            var v3 = v2.lastIndexOf('.');

            var v4 = v2.substr(0, v3)

            return v4;
        }



        return ({

            "init": init,
            "showPopup": showPopup,
            "fillTemplate": fillTemplate

        });

    };

})();

