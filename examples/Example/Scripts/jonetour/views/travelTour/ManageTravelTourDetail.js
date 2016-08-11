(function () {

    VA.views.travelTour.ManageTravelTourDetail = function () {

        var _configs = {
        }

        var grid_manage_travel_tour_detail_configs = null;

        var grid_manage_travel_tour_detail_paged = null;

        var initGridManageTravelTourDetail = function () {

            grid_manage_travel_tour_detail_configs = {
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


            grid_manage_travel_tour_detail_configs.data = {
                package_name: 'PK_BD_TOUR_INFO_DETAIL',
                object_name: 'GET_LIST_TOUR_INFO_DETAIL',
                p_conditions: JSON.stringify(conditions)
            };
        }

        function AddTravelTourDetail() {



            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------
            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();


            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_TOUR_INFO_DETAIL';

            data_post.object_name = 'INSERT_TOUR_INFO_DETAIL';


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

                        setButtonEnable();

                        grid_manage_travel_tour_detail_paged.renderGrid();

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }



        function UpdateTravelTourDetail() {



            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------
            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();


            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_TOUR_INFO_DETAIL';

            data_post.object_name = 'UPDATE_TOUR_INFO_DETAIL';


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

                        $('#btnAddUpdate').val('Cập nhật');

                        setButtonEnable();

                        grid_manage_travel_tour_detail_paged.renderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }


        function initTourIdFromQueryString() {

            var context = new SS.core.helpers.context();

            var tour_id = context.getQueryString('tour_id');

            $('#TOUR_ID').val(tour_id);

        }


        function setButtonEnable() {
            $('#btnAddUpdate').val('Cập nhật');
            $('#btnClone').button('enable');
            $('#btnNextStep_Ex01').button('enable');
            $('#btnNextStep_Ex02').button('enable');
            $('#btnNextStep_Ex03').button('enable');
            $('#btnNextStep_Ex04').button('enable');
            $('#btnNextStep_Ex05').button('enable');
            $('#btnNextStep_Ex06').button('enable');
            $('#btnNextStep_Ex07').button('enable');
            $('#btnNextStep_Ex08').button('enable');
            $('#btnNextStep_Ex09').button('enable');
        }


        var _DEPARTURE_DATE_ID = "#DEPARTURE_DATE";

        var _ARRIVE_DATE_ID = "#ARRIVE_DATE";

        var initControlDateTime = function () {

            $(_DEPARTURE_DATE_ID).datetimepicker({
                format: 'd/m/Y H:i',
                mask: true
            });
            $(_ARRIVE_DATE_ID).datetimepicker({
                format: 'd/m/Y H:i',
                mask: true
            });

        }


        function getTravelTourInfo() {

            var data_post = {};

            var tour_id = $('#TOUR_ID').val()

            data_post.PACKAGE_NAME = 'PK_BD_TOUR_INFO';

            data_post.OBJECT_NAME = 'GET_TOUR_INFO';

            data_post.P_CONDITIONS = JSON.stringify({
                TOUR_INFO: {
                    TOUR_ID: tour_id
                }
            });

            jwm.Alert.ShowAjaxProcessing('#travel_tour_info_summary');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/tour/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#travel_tour_info_summary');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');
                    if (resp.TypeMsg > 0 && resp.Data.CURSOR_DATA.length > 0) {
                        $('#tmp_travel_tour_info').tmpl(resp.Data.CURSOR_DATA[0]).appendTo('#travel_tour_info_summary');
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#travel_tour_info_summary');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
        }
        function setGridConfigFromQueryString() {

            var context = new SS.core.helpers.context();

            var tour_id = context.getQueryString('tour_id');

            var tour_detail_id = context.getQueryString('tour_detail_id');

            var action = context.getQueryString('action');

            var option = action;

            if (action == "view") {
                option = 'searching';
            }

            var conditions = {
            };

            conditions.TOUR_INFO_DETAIL = {};



            if (isEmpty(tour_id) == false) {
                tour_id = tour_id.trim();
                conditions.TOUR_INFO_DETAIL.TOUR_ID = tour_id;
            }

            if (isEmpty(tour_detail_id) == false) {
                tour_detail_id = tour_detail_id.trim();
                conditions.TOUR_INFO_DETAIL.SQ_ID = tour_detail_id;
            }

            grid_manage_travel_tour_detail_configs.data = {
                package_name: 'PK_BD_TOUR_INFO_DETAIL',
                object_name: 'GET_LIST_TOUR_INFO_DETAIL',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_manage_travel_tour_detail_configs.page_size

            };

            grid_manage_travel_tour_detail_configs.onRenderComplete = function () {

                if (window.location.hash.indexOf('action_complete') >= 0) return;


                if (action == "edit") {


                    $('#insertUpdate').deserializeObjectPackageToForm('#tmp_grid', null, 'SQ_ID', tour_detail_id);

                    $('html, body').animate({
                        scrollTop: $("#insertUpdate").offset().top
                    }, 100);
                }
                window.location.hash = 'action_complete';

            };
        }

        var renderGridManageTravelTourDetail = function (conditions) {

            if (conditions) {
                grid_manage_travel_tour_detail_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_travel_tour_detail_paged = new SS.core.GridPaged();

            grid_manage_travel_tour_detail_paged.init(grid_manage_travel_tour_detail_configs);
        }


        var initControls = function () {

            initTourIdFromQueryString();

            initGridManageTravelTourDetail();

            setGridConfigFromQueryString();

            renderGridManageTravelTourDetail();

            jQuery('#btnAddUpdate').click(function () {
                $('#CLONE_SQ_ID').val("0");
                if (jQuery('#SQ_ID').val() != "0") {
                    return UpdateTravelTourDetail();
                }
                else
                    return AddTravelTourDetail();
            });

            $('#btnClone').button('disable');
            $('#btnNextStep_Ex01').button('disable');
            $('#btnNextStep_Ex02').button('disable');
            $('#btnNextStep_Ex03').button('disable');
            $('#btnNextStep_Ex04').button('disable');
            $('#btnNextStep_Ex05').button('disable');
            $('#btnNextStep_Ex06').button('disable');
            $('#btnNextStep_Ex07').button('disable');
            $('#btnNextStep_Ex08').button('disable');
            $('#btnNextStep_Ex09').button('disable');

            jQuery(document).bind('deserializeObjectToForm', function (e) {

                if (jQuery('#SQ_ID').val() != "0") {
                    setButtonEnable();
                }
                setImageThumb(e.objectForm.IMAGE_THUMB);

                $('html, body').animate({
                    scrollTop: $("#insertUpdate").offset().top
                }, 100);

            });

            $('#btnNextStep_Ex01').click(function () {
                var link = '/travelTour/ManageTravelTourDetail_Ex01?tour_detail_id=' + $("#SQ_ID").val();
                //window.open(link, '_blank');
                window.location.href = link;
                return false;
            });

            $('#btnNextStep_Ex02').click(function () {
                var link = '/travelTour/ManageTravelTourDetail_Ex02_Airline?tour_detail_id=' + $("#SQ_ID").val();
                //window.open(link, '_blank');
                window.location.href = link;
                return false;
            });

            $('#btnNextStep_Ex03').click(function () {
                var link = '/travelTour/ManageTravelTourDetail_Ex02_Hotel?tour_detail_id=' + $("#SQ_ID").val();
                //window.open(link, '_blank');
                window.location.href = link;
                return false;
            });

            $('#btnNextStep_Ex04').click(function () {
                var link = '/travelTour/ManageTravelTourDetail_Ex02_Guider?tour_detail_id=' + $("#SQ_ID").val();
                //window.open(link, '_blank');
                window.location.href = link;
                return false;
            });

            $('#btnNextStep_Ex05').click(function () {
                var link = '/travelTour/ManageTravelTourDetail_Ex02_Price?tour_detail_id=' + $("#SQ_ID").val();
                //window.open(link, '_blank');
                window.location.href = link;
                return false;
            });

            $('#btnNextStep_Ex06').click(function () {
                var link = '/travelTour/ManageTravelTourDetail_Ex02_Room?tour_detail_id=' + $("#SQ_ID").val();
                //window.open(link, '_blank');
                window.location.href = link;
                return false;
            });

            $('#btnNextStep_Ex07').click(function () {
                var link = '/travelTour/ManageTravelTourDetail_Ex03?tour_detail_id=' + $("#SQ_ID").val();
                //window.open(link, '_blank');
                window.location.href = link;
                return false;
            });

            $('#btnNextStep_Ex08').click(function () {
                var link = '/travelTour/ManageTravelTourDetail_Ex04?tour_detail_id=' + $("#SQ_ID").val();
                //window.open(link, '_blank');
                window.location.href = link;
                return false;
            });


            $('#btnNextStep_Ex09').click(function () {
                var link = '/travelTour/ManageTravelTourDetail_Image?tour_detail_id=' + $("#SQ_ID").val();
                //window.open(link, '_blank');
                window.location.href = link;
                return false;
            });



            initControlDateTime();


            $('#btnClone').click(function () {

                $('#CLONE_SQ_ID').val(jQuery('#SQ_ID').val());
                return AddTravelTourDetail();

            });


            getTravelTourInfo();
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
