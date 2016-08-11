(function () {

    VA.views.travelTour.ManageTravelTourDetail_Ex02_Room = function () {

        var _configs = {
        }

        var grid_manage_travel_tour_detail_ex02_room_configs = null;

        var grid_manage_travel_tour_detail_ex02_room_paged = null;

        var initGridManageTravelTourDetailEx02Room = function () {

            grid_manage_travel_tour_detail_ex02_room_configs = {
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


            grid_manage_travel_tour_detail_ex02_room_configs.data = {
                package_name: 'PK_BD_TOUR_DETAIL_EX02_ROOM',
                object_name: 'GET_LIST_TOUR_DETAIL_ROOM',
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

            conditions.TOUR_INFO_DETAIL_EX02_ROOM = {};



            if (isEmpty(tour_detail_id) == false) {
                tour_detail_id = tour_detail_id.trim();
                conditions.TOUR_INFO_DETAIL_EX02_ROOM.TOUR_DETAIL_ID = tour_detail_id;
            }

            grid_manage_travel_tour_detail_ex02_room_configs.data = {
                package_name: 'PK_BD_TOUR_DETAIL_EX02_ROOM',
                object_name: 'GET_LIST_TOUR_DETAIL_ROOM',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_manage_travel_tour_detail_ex02_room_configs.page_size

            };

            grid_manage_travel_tour_detail_ex02_room_configs.onRenderComplete = function () {

                var data = jQuery('#tmp_grid').data('data-source');
                if (data.length == 0) return;
                $('#insertUpdate').deserializeObjectToForm('#tmp_grid', 0);
                window.location.hash = 'action_complete';
            };

        }


        function addTour() {



            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------
            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_TOUR_DETAIL_EX02_ROOM';

            data_post.object_name = 'INSERT_TOUR_DETAIL_ROOM';

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
                        renderGridManageTravelTourDetailEx02Room();
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



            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------
            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_TOUR_DETAIL_EX02_ROOM';

            data_post.object_name = 'UPDATE_TOUR_DETAIL_ROOM';

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

                        renderGridManageTravelTourDetailEx02Room();
                    }
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

            initGridManageTravelTourDetailEx02Room();


            setGridConfigFromQueryString();

            renderGridManageTravelTourDetailEx02Room();

            jQuery('#btnAddUpdate').click(function () {
                if (jQuery('#SQ_ID').val() != "0")
                    return UpdateTour();
                else
                    return addTour();
            });

          

            jQuery(document).bind('deserializeObjectToForm', function (e) {
                if (jQuery('#SQ_ID').val() != "0") {
                    $('#btnAddUpdate').val('Cập nhật');
                    //$('#btnClone').button('enable');
                }
            });



          
            getTravelTourInfoDetail();
        }


        var renderGridManageTravelTourDetailEx02Room = function (conditions) {

            if (conditions) {
                grid_manage_travel_tour_detail_ex02_room_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_travel_tour_detail_ex02_room_paged = new SS.core.GridPaged();

            grid_manage_travel_tour_detail_ex02_room_paged.init(grid_manage_travel_tour_detail_ex02_room_configs);
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