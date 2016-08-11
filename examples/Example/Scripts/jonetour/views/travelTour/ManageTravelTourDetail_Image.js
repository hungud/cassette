(function () {

    VA.views.travelTour.ManageTravelTourDetail_Image = function () {

        var _configs = {
        }

        var grid_manage_travel_tour_detail_image_configs = null;

        var grid_manage_travel_tour_detail_image_paged = null;

        var initGridManageTravelTourDetailImage = function () {

            grid_manage_travel_tour_detail_image_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.SERVICE_WSS_ROOT_URL + "/service03/tour/get",
                is_call_package: true,
                page_size: 5,
                row_start: 0,
                row_end: 5
            };

            var conditions = {

            };


            grid_manage_travel_tour_detail_image_configs.data = {
                package_name: 'PK_BD_TOUR_DETAIL_IMAGES',
                object_name: 'GET_LIST_TOUR_DETAIL_IMAGES',
                p_conditions: JSON.stringify(conditions)
            };
        }


        function initTourDetailIdFromQueryString() {

            var context = new SS.core.helpers.context();

            var tour_detail_id = context.getQueryString('tour_detail_id');

            $('#TOUR_DETAIL_ID').val(tour_detail_id);

        }

        function getTravelTourInfoDetail() {

            var data_post = {};

            var tour_detail_id = $('#TOUR_DETAIL_ID').val()

            data_post.PACKAGE_NAME = 'PK_BD_TOUR_INFO_DETAIL';

            data_post.OBJECT_NAME = 'GET_TOUR_INFO_DETAIL';

            data_post.P_CONDITIONS = JSON.stringify({
                TOUR_INFO_DETAIL: {
                    SQ_ID: tour_detail_id
                }
            });

            jwm.Alert.ShowAjaxProcessing('#travel_tour_info_detail_summary');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/tour/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#travel_tour_info_detail_summary');
                    jwm.Alert.ShowMsg('#travel_tour_info_detail_summary', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');
                    if (resp.TypeMsg > 0 && resp.Data.CURSOR_DATA.length > 0) {
                        $('#tmp_travel_tour_info_detail').tmpl(resp.Data.CURSOR_DATA[0]).appendTo('#travel_tour_info_detail_summary');
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#travel_tour_info_detail_summary');
                    jwm.Alert.ShowMsg('#travel_tour_info_detail_summary', -1, message + " " + exc, 'Thông báo');
                }
            });
        }


        function setGridConfigFromQueryString() {

            var context = new SS.core.helpers.context();

            var tour_detail_id = context.getQueryString('tour_detail_id');

            var action = context.getQueryString('action');

            var option = action;

            if (action == "view") {
                option = 'searching';
            }


            var conditions = {
            };

            conditions.TOUR_INFO_DETAIL_IMAGES = {};



            if (isEmpty(tour_detail_id) == false) {
                tour_detail_id = tour_detail_id.trim();
                conditions.TOUR_INFO_DETAIL_IMAGES.TOUR_DETAIL_ID = tour_detail_id;
            }

            grid_manage_travel_tour_detail_image_configs.data = {
                package_name: 'PK_BD_TOUR_DETAIL_IMAGES',
                object_name: 'GET_LIST_TOUR_DETAIL_IMAGES',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_manage_travel_tour_detail_image_configs.page_size

            };

            //grid_manage_travel_tour_detail_ex04_configs.onRenderComplete = function () {

            //    var data = jQuery('#tmp_grid').data('data-source');
            //    if (data.length == 0) return;
            //    $('#insertUpdate').deserializeObjectToForm('#tmp_grid', 0);
            //    window.location.hash = 'action_complete';
            //};

        }


        function addTour() {

            var content = CKEDITOR.instances.CONTENT.getData();

            content = encodeURIComponent(content);

            $('#CONTENT').val(content);

         

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------
            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_TOUR_DETAIL_IMAGES';

            data_post.object_name = 'INSERT_TOUR_INFO_DETAIL_IMAGES';

            data_post.objects_decode_url = 'P_CONTENT';


            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/tour/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');
                    if (resp.TypeMsg > 0) {
                        $('#SQ_ID').val(resp.Data.SQ_ID);
                        $('#btnAddUpdate').val('Cập nhật');

                        grid_manage_travel_tour_detail_image_paged.renderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        function UpdateTour() {

            var content = CKEDITOR.instances.CONTENT.getData();

            content = encodeURIComponent(content);

            $('#CONTENT').val(content);


          

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------
            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_TOUR_DETAIL_IMAGES';

            data_post.object_name = 'UPDATE_TOUR_INFO_DETAIL_IMAGES';

            data_post.objects_decode_url = 'P_CONTENT';

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/tour/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0)

                        grid_manage_travel_tour_detail_image_paged.renderGrid();

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }


        var initControls = function () {

            initTourDetailIdFromQueryString();

            initGridManageTravelTourDetailImage();


            setGridConfigFromQueryString();

            renderGridManageTravelTourDetailImage();

            jQuery('#btnAddUpdate').click(function () {
                if (jQuery('#SQ_ID').val() != "0")
                    return UpdateTour();
                else
                    return addTour();
            });

            $('#btnClone').button('disable');

            jQuery(document).bind('deserializeObjectToForm', function (e) {
                if (jQuery('#SQ_ID').val() != "0") {
                    $('#btnAddUpdate').val('Cập nhật');
                    $('#btnClone').button('enable');
                }
                CKEDITOR.instances.CONTENT.setData(e.objectForm.CONTENT);
               
                setImageThumb(e.objectForm.IMAGE_PATH);
            });

            $('#btnClone').click(function () {

                return addTour();

            });

            setLinkSEO();

            getTravelTourInfoDetail();
        }



        function setLinkSEO() {
            $('#TITLE').keyup(function () {
                var seo = new SEO();
                var title = seo.getTitleSeo($('#TITLE').val());
                $('#TITLE_EN').val(title);
            });
        }


        var renderGridManageTravelTourDetailImage = function (conditions) {

            if (conditions) {
                grid_manage_travel_tour_detail_image_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_travel_tour_detail_image_paged = new SS.core.GridPaged();

            grid_manage_travel_tour_detail_image_paged.init(grid_manage_travel_tour_detail_image_configs);
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