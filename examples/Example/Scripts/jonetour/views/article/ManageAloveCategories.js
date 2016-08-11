﻿(function () {

    VA.views.article.ManageAloveCategories = function () {

        var _configs = {
        }

        var setMask = function () {

            //http://www.decorplanit.com/plugin/    
            $('.money-mask').autoNumeric('init', { aSign: ' VND', pSign: 's' });

            $('.number-mask').autoNumeric('init');

            $('.int-mask').autoNumeric('init', { mDec: 0 });


            $("input[type=submit], input[type=button], input[type=reset], button").button();

            $('.date-mask').mask('00/00/0000');

        }

        var getDataAjaxFancyTree = function (callback) {


            var conditions = {};

            conditions.parent_id = '0';

            jwm.Alert.ShowAjaxProcessing("#categories");


            jQuery.ajax({
                url: _configs.SERVICE_WSS_ALOVE_VN_URL + "/service02/articles/get",
                dataType: "json",
                type: 'POST',
                data: {
                    package_name: 'PK_BD_ARTICLE_CATEGORY',
                    object_name: 'GET_ARTICLE_CATEGORY_CHILDS',
                    p_conditions: JSON.stringify(conditions)
                },
                success: function (resp) {

                    jwm.Alert.HideAjaxProcessing("#categories");

                    jwm.Alert.ShowMsg("#categories", resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {
                        if (callback) {

                            var data_list = {
                            }

                            data_list.value = initCursorDataJson(resp.Data.CURSOR_DATA);

                           // data_list.value = initLevelSpace(data_list.value);

                            data_list.value = initLevelTitle(data_list.value);

                            jQuery('#tmp_categories_option').data('data-source', data_list.value);

                            jQuery('#PARENT_ID').empty();

                            jQuery('#tmp_categories_option').tmpl(data_list).appendTo('#PARENT_ID');

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

        var initFancyTree = function () {
            prepareParamsFancyTree();
        }

        var prepareParamsFancyTree = function () {
            getDataAjaxFancyTree(prepareDataFancyTree);
        }


        var prepareDataHierarchicalFancyTree = function (children) {
            //ham xu ly ket qua dua ve dang mang tu du lieu kieu json
            var fancy_tree_children_data = [];
            for (var i = 0; i < children.length; i++) {

                var node = {
                };
                node.data = children[i];
                node.title = children[i].SQ_ID + ' - ' + children[i].TITLE;
                node.key = children[i].SQ_ID;
                node.tooltip = children[i].TITLE;
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



            $("#categories").fancytree("destroy");
            $("#categories").fancytree({
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

                        $(_configs.form_id).deserializeObjectAtSelfToFormArgJson(node.data);

                    });


                }
            });
        }


        function insertCategory() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;


            var data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_ARTICLE_CATEGORY';

            data_post.object_name = 'INSERT_ARTICLE_CATEGORY';

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ALOVE_VN_URL + "/service02/articles/call",
                dataType: 'json',
                type: 'POST',
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
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        function updateCategory() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;

            var data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_ARTICLE_CATEGORY';

            data_post.object_name = 'UPDATE_ARTICLE_CATEGORY';

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ALOVE_VN_URL + "/service02/articles/call",
                dataType: 'json',
                type: 'POST',
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
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

        }

        var addPrefixParamToObject = function (objectParams, prefix) {

            var object_return = {
            };
            for (var prop in objectParams) {
                var prop_prefix = prefix + prop;
                object_return[prop_prefix] = objectParams[prop];
            }
            return object_return;
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


        var initLevelSpace = function (list) {
            var data_rows = list;
            for (var i = 0; i < data_rows.length; i++) {
                var row = data_rows[i];
                row.HTML_LEVEL_SPACE = getHtmlLevelSpace(row.CHILD_LEVEL);
                if (row.CHILD_CNT > 0) {
                    row.CHILDREN = initLevelSpace(row.CHILDREN);
                }
            }
            return data_rows;
        }

        var getHtmlLevelSpace = function (level) {
            var s = '&nbsp;';
            for (var i = 0; i < level; i++) {
                s += '&nbsp;&nbsp;';
            }
            return s;
        }

        var setLinkSEO = function () {
            $('#TITLE').keyup(function () {
                var seo = new SEO();
                var title = seo.getTitleSeo($('#TITLE').val());
                $('#TITLE_EN').val(title);
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

        function SEO() {

            var _title;

            var getTitleSeo = function (title) {
                _title = title;
                getTitleClean();
                _title = _title.toLowerCase();
                return _title;
            }

            function getTitleClean() {
                _title = $.trim(_title);
                _title = _title.toLowerCase();
                _title = replaceVietNamUnicodeChar(_title);
                _title = _title.replace(/[^a-zA-Z0-9]/g, '-');
                while (_title.indexOf('--') >= 0) {
                    _title = _title.replace(/--/g, '-');
                }
                if (_title.indexOf('-') == 0) {
                    _title = _title.substr(1, _title.length);
                }
                if (_title.lastIndexOf('-') == _title.length - 1) {
                    _title = _title.substr(0, _title.length - 1);
                }
                return _title;
            }

            function replaceVietNamUnicodeChar(str) {
                var from = "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ";
                var to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd";
                for (var i = 0, l = from.length; i < l; i++) {
                    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
                }
                return str;
            }

            return ({

                "getTitleSeo": getTitleSeo

            });

        }

        var initControls = function () {

            initFancyTree();

            jQuery('#btnAddCategory').click(function () {

                if (jQuery('#SQ_ID').val() >= "0")

                    updateCategory();
                else
                    insertCategory();
                $('#btnAddCategory').val('Thêm mới');
                jQuery('#SQ_ID').val('0');
                document.getElementById("addCategory").reset();
                return false;
            });
            jQuery(document).bind('deserializeObjectAtSelfToForm', function () {
                if (jQuery('#SQ_ID').val() != "0")
                    $('#btnAddCategory').val('Cập nhật');
            });

            setLinkSEO();

            setMask();
        }



        var init = function (options) {

            _configs = $.extend({}, _configs, {}, options);

            _configs.SERVICE_WSS_ALOVE_VN_URL = $('#SERVICE_WSS_ROOT_URL').val();

            initControls();

        }

        return ({

            "init": init

        });

    };

}());