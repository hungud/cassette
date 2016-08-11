(function () {

    VA.views.hotels.ManageHotelInfo = function () {

        var _configs = {
        }

        var grid_manage_hotel_info_configs = null;

        var grid_manage_hotel_info_paged = null;

        var initGridManageHotelInfo = function () {

            grid_manage_hotel_info_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.SERVICE_WSS_ROOT_URL + "/service03/hotel/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {

            };

            grid_manage_hotel_info_configs.data = {
                package_name: 'PK_BD_HOTEL_INFO',
                object_name: 'GET_LIST_HOTEL_INFO',
                p_conditions: JSON.stringify(conditions)
            };

        }

     
        var renderGridManageHotelInfo = function (conditions) {

            if (conditions) {
                grid_manage_hotel_info_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_hotel_info_paged = new SS.core.GridPaged();

            grid_manage_hotel_info_paged.init(grid_manage_hotel_info_configs);
        }

        var setGridConfigFromQueryString = function () {

            var context = new SS.core.helpers.context();

            var sq_id = context.getQueryString('sq_id');

            var action = context.getQueryString('action');

            var option = action;

            if (action == "view") {
                option = 'searching';
            }

            var conditions = {
            };


            conditions.HOTEL_INFO = {};

            if (isEmpty(sq_id) == false) {
                sq_id = sq_id.trim();
                conditions.HOTEL_INFO.SQ_ID = sq_id;

            }

            grid_manage_hotel_info_configs.data = {
                package_name: 'PK_BD_HOTEL_INFO',
                object_name: 'GET_LIST_HOTEL_INFO',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_manage_hotel_info_configs.page_size

            };

            grid_manage_hotel_info_configs.onRenderComplete = function () {

                if (window.location.hash.indexOf('action_complete') >= 0) return;


                if (action == "edit") {


                    $('#insertUpdate').deserializeObjectPackageToForm('#tmp_grid', null, 'SQ_ID', sq_id);

                    $('html, body').animate({
                        scrollTop: $("#insertUpdate").offset().top
                    }, 100);
                }
                window.location.hash = 'action_complete';

            };
        }

        var initControls = function () {

            initGridManageHotelInfo();

            setGridConfigFromQueryString();

            renderGridManageHotelInfo();

            jQuery('#btnAddUpdate').click(function () {
                $('#btnAddUpdate').show();
              
                if (jQuery('#SQ_ID').val() > "0") {

                    return updateHotel();
                }
                else {

                    return addHotel();
                }
            });


            jQuery(document).bind('deserializeObjectToForm', function (e) {

                setImageThumb(e.objectForm.IMAGE);

                $('html, body').animate({
                    scrollTop: $("#insertUpdate").offset().top
                }, 100);

                $('#box_update_hotel').show();

                if (jQuery('#SQ_ID').val() != "") {
                    $('#btnAddUpdate').val('Cập nhật');
                   
                    $('#REF_CITY_CODE').val(e.objectForm.REF_CITY_CODE);

                    $('#REF_CITY_CODE').trigger("chosen:updated");

                }

                $('#view_info_hotel').html('');

                $('#tmp_update_info_hotel').tmpl(e.objectForm).appendTo("#view_info_hotel");


                CKEDITOR.instances.FULL_DESCRIPTION.setData(e.objectForm.FULL_DESCRIPTION);
            });

            initInputChosen();

            initCityCodeSearch();

            initCityCode();

            setLinkSEO();

            initFilterForm();

        }

    

        var initFilterForm = function () {
            $('#btnSearch', '#filterForm').click(function () {

                return execFilterForm();

            });

            $('#filterForm').enter(function () {

                return execFilterForm();

            });

          
        }


        var execFilterForm = function () {

            var conditions = {
            };

            var hotel_rating = $('#HOTEL_RATING_SEARCH').val();

            var ref_city_code = $('#REF_CITY_CODE_SEARCH', '#filterForm').val();

            var hotel_name = $('#HOTEL_NAME_SEARCH', '#filterForm').val();

            conditions.HOTEL_INFO = {};
           
            if (isEmpty(hotel_rating) == false) {
                hotel_rating = hotel_rating.trim();

                conditions.HOTEL_INFO.HOTEL_RATING = hotel_rating;
            }

            if (isEmpty(ref_city_code) == false) {
                ref_city_code = ref_city_code[0];

                conditions.HOTEL_INFO.REF_CITY_CODE = ref_city_code;
            }

            if (isEmpty(hotel_name) == false) {
                hotel_name = hotel_name.trim();

                conditions.HOTEL_INFO.HOTEL_NAME = hotel_name;
            }

         
            grid_manage_hotel_info_configs.data = {
                package_name: 'PK_BD_HOTEL_INFO',
                object_name: 'GET_LIST_HOTEL_INFO',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_manage_hotel_info_configs.page_size
            };

            grid_manage_hotel_info_paged.init(grid_manage_hotel_info_configs);

            window.location.hash = "option_seaching";

            return false;
        }

        var initInputChosen = function () {

          
            $('#REF_CITY_CODE').chosen({
                no_results_text: "Không tìm thấy kết quả nào!",
                search_contains: true,
                allow_single_deselect: true,
                max_selected_options: 1 // chỉ chọn 1 giá trị trong chosen

            });

            $('#REF_CITY_CODE_SEARCH').chosen({
                no_results_text: "Không tìm thấy kết quả nào!",
                search_contains: true,
                allow_single_deselect: true,
                max_selected_options: 1 // chỉ chọn 1 giá trị trong chosen

            });

        }


        function initCityCode() {

            var data_post = {};

            data_post.package_name = "PK_BD_HOTEL_INFO";

            data_post.object_name = "GET_LIST_CITY_CODE";

            data_post.P_ROW_START = 0;

            data_post.P_ROW_END = 99999999;

            data_post.P_CONDITIONS = JSON.stringify({

            });


            jwm.Alert.HideAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/hotel/get",
                dataType: "json",
                type: 'POST',
                data: data_post,
                async: false,//bat buoc ajax phai ket thuc thi moi thuc hien hanh dong khac
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {

                        jQuery('#REF_CITY_CODE').empty();

                        jQuery('#tmp_list_city_code').tmpl(resp.Data.CURSOR_DATA).appendTo('#REF_CITY_CODE');

                        $('#REF_CITY_CODE').trigger("chosen:updated");
                    }
                    
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }


        function initCityCodeSearch() {

            var data_post = {};

            data_post.package_name = "PK_BD_HOTEL_INFO";

            data_post.object_name = "GET_LIST_CITY_CODE";

            data_post.P_ROW_START = 0;

            data_post.P_ROW_END = 99999999;

            data_post.P_CONDITIONS = JSON.stringify({

            });


            jwm.Alert.HideAjaxProcessing('#filterForm');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/hotel/get",
                dataType: "json",
                type: 'POST',
                data: data_post,
                async: false,//bat buoc ajax phai ket thuc thi moi thuc hien hanh dong khac
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {

                        jQuery('#REF_CITY_CODE_SEARCH').empty();

                        //jQuery('#REF_CITY_CODE_SEARCH').html('<option value="">-- [ Chọn thành phố ] --</option>');

                        jQuery('#tmp_list_city_code').tmpl(resp.Data.CURSOR_DATA).appendTo('#REF_CITY_CODE_SEARCH');

                        $('#REF_CITY_CODE_SEARCH').trigger("chosen:updated");

                       
                    }

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#filterForm');
                    jwm.Alert.ShowMsg('#filterForm', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }


        function addHotel() {

            var content = CKEDITOR.instances.FULL_DESCRIPTION.getData();

            content = encodeURIComponent(content);

            $('#FULL_DESCRIPTION').val(content);

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};
            data_post = $(_configs.form_id).serializeObject();

         
            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_HOTEL_INFO';

            data_post.object_name = 'INSERT_ROW';

            data_post.objects_decode_url = 'P_FULL_DESCRIPTION';

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/hotel/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        grid_manage_hotel_info_paged.renderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        function updateHotel() {

            var content = CKEDITOR.instances.FULL_DESCRIPTION.getData();

            content = encodeURIComponent(content);

            $('#FULL_DESCRIPTION').val(content);


            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();


            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_HOTEL_INFO';

            data_post.object_name = 'UPDATE_ROW';

            data_post.objects_decode_url = 'P_FULL_DESCRIPTION';


            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/hotel/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {
                        grid_manage_hotel_info_paged.renderGrid();

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

        }


        function setLinkSEO() {
            $('#HOTEL_NAME').keyup(function () {
                var seo = new SEO();
                var title = seo.getTitleSeo($('#HOTEL_NAME').val());
                $('#HOTEL_NAME_EN').val(title);
            });
        }


        var init = function (options) {

            _configs = $.extend({}, _configs, {}, options);

            _configs.SERVICE_WSS_ROOT_URL = $('#SERVICE_WSS_ROOT_URL').val();

            initControls();


        }

        return ({

            "init": init

        });

    };

}());
