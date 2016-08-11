(function () {

    VA.views.customer.ManageCustomerQA = function () {

        var _configs = {
        }

        var setSelectTypeId = function (value) {
            if (value == 0 || value == 2) {
                $('#div_CUSTOMER_TITLE_QA').css('display', 'none');
                $('#div_ADMIN_ANSWER').css('display', 'none');
            }
            else if (value == 1) {
                $('#div_CUSTOMER_TITLE_QA').css('display', '');
                $('#div_ADMIN_ANSWER').css('display', '');
            }
        }

        var _grid_paged = null;

        var renderGrid = function () {
            _grid_paged = new SS.core.GridPaged();
            _grid_paged.init({
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + '/ListInfo.asmx/GetListCustomerFeeback',
                page_size: 5,
                row_start: 0,
                row_end: 5
            });
        }

        var add = function () {

            var CUSTOMER_CONTENT_QA = CKEDITOR.instances.CUSTOMER_CONTENT_QA.getData();

            var ADMIN_ANSWER = CKEDITOR.instances.ADMIN_ANSWER.getData();

            CUSTOMER_CONTENT_QA = encodeURIComponent(CUSTOMER_CONTENT_QA);

            ADMIN_ANSWER = encodeURIComponent(ADMIN_ANSWER);

            $('#CUSTOMER_CONTENT_QA').val(CUSTOMER_CONTENT_QA);

            $('#ADMIN_ANSWER').val(ADMIN_ANSWER);

            var form_valid = $('#insertUpdate').validateForm();

            if (form_valid == false) return false;

            var data_post = $('#insertUpdate').serializeObject();

            data_post.op = "AddCustomerFeedback";

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: "/Handler/AirlineHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0) {
                        $('#TOUR_ID').val(data.Data.TOUR_ID);
                        $('#btnAddUpdate').val('Cập nhật');

                        renderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var update = function () {

            var CUSTOMER_CONTENT_QA = CKEDITOR.instances.CUSTOMER_CONTENT_QA.getData();

            var ADMIN_ANSWER = CKEDITOR.instances.ADMIN_ANSWER.getData();

            CUSTOMER_CONTENT_QA = encodeURIComponent(CUSTOMER_CONTENT_QA);

            ADMIN_ANSWER = encodeURIComponent(ADMIN_ANSWER);

            $('#CUSTOMER_CONTENT_QA').val(CUSTOMER_CONTENT_QA);

            $('#ADMIN_ANSWER').val(ADMIN_ANSWER);

            var form_valid = $('#insertUpdate').validateForm();

            if (form_valid == false) return false;

            var data_post = $('#insertUpdate').serializeObject();

            data_post.op = "UpdateCustomerFeedback";

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

            renderGrid();

            setSelectTypeId(0);

            $('#TYPE_ID').change(function () {
                var value = $('#TYPE_ID').val();
                setSelectTypeId(value);
            });

            jQuery('#btnAddUpdate').click(function () {
                if (jQuery('#CUSTOMER_FEEDBACK_ID').val() != "0")
                    return update();
                else
                    return add();
            });


            jQuery(document).bind('deserializeObjectToForm', function (e) {
                if (jQuery('#CUSTOMER_FEEDBACK_ID').val() != "0") {
                    $('#btnAddUpdate').val('Cập nhật');

                }
                CKEDITOR.instances.CUSTOMER_CONTENT_QA.setData(e.objectForm.customer_content_qa);
                CKEDITOR.instances.ADMIN_ANSWER.setData(e.objectForm.admin_answer);
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