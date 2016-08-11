(function () {

    VA.views.article.ManageTamVuongArticlesLinkSeo = function () {

        var _configs = {
        }

        var form_info = null;

        var initFormInfo = function() {
            form_info = {
                form_id: '#addLinkSeo',
                button_add_update_id: '#btnAddUpdate',
                input_key_id: '#SQ_ID',
                grid_paged: null,
                grid_configs: {
                    tmp_paged_selector: '#tmp_GridPaged',
                    paged_selector: '#grid_paged',
                    tmp_grid_selector: '#tmp_grid',
                    grid_selector: '#grid',
                    ajax_url: _configs.service_wss_tam_vuong_com_url + "/service02/articles/get",
                    is_call_package: true,
                    page_size: 10,
                    P_ROW_START: 0,
                    P_ROW_END: 10,
                    P_CONDITIONS: {}
                },
                RenderGrid: function () {
                    form_info.grid_paged = new SS.core.GridPaged();
                    form_info.grid_paged.init(form_info.grid_configs);
                },
                InitContext: function () {
                    var context = new SS.core.helpers.context();
                    var ref_sq_id = context.getQueryString('ref_sq_id');

                    var conditions = {
                    };

                    conditions.article_link = {
                    };

                    if (isEmpty(ref_sq_id) == false) {
                        conditions.article_link.ref_sq_id = ref_sq_id;
                        $("#REF_SQ_ID").val(ref_sq_id);

                    }

                    var action = context.getQueryString('action');

                    var option = 'edit';

                    form_info.grid_configs.data = {
                        package_name: 'PK_BD_ARTICLE_LINK',
                        object_name: 'GET_LIST_ARTICLE_LINK',
                        p_conditions: JSON.stringify(conditions)
                    };

                    form_info.grid_configs.onRenderComplete = function () {
                        if (window.location.hash.indexOf('action_complete') >= 0) return;
                        if (action == "edit") $('#addLinkSeo').deserializeObjectToForm('#tmp_grid', null,
                                'sq_id', sq_id);
                        window.location.hash = 'action_complete';
                    };
                }
            }
       
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

        function add() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;

            var data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_ARTICLE_LINK';

            data_post.object_name = 'INSERT_ARTICLE_LINK';

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: _configs.service_wss_tam_vuong_com_url + "/service02/articles/call",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0) {
                        form_info.RenderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        function update() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;

            var data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');


            data_post.package_name = 'PK_BD_ARTICLE_LINK';

            data_post.object_name = 'UPDATE_ARTICLE_LINK';

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: _configs.service_wss_tam_vuong_com_url + "/service02/articles/call",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');      
                    if (data.TypeMsg > 0) {
                        form_info.RenderGrid();                      
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
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

        var addPrefixParamToObject = function (objectParams, prefix) {

            var object_return = {
            };
            for (var prop in objectParams) {
                var prop_prefix = prefix + prop;
                object_return[prop_prefix] = objectParams[prop];
            }
            return object_return;
        }

        var initControls = function () {
    
            initFormInfo();

            form_info.InitContext();

            form_info.RenderGrid();

            jQuery(form_info.button_add_update_id).click(function () {
                if (jQuery(form_info.input_key_id).val() != "0") {
                    return update();
                }
                else {
                    return add();
                }
            });

            jQuery(document).bind('deserializeObjectToForm', function (e) {
                if (jQuery(form_info.input_key_id).val() != "0") {
                    $(form_info.button_add_update_id).val('Cập nhật');
                    jQuery(document).trigger('deserializeObjectToFormUpdate');
                }
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