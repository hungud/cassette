(function () {

    VA.views.user.ManageWebPage = function () {
    
        var _configs = {
        };


        var initFancyTree = function () {
            prepareParamsFancyTree();
        }

        var prepareParamsFancyTree = function () {
            getDataAjaxFancyTree(prepareDataFancyTree);
        }

        var getDataAjaxFancyTree = function (callback) {

            jwm.Alert.ShowAjaxProcessing('#web_pages');

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/WebPage.asmx/GetListHierarchicalWebPages",
                dataType: "jsonp",
                type: 'POST',
                data: {
                    parent_id: 0,
                    site_id: _configs.args.SITE_ID
                },
                success: function (resp) {

                    jwm.Alert.HideAjaxProcessing("#web_pages");

                    jwm.Alert.ShowMsg("#web_pages", resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        if (callback) {
                            jwm.Alert.HideAjaxProcessing('#web_pages');

                            var data_list = {
                            }

                            data_list.value = resp.Data;

                            data_list.value = initLevelSpace(data_list.value);


                            jQuery('#tmp_web_pages_option').data('data-source', data_list.value);
                            jQuery('#PARENT_ID').empty();
                            jQuery('#tmp_web_pages_option').tmpl(data_list).appendTo('#PARENT_ID');

                            callback(resp.Data); //du lieu tu ajax duoc cho vao lam tham so 

                        }
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#PARENT_ID');
                    jwm.Alert.HideAjaxProcessing('#web_pages');
                    jwm.Alert.ShowMsg('#PARENT_ID', -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        var prepareDataHierarchicalFancyTree = function (children) {
            //ham xu ly ket qua dua ve dang mang tu du lieu kieu json
            var fancy_tree_children_data = [];
            for (var i = 0; i < children.length; i++) {

                var node = {
                };
                node.data = children[i];
                node.title = children[i].SQ_ID + ' - ' + children[i].WEB_NAME;
                node.key = children[i].SQ_ID;
                node.tooltip = children[i].WEB_NAME;
                node.selected = children[i].PERMISSION > 0 ? true : false;
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

        var prepareDataFancyTree = function (treeServerData) {//ham chuan bi du lieu de bind       

            bindDataFancyTree(prepareDataHierarchicalFancyTree(treeServerData));
        }

        var bindDataFancyTree = function (treeData) {//ham de bind du lieu

            $("#web_pages").fancytree("destroy");
            $("#web_pages").fancytree({
                checkbox: false,
                selectMode: 3,
                source: treeData,
                activate: function (event, data) {

                },
                renderNode: function (event, data) {

                    var node = data.node;

                    if ($(node.span).attr('data-edit')) {
                        return;
                    }

                    var edit_button = $('<span><a type="button" class="btnEdit">Sửa</a></span>');

                    $(node.span).append(edit_button);

                    $(node.span).attr('data-edit', 'true');

                    edit_button.click(function () {

                        //console.log(node);

                        $(_configs.form_id).deserializeObjectAtSelfToFormArgJson(node.data);

                    });


                }
            });
        }

        var addWebPages = function () {

            //doan nay dung de validate form, nhap lieu hay chua nhap nhieu
            var form_valid = $(_configs.form_id).validateForm();
            if (form_valid == false) return false;


            var data_post = $(_configs.form_id).serializeObject();
            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.op = "HTTP_POST";
            data_post.path_ajax_post = '/WebPage.asmx/InsertWebPage';
            data_post.key_base_cache_pattern = "WebPages";

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);
            jQuery.ajax({
                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');
                    if (resp.TypeMsg > 0) {
                        //$('#SQ_ID').val(data.Data.SQ_ID);
                        //$('#btnformInsertUpdate').val('Cập nhật');
                        initFancyTree();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var updateWebPages = function () {

            //doan nay dung de validate form, nhap lieu hay chua nhap nhieu
            var form_valid = $(_configs.form_id).validateForm();
            if (form_valid == false) return false;


            var data_post = $(_configs.form_id).serializeObject();
            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.op = "HTTP_POST";
            data_post.path_ajax_post = '/WebPage.asmx/UpdateWebPage';
            data_post.key_base_cache_pattern = "WebPages";

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);
            jQuery.ajax({
                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');
                    if (resp.TypeMsg > 0)
                        initFancyTree();
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var initLevelCheckBox = function (list) {
            for (var i = 0; i < list.length; i++) {
                var row = list[i];
                row.HTML_CHECK_BOX = getCheckBox(row.SQ_ID);
                if (row.CHILD_CNT > 0) {
                    row.CHILDREN = initLevelCheckBox(row.CHILDREN);
                }
            }
            return list;
        }

        var getCheckBox = function (category_id) {
            var checked = '';
            return '<input type="checkbox" value="' + category_id + '" ' + checked + ' onchange="selectCategories()" name="ck_categories" />';
        }

        var initLevelSpace = function (list) {
            for (var i = 0; i < list.length; i++) {
                var row = list[i];
                row.HTML_LEVEL_SPACE = getHtmlLevelSpace(row.CHILD_LEVEL);
                if (row.CHILD_CNT > 0) {
                    row.CHILDREN = initLevelSpace(row.CHILDREN);
                }
            }
            return list;
        }

        var getHtmlLevelSpace = function (level) {
            var s = '&nbsp;';
            for (var i = 0; i < level; i++) {
                s += '&nbsp;&nbsp;';
            }
            return s;
        }

        var setLinkSEO = function () {
            $('#WEB_NAME').keyup(function () {
                var seo = new SEO();
                var title = seo.getTitleSeo($('#WEB_NAME').val());
                $('#WEB_NAME_SEO').val(title);
            });
        }

        var initControls = function () {
          
            initFancyTree();

            //gan su kien click
            jQuery('#btnformInsertUpdate').click(function () {
                if (jQuery('#SQ_ID').val() != "0") {
                    updateWebPages();
                }
                else {
                    addWebPages();
                }
                $('#btnformInsertUpdate').val('Thêm mới');
                jQuery('#SQ_ID').val('0');
                $(_configs.form_id)[0].reset();
                return false;
            });

            //khoi tao event nut sua
            jQuery(document).bind('deserializeObjectAtSelfToForm', function (e) {
                if (jQuery('#SQ_ID').val() != "0")
                    $('#btnformInsertUpdate').val('Cập nhật');
                setImageThumb(e.objectForm.WEB_ICON_PATH);
            });

            setLinkSEO();
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