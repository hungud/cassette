(function () {

    VA.views.travelTour.ManageTravelTour = function () {

        var _configs = {
        }

        var grid_manage_travel_tour_configs = null;

        var grid_manage_travel_tour_paged = null;

        var initGridManageTravelTour = function () {

            grid_manage_travel_tour_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.SERVICE_WSS_ROOT_URL + "/service03/tour/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10,
                onRenderComplete: function () {





                }
            };

            var conditions = {

            };



            grid_manage_travel_tour_configs.data = {
                package_name: 'PK_BD_TOUR_INFO',
                object_name: 'GET_LIST_TOUR_INFO',
                p_conditions: JSON.stringify(conditions)
            };
        }


        function AddTravelTour() {

            var content = CKEDITOR.instances.TOUR_CONTENT.getData();

            content = encodeURIComponent(content);

            $('#TOUR_CONTENT').val(content);


            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------
            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post.DEPARTURE_PLACE = $('#OP_DEPARTURE_PLACE').val().join(',');

            data_post.ARRIVE_PLACE = $('#OP_ARRIVE_PLACE').val().join(',');

            data_post.FEATURES = $('#OP_FEATURES').val().join(',');

            data_post.REGIONS = $('#OP_REGIONS').val().join(',');


            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_TOUR_INFO';

            data_post.object_name = 'INSERT_TOUR_INFO';

            data_post.objects_decode_url = 'P_TOUR_CONTENT';


            jwm.Alert.ShowAjaxProcessing('#addTour');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/tour/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#addTour');
                    jwm.Alert.ShowMsg('#addTour', resp.TypeMsg, resp.Data.OUTPUT_PARAMS.R_ERROR_MESSAGE, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        grid_manage_travel_tour_paged.renderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#addTour');
                    jwm.Alert.ShowMsg('#addTour', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }



        function UpdateTravelTour() {

            var content = CKEDITOR.instances.TOUR_CONTENT.getData();

            content = encodeURIComponent(content);

            $('#TOUR_CONTENT').val(content);

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------
            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post.DEPARTURE_PLACE = $('#OP_DEPARTURE_PLACE').val().join(',');

            data_post.ARRIVE_PLACE = $('#OP_ARRIVE_PLACE').val().join(',');

            data_post.FEATURES = $('#OP_FEATURES').val().join(',');

            data_post.REGIONS = $('#OP_REGIONS').val().join(',');

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_TOUR_INFO';

            data_post.object_name = 'UPDATE_TOUR_INFO';

            data_post.objects_decode_url = 'P_TOUR_CONTENT';

            jwm.Alert.ShowAjaxProcessing('#addTour');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/tour/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#addTour');
                    jwm.Alert.ShowMsg('#addTour', resp.TypeMsg, resp.Data.OUTPUT_PARAMS.R_ERROR_MESSAGE, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        grid_manage_travel_tour_paged.renderGrid();
                        //goi se di tu trang hien tai
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#addTour');
                    jwm.Alert.ShowMsg('#addTour', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }


        function setLinkSEO() {
            $('#TITLE').keyup(function () {
                var seo = new SEO();
                var title = seo.getTitleSeo($('#TITLE').val());
                $('#TITLE_EN').val(title);
            });
        }

        //goi se khoi tao lai trang tu dau
        var renderGridManageTravelTour = function (conditions) {

            if (conditions) {
                grid_manage_travel_tour_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_travel_tour_paged = new SS.core.GridPaged();

            grid_manage_travel_tour_paged.init(grid_manage_travel_tour_configs);
        }



        var setGridConfigFromQueryString = function () {

            var context = new SS.core.helpers.context();

            var tour_id = context.getQueryString('tour_id');

            var action = context.getQueryString('action');

            var option = action;

            if (action == "view") {
                option = 'searching';
            }

            var conditions = {
            };


            conditions.TOUR_INFO = {};

            //khoi tao bien _configs.args
            _configs.args = {
            };

            if (isEmpty(tour_id) == false) {
                tour_id = tour_id.trim();
                conditions.TOUR_INFO.TOUR_ID = tour_id;
              
                _configs.args.TOUR_ID = tour_id;
            }

            grid_manage_travel_tour_configs.data = {
                package_name: 'PK_BD_TOUR_INFO',
                object_name: 'GET_LIST_TOUR_INFO',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_manage_travel_tour_configs.page_size

            };

            grid_manage_travel_tour_configs.onRenderComplete = function () {

                if (window.location.hash.indexOf('action_complete') >= 0) return;


                if (action == "edit") {


                    $('#addTour').deserializeObjectPackageToFormV2('#tmp_grid', null, 'TOUR_ID', tour_id);

                    $('html, body').animate({
                        scrollTop: $("#addTour").offset().top
                    }, 100);
                }
                window.location.hash = 'action_complete';

            };
        }



        var initControls = function () {


            initGridManageTravelTour();

            setGridConfigFromQueryString();

            if (_configs.args.TOUR_ID > 0) {
                renderGridManageTravelTour();
            }
            else {
                execFilterForm();
            }


            jQuery('#btnAddUpdate').click(function () {
                if (jQuery('#TOUR_ID').val() != "0")
                    return UpdateTravelTour();
                else
                    return AddTravelTour();
            });

            $('#btnNextStep').button('disable');

            $(document).on('click', '#grid a[data-travel-tour-row-idx]', function () {

                var type_id = $(this).attr('data-travel-tour-type-id');

                initInputChosenData(type_id);

                var row_idx = $(this).attr('data-travel-tour-row-idx');

                $('#addTour').deserializeObjectPackageToFormV2('#tmp_grid', row_idx);

            });

            jQuery(document).bind('deserializeObjectPackageToFormV2', function (e) {

                setImageThumb(e.objectForm.IMAGE_THUMB);

                $('html, body').animate({
                    scrollTop: $("#addTour").offset().top
                }, 100);

                if (jQuery('#TOUR_ID').val() != "0") {

                    $('#btnAddUpdate').val('Cập nhật');

                    $('#OP_ARRIVE_PLACE').val(e.objectForm.ARRIVE_PLACE.split(','));
                    $('#OP_ARRIVE_PLACE').trigger("chosen:updated");



                    $('#OP_DEPARTURE_PLACE').val(e.objectForm.DEPARTURE_PLACE.split(','));
                    $('#OP_DEPARTURE_PLACE').trigger("chosen:updated");



                    $('#OP_FEATURES').val(e.objectForm.FEATURES.split(','));
                    $('#OP_FEATURES').trigger("chosen:updated");


                    $('#OP_REGIONS').val(e.objectForm.REGIONS.split(','));
                    $('#OP_REGIONS').trigger("chosen:updated");

                    $('#CHILD_CATEGORY_ID').val(e.objectForm.CHILD_CATEGORY_ID);

                    $('#CHILD_CATEGORY_ID').trigger("chosen:updated");

                    $('#btnNextStep').button('enable');


                }



                initFancyTree();

                CKEDITOR.instances.TOUR_CONTENT.setData(e.objectForm.TOUR_CONTENT);

                $('#CATEGORIES').val(e.objectForm.CATEGORIES);
                // rebindCategories();
            });

            $('#btnNextStep').click(function () {

                var link = '/travelTour/ManageTravelTourDetail?tour_id=' + $("#TOUR_ID").val();
                window.open(link, '_blank');

                return false;

            });


            initFancyTree();

            setLinkSEO();



            initInputChosen();

            //  initInputChosenData();

            initSearchData();

            $('#TYPE_ID', '#searchForm').change(function () {

                initSearchData();

                return false;

            });

            $('#TYPE_ID', '#addTour').change(function () {

                initInputChosenData();

                return false;

            });

            initToolTip();

            initSearchForm();

        }

        var initInputChosen = function () {

            $('#OP_ARRIVE_PLACE').chosen({
                no_results_text: "Không tìm thấy kết quả nào!",
                search_contains: true
            });


            $('#OP_DEPARTURE_PLACE').chosen({
                no_results_text: "Không tìm thấy kết quả nào!",
                search_contains: true
            });


            $('#OP_REGIONS').chosen({
                no_results_text: "Không tìm thấy kết quả nào!",
                search_contains: true
            });


            $('#OP_FEATURES').chosen({
                no_results_text: "Không tìm thấy kết quả nào!",
                search_contains: true
            });

            $('#CHILD_CATEGORY_ID').chosen({
                no_results_text: "Không tìm thấy kết quả nào!",
                search_contains: true,
                allow_single_deselect: true,
                max_selected_options: 1 // chỉ chọn 1 giá trị trong chosen

            });

        }


        var initInputChosenData = function (typeId) {
            var type_id = $('#TYPE_ID', '#addTour').val();

            if (typeId) {
                type_id = typeId;
            }

            getDataForTourFeaturesInput(type_id);

            getDataForTourRegionInput(type_id);

            getDataForArrivalPlaceInput(type_id);

            getDataForDeparturePlaceInput(type_id);

            getDataForTourPriceInput(type_id);

            getDataForCategoryInput();
        }


        var initSearchData = function () {
            var type_id = $('#TYPE_ID', '#searchForm').val();

            initSearchDeparturePlace(type_id);

            initSearchArrivalPlace(type_id);

            initSearchTourFeatures(type_id);

            initSearchTourRegion(type_id);

            initSearchTourPrice(type_id);

            initSearchChildCategoryId();

            initInputChosenData(type_id);
        }


        var initFancyTree = function () {
            prepareParamsFancyTree();
        }

        var prepareParamsFancyTree = function () {
            getDataAjaxFancyTree(prepareDataFancyTree);
        }


        var prepareDataFancyTree = function (treeServerData) {//ham chuan bi du lieu de bind             

            bindDataFancyTree(prepareDataHierarchicalFancyTree(treeServerData));
        }

        var bindDataFancyTree = function (treeData) {//ham de bind du lieu

            $("#categories").fancytree("destroy");
            $("#categories").fancytree({
                checkbox: true,
                selectMode: 2,
                source: treeData,
                select: function (event, data) {
                    var cat_ids = [];
                    var nodes_selected = $("#categories").fancytree("getTree").getSelectedNodes();
                    $.each(nodes_selected, function (index, item) {
                        cat_ids.push(item.key);

                    });

                    var value_categories = cat_ids.join();

                    //ham gan gia tri cua cay, khi click vao checkbox thi gia tri dc gan cho CATEGORIES
                    $('#CATEGORIES').val(value_categories)
                    //var a = $('#CATEGORIES').val();
                    //console.log(a);
                    // console.log(value_categories);
                }
            });
        }

        var prepareDataHierarchicalFancyTree = function (children) {//ham xu ly ket qua dua ve dang mang tu du lieu kieu json
            var fancy_tree_children_data = [];
            var cat_ids = $('#CATEGORIES').val().split(',');

            for (var i = 0; i < children.length; i++) {

                var node = {
                };
                node.data = children[i];
                node.title = children[i].SQ_ID + ' - ' + children[i].TITLE;
                node.key = children[i].SQ_ID;
                node.tooltip = children[i].TITLE;

                if ($.inArray(node.key + '', cat_ids) !== -1) {
                    node.selected = true;
                } else {
                    node.selected = false;
                }

                node.children = [];
                if (children[i].CHILD_CNT > 0) {
                    node.folder = true;
                    node.expanded = true;
                    node.children = prepareDataHierarchicalFancyTree(children[i].CHILDREN);
                }
                fancy_tree_children_data.push(node);
            }
            return fancy_tree_children_data;
        }


        var getDataAjaxFancyTree = function (callback) {


            var conditions = {};

            conditions.CATEGORY = {};

            conditions.CATEGORY.parent_id = '0';

            jwm.Alert.ShowAjaxProcessing("#categories");


            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/tour/get",
                dataType: "json",
                type: 'POST',
                data: {
                    package_name: 'PK_BD_TOUR_CATEGORY',
                    object_name: 'GET_CATEGORY_CHILDS',
                    p_conditions: JSON.stringify(conditions)
                },
                success: function (resp) {

                    jwm.Alert.HideAjaxProcessing("#categories");

                    // jwm.Alert.ShowMsg("#categories", resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {
                        if (callback) {

                            var data_list = {
                            }


                            //#1
                            // truyen du lieu trong muc tim kiem

                            data_list.value = initCursorDataJson(resp.Data.CURSOR_DATA);

                            // data_list.value = initLevelSpace(data_list.value);

                            data_list.value = initLevelTitle(data_list.value);

                            jQuery('#tmp_categories_option').data('data-source', data_list.value);

                            jQuery('#CATEGORY_ID', '#searchForm').empty();

                            jQuery('#tmp_categories_option').tmpl(data_list).appendTo('#CATEGORY_ID', '#searchForm');

                            callback(resp.Data.CURSOR_DATA);

                        }
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.ShowAjaxProcessing("#categories");
                    jwm.Alert.ShowMsg("#categories", -1, message + " " + exc, 'Thông báo');
                }
            });
        }


        var initCursorDataJson = function (list) {
            var data_rows = [];
            if (typeof (list) === 'string') {
                var cursor = eval('(' + list + ')');
                if (cursor.ROWSET) {
                    if (Object.prototype.toString.call(cursor.ROWSET) === '[object Array]') {
                        data_rows = cursor.ROWSET;
                    }
                    else if (cursor.ROWSET.ROW) {
                        data_rows.push(cursor.ROWSET.ROW);
                    }
                }
                else {
                    return null;
                }
            }
            else {
                data_rows = list;
            }
            for (var i = 0; i < data_rows.length; i++) {
                var row = data_rows[i];
                if (row.CHILD_CNT > 0) {
                    row.CHILDREN = initCursorDataJson(row.CHILDREN);
                }
                else {
                    row.CHILDREN = null;
                }
            }
            return data_rows;
        }


        //function rebindCategories() {

        //    data_list = jQuery('#tmp_categories').data('data_source');

        //    data_list.value = initLevelCheckBox(data_list.value);

        //    jQuery('#categories').empty();

        //    jQuery('#tmp_categories').tmpl(data_list).appendTo('#categories');
        //}


        function initLevelCheckBox(list) {
            for (var i = 0; i < list.length; i++) {
                var row = list[i];
                row.HTML_CHECK_BOX = getCheckBox(row.CATEGORY_ID);
                if (row.CHILD_CNT > 0) {
                    row.CHILDREN = initLevelCheckBox(row.CHILDREN);
                }
            }
            return list;
        }

        function getCheckBox(category_id) {
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

        var initLevelTitle = function (treeList, parentTitle) {

            for (var idx = 0; idx < treeList.length; idx++) {

                var note = treeList[idx];

                if (parentTitle != null) {
                    note.LEVEL_TITLE = parentTitle + ' >> ' + note.TITLE;
                }
                else {
                    note.LEVEL_TITLE = note.TITLE;
                }

                if (note.CHILD_CNT > 0) {
                    note.CHILDREN = initLevelTitle(note.CHILDREN, note.TITLE);
                }

            }

            return treeList;
        }


        function initLevelSpace(list) {
            for (var i = 0; i < list.length; i++) {
                var row = list[i];
                row.HTML_LEVEL_SPACE = getHtmlLevelSpace(row.CHILD_LEVEL);
                if (row.CHILD_CNT > 0) {
                    row.CHILDREN = initLevelSpace(row.CHILDREN);
                }
            }
            return list;
        }



        function initLevelNoSpace(list) {
            for (var i = 0; i < list.length; i++) {
                var row = list[i];
                row.HTML_LEVEL_SPACE = getHtmlLevelNoSpace(row.CHILD_LEVEL);
                if (row.CHILD_CNT > 0) {
                    row.CHILDREN = initLevelNoSpace(row.CHILDREN);
                }
            }
            return list;
        }


        function initToolTip() {
            $('input[title]').qtip({
                position: {
                    my: 'left center',
                    at: 'right center'
                },
                show: {
                    event: 'focus'
                },
                hide: {
                    event: 'blur'
                }
            });
        }


        function getHtmlLevelSpace(level) {
            var s = '&nbsp;';
            for (var i = 0; i < level; i++) {
                s += '&nbsp;&nbsp;';
            }
            return s;
        }

        function getHtmlLevelNoSpace(level) {
            var s = '';
            for (var i = 0; i < level; i++) {
                s += '';
            }
            return s;
        }


        var getDataForTourFeaturesInput = function (typeId) {

            var data = {};

            data.op = "PACKAGE_HTTP_POST";

            data.path_ajax_post = '/service03/tour/get';

            data.PACKAGE_NAME = 'PK_BD_TOUR_FEATURE_FILTER';

            data.OBJECT_NAME = 'GET_LIST_TOUR_FEATURE_FILTER';

            data.P_ROW_START = 0;

            data.P_ROW_END = 9999999;

            data.P_CONDITIONS = JSON.stringify({
                FEATURE_FILTER: {
                    TYPE_ID: typeId
                }
            });

            jQuery.ajax({

                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data,
                async: false,
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {

                        $('#OP_FEATURES').empty();

                        $('#tmp_list_tour_features').tmpl(resp.Data.CURSOR_DATA).appendTo("#OP_FEATURES");

                        $('#OP_FEATURES').trigger("chosen:updated");

                    }

                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing("#addTour", true);
                    jwm.Alert.ShowMsg("#addTour", -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }


        var getDataForTourRegionInput = function (typeId) {

            var data = {};

            data.op = "PACKAGE_HTTP_POST";

            data.path_ajax_post = '/service03/tour/get';

            data.PACKAGE_NAME = 'PK_BD_TOUR_REGION_FILTER';

            data.OBJECT_NAME = 'GET_LIST_TOUR_REGION_FILTER';

            data.P_ROW_START = 0;

            data.P_ROW_END = 99999999;


            data.P_CONDITIONS = JSON.stringify({
                REGION_FILTER: {
                    TYPE_ID: typeId
                }
            });
            jQuery.ajax({

                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data,
                async: false,
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {
                        $('#OP_REGIONS').empty();

                        $('#tmp_list_tour_region').tmpl(resp.Data.CURSOR_DATA).appendTo("#OP_REGIONS");

                        $('#OP_REGIONS').trigger("chosen:updated");

                    }

                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing("#addTour", true);
                    jwm.Alert.ShowMsg("#addTour", -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var getDataForArrivalPlaceInput = function (typeId) {

            var data = {};

            data.op = "PACKAGE_HTTP_POST";

            data.path_ajax_post = '/service03/tour/get';

            data.PACKAGE_NAME = 'PK_BD_TOUR_ARRIVAL_PLACES';

            data.OBJECT_NAME = 'GET_LIST_TOUR_ARRIVAL_PLACES';

            data.P_ROW_START = 0;

            data.P_ROW_END = 999999999999;

            data.P_CONDITIONS = JSON.stringify({
                ARRIVE_PLACES: {
                    TYPE_ID: typeId
                }
            });

            jQuery.ajax({

                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data,
                async: false,
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {
                        $('#OP_ARRIVE_PLACE').empty();

                        $('#tmp_list_arrival_place').tmpl(resp.Data.CURSOR_DATA).appendTo("#OP_ARRIVE_PLACE");

                        $('#OP_ARRIVE_PLACE').trigger("chosen:updated");

                    }

                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing("#addTour", true);
                    jwm.Alert.ShowMsg("#addTour", -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var getDataForDeparturePlaceInput = function (typeId) {

            var data = {};

            data.op = "PACKAGE_HTTP_POST";

            data.path_ajax_post = '/service03/tour/get';

            data.PACKAGE_NAME = 'PK_BD_TOUR_DEPT_PLACES';

            data.OBJECT_NAME = 'GET_LIST_TOUR_DEPT_PLACES';

            data.P_ROW_START = 0;

            data.P_ROW_END = 999999999;


            data.P_CONDITIONS = JSON.stringify({
                DEPARTURE_PLACES: {
                    TYPE_ID: typeId
                }
            });

            jQuery.ajax({

                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data,
                async: false,
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {

                        $('#OP_DEPARTURE_PLACE').empty();

                        $('#tmp_list_departure_place').tmpl(resp.Data.CURSOR_DATA).appendTo("#OP_DEPARTURE_PLACE");

                        $('#OP_DEPARTURE_PLACE').trigger("chosen:updated");

                    }

                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing("#addTour", true);
                    jwm.Alert.ShowMsg("#addTour", -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var getDataForTourPriceInput = function (typeId) {

            var data = {};

            data.op = "PACKAGE_HTTP_POST";

            data.path_ajax_post = '/service03/tour/get';

            data.PACKAGE_NAME = 'PK_BD_TOUR_PRICE_FILTER';

            data.OBJECT_NAME = 'GET_LIST_TOUR_PRICE_FILTER';

            data.P_ROW_START = 0;

            data.P_ROW_END = 99999999;


            data.P_CONDITIONS = JSON.stringify({
                TOUR_PRICE_FILTER: {
                    TYPE_ID: typeId
                }
            });
            jQuery.ajax({

                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data,
                async: false,
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {
                        $('#PRICE').empty();

                        jQuery('#PRICE').html('<option value="">-- [ Chọn giá ] --</option>');

                        $('#tmp_list_tour_price').tmpl(resp.Data.CURSOR_DATA).appendTo("#PRICE");


                    }

                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing("#addTour", true);
                    jwm.Alert.ShowMsg("#addTour", -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }



        var getDataForCategoryInput = function () {

            var data = {};

            data.op = "PACKAGE_HTTP_POST";

            data.path_ajax_post = '/service03/tour/get';

            data.PACKAGE_NAME = 'PK_BD_TOUR_CATEGORY';

            data.OBJECT_NAME = 'GET_CATEGORY_CHILDS';

            data.P_ROW_START = 0;

            data.P_ROW_END = 999999999;


            data.P_CONDITIONS = JSON.stringify({
                CATEGORY: {
                    parent_id: '0'
                }
            });


            jQuery.ajax({

                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data,
                async: false,
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {


                        var data_list = {
                        }

                        data_list.value = initCursorDataJson(resp.Data.CURSOR_DATA);

                        data_list.value = initLevelNoSpace(data_list.value);

                        jQuery('#tmp_child_categories_option').data('data-source', data_list.value);

                        jQuery('#CHILD_CATEGORY_ID').empty();

                        jQuery('#tmp_child_categories_option').tmpl(data_list).appendTo('#CHILD_CATEGORY_ID');

                        $('#CHILD_CATEGORY_ID').trigger("chosen:updated");

                    }

                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing("#addTour", true);
                    jwm.Alert.ShowMsg("#addTour", -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

        }



        var initSearchDeparturePlace = function (typeId) {

            var data = {};

            data.op = "PACKAGE_HTTP_POST";

            data.path_ajax_post = '/service03/tour/get';

            data.PACKAGE_NAME = 'PK_BD_TOUR_DEPT_PLACES';

            data.OBJECT_NAME = 'GET_LIST_TOUR_DEPT_PLACES';

            data.P_ROW_START = 0;

            data.P_ROW_END = 999999999;


            data.P_CONDITIONS = JSON.stringify({
                DEPARTURE_PLACES: {
                    TYPE_ID: typeId
                }
            });

            jQuery.ajax({

                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data,
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {


                        $('#OPT_DEPARTURE_PLACE').empty();

                        jQuery('#OPT_DEPARTURE_PLACE').html('<option value="">-- [ Chọn điểm đi ] --</option>');

                        $('#tmp_list_departure_place').tmpl(resp.Data.CURSOR_DATA).appendTo("#OPT_DEPARTURE_PLACE");


                    }

                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing("#searchForm", true);
                    jwm.Alert.ShowMsg("#searchForm", -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var initSearchArrivalPlace = function (typeId) {

            var data = {};

            data.op = "PACKAGE_HTTP_POST";

            data.path_ajax_post = '/service03/tour/get';

            data.PACKAGE_NAME = 'PK_BD_TOUR_ARRIVAL_PLACES';

            data.OBJECT_NAME = 'GET_LIST_TOUR_ARRIVAL_PLACES';

            data.P_ROW_START = 0;

            data.P_ROW_END = 999999999999;

            data.P_CONDITIONS = JSON.stringify({
                ARRIVE_PLACES: {
                    TYPE_ID: typeId
                }
            });

            jQuery.ajax({

                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data,
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {

                        $('#OPT_ARRIVE_PLACE').empty();

                        jQuery('#OPT_ARRIVE_PLACE').html('<option value="">-- [ Chọn điểm đến ] --</option>');

                        $('#tmp_list_arrival_place').tmpl(resp.Data.CURSOR_DATA).appendTo("#OPT_ARRIVE_PLACE");


                    }

                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing("#searchForm", true);
                    jwm.Alert.ShowMsg("#searchForm", -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }


        var initSearchTourFeatures = function (typeId) {

            var data = {};

            data.op = "PACKAGE_HTTP_POST";

            data.path_ajax_post = '/service03/tour/get';

            data.PACKAGE_NAME = 'PK_BD_TOUR_FEATURE_FILTER';

            data.OBJECT_NAME = 'GET_LIST_TOUR_FEATURE_FILTER';

            data.P_ROW_START = 0;

            data.P_ROW_END = 9999999;

            data.P_CONDITIONS = JSON.stringify({
                FEATURE_FILTER: {
                    TYPE_ID: typeId
                }
            });

            jQuery.ajax({

                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data,
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {

                        $('#OPT_FEATURES').empty();

                        jQuery('#OPT_FEATURES').html('<option value="">-- [ Chọn nét đặc trưng ] --</option>');

                        $('#tmp_list_tour_features').tmpl(resp.Data.CURSOR_DATA).appendTo("#OPT_FEATURES");


                    }

                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing("#searchForm", true);
                    jwm.Alert.ShowMsg("#searchForm", -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }


        var initSearchTourRegion = function (typeId) {

            var data = {};

            data.op = "PACKAGE_HTTP_POST";

            data.path_ajax_post = '/service03/tour/get';

            data.PACKAGE_NAME = 'PK_BD_TOUR_REGION_FILTER';

            data.OBJECT_NAME = 'GET_LIST_TOUR_REGION_FILTER';

            data.P_ROW_START = 0;

            data.P_ROW_END = 99999999;


            data.P_CONDITIONS = JSON.stringify({
                REGION_FILTER: {
                    TYPE_ID: typeId
                }
            });
            jQuery.ajax({

                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data,
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {
                        $('#OPT_REGIONS').empty();

                        jQuery('#OPT_REGIONS').html('<option value="">-- [ Chọn vùng miền ] --</option>');

                        $('#tmp_list_tour_region').tmpl(resp.Data.CURSOR_DATA).appendTo("#OPT_REGIONS");

                    }

                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing("#searchForm", true);
                    jwm.Alert.ShowMsg("#searchForm", -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }


        var initSearchTourPrice = function (typeId) {

            var data = {};

            data.op = "PACKAGE_HTTP_POST";

            data.path_ajax_post = '/service03/tour/get';

            data.PACKAGE_NAME = 'PK_BD_TOUR_PRICE_FILTER';

            data.OBJECT_NAME = 'GET_LIST_TOUR_PRICE_FILTER';

            data.P_ROW_START = 0;

            data.P_ROW_END = 99999999;


            data.P_CONDITIONS = JSON.stringify({
                TOUR_PRICE_FILTER: {
                    TYPE_ID: typeId
                }
            });
            jQuery.ajax({

                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data,
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {
                        $('#OPT_PRICE').empty();

                        jQuery('#OPT_PRICE').html('<option value="">-- [ Chọn giá ] --</option>');

                        $('#tmp_list_tour_price').tmpl(resp.Data.CURSOR_DATA).appendTo("#OPT_PRICE");


                    }

                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing("#searchForm", true);
                    jwm.Alert.ShowMsg("#searchForm", -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var initSearchChildCategoryId = function () {

            var conditions = {};

            conditions.CATEGORY = {};

            conditions.CATEGORY.parent_id = '0';

            jwm.Alert.ShowAjaxProcessing("#searchForm");


            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/tour/get",
                dataType: "json",
                type: 'POST',
                data: {
                    package_name: 'PK_BD_TOUR_CATEGORY',
                    object_name: 'GET_CATEGORY_CHILDS',
                    p_conditions: JSON.stringify(conditions)
                },
                success: function (resp) {

                    jwm.Alert.HideAjaxProcessing("#searchForm");



                    if (resp.TypeMsg > 0) {

                        var data_list = {
                        }


                        data_list.value = initCursorDataJson(resp.Data.CURSOR_DATA);

                        // data_list.value = initLevelSpace(data_list.value);

                        data_list.value = initLevelTitle(data_list.value);


                        jQuery('#tmp_categories_option').data('data-source', data_list.value);

                        jQuery('#OPT_CHILD_CATEGORY_ID').empty();

                        jQuery('#tmp_categories_option').tmpl(data_list).appendTo('#OPT_CHILD_CATEGORY_ID');

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.ShowAjaxProcessing("#searchForm");
                    jwm.Alert.ShowMsg("#searchForm", -1, message + " " + exc, 'Thông báo');
                }
            });

        }

        var initSearchForm = function () {
            $('#btnSearch', '#searchForm').click(function () {

                return execFilterForm();

            });

            $('#searchForm').enter(function () {

                return execFilterForm();

            });
        }


        var execFilterForm = function () {

            var conditions = {
            };

            var title_en = $('#txtSearch').val();

            var category_id = $('#CATEGORY_ID', '#searchForm').val();

            var type_id = $('#TYPE_ID', '#searchForm').val();

            var departure_place = $('#OPT_DEPARTURE_PLACE', '#searchForm').val();

            var arrival_place = $('#OPT_ARRIVE_PLACE', '#searchForm').val();

            var features = $('#OPT_FEATURES', '#searchForm').val();

            var regions = $('#OPT_REGIONS', '#searchForm').val();

            var price = $('#OPT_PRICE', '#searchForm').val();


            var child_category_id = $('#OPT_CHILD_CATEGORY_ID', '#searchForm').val();


            conditions.TOUR_INFO = {};
            conditions.CATEGORY_RELATE = {};

            conditions.DEPARTURE_PLACE_RELATE = {};
            conditions.ARRIVAL_PLACE_RELATE = {};
            conditions.FEATURE_RELATE = {};
            conditions.REGION_RELATE = {};

            if (isEmpty(title_en) == false) {
                title_en = title_en.trim();

                conditions.TOUR_INFO.TITLE_EN = title_en;
            }

            if (isEmpty(category_id) == false) {
                category_id = category_id.trim();
                conditions.CATEGORY_RELATE.CATEGORY_ID = category_id;
            }

            if (isEmpty(type_id) == false) {
                type_id = type_id.trim();

                conditions.TOUR_INFO.TYPE_ID = type_id;
            }

            if (isEmpty(departure_place) == false) {
                departure_place = departure_place.trim();

                conditions.DEPARTURE_PLACE_RELATE.DEPARTURE_PLACE_ID = departure_place;
            }

            if (isEmpty(arrival_place) == false) {
                arrival_place = arrival_place.trim();

                conditions.ARRIVAL_PLACE_RELATE.ARRIVAL_PLACE_ID = arrival_place;
            }

            if (isEmpty(features) == false) {
                features = features.trim();

                conditions.FEATURE_RELATE.FEATURE_ID = features;
            }

            if (isEmpty(regions) == false) {
                regions = regions.trim();

                conditions.REGION_RELATE.REGION_ID = regions;
            }

            if (isEmpty(price) == false) {
                price = price.trim();

                conditions.TOUR_INFO.PRICE = price;
            }

            if (isEmpty(child_category_id) == false) {
                child_category_id = child_category_id.trim();

                conditions.TOUR_INFO.CHILD_CATEGORY_ID = child_category_id;
            }


            grid_manage_travel_tour_configs.data = {
                package_name: 'PK_BD_TOUR_INFO',
                object_name: 'GET_LIST_TOUR_INFO',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_manage_travel_tour_configs.page_size
            };


            grid_manage_travel_tour_paged = new SS.core.GridPaged();

            grid_manage_travel_tour_paged.init(grid_manage_travel_tour_configs);

            window.location.hash = "option_seaching";

            return false;
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
