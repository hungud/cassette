(function () {

    SS.services.cities = function () {

        var _configs = {
            txtFormId: '.txtFlightCity',
            txtToId: '.txtFlightCity'
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

            initCitiesDialog();

            initCitiesAutoComplete();
        }

        var initCitiesDialog = function () {

            $(".startplace").click(function () {
                $('#list-arrival').dialog("close");
            });

            $(".endplace").click(function () {
                $('#list-departure').dialog("close");
            });

            $(".startplace,.endplace").focus(function () {
                $(this).addClass('focus-input');
                var dateType = $(this).attr('datetype');
                var deOffset = $('.startplace').offset();
                var arrOffset = $('.endplace').offset();
                var inputHeight = $('.endplace').height() + 2 - $(window).scrollTop();
                $("#list-departure").dialog({
                    autoOpen: false,
                    width: 580,
                    // modal: true,
                    position: [deOffset.left, deOffset.top + inputHeight]
                });
                $("#list-arrival").dialog({
                    autoOpen: false,
                    width: 580,
                    //  modal: true,
                    position: [arrOffset.left, deOffset.top + inputHeight]
                });
                // $("#inter-city-" + dateType).focus();
                $("#list-" + dateType).dialog("open");
                if ($("#list-departure").dialog("isOpen")) {
                    $("#inter-city-departure").focus();
                }
                if ($("#list-arrival").dialog("isOpen")) {
                    $("#inter-city-arrival").focus();
                }
                var interCityInput = '';
                $("#inter-city-" + dateType).keyup(function () {
                    interCityInput = $(this).val();
                });
                var depCity = $('.startplace').val();
                var arrCity = $('.endplace').val();
                if (isEmpty(interCityInput)) {
                    $("#submit-departure").click(function () {
                        var val = $("#inter-city-departure").val().trim();
                        if (val == '') {
                            $('.error-departure').text('Xin hãy nhập tên thành phố hoặc sân bay để tiếp tục.');
                            $("#inter-city-departure").val(val);
                            return;
                        }
                        $('.error-departure').text(' ');
                        $('.startplace').attr('value', val);
                        $('.dialog').dialog("close");
                        if (!$('.endplace').hasClass('choosen'))
                            $('.endplace').focus();
                    });
                    $("#submit-arrival").click(function () {
                        var val = $("#inter-city-arrival").val().trim();
                        if (val == '') {
                            $('.error-arrival').text('Xin hãy nhập tên thành phố hoặc sân bay để tiếp tục.');
                            $("#inter-city-arrival").val(val);
                            return;
                        }
                        $('.error-arrival').text(' ');
                        $('.endplace').addClass('choosen');
                        $('.endplace').attr('value', val);
                        $('.dialog').dialog("close");
                        if (isEmpty(depCity))
                            $('.startplace').focus();
                    });
                }
                // close dialog when click outside dialog
                $(document).click(function () {
                    $('.dialog').dialog("close");
                });
                $('.startplace, .endplace, .dialog').click(function (event) {
                    event.stopPropagation();
                });
                $('.ui-widget-overlay').live('click', function () {
                    $('#book-form input').removeClass('focus-input');
                    $('.dialog').dialog("close");
                });
                // get data from dialog when click
                $('#list-departure a').click(function () {
                    //$('.startplace').attr('value', $(this).value());
                    $('.startplace').attr('value', $(this).text());
                    $('#list-departure').dialog("close");
                    if ($('.endplace').hasClass('choosen') && !isEmpty(arrCity)) {
                        $(".startdate").focus();
                    } else
                        $(".endplace").focus();
                    return false;
                });
                $('.startplace').focus(function () {
                    $("#inter-city-departure").focus();
                });
                $('#list-arrival a').click(function () {
                    $('.endplace').addClass('choosen');
                    $('.endplace').attr('value', $(this).text());
                    $('#list-arrival').dialog("close");
                    if (isEmpty(depCity))
                        $('.startplace').focus();
                    else {
                        $('.dialog').dialog("close");
                        $(".startdate").focus();
                    }
                    return false;
                });
            });
        }

        var cities_parse = function (data, options) {
            var parsed = [];

            var city = null;
            var data_modify = new Array();
            for (var i in data.Data) {
                city = data.Data[i];
                data_modify.push(city.placename + ' (' + city.placeid + ') ' + '<b class="suggestCountry" style="float:right">' + city.countryname + '</b>' + '{' + city.placename + ' (' + city.placeid + ') ');
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

        var initCitiesAutoComplete = function () {
            // Set auto complete
            var vUrl = 'http://wss.vietair.tv/ListInfo.asmx/GetListCitiesWorld';

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
                    parse: cities_parse,
                    formatItem: function (item, index, total, value) {
                        return value.split("{")[0];
                    },
                    formatResult: function (item, value) {
                        return value.split("{")[1];
                    }
                });

            $(_configs.txtToId).result(function (handler) {
               // console.log(handler);
                var dataType = $(this).attr('dataType');
                $('.' + dataType).attr('value', $("#inter-city-" + dataType).val());
                $("#inter-city-" + dataType).val('');
                $('.dialog').dialog("close");
                if (dataType == 'departure')
                    $('.arrival').focus();
                else
                    $('.depDate').focus();
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
