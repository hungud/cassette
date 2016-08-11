(function () {

    VA.views.thucpham3s.ManageTp3sProduct = function () {

        var _configs = {
        }

        var grid_manage_tp3s_product_configs = null;

        var grid_manage_tp3s_product_paged = null;

        var initGridManageTp3sProduct = function () {

            grid_manage_tp3s_product_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.SERVICE_WSS_THUC_PHAM_3S_COM_URL + "/service03/tp3s/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10,
              
            };

            var conditions = {

            };

            grid_manage_tp3s_product_configs.data = {
                package_name: 'PK_BD_MANAGE_PRODUCT',
                object_name: 'GET_LIST_MANAGE_PRODUCT',
                p_conditions: JSON.stringify(conditions)
            };
        }


        function AddProduct() {

            var content = CKEDITOR.instances.FULL_DESCRIPTION.getData();

            content = encodeURIComponent(content);

            $('#FULL_DESCRIPTION').val(content);


            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------
            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post.MANUFACTURER_IDS = $('#OP_MANUFACTURER').val().join(',');

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_MANAGE_PRODUCT';

            data_post.object_name = 'INSERT_ROW';

            data_post.objects_decode_url = 'P_FULL_DESCRIPTION';


            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_THUC_PHAM_3S_COM_URL + "/service03/tp3s/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Data.OUTPUT_PARAMS.R_ERROR_MESSAGE, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        grid_manage_tp3s_product_paged.renderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }



        function UpdateProduct() {

            var content = CKEDITOR.instances.FULL_DESCRIPTION.getData();

            content = encodeURIComponent(content);

            $('#FULL_DESCRIPTION').val(content);

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------
            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post.MANUFACTURER_IDS = $('#OP_MANUFACTURER').val().join(',');

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_MANAGE_PRODUCT';

            data_post.object_name = 'UPDATE_ROW';

            data_post.objects_decode_url = 'P_FULL_DESCRIPTION';

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_THUC_PHAM_3S_COM_URL + "/service03/tp3s/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Data.OUTPUT_PARAMS.R_ERROR_MESSAGE, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        grid_manage_tp3s_product_paged.renderGrid();
                        //goi se di tu trang hien tai
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }


      
        //goi se khoi tao lai trang tu dau
        var renderGridManageTp3sProduct = function (conditions) {

            if (conditions) {
                grid_manage_tp3s_product_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_tp3s_product_paged = new SS.core.GridPaged();

            grid_manage_tp3s_product_paged.init(grid_manage_tp3s_product_configs);
        }

        var initControls = function () {


            initGridManageTp3sProduct();

            setGridConfigFromQueryString();

            renderGridManageTp3sProduct();

            jQuery('#btnAddProduct').click(function () {
                if (jQuery('#SQ_ID').val() > "0")
                    return UpdateProduct();
                else
                    return AddProduct();
            });


            $(document).on('click', '#grid a[data-product-row-idx]', function () {

                var row_idx = $(this).attr('data-product-row-idx');

                $('#insertUpdate').deserializeObjectPackageToForm('#tmp_grid', row_idx);

            });

            jQuery(document).bind('deserializeObjectToForm', function (e) {

                $('#box_update_product').show();

                $('html, body').animate({
                    scrollTop: $("#insertUpdate").offset().top
                }, 100);

                if (jQuery('#SQ_ID').val() != "0") {

                    $('#btnAddProduct').val('Cập nhật');

                    $('#OP_MANUFACTURER').val(e.objectForm.MANUFACTURER_IDS.split(','));
                    $('#OP_MANUFACTURER').trigger("chosen:updated");

                    
                    $('#TRADEMARK_IDS').val(e.objectForm.TRADEMARK_IDS);
                    $('#TRADEMARK_IDS').trigger("chosen:updated");

                }

                $('#view_product').html('');
                $('#tmp_update_product').tmpl(e.objectForm).appendTo("#view_product");


                initFancyTree();

                CKEDITOR.instances.FULL_DESCRIPTION.setData(e.objectForm.FULL_DESCRIPTION);

                $('#CATEGORIES').val(e.objectForm.CATEGORIES);
           
            });

            setLinkSEO();

            initFancyTree();

            initInputChosen();

            initInputChosenData();
        
            initToolTip();

            initSearchForm();

            initSearchManufacture();

            initSearchTrademark();

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


            conditions.PRODUCT = {};

            if (isEmpty(sq_id) == false) {
                sq_id = sq_id.trim();
                conditions.PRODUCT.SQ_ID = sq_id;

            }

            grid_manage_tp3s_product_configs.data = {
                package_name: 'PK_BD_MANAGE_PRODUCT',
                object_name: 'GET_LIST_MANAGE_PRODUCT',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_manage_tp3s_product_configs.page_size

            };

            grid_manage_tp3s_product_configs.onRenderComplete = function () {

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


        var initInputChosen = function () {

            $('#OP_MANUFACTURER').chosen({
                no_results_text: "Không tìm thấy kết quả nào!",
                search_contains: true
            });

            $('#TRADEMARK_IDS').chosen({
                no_results_text: "Không tìm thấy kết quả nào!",
                search_contains: true,
                allow_single_deselect: true,
                max_selected_options: 1 // chỉ chọn 1 giá trị trong chosen

            });

        }


        var initInputChosenData = function () {
           
            getDataForManufactureInput();

            getDataForTrademarkInput();
        }



     

        function setLinkSEO() {
            $('#PRODUCT_NAME').keyup(function () {
                var seo = new SEO();
                var title = seo.getTitleSeo($('#PRODUCT_NAME').val());
                $('#PRODUCT_NAME_SEO').val(title);
            });
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
                url: _configs.SERVICE_WSS_THUC_PHAM_3S_COM_URL + "/service03/tp3s/get",
                dataType: "json",
                type: 'POST',
                data: {
                    package_name: 'PK_BD_TP3S_CATEGORY',
                    object_name: 'GET_CATEGORY_CHILDS',
                    p_conditions: JSON.stringify(conditions)
                },
                success: function (resp) {

                    jwm.Alert.HideAjaxProcessing("#categories");

                    if (resp.TypeMsg > 0) {
                        if (callback) {

                            var data_list = {
                            }

                            //#1
                            // truyen du lieu trong muc tim kiem

                            data_list.value = initCursorDataJson(resp.Data.CURSOR_DATA);

                            data_list.value = initLevelTitle(data_list.value);

                            jQuery('#tmp_categories_option').data('data-source', data_list.value);

                            jQuery('#REF_CATEGORY_ID_SEARCH').empty();

                            jQuery('#tmp_categories_option').tmpl(data_list).appendTo('#REF_CATEGORY_ID_SEARCH');

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


        var initSearchManufacture = function () {

            var data_post = {};

            data_post.PACKAGE_NAME = 'PK_BD_MANUFACTURER_PRODUCT';

            data_post.OBJECT_NAME = 'GET_LIST_MANUFACTURER';

            data_post.P_ROW_START = 0;

            data_post.P_ROW_END = 999999999;

            data_post.P_CONDITIONS = JSON.stringify({

            });


            jQuery.ajax({

                url: _configs.SERVICE_WSS_THUC_PHAM_3S_COM_URL + "/service03/tp3s/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                async: false,
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {

                        $('#MANUFACTURER_ID_SEARCH').empty();

                        jQuery('#MANUFACTURER_ID_SEARCH').html('<option value="">-- [ Chọn nhà cung cấp ] --</option>');

                        $('#tmp_list_manufacturer').tmpl(resp.Data.CURSOR_DATA).appendTo("#MANUFACTURER_ID_SEARCH");

                    }

                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing("#filterForm", true);
                    jwm.Alert.ShowMsg("#filterForm", -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

        }

        

        var getDataForTrademarkInput = function () {

            var data_post = {};

            data_post.PACKAGE_NAME = 'PK_BD_TRADEMARK_PRODUCT';

            data_post.OBJECT_NAME = 'GET_LIST_TRADEMARK';

            data_post.P_ROW_START = 0;

            data_post.P_ROW_END = 999999999;

            data_post.P_CONDITIONS = JSON.stringify({

            });


            jQuery.ajax({

                url: _configs.SERVICE_WSS_THUC_PHAM_3S_COM_URL + "/service03/tp3s/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                async: false,
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {

                        $('#TRADEMARK_IDS').empty();

                        $('#tmp_list_trademark').tmpl(resp.Data.CURSOR_DATA).appendTo("#TRADEMARK_IDS");

                        $('#TRADEMARK_IDS').trigger("chosen:updated");

                    }

                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing("#insertUpdate", true);
                    jwm.Alert.ShowMsg("#insertUpdate", -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

        }

        var initSearchTrademark = function () {

            var data_post = {};

            data_post.PACKAGE_NAME = 'PK_BD_TRADEMARK_PRODUCT';

            data_post.OBJECT_NAME = 'GET_LIST_TRADEMARK';

            data_post.P_ROW_START = 0;

            data_post.P_ROW_END = 999999999;

            data_post.P_CONDITIONS = JSON.stringify({

            });


            jQuery.ajax({

                url: _configs.SERVICE_WSS_THUC_PHAM_3S_COM_URL + "/service03/tp3s/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                async: false,
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {

                        $('#TRADEMARK_SEARCH').empty();

                        jQuery('#TRADEMARK_SEARCH').html('<option value="">-- [ Chọn thương hiệu ] --</option>');

                        $('#tmp_list_trademark').tmpl(resp.Data.CURSOR_DATA).appendTo("#TRADEMARK_SEARCH");

                    }

                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing("#filterForm", true);
                    jwm.Alert.ShowMsg("#filterForm", -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

        }


        var getDataForManufactureInput = function () {

            var data_post = {};

            data_post.PACKAGE_NAME = 'PK_BD_MANUFACTURER_PRODUCT';

            data_post.OBJECT_NAME = 'GET_LIST_MANUFACTURER';

            data_post.P_ROW_START = 0;

            data_post.P_ROW_END = 999999999;

            data_post.P_CONDITIONS = JSON.stringify({

            });


            jQuery.ajax({

                url: _configs.SERVICE_WSS_THUC_PHAM_3S_COM_URL + "/service03/tp3s/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                async: false,
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {

                        $('#OP_MANUFACTURER').empty();

                        $('#tmp_list_manufacturer').tmpl(resp.Data.CURSOR_DATA).appendTo("#OP_MANUFACTURER");

                        $('#OP_MANUFACTURER').trigger("chosen:updated");

                    }

                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing("#insertUpdate", true);
                    jwm.Alert.ShowMsg("#insertUpdate", -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

        }

        var initSearchForm = function () {
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

            var product_name = $('#PRODUCT_NAME_SEARCH').val();

            var category_id = $('#REF_CATEGORY_ID_SEARCH').val();

            var manufacturer = $('#MANUFACTURER_ID_SEARCH').val();

            var trademark_name = $('#TRADEMARK_SEARCH').val();

           

            conditions.PRODUCT = {};

            conditions.PRODUCT_CATEGORY_RELATE = {};

            conditions.MANUFACTURER_RELATE = {};
          
            if (isEmpty(product_name) == false) {
                product_name = product_name.trim();

                conditions.PRODUCT.PRODUCT_NAME = product_name;
            }

            if (isEmpty(category_id) == false) {
                category_id = category_id.trim();
                conditions.PRODUCT_CATEGORY_RELATE.REF_CATEGORY_ID = category_id;
            }

            if (isEmpty(manufacturer) == false) {
                manufacturer = manufacturer.trim();

                conditions.MANUFACTURER_RELATE.MANUFACTURER_ID = manufacturer;
            }

            if (isEmpty(trademark_name) == false) {
                trademark_name = trademark_name.trim();

                conditions.PRODUCT.TRADEMARK = trademark_name;
            }

            grid_manage_tp3s_product_configs.data = {
                package_name: 'PK_BD_MANAGE_PRODUCT',
                object_name: 'GET_LIST_MANAGE_PRODUCT',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_manage_tp3s_product_configs.page_size
            };


            grid_manage_tp3s_product_paged = new SS.core.GridPaged();

            grid_manage_tp3s_product_paged.init(grid_manage_tp3s_product_configs);

            window.location.hash = "option_seaching";

            return false;
        }

        var init = function (options) {

            _configs = $.extend({}, _configs, {}, options);

            _configs.SERVICE_WSS_THUC_PHAM_3S_COM_URL = $('#SERVICE_WSS_ROOT_URL').val();

            initControls();


        }

        return ({

            "init": init

        });

    };

}());
