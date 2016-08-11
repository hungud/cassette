(function () {

    VA.views.customer.ManageBookTicketing = function () {

        var _configs = {
        }


        //---------------------------------
        //khai bao luoi
        var grid_config = null;

        var grid = null;

        var initGridContext = function () {


            //----------------------------------------
            //goi ajax
            grid_config = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/customer/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };


            //----------------------------------------
            //tham so gui len
            var conditions = {
            }

            grid_config.data = {
                package_name: 'PK_BD_CUSTOMER_ORDER',
                object_name: 'GET_LIST_BOOKING_INFO',
                p_conditions: JSON.stringify(conditions)
            };

            //----------------------------------------
            //sau khi in ra luoi ket qua
            grid_config.onRenderComplete = function () {
               
            };

        }

        var renderGrid = function () {

            grid = new SS.core.GridPaged();
            grid.init(grid_config);

        }

        var renderBookingTicketing = function (conditions) {

            if (conditions) {
                grid_config.data.p_conditions = JSON.stringify(conditions);
            }

            grid = new SS.core.GridPaged();

            grid.init(grid_config);
        }


        var execFilterForm = function () {

            var conditions = {
            };

            var se_mobile = $('#SE_MOBILE').val();

            var se_full_name = $('#SE_FULL_NAME').val();

            var se_mail = $('#SE_MAIL').val();

            var ctm_group_name = $('#CTM_GROUP_NAME_SEARCH').val();


            conditions.booking_info = {};

            conditions.setting_policy_customer_001 = {};

            if (isEmpty(se_mobile) == false) {
                se_mobile = se_mobile.trim();
                conditions.booking_info.se_mobile = se_mobile;
            }

            if (isEmpty(se_full_name) == false) {
                se_full_name = se_full_name.trim();
                conditions.booking_info.se_full_name = se_full_name;
            }

            if (isEmpty(se_mail) == false) {
                se_mail = se_mail.trim();
                conditions.booking_info.se_mail = se_mail;
            }

            if (isEmpty(ctm_group_name) == false) {
                ctm_group_name = ctm_group_name.trim();
                conditions.setting_policy_customer_001.sq_id = ctm_group_name;
            }


            //grid_config.data = {
            //    package_name: 'PK_BD_CUSTOMER_ORDER',
            //    object_name: 'GET_LIST_BOOKING_INFO',
            //    p_conditions: JSON.stringify(conditions),
            //    row_start: 0,
            //    row_end: grid_config.page_size
            //};

            //grid.init(grid_config);

            //window.location.hash = "option_seaching";

            //return false;
           

            grid_config.data.p_conditions = JSON.stringify(conditions);

            renderBookingTicketing();

            return false;
        }


        //----------------------------------
        //ham lay gia tri dau tien cua thong tin nguoi dung
        var setDecodeInfo = function (string) {

            var info = string;
            var get_info = "";

            //------------------------------------------------------------------------------------
            //dau vao la nhiu gia tri, moi gia tri phan cach nhau boi &lt;br/&gt; la dau <br/>, lay gia tri mang dau tien

            if (info.indexOf('&lt;br/&gt;') !== -1) {//neu dau vao co nhiu thi moi lay phan tu dau
                get_info = info.split('&lt;br/&gt;')[0];
            } else {
                get_info = info;
            }
                 
            return get_info;

        }

        var exportExcel = function () {

            var conditions = {
            };

            var se_mobile = $('#SE_MOBILE').val();

            var se_full_name = $('#SE_FULL_NAME').val();

            var se_mail = $('#SE_MAIL').val();

            var ctm_group_name = $('#CTM_GROUP_NAME_SEARCH').val();


            conditions.booking_info = {};

            conditions.setting_policy_customer_001 = {};

            if (isEmpty(se_mobile) == false) {
                se_mobile = se_mobile.trim();
                conditions.booking_info.se_mobile = se_mobile;
            }

            if (isEmpty(se_full_name) == false) {
                se_full_name = se_full_name.trim();
                conditions.booking_info.se_full_name = se_full_name;
            }

            if (isEmpty(se_mail) == false) {
                se_mail = se_mail.trim();
                conditions.booking_info.se_mail = se_mail;
            }


            if (isEmpty(ctm_group_name) == false) {
                ctm_group_name = ctm_group_name.trim();
                conditions.setting_policy_customer_001.sq_id = ctm_group_name;
            }

            _configs.args = {
            };

            _configs.args.DataForm = {
            };

            var config_popup = {
                file_url: '/html/popup/customer/ExportFile.html',
                args: {
                    Title: 'Nhập thông tin kết xuất file',
                    DataForm: _configs.args.DataForm,
                    FunctionCallBack: function () {


                        var url_download = _configs.service_wss_vietair_tv_url + "/service03/customer/get";
                        var data_post_download = {
                            package_name: 'PK_BD_CUSTOMER_ORDER',
                            object_name: 'GET_LIST_BOOKING_INFO_EXPORT',
                            p_row_start: 0,
                            p_row_end: _configs.args.DataForm.export_total_row,
                            p_conditions: JSON.stringify(conditions),
                            ExportFile: true
                        };

                        ajax_download(url_download, data_post_download);


                    }
                }
            };

            var popup_file = new SS.core.helpers.PopupFileHtml();

            popup_file.init(config_popup);

            return false;
        }


        var initSearchCtmGroupName = function (typeId) {


            var data = {};

            data.op = "PACKAGE_HTTP_POST";

            data.path_ajax_post = '/service03/customer/get';

            data.PACKAGE_NAME = 'PK_BD_CUSTOMER_ORDER';

            data.OBJECT_NAME = 'GET_LIST_POLICY_CTM_001';

            data.P_ROW_START = 0;

            data.P_ROW_END = 999999999999;

            data.P_CONDITIONS = JSON.stringify({

            });

            jQuery.ajax({

                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data,
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {


                        $('#CTM_GROUP_NAME_SEARCH').empty();

                        jQuery('#CTM_GROUP_NAME_SEARCH').html('<option value="">-- [ Chọn nhóm khách hàng ] --</option>');

                        $('#tmp_list_ctm_group_name').tmpl(resp.Data.CURSOR_DATA).appendTo("#CTM_GROUP_NAME_SEARCH");

                    }

                },

                error: function (http, message, exc) {

                    jwm.Alert.HideAjaxProcessing('#filterForm');

                    jwm.Alert.ShowMsg('#filterForm', -1, message + " " + exc, 'Thông báo');
                }
            });
        }


        var update = function () {

            //--------------------------------------------------

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;

            //--------------------------------------------------       

            var data_post = {};

            data_post.CUSTOMER = $(_configs.form_id).serializeObject();

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);


            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/customer/get",
                dataType: 'json',
                type: 'POST',
                data: {
                    package_name: 'PK_FD_CUSTOMER',
                    object_name: 'REGISTER_ACCOUNT',
                    P_CTM_DATA: JSON.stringify(data_post)
                },
                success: function (resp) {

                    jwm.Alert.HideAjaxProcessing(_configs.form_id);

                    //--------------------------------------------------
                    //xet neu 0 null thi bo show ajax

                    if (resp != null) {

                        jwm.Alert.ShowMsg(_configs.form_id, resp.TypeMsg, resp.Data.OUTPUT_PARAMS.R_ERROR_MESSAGE, 'VIETAIR - Thông báo');

                        renderGrid();

                    }

                },
                error: function (http, message, exc) {

                    jwm.Alert.HideAjaxProcessing(_configs.form_id);

                    jwm.Alert.ShowMsg(_configs.form_id, 0, "Mời bạn vui lòng thử lại", 'VIETAIR - Thông báo');

                }
            });

        }


        var initControls = function () {

            initGridContext();

            renderGrid();

            jQuery(document).bind('deserializeObjectToForm', function (e) {

                $('#block-insert').show();

                //--------------------------------
                //set lai gia tri thong tin
                var address = setDecodeInfo($('#CTM_ADDRESS').val());

                var full_name = setDecodeInfo($('#FULL_NAME').val());

                var mobile = setDecodeInfo($('#MOBILE').val());



                //-------------------------------
                //gan lai gia tri vao the input
                $('#CTM_ADDRESS').val(address);

                $('#FULL_NAME').val(full_name);

                $('#MOBILE').val(mobile);

                $('html, body').animate({
                    scrollTop: $("#block-insert").offset().top
                }, 100);

            });


            $('#btnAddUpdate1').click(function () {

                update();

                return false;
            });

            $('#btnSearch', '#filterForm').button();

            $('#btnSearch', '#filterForm').click(function () {

                return execFilterForm();

            });

            $('#filterForm').enter(function () {

                return execFilterForm();

            });

            $('#btnExportCsv', '#filterForm').button();

            $('#btnExportCsv', '#filterForm').click(function () {

                return exportExcel();

            });

            initSearchCtmGroupName();


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