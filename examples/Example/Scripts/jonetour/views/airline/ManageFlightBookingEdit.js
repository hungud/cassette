(function () {

    VA.views.airline.ManageFlightBookingExtraInfo = function () {

        var _configs = {
        }

        var _grid_paged = null;

        var _grid_paged_config = null;

        var initGrid = function () {
            _grid_paged_config = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + '/ListInfo.asmx/GetListFlightBookingInfo',
                page_size: 5,
                row_start: 0,
                row_end: 5
            }
        }

        var renderGrid = function () {
            _grid_paged = new SS.core.GridPaged();
            _grid_paged.init(_grid_paged_config);
        }


        var update = function () {

            var form_valid = $('#insertUpdate').validateForm();

            if (form_valid == false) return false;

            var data_form = $('#insertUpdate').serializeObject();

            var data_origin = $('#insertUpdate').data('data-source');

            var data_origin_upper = ToUpperCaseJsonProperty(data_origin);

            var data_post = $.extend({}, data_origin_upper, {}, data_form);

            data_post.ORDER_DATA = encodeURIComponent(data_post.ORDER_DATA);

            data_post.op = "UpdateFlightBooking";

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');
            jQuery.ajax({
                url: "/Handler/AirlineHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0)
                        _grid_paged.renderGrid();
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
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
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#categories');
                    jwm.Alert.ShowMsg('#categories', -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        var rebindCategories = function () {

            data_list = jQuery('#tmp_categories').data('data_source');

            data_list.value = initLevelCheckBox(data_list.value);

            jQuery('#categories').empty();

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

        var setLinkSEO = function () {
            $('#TITLE').keyup(function () {
                var seo = new SEO();
                var title = seo.getTitleSeo($('#TITLE').val());
                $('#TITLE_EN').val(title);
            });
        }

        var initControls = function () {

            initGrid();

            var context = new SS.core.helpers.context();

            var conditions = new Array();

            conditions.push("(a.order_id = " + context.getQueryString('order_id') + ")");

            _grid_paged_config.data = {
                op: 'edit', conditions: JSON.stringify(conditions)
            };

            _grid_paged_config.onRenderComplete = function () {

                if (window.location.hash.indexOf('action_complete') >= 0) return;
                $('#insertUpdate').deserializeObjectToForm('#tmp_grid', 0);
                window.location.hash = 'action_complete';

            };

            renderGrid();

            jQuery('#btnAddUpdate').click(function () {
                if (jQuery('#ORDER_ID').val() != "0")
                    return update();
            });


            jQuery(document).bind('deserializeObjectToForm', function (e) {
                if (jQuery('#ORDER_ID').val() != "0") {
                    $('#btnAddUpdate').val('Cập nhật');

                }
                $('#insertUpdate').data('data-source', e.objectForm);
                //CKEDITOR.instances.PAYMENT_METHOD_DATA.setData(e.objectForm.payment_method_data);
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