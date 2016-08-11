(function () {

    VA.views.document.ManageDepartmentDocumentArticles = function () {

        var _configs = {
        }


        var initFancyTree = function () {
            prepareParamsFancyTree();
        }

        var prepareParamsFancyTree = function () {
            getDataAjaxFancyTree(prepareDataFancyTree);
        }

        var getDataAjaxFancyTree = function (callback) {


            var conditions = {};

            conditions.parent_id = '0';

            conditions.office_department_id = _configs.OFFICE_DEPARTMENT_ID;

          //  jwm.Alert.ShowAjaxProcessing("#categoriesTree");


            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/document/get",
                dataType: "json",
                type: 'POST',
                data: {
                    package_name: 'PK_BD_ARTICLE_CATEGORY_MANAGE',
                    object_name: 'GET_ARTICLE_CATEGORY_CHILDS',
                    p_conditions: JSON.stringify(conditions)
                },
                success: function (resp) {

                    jwm.Alert.HideAjaxProcessing("#categoriesTree");

                 //   jwm.Alert.ShowMsg("#categoriesTree", resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {
                        if (callback) {

                            var data_list = {
                            }

                            data_list.value = initCursorDataJson(resp.Data.CURSOR_DATA);

                            //data_list.value = initLevelSpace(data_list.value);

                            data_list.value = initLevelTitle(data_list.value);

                            //console.log(data_list.value);

                            jQuery('#tmp_categories_option').data('data-source', data_list.value);

                            jQuery('#SE_CATEGORY_ID').empty();

                            jQuery('#tmp_categories_option').tmpl(data_list).appendTo('#SE_CATEGORY_ID');

                            callback(resp.Data.CURSOR_DATA); //du lieu tu ajax duoc cho vao lam tham so 

                        }
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.ShowAjaxProcessing("#categoriesTree");
                    jwm.Alert.ShowMsg("#categoriesTree", -1, message + " " + exc, 'Thông báo');
                }
            });
        }


        var getDataForCategoryInput = function () {

            var conditions = {};

            conditions.parent_id = '0';

          //  jwm.Alert.ShowAjaxProcessing("#insert_update_articles");


            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/document/get",
                dataType: "json",
                type: 'POST',
                data: {
                    package_name: 'PK_BD_ARTICLE_CATEGORY_MANAGE',
                    object_name: 'GET_ARTICLE_CATEGORY_CHILDS',
                    p_conditions: JSON.stringify(conditions)
                },
                success: function (resp) {

                    jwm.Alert.HideAjaxProcessing("#insert_update_articles");

                  //  jwm.Alert.ShowMsg("#insert_update_articles", resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {


                        var data_list = {
                        }

                        data_list.value = initCursorDataJson(resp.Data.CURSOR_DATA);

                        data_list.value = initLevelTitle(data_list.value);

                        jQuery('#tmp_categories_option_child').data('data-source', data_list.value);

                        jQuery('#CHILD_CATEGORY_IDS').empty();

                        jQuery('#CHILD_CATEGORY_IDS').html('<option value="">-- [ Chọn chuyên mục con] --</option>');

                        jQuery('#tmp_categories_option_child').tmpl(data_list).appendTo('#CHILD_CATEGORY_IDS');




                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.ShowAjaxProcessing("#insert_update_articles");
                    jwm.Alert.ShowMsg("#insert_update_articles", -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        var viewLogInfo = function (sqId, title) {
            var data_post = {
            };

            data_post.sq_id = sqId;
            data_post.title = title;

            jQuery.ajax({
                url: "/Document/ViewLogDocumentArticle",
                dataType: 'html',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    $('#formView').empty();
                    $('#formView').html(data);
                    $('#ViewLogVietairArticle').show();
                    $("html, body").animate({
                        scrollTop: $("#ViewLogVietairArticle").offset().top
                    }, 1000);
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }

        var viewDetailLogInfo = function (sqId) {

            var data_post = {
            };

            data_post.sq_id = sqId;

            jQuery.ajax({
                url: "/Document/ViewLogDocumentArticleDetail",
                dataType: 'html',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    $('#formViewDetail').empty();
                    $('#formViewDetail').html(data);
                    $('#ViewLogVietairArticleDetail').show();

                    getViewArticleDetail(data_post.sq_id);

                    $("html, body").animate({
                        scrollTop: $("#ViewLogVietairArticle").offset().top
                    }, 1000);
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }

        var getViewArticleDetail = function (sq_id) {

            var data_post = {
            };

            data_post.package_name = 'PK_BD_ARTICLE_MANAGE';

            data_post.object_name = 'GET_ARTICLE_AUDIT_LOG';

            data_post.P_AL_SQ_ID = sq_id;

            jQuery.ajax({

                url: _configs.service_wss_vietair_tv_url + "/service03/document/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    if (resp != null && resp.TypeMsg > 0) {

                        var object_source = resp.Data.CURSOR_DATA[0];

                        var object_html = $('#tmpl_view_log_document_article_detail').tmpl(object_source);

                        $('#form_view_log_document_article_detail').html(object_html);

                    }

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id, true);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var initViewLog = function () {

            jQuery(document).on('click', 'a[data-view-sq-id]', function () {
                var sq_id = jQuery(this).attr('data-view-sq-id');

                var title = jQuery(this).attr('data-view-title');
                viewLogInfo(sq_id, title);

                
                return false;
            });
        }

        var initViewLogDetail = function () {

            jQuery(document).on('click', 'a[data-view-detail-sq-id]', function () {
                var sq_id = jQuery(this).attr('data-view-detail-sq-id');
                viewDetailLogInfo(sq_id);

               
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

        var prepareDataFancyTree = function (treeServerData) {//ham chuan bi du lieu de bind             

            bindDataFancyTree(prepareDataHierarchicalFancyTree(treeServerData));
        }

        var bindDataFancyTree = function (treeData) {//ham de bind du lieu

            $("#categoriesTree").fancytree("destroy");
            $("#categoriesTree").fancytree({
                checkbox: true,
                selectMode: 2,
                source: treeData,
                select: function (event, data) {
                    var cat_ids = [];
                    var nodes_selected = $("#categoriesTree").fancytree("getTree").getSelectedNodes();
                    $.each(nodes_selected, function (index, item) {
                        cat_ids.push(item.key);

                    });

                    var value_categories = cat_ids.join();


                    $('#CATEGORIES').val(value_categories)
                }
            });
        }

        var autoSaveCallFormInsertUpdate = function () {

            if (jQuery('#SQ_ID').val() != "0") {
                updateArticle();
            }
            else {
                addArticle();
            }

        }

        var autoSave = function () {

            if (_configs.auto_save_time_out_id) {
                clearTimeout(_configs.auto_save_time_out_id);
                _configs.auto_save_time_out_id = null;
            }

            _configs.auto_save_time_out_id = setTimeout(function () {

                autoSaveCallFormInsertUpdate();


            }, 30 * 1000);

        }

        var initAutoSave = function () {

            $('input, select, textarea').on('change', _configs.form_id, function () {
                autoSave();
                return false;
            });

            for (var i in CKEDITOR.instances) {
                CKEDITOR.instances[i].on('change', function () {

                    autoSave();
                    return false;

                });
            }

        }

        var resetForm = function () {

            $('#comment_container').hide();

        }

        var initComments = function (articleId) {

            $('#comment_container').show();

            var comments = new VA.core.comment();

            var configs = {
                form_id: '#form-comments',
                service_wss_vietair_tv_url: _configs.service_wss_vietair_tv_url,
                mb_id: jLoki.User.Status.GmId,
                full_name: jLoki.User.Status.NickName,
                email: jLoki.User.Status.UserName,
                ref_sq_id: articleId, //id cua bai viet
                type_comment_id: 1 //dang bai viet
            };

            comments.init(configs);
        }

        var addArticle = function () {

            var content = CKEDITOR.instances.ARTICLE_CONTENT.getData();

            content = encodeURIComponent(content);

            $('#ARTICLE_CONTENT').val(content);

            var form_valid = $('#insert_update_articles').validateForm();

            if (form_valid == false) return false;

            var data_post = $('#insert_update_articles').serializeObject();

            data_post = addPrefixParamToObject(data_post, 'p_');

            data_post.package_name = 'PK_BD_ARTICLE_MANAGE';

            data_post.object_name = 'INSERT_ARTICLE';

            data_post.objects_decode_url = 'P_ARTICLE_CONTENT';

            data_post.p_OFFICE_DEPARTMENT_ID = _configs.OFFICE_DEPARTMENT_ID;

            data_post.p_AUTHOR_SOURCE = _configs.AUTHOR_SOURCE;

            jwm.Alert.ShowAjaxProcessing('#insert_update_articles');

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/document/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insert_update_articles');
                    jwm.Alert.ShowMsg('#insert_update_articles', resp.TypeMsg, resp.Data.OUTPUT_PARAMS.R_ERROR_MESSAGE, 'VIETAIR-Thông báo');
                    if (resp.TypeMsg > 0)
                        $('#SQ_ID').val(resp.Data.R_SQ_ID);
                    $('#btnAddUpdate').val('Cập nhật');
                    renderGridVietairArticles();
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insert_update_articles');
                    jwm.Alert.ShowMsg('#insert_update_articles', -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }

        var updateArticle = function () {
            var content = CKEDITOR.instances.ARTICLE_CONTENT.getData();

            content = encodeURIComponent(content);

            $('#ARTICLE_CONTENT').val(content);

            var form_valid = $('#insert_update_articles').validateForm();

            if (form_valid == false) return false;

            var data_post = $('#insert_update_articles').serializeObject();

            data_post = addPrefixParamToObject(data_post, 'p_');

            data_post.package_name = 'PK_BD_ARTICLE_MANAGE';

            data_post.object_name = 'UPDATE_ARTICLE';

            data_post.objects_decode_url = 'P_ARTICLE_CONTENT';

            data_post.p_OFFICE_DEPARTMENT_ID = _configs.OFFICE_DEPARTMENT_ID;

            data_post.p_AUTHOR_SOURCE = _configs.AUTHOR_SOURCE;

            jwm.Alert.ShowAjaxProcessing('#insert_update_articles');

            data_post.p_mb_id = jLoki.User.Status.GmId;

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/document/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insert_update_articles');
                    jwm.Alert.ShowMsg('#insert_update_articles', resp.TypeMsg, resp.Data.OUTPUT_PARAMS.R_ERROR_MESSAGE, 'VIETAIR-Thông báo');
                    if (resp.TypeMsg > 0)
                        renderGridVietairArticles();
                    //viewLogInfo(data_post.p_SQ_ID);

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insert_update_articles');
                    jwm.Alert.ShowMsg('#insert_update_articles', -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }

        var execFilterForm = function () {

            var title = $('#txtSearch', '#filterForm').val();
            var seo = new SEO();
            var title_en = seo.getTitleSeo(title);
            var category_id = $('#SE_CATEGORY_ID', '#filterForm').val();
            var article_content = $('#ARTICLE_CONTENT_SEARCH', '#filterForm').val();
            var status = $('#STATUS_SEARCH', '#filterForm').val();

            var conditions = {};
            conditions.ARTICLE = {};
            conditions.ARTICLE_CATEGORY_RELATE = {};

            conditions.ARTICLE.office_department_id = _configs.OFFICE_DEPARTMENT_ID;




            if (isEmpty(title_en) == false) {
                title_en = title_en.trim();
                conditions.ARTICLE.title_en = title_en;
            }

            if (isEmpty(category_id) == false) {
                category_id = category_id.trim();
                conditions.ARTICLE_CATEGORY_RELATE.category_id = category_id;
            }


            if (isEmpty(article_content) == false) {
                article_content = article_content.trim();
                conditions.ARTICLE.article_content = article_content;
            }

            if (isEmpty(status) == false) {
                status = status.trim();
                conditions.ARTICLE.status = status;
            }

            grid_vietair_articles_configs.data.p_conditions = JSON.stringify(conditions);

            renderGridVietairArticles();

            return false;
        }

        var initFilterForm = function () {

            $('#txtSearch', '#filterForm').enter(function () {
                $('#btnSearch', '#filterForm').click();
            });

            $('#btnSearch', '#filterForm').click(function () {

                return execFilterForm();

            }).next().button({
                text: false,
                icons: {
                    primary: "ui-icon-triangle-1-s"
                }
            }).click(function () {

                var data_state = $(this).attr('data-state');
                if (data_state != 'open') {
                    $('.search-enhance-container', '#filterForm').css('display', '');
                    $(this).attr('data-state', 'open');
                    $(this).button({
                        text: false,
                        icons: {
                            primary: "ui-icon-triangle-1-e"
                        }
                    });
                    $('.search-enhance-container', '#filterForm').prev().css({
                        'border-bottom': '0px solid #DDDDDD'
                    });

                    // initEnhanceFilterForm();

                }
                else {
                    $('.search-enhance-container', '#filterForm').css('display', 'none');
                    $(this).attr('data-state', 'close');
                    $(this).button({
                        text: false,
                        icons: {
                            primary: "ui-icon-triangle-1-s"
                        }
                    });
                    $('.search-enhance-container', '#filterForm').prev().css({
                        'border-bottom': '1px solid #DDDDDD'
                    });
                }

                return false;

            }).parent()
             .buttonset();



        }

        var grid_vietair_articles_configs = null;

        var grid_vietair_articles_paged = null;

        var initGridVietairArticles = function () {

            grid_vietair_articles_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/document/get",
                is_call_package: true,
                page_size: 20,
                row_start: 0,
                row_end: 20
            };

            var conditions = {};


            conditions.ARTICLE = {};

            conditions.ARTICLE.office_department_id = _configs.OFFICE_DEPARTMENT_ID;



            grid_vietair_articles_configs.data = {
                is_show_comment_count: true,
                package_name: 'PK_BD_ARTICLE_MANAGE',
                object_name: 'GET_LIST_ARTICLE',
                p_conditions: JSON.stringify(conditions)
            };

            grid_vietair_articles_configs.onRenderComplete = function () {

                //initGetContentSmsTemplate();

            };

        }

        var renderGridVietairArticles = function () {

            grid_vietair_articles_paged = new SS.core.GridPaged();

            grid_vietair_articles_paged.init(grid_vietair_articles_configs);
        }

        var rebindCategories = function () {

            data_list = jQuery('#tmp_categories').data('data_source');

            data_list.value = initLevelCheckBox(data_list.value);

            jQuery('#categories').empty();

            jQuery('#tmp_categories').tmpl(data_list).appendTo('#categories');
        }

        var initLevelCheckBox = function (list) {
            for (var i = 0; i < list.length; i++) {
                var row = list[i];
                row.HTML_CHECK_BOX = getCheckBox(row.CATEGORY_ID);
                if (row.CHILD_CNT > 0) {
                    row.CHILDREN = initLevelCheckBox(row.CHILDREN);
                }
            }
            return list;
        }

        var getCheckBox = function (category_id) {
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
            $('#TITLE').keyup(function () {
                var seo = new SEO();
                var title = seo.getTitleSeo($('#TITLE').val());
                $('#TITLE_EN').val(title);
            });
        }

        var SEO = function () {

            var _title;

            var getTitleSeo = function (title) {
                _title = title;
                getTitleClean();
                _title = _title.toLowerCase();
                return _title;
            }

            var getTitleClean = function () {
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

            var replaceVietNamUnicodeChar = function (str) {
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

        var initToolTip = function () {
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

          //----------------------------------------------------------
          //xử lý sự kiện scroll
        var initScrollToTop = function () {

            if ($('#scroll-to-top').offset().top > 0) {
                $('#scroll-to-top').show();
            } else {
                $('#scroll-to-top').hide();
            }

            $(window).scroll(function () {

                var offset_scroll = jQuery(window).scrollTop();

                if(offset_scroll > 0) {
                    $('#scroll-to-top').show();
                } else {
                    $('#scroll-to-top').hide();
                }
            });

            $('#scroll-to-top').click(function () {
                $('html, body').animate({
                    scrollTop: 0
                }, 100);
            });
        }

        var initControls = function () {

            initScrollToTop();

            initGridVietairArticles();

            renderGridVietairArticles();

            jQuery('#btnAddUpdate').click(function () {
                if (jQuery('#SQ_ID').val() != "0")
                    return updateArticle();
                else
                    return addArticle();
            });

            jQuery(document).bind('deserializeObjectPackageToFormV2', function (e) {

                setImageThumb(e.objectForm.IMAGE_THUMB);

                $('html, body').animate({
                    scrollTop: $("#update-articles").offset().top
                }, 100);



                if (jQuery('#SQ_ID').val() != "0") {

                    $('#btnAddUpdate').val('Cập nhật');
                }

                CKEDITOR.instances.ARTICLE_CONTENT.setData(e.objectForm.ARTICLE_CONTENT);

                //console.log(e.objectForm);

                $('#CATEGORIES').val(e.objectForm.CATEGORIES);

                $('#link-to-manage-seo').unbind('click');
                $('#link-to-manage-seo').click(function () {

                    var link_manage_seo = '/Article/VietAirArticlesSeoLink?ref_sq_id=' + e.objectForm.SQ_ID;

                    window.open(link_manage_seo, '_blank');

                    return false;

                });

                initFancyTree();

                //initComments(e.objectForm.SQ_ID);


            });

            jQuery(document).bind('deserializeObjectPackageToFormV3', function (e) {

                $('#block-view-document').show();

                $('html, body').animate({
                    scrollTop: $("#view-articles-document").offset().top
                }, 100);


                //console.log(e.objectForm);

       

                $('#article_document').html('');
                $('#tmp_article_document').tmpl(e.objectForm).appendTo("#article_document");

            });

            setLinkSEO();

            initAutoSave();

            initToolTip();

            initFilterForm();

            initFancyTree();

            initViewLog();

            initViewLogDetail();

            // getDataForCategoryInput();
            

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

        var init = function (options) {

            _configs = $.extend({}, _configs, {}, options);

            initControls();

        }

        return ({

            "init": init

        });

    };

}());