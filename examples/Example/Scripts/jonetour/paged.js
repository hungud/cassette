(function () {

    SS.core.GridPaged = function () {

        var configs = {
            tmp_paged_selector: '#tmp_GridPaged',
            paged_selector: '',
            tmp_grid_selector: '',
            grid_selector: '',
            ajax_url: '',
            data: {},
            page_size: 10,
            row_start: 0,
            row_end: 10,
            ajax_image_loading: '<img src="/Content/Scripts/jBlockUI/loading-fb.gif" border="0" />',
            result: {},
            grid_sort_control: {
                sort_by: '',
                order_by: ''
            },
            is_call_package: false,
            onRenderComplete: null,
            options: null
        }

        var isEmpty = function (obj) {
            if (typeof obj == 'undefined' || obj === null || obj === '') return true;
            if (typeof obj == 'number' && isNaN(obj)) return true;
            if (obj instanceof Date && isNaN(Number(obj))) return true;
            return false;
        }

        var init = function (options) {

            configs = $.extend({}, configs, {}, options);

            //saving options to update ref from grid
            configs.options = options;

            renderGrid();
        }

        var initSortControl = function (resp) {

            if (
                isEmpty(resp) == false &&
                resp.Data.OUTPUT_PARAMS
                ) {

                configs.grid_sort_control.sort_by = resp.Data.OUTPUT_PARAMS.R_SORT_BY_CONTROL;

                configs.grid_sort_control.order_by = resp.Data.OUTPUT_PARAMS.R_SORT_ORDER_BY_CONTROL;

            }

            var $th_ary_sort = $('th[data-control-sort-by]', configs.grid_selector);

            $th_ary_sort.each(function () {

                $th_sort = $(this);

                var data_control_sort_by = $th_sort.attr('data-control-sort-by');


                //add class default
                $th_sort.addClass('grid-paged-th-order-by');

                //init action
                $th_sort.unbind('click');

                $th_sort.click(function () {

                    initSortControlAction(data_control_sort_by);

                });


            });

            //set default sort
            var $th_sort_default = $('th[data-control-sort-by="' + configs.grid_sort_control.sort_by + '"]');

            if ($th_sort_default) {

                $th_sort_default.removeClass('grid-paged-th-order-by');

                if (configs.grid_sort_control.order_by) {
                    $th_sort_default.attr('data-control-sort-order', configs.grid_sort_control.order_by);
                }

                if (configs.grid_sort_control.order_by) {
                    $th_sort_default.addClass('grid-paged-th-order-by-' + configs.grid_sort_control.order_by.toLowerCase());
                }

            }
        }

        var initSortControlAction = function (sortBy) {

            var $th_ary_sort = $('th[data-control-sort-by]', configs.grid_selector);

            $th_ary_sort.removeClass('grid-paged-th-order-by-asc');

            $th_ary_sort.removeClass('grid-paged-th-order-by-desc');

            $th_ary_sort.addClass('grid-paged-th-order-by');

            $th_sort.removeClass('grid-paged-th-order-by');

            $th_sort = $('th[data-control-sort-by="' + sortBy + '"]');

            var sort_order = $th_sort.attr('data-control-sort-order');

            if (sort_order == 'DESC') {

                sort_order = 'ASC';

                $th_sort.addClass('grid-paged-th-order-by-asc');

                $th_sort.attr('data-control-sort-order', sort_order);

            } else {

                sort_order = 'DESC';

                $th_sort.addClass('grid-paged-th-order-by-desc');

                $th_sort.attr('data-control-sort-order', sort_order);

            }

            configs.grid_sort_control.sort_by = sortBy;

            configs.grid_sort_control.order_by = sort_order;

            renderGrid();
        }

        var getAjaxLoadingHtml = function () {
            return '<div style="text-align:center; width:100%; Height:100%;" >' + configs.ajax_image_loading + '</div>';
        }

        function renderGrid(skipEvent) {

            showAjaxLoading(configs.grid_selector);


            if (configs.is_call_package == false) {

                configs.data.rowStart = configs.row_start;

                configs.data.rowEnd = configs.row_end;

                configs.data.sortByControl = configs.grid_sort_control.sort_by;

                configs.data.sortOrderByControl = configs.grid_sort_control.order_by;

                jQuery.ajax({
                    url: configs.ajax_url,
                    dataType: "jsonp",
                    data: configs.data,
                    success: function (result) {
                        if (result != null) {

                            configs.result = result;

                            renderPaged();

                            var data_list = {};

                            if (result.RowCount)
                                data_list.rowCount = result.RowCount;
                            else
                                data_list.rowCount = result.Data.length;

                            data_list.value = result.Data;

                            jQuery(configs.grid_selector).empty();

                            jQuery(configs.tmp_grid_selector).data('data-source', result.Data);

                            jQuery(configs.tmp_grid_selector).tmpl(data_list).appendTo(configs.grid_selector);

                            initSortControl(result);

                            if (skipEvent) return;

                            if (configs.onRenderComplete != null) {
                                configs.onRenderComplete();
                            }
                        }
                        else {

                            showGridEmpty();

                        }
                    },
                    error: function (http, message, exc) {

                        showGridEmpty();

                    }
                });

            } else {

                configs.data.p_row_start = configs.row_start;

                configs.data.p_row_end = configs.row_end;

                configs.data.p_sort_by_control = configs.grid_sort_control.sort_by;

                configs.data.p_sort_order_by_control = configs.grid_sort_control.order_by;

                jQuery.ajax({
                    url: configs.ajax_url,
                    dataType: "json",
                    type: 'POST',
                    data: configs.data,
                    success: function (resp) {
                        if (resp != null) {

                            var data_list = {};

                            if (resp.Data.OUTPUT_PARAMS.R_ROW_COUNT) {
                                resp.RowCount = resp.Data.OUTPUT_PARAMS.R_ROW_COUNT;
                                data_list.rowCount = resp.Data.OUTPUT_PARAMS.R_ROW_COUNT;
                            }
                            else {
                                resp.RowCount = resp.Data.CURSOR_DATA.length;
                                data_list.rowCount = resp.Data.CURSOR_DATA.length;
                            }

                            configs.result = resp;

                            renderPaged();

                            data_list.OUTPUT_PARAMS = resp.Data.OUTPUT_PARAMS;

                            data_list.value = resp.Data.CURSOR_DATA;

                            jQuery(configs.grid_selector).empty();

                            jQuery(configs.tmp_grid_selector).data('data-source', resp.Data.CURSOR_DATA);

                            jQuery(configs.tmp_grid_selector).tmpl(data_list).appendTo(configs.grid_selector);

                            initSortControl(resp);

                            if (skipEvent) return;

                            if (configs.onRenderComplete != null) {
                                configs.onRenderComplete();
                            }
                        }
                        else {

                            showGridEmpty();

                        }
                    },
                    error: function (http, message, exc) {

                        showGridEmpty();

                    }
                });


            }

        }

        var getFilterDataRows = function (rowStart, rowEnd, callback) {

            configs.data.rowStart = rowStart;

            configs.data.rowEnd = rowEnd;

            jQuery.ajax({
                url: configs.ajax_url,
                dataType: "jsonp",
                data: configs.data,
                success: function (result) {
                    if (callback) callback(result);
                },
                error: function (http, message, exc) {
                    if (callback) callback();
                }
            });
        }

        var showAjaxLoading = function () {
            jQuery(configs.grid_selector).html(getAjaxLoadingHtml());
        }

        var showGridEmpty = function () {

            jQuery(configs.grid_selector).css('display', 'none');

            jQuery(configs.paged_selector).css('display', 'none');

        }

        var renderPaged = function () {
            if (configs.result.RowCount <= configs.page_size) {
                jQuery(configs.paged_selector).css('display', 'none');
                return false;
            }
            else {
                jQuery(configs.paged_selector).css('display', '');
            }
            //register paged
            var paged_config_id = configs.paged_selector.replace('#', '').replace('.', '') + '_PagedConfig';
            if ($(configs.paged_selector).data[paged_config_id] == null) {
                $(configs.paged_selector).data[paged_config_id] = {};
                $(configs.paged_selector).data[paged_config_id]['TotalRecord'] = configs.result.RowCount;
                $(configs.paged_selector).data[paged_config_id]['PageSize'] = configs.page_size;
                $(configs.paged_selector).data[paged_config_id]['CurrentPage'] = 1;
                $(configs.paged_selector).data[paged_config_id]['RowStart'] = configs.row_start;
                $(configs.paged_selector).data[paged_config_id]['RowEnd'] = configs.row_end;
                $(configs.paged_selector).data[paged_config_id]['PageIndexClass'] = 'pagedI_' + paged_config_id;
                $(configs.paged_selector).data[paged_config_id]['PageSizeClass'] = 'pagedS_' + paged_config_id;
                jQuery(configs.paged_selector).css('display', '');
            }
            else {
                $(configs.paged_selector).data[paged_config_id]['TotalRecord'] = configs.result.RowCount;
                $(configs.paged_selector).data[paged_config_id]['CurrentPage'] = GetPageIndex(configs.row_start, $(configs.paged_selector).data[paged_config_id]['PageSize']);
                $(configs.paged_selector).data[paged_config_id]['RowStart'] = configs.row_start;
                $(configs.paged_selector).data[paged_config_id]['RowEnd'] = configs.row_end;
            }
            var page_index_selector = '[' + $(configs.paged_selector).data[paged_config_id]['PageIndexClass'] + ']';
            var page_size_selector = '.' + $(configs.paged_selector).data[paged_config_id]['PageSizeClass'];
            var data_paged = GetPaged($(configs.paged_selector).data[paged_config_id]);
            jQuery(configs.paged_selector).html(data_paged.GetHtml(configs.tmp_paged_selector));
            //********************bind event*******************
            jQuery(page_size_selector).val($(configs.paged_selector).data[paged_config_id]['PageSize']);
            jQuery(page_size_selector).unbind('change');
            jQuery(page_size_selector).bind('change', function () {

                var page_size = jQuery(this).val();

                $(configs.paged_selector).data[paged_config_id]['PageSize'] = page_size;

                var date_paged_sub = GetPaged($(configs.paged_selector).data[paged_config_id]);

                jQuery(configs.paged_selector).html(date_paged_sub.GetHtml(configs.tmp_paged_selector));

                var page_index = 1;
                configs.page_size = page_size;
                configs.row_start = date_paged_sub.StartIndex(page_index);
                configs.row_end = date_paged_sub.UpperIndex(page_index);

                //update for options
                configs.options.page_size = configs.page_size;
                configs.options.row_start = configs.row_start;
                configs.options.row_end = configs.row_end;

                renderGrid();
            });
            jQuery(page_index_selector).unbind('click');
            jQuery(page_index_selector).bind('click', function () {
                var page_index = jQuery(this).attr($(configs.paged_selector).data[paged_config_id]['PageIndexClass']);
                configs.row_start = data_paged.StartIndex(page_index);
                configs.row_end = data_paged.UpperIndex(page_index);
                renderGrid();
            });
        }

        var GetPageIndex = function (StartIndex, PageSize) {
            return parseInt(StartIndex / PageSize) + 1;
        }

        var DataPaged = function (o) {
            this.TotalRecord = o.TotalRecord;
            this.PageSize = o.PageSize;
            this.CurrentPage = o.CurrentPage;
            this.PageCount = function () {
                return parseInt((o.TotalRecord / o.PageSize)) + (o.TotalRecord % o.PageSize > 0 ? 1 : 0);
            };
            this.RowStart = function () {
                return (o.RowStart > o.PageSize ? o.RowStart - 1 : o.RowStart) + 1;
            };
            this.RowCount = function () {
                return o.RowEnd > o.TotalRecord ? o.TotalRecord : o.RowEnd; //(o.RowStart > o.PageSize ? o.RowStart + o.RowEnd - 1 : o.RowStart + o.RowEnd);
            };
            this.StartIndex = function (PageIndex) {
                if (PageIndex == 1)
                    return (PageIndex - 1) * this.PageSize;
                else
                    return (PageIndex - 1) * this.PageSize + 1;
            };
            this.UpperIndex = function (PageIndex) {
                return (PageIndex * this.PageSize);
            };
            this.FirstPage = 1;
            this.LastPage = function () {
                return this.PageCount();
            };
            this.GetHtml = function (tmpPagedSelector) {

                var vHtmlBodyPaged = "";
                var vPageIndex = "";
                //Data
                //FirstPage, PageIndex, LastPage
                var vDataPaged = {
                    CurrentPage: this.CurrentPage,
                    RowStart: this.RowStart(),
                    RowEnd: this.RowCount(),
                    FirstPage: this.FirstPage,
                    LastPage: this.LastPage(),
                    TotalRecord: this.TotalRecord,
                    PageIndexClass: o.PageIndexClass,
                    PageSizeClass: o.PageSizeClass,
                    Pages: []
                };

                var vPageCount = this.PageCount();
                var vIndexNext = 0;
                var vPagePrevLength = 2;
                var vPageNextLength = 5;


                var i = 0;

                if (this.CurrentPage - vPagePrevLength >= vPagePrevLength) {
                    i = this.CurrentPage - vPagePrevLength - 1;
                }

                for (i; i < vPageCount; i++) {
                    if (vIndexNext == 0) {
                        vDataPaged.Pages.push('First');
                        vDataPaged.Pages.push('<');
                    }

                    if (vIndexNext < vPageNextLength)
                        vDataPaged.Pages.push(i + 1);
                    else if (vIndexNext == vPageNextLength && this.CurrentPage + vPageNextLength >= vPageCount) {
                        vDataPaged.Pages.push(i + 1);
                    }
                    else if (vIndexNext == vPageNextLength)
                        vDataPaged.Pages.push('...');

                    if ((i == vPageCount - 1 || i == vPageCount - 2) && this.CurrentPage + vPageNextLength < vPageCount)
                        vDataPaged.Pages.push(i + 1);


                    if (i == vPageCount - 1) {
                        vDataPaged.Pages.push('>');
                        vDataPaged.Pages.push('Last');
                    }

                    vIndexNext++;
                }

                return jQuery(tmpPagedSelector).tmpl(vDataPaged);

            }
        }

        var GetPaged = function (o) {
            var vDataPaged = new DataPaged(o);
            return vDataPaged
        }

        return ({

            "init": init,
            "renderGrid": renderGrid,
            "getFilterDataRows": getFilterDataRows

        });

    };

})();

