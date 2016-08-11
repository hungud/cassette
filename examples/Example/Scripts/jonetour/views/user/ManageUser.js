(function () {

    VA.views.user.ManageUser = function () {
    
        var _configs = {
        };
        

        //-------------------------------------------------------------------------------------------------------
        //Fancy Tree Decentralization Group

        var initDecentralizationGroup = function () {

            _grid_paged.getFilterDataRows(0, 10000000, function (result) {

                if (isEmpty(result)) {
                    jwm.Alert.ShowMsg("#insertUpdateDivDecentralization", -1, "Hệ thống không lấy được dữ liệu", 'Thông báo');
                }

                if (result.TypeMsg > 0) {
                    $('#insertUpdateDivDecentralization').show();
                    initFancyTreeDecentralizationGroup();

                    var list_mb_id_text = "";
                    var list_nk_nm_text = "";
                    var list_full_name_text = "";
                    var list_email_text = "";

                    var ary_mb_id_text = $.map(result.Data.CURSOR_DATA, function (item, index) {
                        return "" + (index + 1) + " - " + item.MB_ID;
                    });

                    list_mb_id_text = ary_mb_id_text.join(', ');

                    var ary_full_name_text = $.map(result.Data.CURSOR_DATA, function (item, index) {
                        return "" + (index + 1) + " - " + item.FULL_NAME;
                    });


                    list_full_name_text = ary_full_name_text.join(', ');

                    var ary_nk_nm_text = $.map(result.Data.CURSOR_DATA, function (item, index) {
                        return "" + (index + 1) + " - " + item.NK_NM;
                    });

                    list_nk_nm_text = ary_nk_nm_text.join(', ');

                    var ary_email_text = $.map(result.Data.CURSOR_DATA, function (item, index) {
                        return "" + (index + 1) + " - " + item.EML;
                    });

                    list_email_text = ary_email_text.join(', ');

                    $('#MB_ID', '#insertUpdateDivDecentralization').val(list_mb_id_text);

                    $('#NK_NM', '#insertUpdateDivDecentralization').val(list_nk_nm_text);

                    $('#FULL_NAME', '#insertUpdateDivDecentralization').val(list_full_name_text);

                    $('#EML', '#insertUpdateDivDecentralization').val(list_email_text);

                    var ary_mb_id = $.map(result.Data, function (item, index) {
                        return item.MB_ID;
                    });

                    $('#insertUpdateDivDecentralization').data('LIST_USERS', result.Data.CURSOR_DATA);
                }

            });
        }

        var initFancyTreeDecentralizationGroup = function () {
            prepareParamsFancyTreeDecentralizationGroup();
        }

        var prepareParamsFancyTreeDecentralizationGroup = function () {
            getDataAjaxFancyTreeDecentralizationGroup(prepareDataFancyTreeDecentralizationGroup);
        }

        var getDataAjaxFancyTreeDecentralizationGroup = function (callback) {
            jwm.Alert.ShowAjaxProcessing("#treeDecentralization");
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/WebPage.asmx/GetListHierarchicalWebPages",
                dataType: "jsonp",
                data: {
                    parent_id: 0
                },
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing("#treeDecentralization");
                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0) {
                        if (callback) {
                            callback(data.Data);//du lieu tu ajax duoc cho vao lam tham so 

                        }
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.ShowAjaxProcessing("#treeDecentralization");
                    jwm.Alert.ShowMsg(form_info.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        var prepareDataHierarchicalFancyTreeDecentralizationGroup = function (children) {//ham xu ly ket qua dua ve dang mang tu du lieu kieu json
            var fancy_tree_children_data = [];
            for (var i = 0; i < children.length; i++) {

                var node = {
                };
                node.title = children[i].SQ_ID + ' - ' + children[i].WEB_NAME;
                node.key = children[i].SQ_ID;
                node.tooltip = children[i].WEB_NAME;
                node.selected = children[i].PERMISSION > 0 ? true : false;
                node.children = [];
                if (children[i].CHILD_CNT > 0) {
                    node.folder = true;
                    node.children = prepareDataHierarchicalFancyTreeDecentralizationGroup(children[i].CHILDREN);
                }
                fancy_tree_children_data.push(node);
            }
            return fancy_tree_children_data;
        }

        var prepareDataFancyTreeDecentralizationGroup = function (treeServerData) {//ham chuan bi du lieu de bind             

            var fancy_tree_root_node = {
            };
            fancy_tree_root_node.title = "Trang quản trị";
            fancy_tree_root_node.key = "0";
            fancy_tree_root_node.tooltip = "Trang quản trị";
            fancy_tree_root_node.folder = true;
            fancy_tree_root_node.children = prepareDataHierarchicalFancyTreeDecentralizationGroup(treeServerData);

            var fancy_tree_children_data = [];
            fancy_tree_children_data.push(fancy_tree_root_node);

            bindDataFancyTreeDecentralizationGroup(fancy_tree_children_data);
        }

        var bindDataFancyTreeDecentralizationGroup = function (treeData) {//ham de bind du lieu


            if (_configs.current_init_fancy_tree_decentralization_group_ready == true) {

                var tree = $("#treeDecentralization").fancytree("getTree");
                tree.reload(treeData).done(function () {

                    if (isEmpty(_configs.current_web_page_id_selected) == false) {
                        tree.activateKey(_configs.current_web_page_id_selected);
                    }

                });
                return;

            }

            $("#treeDecentralization").fancytree("destroy");
            $("#treeDecentralization").fancytree({
                checkbox: true,
                selectMode: 3,
                source: treeData,
                select: function (event, data) {

                    _configs.current_web_page_id_selected = data.node.key;
                    var $input_type_decentralization = $('input[data-type-decentralization]:checked', '#insertUpdateDivDecentralization');
                    var type_decentralization = $input_type_decentralization.attr('data-type-decentralization');
                    if (type_decentralization == 1) {
                        setWebPageUserGroupPermission();
                    }
                    else if (type_decentralization == 2) {
                        unsetWebPageUserGroupPermission();
                    }

                }
            });

            _configs.current_init_fancy_tree_decentralization_group_ready = true;

        }

        var setWebPageUserGroupPermission = function () {

            var list_users = $('#insertUpdateDivDecentralization').data('LIST_USERS');

            $.each(list_users, function (index, item) {
                setWebPageUserItemPermission(item);
            })
        }

        var setWebPageUserItemPermission = function (user) {

            var data_post = {
            };

            data_post.web_page_id = _configs.current_web_page_id_selected;
            data_post.mb_id = user.MB_ID;
            data_post.status = 1;

            data_post = addPrefixParamToObject(data_post, 'P_');
            data_post.op = "HTTP_POST";
            data_post.path_ajax_post = '/WebPage.asmx/SetWebPageUserPermission';
            data_post.key_base_cache_pattern = "WebPages";

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);
            jQuery.ajax({
                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    if (data.TypeMsg > 0) {
                        initFancyTree();
                        jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, "Cập nhật thành công cho " + user.NK_NM, 'VIETAIR-Thông báo');
                    }
                    else {
                        jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(form_info.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });

        }

        var unsetWebPageUserGroupPermission = function () {
            var list_users = $('#insertUpdateDivDecentralization').data('LIST_USERS');

            $.each(list_users, function (index, item) {
                unsetWebPageUserItemPermission(item);
            })

        }

        var unsetWebPageUserItemPermission = function (user) {

            var data_post = {
            };

            data_post.web_page_id = _configs.current_web_page_id_selected;
            data_post.mb_id = user.mb_id;

            data_post = addPrefixParamToObject(data_post, 'P_');
            data_post.op = "HTTP_POST";
            data_post.path_ajax_post = '/WebPage.asmx/UnsetWebPageUserPermission';
            data_post.key_base_cache_pattern = "WebPages";

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);
            jQuery.ajax({
                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, "Cập nhật thành công cho " + user.nk_nm, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0) {
                        initFancyTree();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(form_info.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        //end group user permission
        //-------------------------------------------------------------------------------------------------------

        var initFancyTree = function () {
            prepareParamsFancyTree();
        }

        var prepareParamsFancyTree = function () {
            getDataAjaxFancyTree(prepareDataFancyTree);
        }

        var getDataAjaxFancyTree = function (callback) {
            jwm.Alert.ShowAjaxProcessing("#tree");
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/WebPage.asmx/GetListHierarchicalWebPages",
                dataType: "jsonp",
                data: {
                    parent_id: 0,
                    mb_id: _configs.current_mb_id_selected,
                    site_id: _configs.args.SITE_ID
                },
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing("#tree");
                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0) {
                        if (callback) {
                            callback(data.Data);//du lieu tu ajax duoc cho vao lam tham so 
                        }
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.ShowAjaxProcessing("#tree");
                    jwm.Alert.ShowMsg(form_info.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        var prepareDataHierarchicalFancyTree = function (children) {//ham xu ly ket qua dua ve dang mang tu du lieu kieu json
            var fancy_tree_children_data = [];
            for (var i = 0; i < children.length; i++) {

                var node = {
                };
                node.title = children[i].SQ_ID + ' - ' + children[i].WEB_NAME;
                node.key = children[i].SQ_ID;
                node.tooltip = children[i].WEB_NAME;
                node.selected = children[i].PERMISSION > 0 ? true : false;
                node.children = [];
                if (children[i].CHILD_CNT > 0) {
                    node.folder = true;
                    node.children = prepareDataHierarchicalFancyTree(children[i].CHILDREN);
                }
                fancy_tree_children_data.push(node);
            }
            return fancy_tree_children_data;
        }

        var prepareDataFancyTree = function (treeServerData) {//ham chuan bi du lieu de bind             

            var fancy_tree_root_node = {
            };
            fancy_tree_root_node.title = "Trang quản trị";
            fancy_tree_root_node.key = "0";
            fancy_tree_root_node.tooltip = "Trang quản trị";
            fancy_tree_root_node.folder = true;
            fancy_tree_root_node.children = prepareDataHierarchicalFancyTree(treeServerData);

            var fancy_tree_children_data = [];
            fancy_tree_children_data.push(fancy_tree_root_node);

            bindDataFancyTree(fancy_tree_children_data);
        }

        var bindDataFancyTree = function (treeData) {//ham de bind du lieu


            if (_configs.current_init_fancy_tree_ready == true) {

                var tree = $("#tree").fancytree("getTree");
                tree.reload(treeData).done(function () {

                    if (isEmpty(_configs.current_web_page_id_selected) == false) {
                        tree.activateKey(_configs.current_web_page_id_selected);
                    }

                });
                return;

            }

            $("#tree").fancytree("destroy");
            $("#tree").fancytree({
                checkbox: true,
                selectMode: 3,
                source: treeData,
                select: function (event, data) {

                    _configs.current_web_page_id_selected = data.node.key;
                    if (data.node.selected == true) {
                        setWebPageUserPermission();
                    }
                    else {
                        unsetWebPageUserPermission();
                    }


                }
            });

            _configs.current_init_fancy_tree_ready = true;

        }

        var _grid_paged = null;

        var _grid_paged_config = null;
        
        var initGrid = function () {

            _grid_paged_config = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/user/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };
            var conditions = {
            };

            _grid_paged_config.data = {
                package_name: 'PK_BD_USER_INFORMATION',
                object_name: 'GET_LIST_USER_INFOMATION',
                p_conditions: JSON.stringify(conditions)
            };
        }
       

        var renderGrid = function (conditions) {

            if (conditions) {
                _grid_paged_config.data.p_conditions = JSON.stringify(conditions);
            }

            _grid_paged = new SS.core.GridPaged();

            _grid_paged.init(_grid_paged_config);
        }


        var initFilterForm = function () {

            $('#filterForm').enter(function () {

                return execFilterForm();

            });


            $('#btnSearch', '#filterForm').click(function () {

                return execFilterForm();

            });

        }

        var execFilterForm = function () {

            var conditions = {
            };

            var mb_id = $('#MB_ID', '#filterForm').val();

            var full_name = $('#FULL_NAME', '#filterForm').val();

            var office_department_id = $('#OFFICE_DEPARTMENT_ID', '#filterForm').val();

            var nk_nm = $('#NK_NM', '#filterForm').val();

            var eml = $('#EML', '#filterForm').val();

            var status = $('#USER_STATUS', '#filterForm').val();


            conditions.TWMB001 = {};

            if (isEmpty(mb_id) == false) {

                mb_id = mb_id.trim();

                conditions.TWMB001.MB_ID = mb_id;
            }


            if (isEmpty(full_name) == false) {

                full_name = full_name.trim();

                conditions.TWMB001.FULL_NAME = full_name;
            }


            if (isEmpty(nk_nm) == false) {

                nk_nm = nk_nm.trim();

                conditions.TWMB001.NK_NM = nk_nm;
            }

            if (isEmpty(eml) == false) {

                eml = eml.trim();

                conditions.TWMB001.EML = eml;
            }

            if (isEmpty(office_department_id) == false) {

                office_department_id = office_department_id.trim();

                conditions.TWMB001.OFFICE_DEPARTMENT_ID = office_department_id;
            }


            if (isEmpty(status) == false) {

                status = status.trim();

                conditions.TWMB001.STATUS = status;
            }


            _grid_paged_config.data = {
                package_name: 'PK_BD_USER_INFORMATION',
                object_name: 'GET_LIST_USER_INFOMATION',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: _grid_paged_config.page_size
            };

            _grid_paged.init(_grid_paged_config);

            window.location.hash = "option_seaching";

            return false;
        }

        var getListOfficeDepartments = function () {

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/MembershipExt.asmx/GetListOfficeDepartments",
                dataType: "jsonp",
                data: {
                    rowStart: 0, rowEnd: 1000
                },
                success: function (data) {

                    var data_list = {
                    }

                    data_list.value = data.Data;

                    jQuery('#tmp_ListOfficeDepartments').data('data_source', data_list);

                    jQuery('#tmp_ListOfficeDepartments').tmpl(data_list).appendTo('#filterForm #OFFICE_DEPARTMENT_ID');

                    jQuery('#tmp_ListOfficeDepartments').tmpl(data_list).appendTo('#insertUpdate #OFFICE_DEPARTMENT_ID');

                },
                error: function (http, message, exc) {
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
        }



        var getListOfficePositions = function () {
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/MembershipExt.asmx/GetListOfficePositions",
                dataType: "jsonp",
                data: {
                    rowStart: 0, rowEnd: 1000
                },
                success: function (data) {

                    var data_list = {
                    }

                    data_list.value = data.Data;

                    jQuery('#tmp_GetListOfficePositions').data('data_source', data_list);

                    jQuery('#tmp_GetListOfficePositions').tmpl(data_list).appendTo('#OFFICE_POSITION_ID');
                },
                error: function (http, message, exc) {
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
        }


        function getListUserStatus() {


            var data = {};

            data.op = "PACKAGE_HTTP_POST";

            data.path_ajax_post = '/service03/user/get';

            data.PACKAGE_NAME = 'PK_BD_USER_STATUS';

            data.OBJECT_NAME = 'GET_LIST_USER_STATUS';

            data.P_ROW_START = 0;

            data.P_ROW_END = 999999999;

            data.P_CONDITIONS = JSON.stringify({

            });

            jQuery.ajax({

                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data,
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {


                        $('#USER_STATUS').empty();

                        jQuery('#USER_STATUS').html('<option value="">-- [ Chọn trạng thái] --</option>');

                        $('#tmp_GetListUserStatus').tmpl(resp.Data.CURSOR_DATA).appendTo("#USER_STATUS");


                    }

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#filterForm');
                    jwm.Alert.ShowMsg('#filterForm', -1, message + " " + exc, 'Thông báo');
                }
            });
        }


        var setWebPageUserPermission = function (webPageId) {

            var data_post = {
            };

            data_post.web_page_id = _configs.current_web_page_id_selected;
            data_post.mb_id = _configs.current_mb_id_selected;
            data_post.status = 1;

            data_post = addPrefixParamToObject(data_post, 'P_');
            data_post.op = "HTTP_POST";
            data_post.path_ajax_post = '/WebPage.asmx/SetWebPageUserPermission';
            data_post.key_base_cache_pattern = "WebPages";

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);
            jQuery.ajax({
                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0) {
                        initFancyTree();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(form_info.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        var unsetWebPageUserPermission = function (webPageId) {

            var data_post = {
            };

            data_post.web_page_id = _configs.current_web_page_id_selected;
            data_post.mb_id = _configs.current_mb_id_selected;

            data_post = addPrefixParamToObject(data_post, 'P_');
            data_post.op = "HTTP_POST";
            data_post.path_ajax_post = '/WebPage.asmx/UnsetWebPageUserPermission';
            data_post.key_base_cache_pattern = "WebPages";

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);
            jQuery.ajax({
                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0) {
                        initFancyTree();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(form_info.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        var UpdateUser = function () {

            var data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.op = "HTTP_POST";

            data_post.path_ajax_post = '/MembershipExt.asmx/UpdateTwmb001';
            data_post.key_base_cache_pattern = "WebPages";

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0) {
                        _grid_paged.renderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
        }


        var initViewUserLog = function () {

            jQuery(document).on('click', 'a[data-view-mb-id]', function () {

                var mb_id = $(this).attr('data-view-mb-id');

                var full_name = $(this).attr('data-view-full-name');

                viewUserLog(mb_id, full_name);

                return false;
            });

        }



        var viewUserLog = function (mbId, fullName) {

            var data_post = {
            };

            data_post.mb_id = mbId;

            data_post.full_name = fullName;

            jwm.Alert.ShowAjaxProcessing('#viewUserLog');

            jQuery.ajax({
                url: "/User/ViewUserLog",
                dataType: 'html',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing('#viewUserLog');
                    $('#formView').empty();
                    $('#formView').html(data);

                    $('#viewUserLog').show();

                    $('html, body').animate({
                        scrollTop: $("#viewUserLog").offset().top
                    }, 100);

                   

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#viewUserLog');
                    jwm.Alert.ShowMsg('#viewUserLog', -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }



        var initControls = function () {
          
            initGrid();

            renderGrid();

            initFilterForm();

            getListOfficeDepartments();

            getListOfficePositions();

            getListUserStatus();

            jQuery(document).bind('deserializeObjectToForm', function (e) {
                $('#insertUpdateDiv').css('display', '');
                if (_configs.current_mb_id_selected != e.objectForm.MB_ID) {
                    _configs.current_mb_id_selected = e.objectForm.MB_ID;
                    _configs.current_init_fancy_tree_ready = false;
                    initFancyTree();
                }
            });

            jQuery('#btnAddUpdate').click(function () {
                UpdateUser();
                return false;
            });

            jQuery('#btnDecentralizationGroup').click(function () {
                initDecentralizationGroup();

                $('html, body').animate({
                    scrollTop: $("#insertUpdateDivDecentralization").offset().top
                }, 100);



                return false;
            });

            initViewUserLog();
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