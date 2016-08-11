(function () {

    VA.views.sms.ManageTicketingSMSBrandNameModuleControl2 = function () {

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

            jwm.Alert.ShowAjaxProcessing('#categories_brand_name');

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/sms/get",
                dataType: "json",
                data: {
                    package_name: 'PK_BD_SMS_TEMPLATE_CATEGORY',
                    object_name: 'GET_SMS_TEM_CATEGORY_CHILDS',
                    p_conditions: JSON.stringify(conditions)
                },
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#categories_brand_name');
                    if (resp.TypeMsg > 0) {
                        if (callback) {

                            var data_list = {
                            }

                            data_list.value = initCursorDataJson(resp.Data.CURSOR_DATA);

                            callback(resp.Data.CURSOR_DATA);//du lieu tu ajax duoc cho vao lam tham so

                        }
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.ShowAjaxProcessing("#categories_brand_name");
                    jwm.Alert.ShowMsg("#categories_brand_name", -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        var prepareDataFancyTree = function (treeServerData) {//ham chuan bi du lieu de bind             

            bindDataFancyTree(prepareDataHierarchicalFancyTree(treeServerData));
        }

        var prepareDataHierarchicalFancyTree = function (children) {//ham xu ly ket qua dua ve dang mang tu du lieu kieu json
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

        var bindDataFancyTree = function (treeData) {//ham de bind du lieu

            $("#categories_brand_name").fancytree("destroy");
            $("#categories_brand_name").fancytree({
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

                    var edit_button = $('<span><a type="button" class="btnEdit">Chọn</a></span>');

                    $(node.span).append(edit_button);

                    $(node.span).attr('data-edit', 'true');

                    edit_button.click(function () {

                        var conditions = {
                        };

                        conditions.sms_template_category_relate = {};

                        conditions.sms_template_category_relate.category_id = node.key;

                        renderGridSmsTemplate(conditions);


                    });


                }
            });
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

        function getHtmlLevelSpace(level) {
            var s = '&nbsp;';
            for (var i = 0; i < level; i++) {
                s += '&nbsp;&nbsp;';
            }
            return s;
        }


        //--------------------------------------------------
        //SMS TEMPLATE

        var grid_sms_template_configs = null;

        var grid_sms_template_paged = null;

        var initGridSmsTemplate = function () {

            grid_sms_template_configs = {
                    tmp_paged_selector: '#tmp_GridPaged_sms_template',
                    paged_selector: '#grid_paged_sms_template',
                    tmp_grid_selector: '#tmp_grid_sms_template',
                    grid_selector: '#grid_sms_template',
                    ajax_url: _configs.service_wss_vietair_tv_url + "/service03/sms/get",
                    is_call_package: true,
                    page_size: 20,
                    row_start: 0,
                    row_end: 20
            };

            var conditions = {
            };

            grid_sms_template_configs.data = {
                package_name: 'PK_BD_SMS_BRANDNAME',
                object_name: 'GET_LIST_TEMPLATE',
                p_conditions: JSON.stringify(conditions)
            };

            grid_sms_template_configs.onRenderComplete = function () {

                initGetContentSmsTemplate();

            };

        }

        var renderGridSmsTemplate = function (conditions) {

            if (conditions) {
                grid_sms_template_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_sms_template_paged = new SS.core.GridPaged();
            grid_sms_template_paged.init(grid_sms_template_configs);
        }

        var initCountTextArea = function () {
            $('#sms_content').keyup(function () {
                var text_length = $('#sms_content').val().length;
                var number_of_msg = Math.ceil(text_length / 160);
                if (number_of_msg == 0) {
                    number_of_msg = 1;
                } 
                $('#count-of-text').text(text_length);
                $('#count-of-number-msg').text(number_of_msg);
            });
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

        var initGetContentSmsTemplate = function () {
            $('a[data-sms-template-sq-id]', '#grid_sms_template').unbind('click');
            $('a[data-sms-template-sq-id]', '#grid_sms_template').bind('click', function () {
              
                var sq_id = $(this).attr('data-sms-template-sq-id');

                var content_template = $.grep($('#tmp_grid_sms_template').data('data-source'), function (element, index) {
                    return element.SQ_ID == sq_id;
                });

                var sms_content = content_template[0].CONTENT;
              
                $('#sms_content').val($('#sms_content').val() + sms_content + ' ');

                var text_length = $('#sms_content').val().length;

                var number_of_msg = Math.ceil(text_length / 160);

                if (number_of_msg == 0) {
                    number_of_msg = 1;
                }
                $('#count-of-text').text(text_length);
                $('#count-of-number-msg').text(number_of_msg);

            });
        }
        //SMS TEMPLATE --> END
        //--------------------------------------------------


        //--------------------------------------------------
        //SMS BRAND NAME SEND LOGS

        var initSendSms = function () {

            $('#gui-sms').click(function () {

                $('#count-of-text').text('0');

                $('#count-of-number-msg').text('1');

                var content_sms = $('#sms_content').val();

                var number_customer = $('#phone-number-customer').val();

                if (!content_sms) {

                    jwm.Alert.ShowMsg('#formView', 0, 'Nội dung không được bỏ trống');
                    
                    return false;

                }


                if (!number_customer) {

                    jwm.Alert.ShowMsg('#formView', 0, 'Số điện thoại không được bỏ trống');

                    return false;

                }


                
                var data_post = {};

                data_post.package_name = 'PK_BD_SMS_BRANDNAME';

                data_post.object_name = 'INSERT_NEO_SMS_LOG';

                data_post.p_USER_PHONE = number_customer;

                data_post.p_CONTENT = content_sms;

                data_post.p_STATUS = 0;

                data_post.p_TYPE_ID = 0;

                data_post.p_MB_ID = jLoki.User.Status.GmId;

                jwm.Alert.ShowAjaxProcessing('#formSms');

                jQuery.ajax({
                    url: _configs.service_wss_vietair_tv_url + "/service03/sms/get",
                    dataType: 'json',
                    type: 'POST',
                    data: data_post,
                    success: function (data) {
                        jwm.Alert.HideAjaxProcessing('#formSms');
                        jwm.Alert.ShowMsg('#formSms', data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');

                        if (data.TypeMsg > 0) {
                            $('#sms_content').val('');
                            $('#phone-number-customer').val('');
                            renderGrid();
                        }
                    },
                    error: function (http, message, exc) {
                        jwm.Alert.HideAjaxProcessing('#formSms');
                        jwm.Alert.ShowMsg('#formSms', -1, message + " " + exc, 'Thông báo');
                    }
                });

                return false;
            })
        }

        var grid_configs = null;

        var grid_paged = null;

        var initGrid = function () {

            var conditions = {};

            grid_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/sms/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10,
                data: {
                    package_name: 'PK_BD_SMS_BRANDNAME',
                    object_name: 'GET_LIST_SMS_LOG',
                    p_conditions: JSON.stringify(conditions),

                }
            }


            grid_configs.onRenderComplete = function () {

                initListNeoSmsLog();

                initViewListNeoLog();
            };
        }


        var initViewListNeoLog = function () {

            $('a[data-view-sq-id]').unbind('click');
            $('a[data-view-sq-id]').click(function () {
                var sq_id = jQuery(this).attr('data-view-sq-id');
                view_neo_sms_log_info(sq_id);

                $('html, body').animate({
                    scrollTop: $("#viewSmsNeoLogActionLog").offset().top
                }, 100);

                return false;
            })
     
        }

        var view_neo_sms_log_info = function (sqId) {
            var data_post = {
            };

            data_post.sq_id = sqId;

            jwm.Alert.ShowAjaxProcessing('#formView');

            jQuery.ajax({
                url: "/Sms/ViewNeoSmsLogActionLog",
                dataType: 'html',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing('#formView');
                    $('#formView').empty();
                    $('#formView').html(data);
                    $('#viewSmsNeoLogActionLog').show();
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#formView');
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }

        var initListNeoSmsLog = function () {
       
            $('button[data-action-status]', '#grid').unbind('click');
            $('button[data-action-status]', '#grid').bind('click', function () {

                var sq_id = $(this).attr('data-sq-id');
                var status = $(this).attr('data-action-status');

                updateListNeoSmsLog(sq_id, status);
            });
        }

        var updateListNeoSmsLog = function (sqId, status) {

            var data_post = {};

            data_post.package_name = 'PK_BD_SMS_BRANDNAME';

            data_post.object_name = 'UPDATE_NEO_SMS_LOG_STATUS';

            data_post.p_STATUS = status;

            data_post.p_SQ_ID = sqId;

            data_post.P_MB_ID = jLoki.User.Status.GmId;

            jwm.Alert.ShowAjaxProcessing('#grid');

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/sms/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing('#grid');
                    jwm.Alert.ShowMsg('#grid', data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');

                    if (data.TypeMsg > 0) {
                        renderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#grid');
                    jwm.Alert.ShowMsg('#grid', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

        }


        var initUpdateListNeoSms = function () {
            $('#update-sms-brand-name-log').unbind('click');
            $('#update-sms-brand-name-log').bind('click', function () {
                renderGrid();
            });
        }

        var renderGrid = function () {
            grid_paged = new SS.core.GridPaged();
            grid_paged.init(grid_configs);

        }
        //SMS BRAND NAME SEND LOGS --> END
        //--------------------------------------------------

        //Search sms log
        //--------------------------------------------------

        var initSearchSmsLog = function () {
            $('#btnSearchSmsLog').unbind('click');
            $('#btnSearchSmsLog').click(function () {
                execFilterForm();
                return false;
            });

            $('#USER_PHONE').enter(function () {
                execFilterForm();
                return false;
            })
        }

        var execFilterForm = function () {

            var user_phone = $('#USER_PHONE').val();

            var from_date = $('#FROM_DATE').val();

            var to_date = $('#TO_DATE').val();

            var status = $('#STATUS').val();


            var conditions = {};

            conditions.NEO_SMS_LOG = {};//NEO_SMS_LOG là tên bảng, sau này dùng motuyp này để tìm kiếm

            if (isEmpty(user_phone) == false) {
                user_phone = user_phone.trim();        
                conditions.NEO_SMS_LOG.USER_PHONE = user_phone;
            }

            if (isEmpty(from_date) == false) {
                from_date = from_date.trim();

                conditions.NEO_SMS_LOG.FROM_DATE = from_date;
            }

            if (isEmpty(to_date) == false) {
                to_date = to_date.trim();

                conditions.NEO_SMS_LOG.TO_DATE = to_date;
            }

            if (isEmpty(status) == false) {
                status = status.trim();

                conditions.NEO_SMS_LOG.STATUS = status;
            }

            //doan nay truyen tham so config
            //-------------------------------------
            grid_configs.data.p_conditions = JSON.stringify(conditions);

            renderGrid();

            return false;

        }

        //-----------------------------------------------------
        var initControls = function () {

            initFancyTree();

            initGridSmsTemplate();

            renderGridSmsTemplate();

            initCountTextArea();

            initToolTip();

            initSendSms();

            initGrid();

            renderGrid();

            initUpdateListNeoSms();

            initSearchSmsLog();

            //initDate
            $('#FROM_DATE').datepick({
                constrainInput: true,
                showWeeks: false,
                showOtherMonths: false,
                showStatus: false,
                numberOfMonths: 2,
                showOn: 'both',
                gotoToday: true,
                buttonImageOnly: true,
                buttonImage: '/content/images/icons/calendar.png',
                dateFormat: 'dd/mm/yy',
                mandatory: true,
                closeAtTop: true,
                alignment: 'bottom',
                //defaultDate: 5,
                showAnim: false,
                changeMonth: false,
                changeYear: false,
                beforeShowDay: null,
                selectFirst: true,
                showButtonPanel: true,
                ViewsHeaderVisibility: false,
                duration: 'fast',
                onSelect: null,
                beforeShow: null
            });

            $('#TO_DATE').datepick({
                constrainInput: true,
                showWeeks: false,
                showOtherMonths: false,
                showStatus: false,
                numberOfMonths: 2,
                showOn: 'both',
                gotoToday: true,
                buttonImageOnly: true,
                buttonImage: '/content/images/icons/calendar.png',
                dateFormat: 'dd/mm/yy',
                mandatory: true,
                closeAtTop: true,
                alignment: 'bottom',
                //defaultDate: 5,
                showAnim: false,
                changeMonth: false,
                changeYear: false,
                beforeShowDay: null,
                selectFirst: true,
                showButtonPanel: true,
                ViewsHeaderVisibility: false,
                duration: 'fast',
                onSelect: null,
                beforeShow: null
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

        var init = function (options) {
            _configs = $.extend({}, _configs, {}, options);

            initControls();         

        }

        return ({

            "init": init

        });

    };

}());