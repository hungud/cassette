/*
* Namespace set up
*/
if (typeof SS == "undefined") {
    var SS = {};
}

SS.namespace = function () {
    var a = arguments, o = null, i, j, d;
    for (i = 0; i < a.length; i = i + 1) {
        d = a[i].split(".");
        o = window;
        for (j = 0; j < d.length; j = j + 1) {
            o[d[j]] = o[d[j]] || {};
            o = o[d[j]];
        }
    }
    return o;
};

SS.namespace("SS.controllers");
SS.namespace("SS.entities");
SS.namespace("SS.core");
SS.namespace("SS.core.helpers");
SS.namespace("SS.mappers");
SS.namespace("SS.models");
SS.namespace("SS.services");
SS.namespace("SS.services.polling");
SS.namespace("SS.views");

/*
 * Namespace set up
 */
if (typeof VA == "undefined") {
    var VA = {};
}

VA.namespace = function () {
    var a = arguments, o = null, i, j, d;
    for (i = 0; i < a.length; i = i + 1) {
        d = a[i].split(".");
        o = window;
        for (j = 0; j < d.length; j = j + 1) {
            o[d[j]] = o[d[j]] || {};
            o = o[d[j]];
        }
    }
    return o;
};

VA.namespace("VA.controllers");
VA.namespace("VA.entities");
VA.namespace("VA.core");
VA.namespace("VA.core.helpers");
VA.namespace("VA.mappers");
VA.namespace("VA.models");
VA.namespace("VA.services");
VA.namespace("VA.services.polling");
VA.namespace("VA.views");

$(window).resize(function () {
    var viewportWidth = $(window).width();
    var viewportHeight = $(window).height();
    $(document).trigger({
        type: 'window_resize',
        width: viewportWidth,
        height: viewportHeight
    });
});

String.prototype.format = function () {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

var isEmpty = function (obj) {
    if (typeof obj == 'undefined' || obj === null || obj === '') return true;
    if (typeof obj == 'number' && isNaN(obj)) return true;
    if (obj instanceof Date && isNaN(Number(obj))) return true;
    return false;
}


$.fn.deserializeObjectToForm = function (tmpId, idx, keyName, keyValue) {

    var form_id = '#' + $(this).attr("id");
    var a = this.serializeArray();
    var data = jQuery(tmpId).data('data-source');
    var json = {};
    if (isEmpty(idx) == false) {
        json = data[idx];
    }
    else if (isEmpty(keyName) == false && isEmpty(keyValue) == false) {
        for (var i = 0; i < data.length; i++) {
            if (data[i][keyName] == keyValue) {
                json = data[i];
                break;
            }
        }
    }

    $.each(a, function (index, item) {
        var $control = $('#' + this.name, form_id);
        var func_format = $control.attr('data-func-format');
        if (isEmpty(func_format)) {
            if ($control.hasClass('money-mask')) {
                $control.autoNumeric('set', parseFloat(json[this.name.toLowerCase()]));
                $control.focus();
            }
            $control.val(json[this.name.toLowerCase()]);
        }
        else {

            if (func_format == "jsonForm") {

                //var formHtml = "<div id=" + this.name + "></div>";
                //$('#' + this.name).replaceWith(formHtml);
                //var jsonForm = json[this.name.toLowerCase()];
                //console.log(jsonForm);
                //for (var prop in jsonForm) {
                //    $('#' + this.name).append('<input id="'+ prop +'" type="text" value="2" />');
                //}

            }
            else {
                var value = json[this.name.toLowerCase()];
                var func = func_format.format(value);
                value = eval('(' + func + ')');
                $control.val(value);
            }
        }
        if (index == a.length - 1) {
            $('#' + a[0].name, form_id).focus();
        }
    });
    $(document).trigger({
        type: 'deserializeObjectToForm',
        objectForm: json
    });
};

$.fn.deserializeObjectPackageToForm = function (tmpId, idx, keyName, keyValue) {

    var form_id = '#' + $(this).attr("id");
    var a = this.serializeArray();
    var data = jQuery(tmpId).data('data-source');
    var json = {};
    if (isEmpty(idx) == false) {
        json = data[idx];
    }
    else if (isEmpty(keyName) == false && isEmpty(keyValue) == false) {
        for (var i = 0; i < data.length; i++) {
            if (data[i][keyName] == keyValue) {
                json = data[i];
                break;
            }
        }
    }

    $.each(a, function (index, item) {
        var $control = $('#' + this.name, form_id);
        var func_format = $control.attr('data-func-format');
        if (isEmpty(func_format)) {
            if ($control.hasClass('money-mask')) {
                $control.autoNumeric('set', parseFloat(json[this.name.toUpperCase()]));
                $control.focus();
            }
            $control.val(json[this.name.toUpperCase()]);
        }
        else {

            if (func_format == "jsonForm") {

                //var formHtml = "<div id=" + this.name + "></div>";
                //$('#' + this.name).replaceWith(formHtml);
                //var jsonForm = json[this.name.toLowerCase()];
                //console.log(jsonForm);
                //for (var prop in jsonForm) {
                //    $('#' + this.name).append('<input id="'+ prop +'" type="text" value="2" />');
                //}

            }
            else {
                var value = json[this.name.toUpperCase()];
                var func = func_format.format(value);
                value = eval('(' + func + ')');
                $control.val(value);
            }
        }
        if (index == a.length - 1) {
            $('#' + a[0].name, form_id).focus();
        }
    });
    $(document).trigger({
        type: 'deserializeObjectToForm',
        objectForm: json
    });
};

$.fn.deserializeObjectPackageToFormV2 = function (tmpId, idx, keyName, keyValue, callbackBeforeSetInput) {

    var form_id = '#' + $(this).attr("id");
    var a = this.serializeArray();
    var data = jQuery(tmpId).data('data-source');
    var json = {};
    if (isEmpty(idx) == false) {
        json = data[idx];
    }
    else if (isEmpty(keyName) == false && isEmpty(keyValue) == false) {
        for (var i = 0; i < data.length; i++) {
            if (data[i][keyName] == keyValue) {
                json = data[i];
                break;
            }
        }
    }

    if (callbackBeforeSetInput) {
        callbackBeforeSetInput(json);
    }

    $.each(a, function (index, item) {
        var $control = $('#' + this.name, form_id);
        var func_format = $control.attr('data-func-format');
        if (isEmpty(func_format)) {
            if ($control.hasClass('money-mask')) {
                $control.autoNumeric('set', parseFloat(json[this.name.toUpperCase()]));
                $control.focus();
            }
            $control.val(json[this.name.toUpperCase()]);
        }
        else {

            if (func_format == "jsonForm") {

                //var formHtml = "<div id=" + this.name + "></div>";
                //$('#' + this.name).replaceWith(formHtml);
                //var jsonForm = json[this.name.toLowerCase()];
                //console.log(jsonForm);
                //for (var prop in jsonForm) {
                //    $('#' + this.name).append('<input id="'+ prop +'" type="text" value="2" />');
                //}

            }
            else {
                var value = json[this.name.toUpperCase()];
                var func = func_format.format(value);
                value = eval('(' + func + ')');
                $control.val(value);
            }
        }
        if (index == a.length - 1) {
            $('#' + a[0].name, form_id).focus();
        }
    });


    $(document).trigger({
        type: 'deserializeObjectPackageToFormV2',
        objectForm: json
    });

};

$.fn.deserializeObjectPackageToFormV3 = function (tmpId, idx, keyName, keyValue, callbackBeforeSetInput) {

    var form_id = '#' + $(this).attr("id");
    var a = this.serializeArray();
    var data = jQuery(tmpId).data('data-source');
    var json = {};
    if (isEmpty(idx) == false) {
        json = data[idx];
    }
    else if (isEmpty(keyName) == false && isEmpty(keyValue) == false) {
        for (var i = 0; i < data.length; i++) {
            if (data[i][keyName] == keyValue) {
                json = data[i];
                break;
            }
        }
    }

    if (callbackBeforeSetInput) {
        callbackBeforeSetInput(json);
    }

    $.each(a, function (index, item) {
        var $control = $('#' + this.name, form_id);
        var func_format = $control.attr('data-func-format');
        if (isEmpty(func_format)) {
            if ($control.hasClass('money-mask')) {
                $control.autoNumeric('set', parseFloat(json[this.name.toUpperCase()]));
                $control.focus();
            }
            $control.val(json[this.name.toUpperCase()]);
        }
        else {

            if (func_format == "jsonForm") {

                //var formHtml = "<div id=" + this.name + "></div>";
                //$('#' + this.name).replaceWith(formHtml);
                //var jsonForm = json[this.name.toLowerCase()];
                //console.log(jsonForm);
                //for (var prop in jsonForm) {
                //    $('#' + this.name).append('<input id="'+ prop +'" type="text" value="2" />');
                //}

            }
            else {
                var value = json[this.name.toUpperCase()];
                var func = func_format.format(value);
                value = eval('(' + func + ')');
                $control.val(value);
            }
        }
        if (index == a.length - 1) {
            $('#' + a[0].name, form_id).focus();
        }
    });


    $(document).trigger({
        type: 'deserializeObjectPackageToFormV3',
        objectForm: json
    });

};

$.fn.deserializeObjectToFormView = function (options) {

    var configs = {
        tmpId: null,
        idx: null,
        keyName: null,
        keyValue: null
    };

    configs = $.extend({}, configs, options);

    var tmpId = configs.tmpId;
    var idx = configs.idx;
    var keyName = configs.keyName;
    var keyValue = configs.keyValue;

    var data = jQuery(tmpId).data('data-source');

    var json = {};
    if (isEmpty(idx) == false) {
        json = data[idx];
    }
    else if (isEmpty(keyName) == false && isEmpty(keyValue) == false) {
        for (var i = 0; i < data.length; i++) {
            if (data[i][keyName] == keyValue) {
                json = data[i];
                break;
            }
        }
    }

    $(document).trigger({
        type: 'deserializeObjectToFormView',
        objectForm: json,
        formId: '#' + this.attr('id')
    });
};

$.fn.deserializeObjectAtSelfToForm = function (id) {
    var a = this.serializeArray();
    var jsonString = jQuery(id).attr('data-json');
    var json = eval('(' + jsonString + ')');
    $.each(a, function () {
        $('#' + this.name).val(json[this.name]);
    });
    $(document).trigger({
        type: 'deserializeObjectAtSelfToForm',
        objectForm: json
    });
};

$.fn.deserializeObjectAtSelfToFormArgJson = function (json) {
    var a = this.serializeArray();
    $.each(a, function () {
        $('#' + this.name).val(json[this.name]);
    });
    $(document).trigger({
        type: 'deserializeObjectAtSelfToForm',
        objectForm: json
    });
};

$.fn.validateForm = function () {
    var isEmpty = function (obj) {
        if (typeof obj == 'undefined' || obj === null || obj === '') return true;
        if (typeof obj == 'number' && isNaN(obj)) return true;
        if (obj instanceof Date && isNaN(Number(obj))) return true;
        return false;
    }
    var o = {};
    var a = this.serializeArray();
    for (var i = 0; i < a.length; i++) {
        var input = $('#' + a[i].name, this);
        if (input.attr('id') == a[i].name &&
            isEmpty(input.val())) {
            var parent_div = input.parents('#div_' + a[i].name, this);
            var display = parent_div.css('display');
            var data_require = input.attr('data-require');
            if (display != 'none'
                && data_require) {
                jwm.Alert.ShowMsg(input.attr('id'), 0, data_require, 'VIETAIR-Thông báo');
                input.keydown(function () {
                    input.css('background-color', 'transparent');
                });
                input.css('background-color', '#FFFF7A');
                input.focus();
                return false;
            }
        }
    }
    return o;
};

$.postJSON = function (url, data, func) { $.post(url + (url.indexOf("?") == -1 ? "?" : "&") + "callback=?", data, func, "json"); }

function popup(url, pwidth, pheight) {
    var width = pwidth;
    var height = pheight;
    var left = (screen.width - width) / 2;
    var top = (screen.height - height) / 2;
    var params = 'width=' + width + ', height=' + height;
    params += ', top=' + top + ', left=' + left;
    params += ', directories=no';
    params += ', location=no';
    params += ', menubar=no';
    params += ', resizable=no';
    params += ', scrollbars=no';
    params += ', status=no';
    params += ', toolbar=no';
    newwin = window.open(url, 'windowname', params);
    if (window.focus) { newwin.focus() }
    return false;
}

function ajax_download(url, data) {
    var $iframe,
        iframe_doc,
        iframe_html;

    if (($iframe = $('#download_iframe')).length === 0) {
        $iframe = $("<iframe id='download_iframe'" +
                    " style='display: none' src='about:blank'></iframe>"
                   ).appendTo("body");
    }

    iframe_doc = $iframe[0].contentWindow || $iframe[0].contentDocument;
    if (iframe_doc.document) {
        iframe_doc = iframe_doc.document;
    }

    iframe_html = "<html><head></head><body><form method='POST' action='" +
                  url + "'>"

    Object.keys(data).forEach(function (key) {
        iframe_html += '<input type="hidden" name="' + key + '">';
    });

    iframe_html += "</form></body></html>";

    iframe_doc.open();
    iframe_doc.write(iframe_html);
    var $form = $(iframe_doc).find('form');

    Object.keys(data).forEach(function (key) {
        $('input[name="' + key + '"]', $form).val(data[key]);
    });

    $form.submit();
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