(function () {

    SS.core.vietair = function () {

        var _configs = {
            form_id: '',
            page_name: 'template',
            service_wss_vietair_tv_url: null,
            service_wss_galileo_vietair_tv_url: null,
            site_id: 1,
            messengerHub: null,
            messengerHubGroupIds: {
                NOTICE_NEW_BOOKING: 1,
                NOTICE_CHANGE_BOOKING_STATUS: 2,
                NOTICE_NEW_BOOKING_TRAVEL_TOUR: 3,
                NOTICE_CHANGE_BOOKING_STATUS_TRAVEL_TOUR: 4,
                NOTICE_NEW_BOOKING_INTERNATIONAL: 5,
                NOTICE_CHANGE_BOOKING_INTERNATIONAL_STATUS: 6,
                NOTICE_CHANGE_ACCOUNTING_PAYMENT_MESSAGE_STATUS: 7,
                NOTICE_CHANGE_ACCOUNTING_TICKETING_BILL_STATUS: 8
            },
            MAX_ROW: 999999999,
            grid_paged: {
                ajax_url: ''
            }
        }

        var init = function (options) {

            _configs = $.extend({}, _configs, {}, options);

            _configs.site_id = $('#SITE_ID').val();

            _configs.service_wss_vietair_tv_url = $('#SERVICE_WSS_VIETAIR_ROOT_URL').val();

            _configs.service_wss_galileo_vietair_tv_url = $('#SERVICE_WSS_VIETAIR_GALILEO_ROOT_URL').val();
                        
            if (_configs.page_name == 'index') {

                

            }
            else if (_configs.page_name == 'ManageVietAirArticles') {

                //------------------------------
                //trang quan ly tin bai vietair
                var view = new VA.views.article.ManageVietAirArticles();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageVietAirArticlesLinkSeo') {

                //------------------------------
                //trang quan ly link seo vietair
                var view = new VA.views.article.ManageVietAirArticlesLinkSeo();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageVietAirCategories') {

                //------------------------------
                //trang quan ly chuyen muc vietair
                var view = new VA.views.article.ManageVietAirCategories();
                view.init(_configs);

            }
            else if (_configs.page_name == 'PromotionTicket') {

                //------------------------------
                //trang quan ly ve km nay dang loi
                var view = new VA.views.home.PromotionTicket();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageATP001') {

                //------------------------------
                //trang quan ly ve gia tot
                var view = new VA.views.AirlineExt001.AirlineExt001Manager();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageATP002') {

                //------------------------------
                //trang quan ly ve gia tot
                var view = new VA.views.AirlineExt001.AirlineExt002Manager();
                view.init(_configs);
            }
            else if (_configs.page_name == 'ManageATP003') {

                //------------------------------
                //trang quan ly ve gia tot
                var view = new VA.views.AirlineExt001.AirlineExt003Manager();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageAirline') {

                //------------------------------
                //quan ly hang may bay
                var view = new VA.views.airline.ManageAirline();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageUser') {
                //------------------------------
                //quan ly nguoi dung
                var view = new VA.views.user.ManageUser();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageTicketingVn') {
                //------------------------------
                //quan ly ticketing vn
                var view = new VA.views.airline.ManageTicketingVn();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageTicketingInternational') {
                //------------------------------
                //quan ly ticketing quoc te
                var view = new VA.views.airlineInternational.ManageTicketingInternational();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageWebPage') {

                //------------------------------
                //quan ly trang web
                var view = new VA.views.user.ManageWebPage();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageCustomerQA') {

                //------------------------------
                //quan ly y kien khach hang
                var view = new VA.views.customer.ManageCustomerQA();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageAccountingFlightBookingVn') {

                //------------------------------
                //thong tin dat ve may bay noi dia ke toan
                var view = new VA.views.accounting.ManageAccountingFlightBookingVn();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManagePaymentSmartLink') {

                //------------------------------
                //thanh toan smartlink
                var view = new VA.views.Payment.PaymentSmartlink();
                view.init(_configs);

            }


            else if (_configs.page_name == 'ManageAccountingFlightBookingInternational') {

                //------------------------------
                //thong tin dat ve may bay quoc te ke toan
                var view = new VA.views.accounting.ManageAccountingFlightBookingInternational();
                view.init(_configs);


            }
            else if (_configs.page_name == 'ManageAccountingPaymentMessage') {

                //------------------------------
                //thong tin thanh toan
                var view = new VA.views.accounting.ManageAccountingPaymentMessage();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ViewAccountingPaymentMessage') {

                //------------------------------
                //thanh toan ke toan
                var view = new VA.views.accounting.ViewAccountingPaymentMessage();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ViewAccountingPaymentMessageForAccounting') {

                var view = new VA.views.accounting.ViewAccountingPaymentMessageForAccounting();

                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageTravelTourSeftBooking') {
                //------------------------------
                //quan ly tour tu tao
                var view = new VA.views.travelTour.ManageTravelTourSeftBooking();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageFlightBookingEdit') {

                //------------------------------
                //trang nay chua bit la trang nao, cu tach
                var view = new VA.views.airline.ManageFlightBookingEdit();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageFlightBookingExtraInfo') {

                //------------------------------
                //trang nay chua bit la trang nao, cu tach
                var view = new VA.views.airline.ManageFlightBookingExtraInfo();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageCustomerInfo') {

                //------------------------------
                //trang nay chua bit la trang nao, cu tach
                var view = new VA.views.airline.ManageCustomerInfo();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageTravelInfo') {

                //------------------------------
                //trang nay chua bit la trang nao, cu tach
                var view = new VA.views.airline.ManageTravelInfo();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageTravelTourSeftBookingInfoLog') {

                //------------------------------
                //tour tu tao log
                var view = new VA.views.travelTour.ManageTravelTourSeftBookingInfoLog();
                view.init(_configs);
            }
            else if (_configs.page_name == 'ManageFlightBookingInfoLog') {

                //--------------------------------------
                //trang nay chua bit la trang nao, cu tach
                var view = new VA.views.airline.ManageFlightBookingInfoLog();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ViewDocuments') {

                //--------------------------------------
                //cay tai lieu
                var view = new VA.views.document.ViewDocuments();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageDocuments') {

                //--------------------------------------
                //quan ly tai lieu huong dan
                var view = new VA.views.document.ManageDocuments();
                view.init(_configs);


            }
            else if (_configs.page_name == 'ViewDocumentTemplate') {

                //--------------------------------------
                //quan ly tai lieu huong dan
                var view = new VA.views.document.ViewDocumentTemplate();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageDocumentTemplate') {

                //--------------------------------------
                //quan ly tai lieu huong dan cac bo phan
                var view = new VA.views.document.ManageDocumentTemplate();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageHotels') {

                //--------------------------------------
                //quan ly khach san
                var view = new VA.views.hotels.ManageHotels();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ViewHotels') {


                //--------------------------------------
                //thong tin khach san
                var view = new VA.views.hotels.ViewHotels();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageMoneyRate') {

                var view = new VA.views.accounting.ManageMoneyRate();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageSmsTemplate') {

                //--------------------------------------
                //quan ly sms template
                var view = new VA.views.sms.ManageSmsTemplate();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageCategoryBrandSmsTemplate') {

                //--------------------------------------
                //quan ly danh muc sms template
                var view = new VA.views.sms.ManageCategoryBrandSmsTemplate();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageTicketingBill') {

                //--------------------------------------
                //tao hoa don
                var view = new VA.views.accounting.ManageTicketingBill();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ViewTicketingBillInfo') {

                //--------------------------------------
                //xac nhan hoa don
                var view = new VA.views.accounting.ViewTicketingBillInfo();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageListNeoSmsLog') {

                var view = new VA.views.sms.ManageTicketingSMSBrandNameModuleControl2();

                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageListBank') {
                //--------------------------------------
                //quan ly ngan hang
                var view = new VA.views.accounting.ManageListBank();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageMarketingCustomerInformation') {

                var view = new VA.views.marketing.ManageMarketingCustomerInfo();
                view.init(_configs);

            }
            else if (_configs.page_name == 'UserInformation') {

                //--------------------------------------
                //thong tin thanh vien
                var view = new VA.views.user.UserInformation();
                view.init(_configs);
            }

            else if (_configs.page_name == 'ManageOnlineChartStatistic') {

                var view = new VA.views.accounting.ChartPaymentGoogleAds();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManagePaymentGoogleAdwords') {

                var view = new VA.views.accounting.ManagePaymentGoogleAds();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManagePolicyCustomer') {

                var view = new VA.views.flightCustomer.ManagePolicyCustomer();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManagePolicyCustomer002') {

                var view = new VA.views.flightCustomer.ManagePolicyCustomer002();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManagePolicyCustomer003') {

                var view = new VA.views.flightCustomer.ManagePolicyCustomer003();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManagePolicyCustomer004') {

                var view = new VA.views.flightCustomer.ManagePolicyCustomer004();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManagePolicyCustomer005') {

                var view = new VA.views.flightCustomer.ManagePolicyCustomer005();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ViewManagePolicyCustomer') {

                var view = new VA.views.flightCustomer.ViewManagePolicyCustomer();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManagePolicyCustomerIntl001') {

                var view = new VA.views.flightCustomerInternational.ManagePolicyCustomerIntl001();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManagePolicyCustomerIntl002') {

                var view = new VA.views.flightCustomerInternational.ManagePolicyCustomerIntl002();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ViewManagePolicyCustomerIntl') {

                var view = new VA.views.flightCustomerInternational.ViewManagePolicyCustomerIntl();
                view.init(_configs);

            }


            else if (_configs.page_name == 'ManageCustomer001') {

                var view = new VA.views.customer.ManageCustomer001();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageWorkAccount') {

                var view = new VA.views.user.ManageWorkAccount();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageAvatar') {

                var view = new VA.views.user.ManageAvatar();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ViewListUserInformation') {

                var view = new VA.views.user.ViewListUserInformation();

                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageUserInformation') {

                var view = new VA.views.user.ManageUserInformation();

                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageBanner') {

                var view = new VA.views.web.ManageBanner();
                view.init(_configs);

            }
            else if (_configs.page_name == 'FlightBookingCustomerCare') {
                //duong dan view file js

                var view = new VA.views.flightCustomer.flightBookingCustomerCare();
                view.init(_configs);


            }
            else if (_configs.page_name == 'FlightBookingIntlCustomerCare') {
                //duong dan view file js

                var view = new VA.views.flightCustomerInternational.flightBookingIntlCustomerCare();
                view.init(_configs);
            }

            else if (_configs.page_name == 'CustomerAgent') {
                //duong dan view file js

                var view = new VA.views.customerAgent.CustomerAgent();
                view.init(_configs);
            }
            else if (_configs.page_name == 'ManageArrivalPlace') {
                //duong dan view file js

                var view = new VA.views.tour.ManageArrivalPlace();
                view.init(_configs);
            }
            else if (_configs.page_name == 'ManageDeparturePlace') {
                //duong dan view file js

                var view = new VA.views.tour.ManageDeparturePlace();
                view.init(_configs);
            }
            else if (_configs.page_name == 'ManageTourPriceFilter') {
                //duong dan view file js

                var view = new VA.views.tour.ManageTourPriceFilter();
                view.init(_configs);
            }
            else if (_configs.page_name == 'ManageFlightBooking') {
                //duong dan view file js


                var view = new VA.views.airline.FlightBooking();
                view.init(_configs);
            }

            else if (_configs.page_name == 'ManageFlightBookingInternational') {
                //duong dan view file js


                var view = new VA.views.airlineInternational.FlightBooking();
                view.init(_configs);
            }
            else if (_configs.page_name == 'ManageFeatureFilter') {
                //duong dan view file js


                var view = new VA.views.tour.ManageFeatureFilter();
                view.init(_configs);
            }

            else if (_configs.page_name == 'ManageRegionFilter') {
                //duong dan view file js


                var view = new VA.views.tour.ManageRegionFilter();
                view.init(_configs);
            }

            else if (_configs.page_name == 'ManagePromotionCode') {
                //duong dan view file js

                var view = new VA.views.marketing.ManagePromotionCode();
                view.init(_configs);
            }
            else if (_configs.page_name == 'ManageTravelTourInfo') {
                //duong dan view file js

                var view = new VA.views.travelTour.ManageTravelTour();
                view.init(_configs);
            }

            else if (_configs.page_name == 'ManageCategoryTravelTour') {
                //duong dan view file js

                var view = new VA.views.travelTour.ManageCategoryTravelTour();
                view.init(_configs);
            }
            else if (_configs.page_name == 'ManageTravelTourDetails') {
                //duong dan view file js

                var view = new VA.views.travelTour.ManageTravelTourDetail();
                view.init(_configs);
            }
            else if (_configs.page_name == 'ManageTravelTourBooking') {
                //duong dan view file js

                var view = new VA.views.travelTour.TravelTourBooking();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageTravelTourBookingInfoLog') {
                //duong dan view file js

                var view = new VA.views.tour.TravelTourBookingInfoLog();
                view.init(_configs);
            }

            else if (_configs.page_name == 'ManageTravelTourDetailEx01') {
                //duong dan view file js

                var view = new VA.views.travelTour.ManageTravelTourDetail_Ex01();
                view.init(_configs);
            }

            else if (_configs.page_name == 'ManageTravelTourDetailEx02Airline') {
                //duong dan view file js

                var view = new VA.views.travelTour.ManageTravelTourDetail_Ex02_Airline();
                view.init(_configs);
            }

            else if (_configs.page_name == 'ManageTravelTourDetailEx02Guider') {
                //duong dan view file js

                var view = new VA.views.travelTour.ManageTravelTourDetail_Ex02_Guider();
                view.init(_configs);
            }

            else if (_configs.page_name == 'ManageTravelTourDetailEx02Hotel') {
                //duong dan view file js

                var view = new VA.views.travelTour.ManageTravelTourDetail_Ex02_Hotel();
                view.init(_configs);
            }

            else if (_configs.page_name == 'ManageTravelTourDetailEx02Price') {
                //duong dan view file js

                var view = new VA.views.travelTour.ManageTravelTourDetail_Ex02_Price();
                view.init(_configs);
            }

            else if (_configs.page_name == 'ManageTravelTourDetailEx02Room') {
                //duong dan view file js

                var view = new VA.views.travelTour.ManageTravelTourDetail_Ex02_Room();
                view.init(_configs);
            }

            else if (_configs.page_name == 'ManageTravelTourDetailEx03') {
                //duong dan view file js

                var view = new VA.views.travelTour.ManageTravelTourDetail_Ex03();
                view.init(_configs);
            }

            else if (_configs.page_name == 'ManageTravelTourDetailEx04') {
                //duong dan view file js

                var view = new VA.views.travelTour.ManageTravelTourDetail_Ex04();
                view.init(_configs);
            }

            else if (_configs.page_name == 'ManageTravelTourDetailImage') {
                //duong dan view file js

                var view = new VA.views.travelTour.ManageTravelTourDetail_Image();
                view.init(_configs);
            }

            else if (_configs.page_name == 'ManagePromotionCodeEvent') {
                //duong dan view file js

                var view = new VA.views.marketing.ManagePromotionCodeEvent();
                view.init(_configs);
            }

            else if (_configs.page_name == 'ManagePromotion001') {
                //duong dan view file js

                var view = new VA.views.marketing.ManagePromotion001();
                view.init(_configs);
            }

            else if (_configs.page_name == 'ManageCustomerTourInformation') {
                //duong dan view file js

                var view = new VA.views.customerTour.ManageCustomerTourInformation();
                view.init(_configs);
            }


            else if (_configs.page_name == 'ManagePartnerTourPosition') {
                //duong dan view file js

                var view = new VA.views.customerTour.ManagePartnerTourPosition();
                view.init(_configs);
            }


            else if (_configs.page_name == 'ManageNewCustomerStatistic') {
                //duong dan view file js

                var view = new VA.views.chartDomestic.ChartNewCustomerDomestic();
                view.init(_configs);
            }


            else if (_configs.page_name == 'ManageNewCustomerStatisticIntl') {
                //duong dan view file js

                var view = new VA.views.chartIntl.ChartNewCustomerIntl();
                view.init(_configs);
            }


            else if (_configs.page_name == 'ManageFlightBookingDomesticStatistic') {
                //duong dan view file js

                var view = new VA.views.chartDomestic.ChartFlightBookingDomestic();
                view.init(_configs);
            }


            else if (_configs.page_name == 'ManageAirlineFlightBookingStatistic') {
                //duong dan view file js

                var view = new VA.views.chartDomestic.ChartAirlineFlightBookingDomestic();
                view.init(_configs);
            }


            else if (_configs.page_name == 'ManageBookingBetweenMembersStatistic') {
                //duong dan view file js

                var view = new VA.views.chartDomestic.ChartBookingBetweenMembers();
                view.init(_configs);
            }


            else if (_configs.page_name == 'ManagePaymentBookingStatistic') {
                //duong dan view file js

                var view = new VA.views.chartDomestic.ChartPaymentBookingDomestic();
                view.init(_configs);
            }



            else if (_configs.page_name == 'ManageCustomerFlightBookingStatistic') {
                //duong dan view file js

                var view = new VA.views.chartDomestic.ChartCustomerFlightBookingDomestic();
                view.init(_configs);
            }



            else if (_configs.page_name == 'ManageBookingInfoSourceSiteIdStatistic') {
                //duong dan view file js

                var view = new VA.views.chartDomestic.ChartBookingInfoSourceSiteId();
                view.init(_configs);
            }


            else if (_configs.page_name == 'ManageBookingInfoHourlyStatistic') {
                //duong dan view file js

                var view = new VA.views.chartDomestic.ChartBookingInfoHourly();
                view.init(_configs);
            }



            else if (_configs.page_name == 'ManageFlightBookingIntlStatistic') {
                //duong dan view file js

                var view = new VA.views.chartIntl.ChartFlightBookingIntl();
                view.init(_configs);
            }

            else if (_configs.page_name == 'ManageCustomerFlightBookingIntlStatistic') {
                //duong dan view file js

                var view = new VA.views.chartIntl.ChartCustomerFlightBookingIntl();
                view.init(_configs);
            }


            else if (_configs.page_name == 'ManageAirlineFlightBookingIntlStatistic') {
                //duong dan view file js

                var view = new VA.views.chartIntl.ChartAirlineFlightBookingIntl();
                view.init(_configs);
            }


            else if (_configs.page_name == 'ManageBookingBetweenMembersIntlStatistic') {
                //duong dan view file js

                var view = new VA.views.chartIntl.ChartBookingBetweenMembersIntl();
                view.init(_configs);
            }

            else if (_configs.page_name == 'ManagePaymentBookingIntlStatistic') {
                //duong dan view file js

                var view = new VA.views.chartIntl.ChartPaymentBookingIntl();
                view.init(_configs);
            }


            else if (_configs.page_name == 'ManageBookingInfoSourceSiteIdIntlStatistic') {
                //duong dan view file js

                var view = new VA.views.chartIntl.ChartBookingInfoSourceSiteIdIntl();
                view.init(_configs);
            }

            else if (_configs.page_name == 'ManageBookingInfoHourlyIntlStatistic') {
                //duong dan view file js

                var view = new VA.views.chartIntl.ChartBookingInfoHourlyIntl();
                view.init(_configs);
            }

            else if (_configs.page_name == 'EmailNotify') {
             
                //----------------------------
                //Quan ly email
                var view = new VA.views.email.EmailNotify();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageDocumentCategories') {

                //------------------------------
                //trang quan ly chuyen muc tai lieu
               
                var view = new VA.views.document.ManageDocumentCategories();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageDocumentArticles') {

                //------------------------------
                //trang quan ly chuyen muc tai lieu
                var view = new VA.views.document.ManageDocumentArticles();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ViewDocumentArticles') {

                //------------------------------
                //trang quan ly chuyen muc tai lieu
                var view = new VA.views.document.ViewDocumentArticles();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageDepartmentDocumentArticles') {

                //------------------------------
                //trang quan ly chuyen muc tai lieu

                var view = new VA.views.document.ManageDepartmentDocumentArticles();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageDepartmentDocumentCategories') {

                //------------------------------
                //trang quan ly chuyen muc tai lieu
                var view = new VA.views.document.ManageDepartmentDocumentCategories();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ViewDepartmentDocumentArticles') {

                //------------------------------
                //trang quan ly chuyen muc tai lieu
                var view = new VA.views.document.ViewDepartmentDocumentArticles();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageReportTicketing') {

                //------------------------------
                //trang quan ly chuyen muc tai lieu
                var view = new VA.views.report.ReportTicketing();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageReportTicketingIntl') {

                //------------------------------
                //trang quan ly chuyen muc tai lieu
                var view = new VA.views.report.ReportTicketingIntl();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageThucPham3SArticles') {

                //------------------------------
                //trang quan ly chuyen muc tai lieu
                var view = new VA.views.article.ManageThucPham3SArticles();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageThucPham3SCategories') {

                //------------------------------
                //trang quan ly chuyen muc tai lieu
                var view = new VA.views.article.ManageThucPham3SCategories();
                view.init(_configs);

            }



            else if (_configs.page_name == 'ManageOneTourArticles') {

                //------------------------------
                //trang quan ly tin tuc Onetour

                var view = new VA.views.article.ManageOneTourArticles();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageTamVuongArticles') {

                //------------------------------
                //trang quan ly tin tuc TamVuong
                var view = new VA.views.article.ManageTamVuongArticles();
                view.init(_configs);

            }


            else if (_configs.page_name == 'ManageTamVuongArticlesLinkSeo') {

                //------------------------------
                var view = new VA.views.article.ManageTamVuongArticlesLinkSeo();
                view.init(_configs);

        }

            else if (_configs.page_name == 'ManageOneTourCategories') {

                //------------------------------
                //trang quan ly chuyen muc Onetour
                var view = new VA.views.article.ManageOneTourCategories();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageTamVuongCategories') {

                //------------------------------
                //trang quan ly chuyen muc TamVuong
                var view = new VA.views.article.ManageTamVuongCategories();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageBookTicketing') {

                //------------------------------
                var view = new VA.views.customer.ManageBookTicketing();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageBookTicketingInternational') {

                //------------------------------
                var view = new VA.views.customer.ManageBookTicketingInternational();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageOfficeDepartments') {

                //------------------------------
                var view = new VA.views.user.ManageOfficeDepartments();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageOfficePositions') {

                //------------------------------
                var view = new VA.views.user.ManageOfficePositions();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManagePromotionTicketEvent') {

                //------------------------------
                var view = new VA.views.marketing.ManagePromotionTicketEvent();
                view.init(_configs);

            }


            else if (_configs.page_name == 'ManageTp3sCategories') {

                //------------------------------
                var view = new VA.views.thucpham3s.ManageTp3sCategories();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageTp3sProduct') {

                //------------------------------
                var view = new VA.views.thucpham3s.ManageTp3sProduct();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageTp3sPictureProduct') {

                //------------------------------
                var view = new VA.views.thucpham3s.ManageTp3sPictureProduct();
                view.init(_configs);

            }


            else if (_configs.page_name == 'ManageTp3sManufactureProduct') {

                //------------------------------
                var view = new VA.views.thucpham3s.ManageTp3sManufactureProduct();
                view.init(_configs);

            }


            else if (_configs.page_name == 'ManageTp3sTrademarkProduct') {

                //------------------------------
                var view = new VA.views.thucpham3s.ManageTp3sTrademarkProduct();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageTp3sProductAttributeOptions') {

                //------------------------------
                var view = new VA.views.thucpham3s.ManageTp3sProductAttributeOptions();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageTp3sProductAttributes') {

                //------------------------------
                var view = new VA.views.thucpham3s.ManageTp3sProductAttributes();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageTp3sProductSEO') {

                //------------------------------
                var view = new VA.views.thucpham3s.ManageTp3sProductSEO();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageFlightBookingDomesticBetweenMembersStatistic') {

                //------------------------------
                var view = new VA.views.chartDomestic.ChartFlightDomesticBetweenMembers();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageTicketJapanRailPass') {

                //------------------------------
                var view = new VA.views.JapanRailPass.ManageTicketJapanRailPass();
                view.init(_configs);

            }
            else if (_configs.page_name == 'ManageBookingJapanRailPass') {

                //------------------------------
                var view = new VA.views.JapanRailPass.ManageBookingJapanRailPass();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ReportCancelBookingDomestic') {

                //------------------------------
                var view = new VA.views.report.ReportCancelBookingDomestic();
                view.init(_configs);

            }


            else if (_configs.page_name == 'ReportCancelBookingIntl') {

                //------------------------------
                var view = new VA.views.report.ReportCancelBookingIntl();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageAloveCategories') {

                //------------------------------
                //trang quan ly chuyen muc Alove
                var view = new VA.views.article.ManageAloveCategories();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageAloveArticles') {

                //------------------------------
                //trang quan ly tin tuc Alove
                var view = new VA.views.article.ManageAloveArticles();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageAloveArticlesLinkSeo') {

                //------------------------------
                //trang quan ly tin tuc link seo Alove
                var view = new VA.views.article.ManageAloveArticlesLinkSeo();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageSurveyCustomerInfo') {

                //------------------------------
                var view = new VA.views.marketing.ManageSurveyCustomerInfo();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ReportCustomer') {

                //------------------------------
                var view = new VA.views.marketing.ReportCustomer();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ReportTicketingDaily') {

                //------------------------------
                var view = new VA.views.report.ReportTicketingDaily();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageReportTicketingDaily') {

                //------------------------------
                var view = new VA.views.report.ManageReportTicketingDaily();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageReportSchemaError') {

                //quan li thong tin loi schema
                var view = new VA.views.report.ManageReportSchemaError();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageHotelInfo') {

                //------------------------------
                var view = new VA.views.hotels.ManageHotelInfo();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageHotelInfoRoom') {

                //------------------------------
                var view = new VA.views.hotels.ManageHotelInfoRoom();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageHotelInfoDetailImage') {

                //------------------------------
                var view = new VA.views.hotels.ManageHotelInfoDetailImage();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageBookingServicePackages') {

                //------------------------------
                var view = new VA.views.freeAndEasy.ManageBookingServicePackages();
                view.init(_configs);

            }


            else if (_configs.page_name == 'CheapTicketMonth') {

                //------------------------------
                var view = new VA.views.airline.CheapTicketMonth();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ReportTicketingMonth') {

                //------------------------------
                var view = new VA.views.report.ReportTicketingMonth();
                view.init(_configs);

            }

            else if (_configs.page_name == 'ManageReportTicketingMonth') {

                //------------------------------

             
                var view = new VA.views.report.ManageReportTicketingMonth();
                view.init(_configs);

            }
        }

        return ({

            "init": init

        });

    };

}());

