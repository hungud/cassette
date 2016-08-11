(function () {

    VA.views.user.UserInformation = function () {
    
        var _configs = {
        };

        var form_info = null;

        var initFormInfo = function () {
            form_info = {
                form_id: '#insertUpdate',
                button_add_update_id: '#btnAddUpdate',
                input_key_id: '#SQ_ID'

            }
        }          

        var getAccountInformation = function () {
            jwm.Alert.ShowAjaxProcessing(_configs.form_id, true);

            var conditions = {
            };
            conditions.twmb001 = {
            };

            conditions.twmb001.mb_id = jLoki.User.Status.GmId;

            jQuery.ajax({

                url: _configs.service_wss_vietair_tv_url + "/service03/user/get",
                dataType: 'json',
                type: 'POST',
                data: {
                    package_name: 'PK_BD_USERS_ACCOUNT_INFO',
                    object_name: 'GET_ACCOUNT_INFOMATION',
                    P_CONDITIONS: JSON.stringify(conditions)
                },
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id, true);

                    if (data != null && data.TypeMsg > 0) {
                        $('#FULL_NAME').val(data.Data.CURSOR_DATA[0].FULL_NAME);
                        $('#BIRTHDAY').val(data.Data.CURSOR_DATA[0].BIRTHDAY);
                        $('#EMAIL').val(data.Data.CURSOR_DATA[0].EMAIL);
                        $('#DEPARTMENT_ID').val(data.Data.CURSOR_DATA[0].DEPARTMENT_ID);
                        $('#DEPARTMENT_NAME').val(data.Data.CURSOR_DATA[0].DEPARTMENT_NAME);
                        $('#PLACE_OF_BIRTH').val(data.Data.CURSOR_DATA[0].PLACE_OF_BIRTH);
                        $('#ADDRESS').val(data.Data.CURSOR_DATA[0].ADDRESS);
                        $('#INTRODUCE').val(data.Data.CURSOR_DATA[0].INTRODUCE);
                        $('#EMAIL_COMPANY').val(data.Data.CURSOR_DATA[0].EMAIL_COMPANY);
                        $('#MOBILE').val(data.Data.CURSOR_DATA[0].MOBILE);
                        $('input[data-sex="' + data.Data.CURSOR_DATA[0].SEX + '"]').attr('checked', true);
                        $('#REF_WORK_BRANCH_ID').val(data.Data.CURSOR_DATA[0].REF_WORK_BRANCH_ID);
                       
                    }

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id, true);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var add = function () {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;


            var data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.p_mb_id = jLoki.User.Status.GmId;

            data_post.package_name = 'PK_BD_USERS_ACCOUNT_INFO';

            data_post.object_name = 'UPDATE_ACCOUNT_INFOMATION';

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/user/call",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var initBirthDay = function () {

            $("#BIRTHDAY").datepick({
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
                defaultDate: 0,
                yearRange: '1950:2030',
                showAnim: false,
                changeMonth: true,
                changeYear: true,
                beforeShowDay: null,
                selectFirst: true,
                showButtonPanel: true,
                ViewsHeaderVisibility: false,
                duration: 'fast',
                onSelect: null,
                beforeShow: null
            });
        }


        var initControls = function () {

            initFormInfo();
        
            jQuery(form_info.button_add_update_id).click(function () {
                return add();
            });

            initBirthDay();

            getAccountInformation();
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