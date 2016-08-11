(function () {

    SS.services.countries = function () {

        var _configs = {
            txtFormId: '.txtFlightCountry',
            txtToId: '.txtFlightCountry',
            startClass: '.startplace-country',
            listContain: '#list-country-departure',
            interStart: '#inter-country-departure',
            interSubmit: '#submit-country-departure',
            errorStart: '.error-country-departure'
        }

        var isEmpty = function (obj) {
            if (typeof obj == 'undefined' || obj === null || obj === '') return true;
            if (typeof obj == 'number' && isNaN(obj)) return true;
            if (obj instanceof Date && isNaN(Number(obj))) return true;
            return false;
        }

        /*public property*/
        var init = function (options) {

            _configs = $.extend({}, _configs, {}, options);

            initAirlinesDialog();

            initAirlinesAutoComplete();
        }

        var initAirlinesDialog = function () {


            $(_configs.startClass).focus(function () {
                $(this).addClass('focus-input');
                var dateType = $(this).attr('datetype');
                var deOffset = $(_configs.startClass).offset();
                var inputHeight = $(_configs.startClass).height() + 2 - $(window).scrollTop();
                $(_configs.listContain).dialog({
                    autoOpen: false,
                    width: 580,
                    // modal: true,
                    position: [deOffset.left, deOffset.top + inputHeight]
                });
                $("#list-" + dateType).dialog("open");
                if ($(_configs.listContain).dialog("isOpen")) {
                    $(_configs.interStart).focus();
                }
                var interairlineInput = '';
                $("#inter-" + dateType).keyup(function () {
                    interairlineInput = $(this).val();
                });
                var depairline = $(_configs.startClass).val();
                if (isEmpty(interairlineInput)) {
                    $(_configs.interSubmit).click(function () {
                        var val = $(_configs.interStart).val().trim();
                        if (val == '') {
                            $(_configs.errorStart).text('Xin hãy nhập tên quốc gia để tiếp tục.');
                            $(_configs.interStart).val(val);
                            return;
                        }
                        $(_configs.errorStart).text(' ');
                        $(_configs.startClass).attr('value', val);
                        $('.dialog').dialog("close");
                    });
                }
                // close dialog when click outside dialog
                $(document).click(function () {
                    $('.dialog').dialog("close");
                });
                $(_configs.startClass + ', .dialog').click(function (event) {
                    event.stopPropagation();
                });
                $('.ui-widget-overlay').live('click', function () {
                    $('.dialog').dialog("close");
                });
                // get data from dialog when click
                $(_configs.listContain + ' a').click(function () {
                    //$(_configs.startClass).attr('value', $(this).value());
                    $(_configs.startClass).attr('value', $(this).text());
                    $(_configs.listContain).dialog("close");
                    return false;
                });
                $(_configs.startClass).focus(function () {
                    $(_configs.interStart).focus();
                });
            });
        }

        var airlines_parse = function (data, options) {
            var parsed = [];

            var airline = null;
            var data_modify = new Array();
            for (var i in data.Data) {
                airline = data.Data[i];
                data_modify.push(airline.placename + ' (' + airline.placeid + ') ');
            }

            var rows = data_modify;
            for (var i = 0; i < rows.length; i++) {
                var row = $.trim(rows[i]);
                if (row) {
                    row = row.split("|");
                    parsed[parsed.length] = {
                        data: row,
                        value: row[0],
                        result: options.formatResult && options.formatResult(row, row[0]) || row[0]
                    };
                }
            }
            return parsed;
        }

        var initAirlinesAutoComplete = function () {
            // Set auto complete
            var vUrl = 'http://wss.vietair.tv/ListInfo.asmx/GetListCountries';

            $(_configs.txtFormId).autocomplete("",
                {
                    url: vUrl,
                    max: 50,
                    highlight: false,
                    matchSubset: false,
                    scrollHeight: 260,
                    type: 'POST',
                    width: 280,
                    crossDomain: true,
                    dataType: 'jsonp',
                    parse: airlines_parse,
                    formatItem: function (item, index, total, value) {
                        return value.split("{")[0];
                    },
                    formatResult: function (item, value) {
                        return value.split("{")[1];
                    }
                });

            $(_configs.txtToId).result(function (handler) {
                var dataType = $(this).attr('dataType');
                $('.' + dataType).attr('value', $("#inter-" + dataType).val());
                $("#inter-" + dataType).val('');
                $('.dialog').dialog("close");
                $('.error-' + dataType).text(' ');
            });
        }

        var showMsg = function (msg, typeOfMsg) {
            jwm.Alert.ShowMsgNoId(typeOfMsg, msg, 'Thông báo tìm kiếm', 5000);
        }

        return ({

            "init": init

        });

    };

})();
