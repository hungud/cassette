(function () {

    VA.views.home.PromotionTicket = function () {

        var _configs = {
        }


        var _grid_paged = null;

        var _form_id = null;

        var initFormId = function () {
            _form_id = '#insertUpdate';
        }
     
        var renderGrid = function () {
            _grid_paged = new SS.core.GridPaged();
            _grid_paged.init({
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + '/ListInfo.asmx/GetListAirlineTicketPromotion',
                page_size: 5,
                row_start: 0,
                row_end: 5
            });
        }

        var initSearchForm = function () {

            $('#txtSearch').enter(function () {
                $('#btnSearch', '#searchForm').click();
            });

            $('#btnSearch', '#searchForm').click(function () {

                var title = $('#txtSearch', '#searchForm').val();
                var seo = new SEO();
                var title_en = seo.getTitleSeo(title);
                var category_id = $('#CATEGORY_ID', '#searchForm').val();

                var conditions = new Array();
                if (title_en.length > 0) {
                    conditions.push("(a.title_en like '%" + title_en + "%')");
                }
                if (category_id >= 0) {
                    conditions.push('(b.category_id = ' + category_id + ')');
                }
                _grid_paged.init({
                    data: {
                        op: 'searching', conditions: JSON.stringify(conditions)
                    }
                });

                return false;
            });
        }

        var _DEPARTURE_DATE_ID = '#DEPARTURE_DATE';

        var _ARRIVE_DATE = '#ARRIVE_DATE';

        var today = new Date();

        var initSearchDate = function () {

            $(_DEPARTURE_DATE_ID + ',' + _ARRIVE_DATE).datepick({
                constrainInput: true,
                showWeeks: false,
                showOtherMonths: false,
                showStatus: false,
                numberOfMonths: 2,
                showOn: 'both',
                gotoToday: true,
                buttonImageOnly: true,
                buttonImage: '/content/images/icons/calendar.png',
                dateFormat: 'dd/mm/yy',
                mandatory: true,
                closeAtTop: true,
                alignment: 'bottom',
                defaultDate: 5,
                minDate: '0',
                maxDate: '+329D',
                showAnim: false,
                changeMonth: false,
                changeYear: false,
                beforeShowDay: checkWeekends,
                selectFirst: true,
                showButtonPanel: true,
                ViewsHeaderVisibility: false,
                duration: 'fast',
                onSelect: setRange,
                beforeShow: customRange
            });

        }

        var checkWeekends = function (date) {

            if (today.getDate() + 2 > date.getDate() && date.getMonth() == today.getMonth()) {
            }
            if (today.getDay() == 6 && today.getHours() >= 13 && today.getDate() + 3 > date.getDate() && date.getMonth() == today.getMonth()) {
                return [false, ''];
            }

            if (date.getDate() >= 30 && date.getDate() <= 31 && date.getMonth() == 11 && date.getFullYear() == 2010) {
                return [false, ''];
            }
            if (0 && today.getDate() >= 22 && today.getMonth() == 3 && today.getFullYear() == 2011) {
                if (date.getDate() >= 21 && date.getDate() < 27 && date.getMonth() == 3 && date.getFullYear() == 2011) {
                    return [false, ''];
                }
            }
            if ((this.id == _ARRIVE_DATE) && min_date_set && min_date > date) {
                return [false, ''];
            }
            if (date.getDay() == 6 || date.getDay() === 0) {
                return [true, 'weekend'];
            } else {
                return [true, ''];
            }
        }

        var setRange = function (value, date) {
            if (this.id == _DEPARTURE_DATE_ID) {
                min_date = $(_DEPARTURE_DATE_ID).datepick("getDate");
                min_date_set = 1;
                var return_date = $(_ARRIVE_DATE).datepick("getDate");
                if (!$(_ARRIVE_DATE).attr('edited') || return_date < date) {
                    $(_ARRIVE_DATE).datepick('setDate', date);
                    $(_ARRIVE_DATE).attr('edited', 1);
                }
            }
        }

        var customRange = function (input) {
        }

        var addAirlineTicketPromotion =  function () {

            var form_valid = $(_form_id).validateForm();

            if (form_valid == false) return false;

            var data_post = $(_form_id).serializeObject();

            data_post.op = "AddAirlineTicketPromotion";

            jwm.Alert.ShowAjaxProcessing(_form_id);

            jQuery.ajax({
                url: "/Handler/AirlineHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_form_id);
                    jwm.Alert.ShowMsg(_form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0) {
                        $('#ATP_ID').val(data.Data.ATP_ID);
                        $('#btnAddUpdate').val('Cập nhật');

                        renderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_form_id);
                    jwm.Alert.ShowMsg(_form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var updateAirlineTicketPromotion = function () {
            var form_valid = $(_form_id).validateForm();

            if (form_valid == false) return false;

            var data_post = $(_form_id).serializeObject();

            data_post.op = "UpdateAirlineTicketPromotion";

            jwm.Alert.ShowAjaxProcessing(_form_id);
            jQuery.ajax({
                url: "/Handler/AirlineHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_form_id);
                    jwm.Alert.ShowMsg(_form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0)
                        _grid_paged.renderGrid();
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_form_id);
                    jwm.Alert.ShowMsg(_form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var GetListHierarchicalCategories = function () {
            jwm.Alert.ShowAjaxProcessing('#categories');
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/ListInfo.asmx/GetListHierarchicalCategories",
                dataType: "jsonp",
                data: {
                    parent_id: 0
                },
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing('#categories');

                    var data_list = {
                    }

                    data_list.value = data.Data;

                    jQuery('#tmp_categories').data('data_source', data_list);

                    data_list.value = initLevelCheckBox(data_list.value);

                    jQuery('#categories').empty();

                    jQuery('#tmp_categories').tmpl(data_list).appendTo('#categories');

                    jQuery('#tmp_categories_option').data('data-source', data_list.value);
                    data_list.value = initLevelSpace(data_list.value);
                    jQuery('#tmp_categories_option').tmpl(data_list).appendTo('#CATEGORY_ID', '#searchForm');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#categories');
                    jwm.Alert.ShowMsg('#categories', -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        var rebindCategories = function () {

            jQuery('#categories').empty();

            var data_list = jQuery('#tmp_categories').data('data_source');

            data_list.value = initLevelCheckBox(data_list.value);

            jQuery('#tmp_categories').tmpl(data_list).appendTo('#categories');
        }

        var initLevelCheckBox = function (list) {
            for (var i = 0; i < list.length; i++) {
                var row = list[i];
                row.HTML_CHECK_BOX = getCheckBox(row.CATEGORY_ID);
                if (row.CHILD_CNT > 0) {
                    row.CHILDREN = initLevelCheckBox(row.CHILDREN);
                }
            }
            return list;
        }

        var getCheckBox = function (category_id) {
            var checked = '';
            var categories = $('#CATEGORIES').val(); //11
            if (parseFloat(category_id) > 0) {

                var array = null;

                if (categories.indexOf(',') > 0) {
                    array = categories.split(',');
                }
                else {
                    array = new Array();
                    array.push(categories);
                }

                if (jQuery.inArray('' + category_id, array) >= 0)
                    checked = 'checked="checked"';
            }
            return '<input type="checkbox" value="' + category_id + '" ' + checked + ' onchange="selectCategories()" name="ck_categories" />';
        }

        var initLevelSpace = function (list) {
            for (var i = 0; i < list.length; i++) {
                var row = list[i];
                row.HTML_LEVEL_SPACE = getHtmlLevelSpace(row.CHILD_LEVEL);
                if (row.CHILD_CNT > 0) {
                    row.CHILDREN = initLevelSpace(row.CHILDREN);
                }
            }
            return list;
        }

        var getHtmlLevelSpace = function (level) {
            var s = '&nbsp;';
            for (var i = 0; i < level; i++) {
                s += '&nbsp;&nbsp;';
            }
            return s;
        }

        function setLinkSEO() {
            $('#TITLE').keyup(function () {
                var seo = new SEO();
                var title = seo.getTitleSeo($('#TITLE').val());
                $('#TITLE_EN').val(title);
            });
        }

        var initControls = function () {

            initFormId();

            renderGrid();

            initSearchDate();

            GetListHierarchicalCategories();

            jQuery('#btnAddUpdate').click(function () {
                if (jQuery('#ATP_ID').val() != "0")
                    return updateAirlineTicketPromotion();
                else
                    return addAirlineTicketPromotion();
            });

            jQuery(document).bind('deserializeObjectToForm', function (e) {
                if (jQuery('#ATP_ID').val() != "0") {
                    $('#btnAddUpdate').val('Cập nhật');

                }
                $('#CATEGORIES').val(e.objectForm.categories);
                rebindCategories();
            });

            var cities = new SS.services.cities();
            cities.init();

            var airlines = new SS.services.airlines();
            airlines.init();

            setLinkSEO();

            initSearchForm();

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
