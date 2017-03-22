webpackJsonp([0,3],{

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Settings; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Settings = (function () {
    function Settings() {
        this.timeTable = [
            [],
            ['Mathe', 'Sport', 'Religon', 'Englisch'],
            ['Biologie', 'Deutsch', 'SoWi', 'Musik', 'Kunst'],
            ['Englisch', 'Kunst', 'Instrument', 'Sport', 'Deutsch'],
            ['MINT', 'Musik', 'Mathe', 'Religion', 'Klassenleiterst.'],
            ['Erdkunde', 'Deutsch', 'Englisch', 'Biologie', 'Sport'],
            []
        ];
        this.classDurationNumbers = [
            [[8, 0], [9, 0]],
            [[9, 10], [10, 10]],
            [[10, 25], [11, 25]],
            [[11, 35], [12, 35]],
            [[12, 50], [13, 50]]
        ];
    }
    return Settings;
}());
Settings = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], Settings);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasePanel; });
var BasePanel = (function () {
    function BasePanel(name, refreshAfter, cookieService) {
        this.name = name;
        this.refreshAfter = refreshAfter;
        this.cookieService = cookieService;
        this.loaded = true;
        this.isEnabled = false;
    }
    BasePanel.prototype.ngOnInit = function () {
        var _this = this;
        this.loadSavedData();
        this.isEnabled = this.areEnabledConditionsMet();
        if (this.isEnabled) {
            this._refreshData();
            setInterval(function () { return _this._refreshData(); }, this.refreshAfter * 1000);
        }
    };
    BasePanel.prototype._refreshData = function () {
        try {
            this.log('refreshData started');
            this.refreshData();
            this.log('refreshData finished');
        }
        catch (e) {
            this.log('refreshData errored');
            if (e instanceof String) {
                this.errorMessage = 'Error';
            }
            else {
                this.errorMessage = e.message;
            }
        }
    };
    BasePanel.prototype.areEnabledConditionsMet = function () {
        var conditions = this.enableConditions();
        var failingConditions = [];
        for (var conditionName in conditions) {
            if (conditions[conditionName] === false) {
                failingConditions.push(conditionName);
            }
        }
        if (failingConditions.length > 0) {
            console.log('ValidationErrors on ' + this.constructor.name + ': ' + failingConditions.toString());
        }
        return failingConditions.length === 0;
    };
    BasePanel.prototype.loadSavedData = function () {
        this.log('loadSavedData started');
        var rawSavedAt = this.cookieService.get(this.name + ".savedAt");
        var rawData = this.cookieService.get(this.name + ".data");
        if (rawSavedAt !== undefined && rawData !== undefined) {
            this.lastUpdate = JSON.parse(rawSavedAt);
            this.log('loadSavedData finished');
            return JSON.parse(rawData);
        }
        this.log('loadSavedData errored');
    };
    BasePanel.prototype.saveData = function (data) {
        this.lastUpdate = new Date();
        this.cookieService.put(this.name + ".data", JSON.stringify(data));
        this.cookieService.put(this.name + ".savedAt", JSON.stringify(this.lastUpdate));
    };
    BasePanel.prototype.log = function (message) {
        // console.log(`${new Date()} ${this.name}: ${message}`);
    };
    return BasePanel;
}());

//# sourceMappingURL=basePanel.js.map

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__authentication_service__ = __webpack_require__(249);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__authentication_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appointments_service__ = __webpack_require__(53);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__appointments_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__next_events_service__ = __webpack_require__(251);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__next_events_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__calendar_service__ = __webpack_require__(250);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__calendar_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__waitService__ = __webpack_require__(252);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__waitService__["a"]; });





//# sourceMappingURL=index.js.map

/***/ }),

/***/ 219:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 219;


/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zone_js__ = __webpack_require__(558);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zone_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_zone_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reflect_metadata__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reflect_metadata___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_reflect_metadata__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_dynamic__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_module__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment__ = __webpack_require__(256);






if (__WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_index__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_cookie_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_cookie_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_cookie_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = (function () {
    function AppComponent(authenticationService) {
        this.authenticationService = authenticationService;
        __WEBPACK_IMPORTED_MODULE_2_moment__["locale"]('de');
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(277),
        styles: [__webpack_require__(262)],
        providers: [__WEBPACK_IMPORTED_MODULE_1__services_index__["e" /* AuthenticationService */], __WEBPACK_IMPORTED_MODULE_3_angular2_cookie_core__["CookieService"], __WEBPACK_IMPORTED_MODULE_1__services_index__["c" /* NextEventsService */], __WEBPACK_IMPORTED_MODULE_1__services_index__["a" /* CalendarService */], __WEBPACK_IMPORTED_MODULE_1__services_index__["b" /* AppointmentsService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_index__["e" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_index__["e" /* AuthenticationService */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_cookie_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_cookie_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular2_cookie_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_settings__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__cookie_options_my_cookie_options__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__dashboard_dashboard_component__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__settings_settings_component__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__weather__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__news__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__schedule__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__camera__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__quote__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__clock__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__humidor__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__calendar__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__next_events__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_angular2_moment__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_common__ = __webpack_require__(22);
/* unused harmony export settingsFactory */
/* unused harmony export cookieOptionFactory */
/* unused harmony export appRoutes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















function settingsFactory() {
    return new __WEBPACK_IMPORTED_MODULE_6_angular2_cookie_core__["CookieService"](new __WEBPACK_IMPORTED_MODULE_6_angular2_cookie_core__["CookieOptions"]({})).getObject('settings') || new __WEBPACK_IMPORTED_MODULE_7__shared_settings__["a" /* Settings */]();
}
;
function cookieOptionFactory() {
    return new __WEBPACK_IMPORTED_MODULE_8__cookie_options_my_cookie_options__["a" /* MyCookieOptions */]('/');
}
var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_9__dashboard_dashboard_component__["a" /* DashboardComponent */] },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_9__dashboard_dashboard_component__["a" /* DashboardComponent */] },
    { path: 'settings', component: __WEBPACK_IMPORTED_MODULE_10__settings_settings_component__["a" /* SettingsComponent */] }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_9__dashboard_dashboard_component__["a" /* DashboardComponent */], __WEBPACK_IMPORTED_MODULE_10__settings_settings_component__["a" /* SettingsComponent */], __WEBPACK_IMPORTED_MODULE_17__humidor__["a" /* HumidorComponent */],
            __WEBPACK_IMPORTED_MODULE_19__next_events__["a" /* NextEventsComponent */], __WEBPACK_IMPORTED_MODULE_11__weather__["a" /* WeatherComponent */], __WEBPACK_IMPORTED_MODULE_12__news__["a" /* NewsComponent */], __WEBPACK_IMPORTED_MODULE_13__schedule__["a" /* ScheduleComponent */],
            __WEBPACK_IMPORTED_MODULE_16__clock__["a" /* ClockComponent */], __WEBPACK_IMPORTED_MODULE_15__quote__["a" /* QuoteComponent */], __WEBPACK_IMPORTED_MODULE_18__calendar__["a" /* CalendarComponent */], __WEBPACK_IMPORTED_MODULE_14__camera__["a" /* CameraComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* RouterModule */].forRoot(appRoutes),
            __WEBPACK_IMPORTED_MODULE_20_angular2_moment__["MomentModule"]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_21__angular_common__["Location"],
            { provide: __WEBPACK_IMPORTED_MODULE_7__shared_settings__["a" /* Settings */], useFactory: settingsFactory },
            { provide: __WEBPACK_IMPORTED_MODULE_6_angular2_cookie_core__["CookieOptions"], useFactory: cookieOptionFactory }
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_basePanel__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_index__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_cookie_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_cookie_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_cookie_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_calendar__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_settings__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarComponent; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CalendarComponent = (function (_super) {
    __extends(CalendarComponent, _super);
    function CalendarComponent(cookieService, calendarService, appointmentsService, nextEventsService, settings) {
        var _this = _super.call(this, 'calendar', 60 * 60, cookieService) || this;
        _this.cookieService = cookieService;
        _this.calendarService = calendarService;
        _this.appointmentsService = appointmentsService;
        _this.nextEventsService = nextEventsService;
        _this.settings = settings;
        _this.date = new Date();
        _this.calendar = new __WEBPACK_IMPORTED_MODULE_4__shared_calendar__["a" /* Calendar */]();
        return _this;
    }
    CalendarComponent.prototype.ngOnInit = function () {
        this.date = new Date(Date.parse(this.dateString));
        _super.prototype.ngOnInit.call(this);
    };
    CalendarComponent.prototype.refreshData = function () {
        var _this = this;
        this.appointmentsService.loadAppointments().then(function (appointments) {
            _this.calendar = _this.calendarService.getCalendar(_this.date, _this.nextEventsService.getEvents(appointments));
            _this.saveData(_this.calendar);
        });
    };
    CalendarComponent.prototype.loadSavedData = function () {
        this.calendar = this.calendarService.getCalendar(this.date, []);
    };
    CalendarComponent.prototype.getTextClass = function (day) {
        if (day === undefined) {
            return '';
        }
        if (day.hasEvents) {
            return 'label label-default';
        }
        return '';
    };
    CalendarComponent.prototype.getDayClass = function (day) {
        if (day === undefined) {
            return '';
        }
        if (day.hasEvents) {
            return 'success';
        }
        if (__WEBPACK_IMPORTED_MODULE_2__services_index__["a" /* CalendarService */].isToday(day.date)) {
            return 'danger';
        }
        if (__WEBPACK_IMPORTED_MODULE_2__services_index__["a" /* CalendarService */].isWeekend(day.date)) {
            return 'info';
        }
        return '';
    };
    CalendarComponent.prototype.enableConditions = function () {
        return {
            googleApiKey: this.settings.googleApiKey != null,
            googleClientId: this.settings.googleClientId != null,
            onlineStatus: this.onlineStatus === 'online',
            gapi: typeof (gapi) !== 'undefined'
        };
    };
    return CalendarComponent;
}(__WEBPACK_IMPORTED_MODULE_1__shared_basePanel__["a" /* BasePanel */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], CalendarComponent.prototype, "dateString", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], CalendarComponent.prototype, "onlineStatus", void 0);
CalendarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-calendar',
        template: __webpack_require__(278),
        styles: [__webpack_require__(263)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_cookie_core__["CookieService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_cookie_core__["CookieService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_index__["a" /* CalendarService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_index__["a" /* CalendarService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_index__["b" /* AppointmentsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_index__["b" /* AppointmentsService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_index__["c" /* NextEventsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_index__["c" /* NextEventsService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__shared_settings__["a" /* Settings */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared_settings__["a" /* Settings */]) === "function" && _e || Object])
], CalendarComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=calendar.component.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calendar_component__ = __webpack_require__(228);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__calendar_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_basePanel__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_settings__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CameraComponent; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CameraComponent = (function (_super) {
    __extends(CameraComponent, _super);
    function CameraComponent(cookieService, settings) {
        var _this = _super.call(this, 'camera', 20, cookieService) || this;
        _this.cookieService = cookieService;
        _this.settings = settings;
        _this.baseUrl = 'https://192.168.178.21:443/cgi-bin/CGIProxy.fcgi';
        return _this;
    }
    CameraComponent.prototype.enableConditions = function () {
        return {
            foscamUser: this.settings.cameraUsername != null,
            foscamPassword: this.settings.cameraPassword != null
        };
    };
    CameraComponent.prototype.createUrl = function () {
        return this.baseUrl +
            '?cmd=snapPicture2&usr=' + this.settings.cameraUsername +
            '&pwd=' + this.settings.cameraPassword +
            '&date=' + new Date().getTime();
    };
    CameraComponent.prototype.refreshData = function () {
        this.refreshImage();
    };
    CameraComponent.prototype.refreshImage = function () {
        this.lastUpdate = new Date();
        document.getElementById('cameraImage').src = this.createUrl();
    };
    return CameraComponent;
}(__WEBPACK_IMPORTED_MODULE_1__shared_basePanel__["a" /* BasePanel */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], CameraComponent.prototype, "onlineStatus", void 0);
CameraComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-camera',
        template: __webpack_require__(279),
        styles: [__webpack_require__(264)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__["CookieService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__["CookieService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__shared_settings__["a" /* Settings */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_settings__["a" /* Settings */]) === "function" && _b || Object])
], CameraComponent);

var _a, _b;
//# sourceMappingURL=camera.component.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__camera_component__ = __webpack_require__(230);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__camera_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClockComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ClockComponent = (function () {
    function ClockComponent(cdRef) {
        this.cdRef = cdRef;
    }
    ClockComponent.prototype.ngOnInit = function () {
        var _this = this;
        var timer = __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].timer(0, 1000);
        this.timerObserver = timer.subscribe(function () { return _this.updateTime(); });
    };
    ClockComponent.prototype.updateTime = function () {
        this.dateTime = new Date();
        this.cdRef.detectChanges();
    };
    ClockComponent.prototype.ngOnDestroy = function () {
        this.timerObserver.unsubscribe();
    };
    return ClockComponent;
}());
ClockComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-clock',
        template: __webpack_require__(280),
        styles: [__webpack_require__(265)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _a || Object])
], ClockComponent);

var _a;
//# sourceMappingURL=clock.component.js.map

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__clock_component__ = __webpack_require__(232);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__clock_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular2_cookie_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular2_cookie_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular2_cookie_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyCookieOptions; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var MyCookieOptions = (function (_super) {
    __extends(MyCookieOptions, _super);
    function MyCookieOptions(path) {
        var _this = _super.call(this, path) || this;
        _this.expires = 'Fri, 31 Dec 9999 23:59:59 GMT';
        return _this;
    }
    return MyCookieOptions;
}(__WEBPACK_IMPORTED_MODULE_0_angular2_cookie_core__["BaseCookieOptions"]));

;
//# sourceMappingURL=my-cookie-options.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_index__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_settings__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DashboardComponent = (function () {
    function DashboardComponent(authenticationService, settings) {
        this.authenticationService = authenticationService;
        this.settings = settings;
        this.enabled = settings.googleApiKey !== undefined &&
            settings.googleClientId !== undefined &&
            typeof (gapi) !== 'undefined';
    }
    DashboardComponent.prototype.setDates = function () {
        var today = new Date();
        this.thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        this.nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    };
    DashboardComponent.prototype.setOnlineStatus = function () {
        this.onlineStatus = window.navigator.onLine ? 'online' : 'offline';
    };
    DashboardComponent.prototype.loginToGoogle = function () {
        if (this.enabled && !this.authenticationService.isAuthenticated) {
            this.authenticationService.login();
        }
    };
    DashboardComponent.prototype.ngOnInit = function () {
        this.setDates();
        this.setOnlineStatus();
        this.loginToGoogle();
    };
    return DashboardComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], DashboardComponent.prototype, "onlineStatus", void 0);
DashboardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        providers: [__WEBPACK_IMPORTED_MODULE_1__services_index__["e" /* AuthenticationService */]],
        selector: 'app-dashboard',
        template: __webpack_require__(281),
        styles: [__webpack_require__(266)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_index__["e" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_index__["e" /* AuthenticationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_settings__["a" /* Settings */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_settings__["a" /* Settings */]) === "function" && _b || Object])
], DashboardComponent);

var _a, _b;
//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_basePanel__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HumidorComponent; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Data = (function () {
    function Data(humidity, time) {
        this.humidity = humidity;
        this.time = time;
    }
    return Data;
}());
var HumidorComponent = (function (_super) {
    __extends(HumidorComponent, _super);
    function HumidorComponent(cookieService, http) {
        var _this = _super.call(this, 'humidor', 60, cookieService) || this;
        _this.cookieService = cookieService;
        _this.http = http;
        _this.data = new Data('N/A', new Date());
        return _this;
    }
    HumidorComponent.prototype.parse = function (data) {
        var el = $($.parseJSON(data.text()));
        var date = __WEBPACK_IMPORTED_MODULE_4_moment__(el[0].date + '000', 'x').toDate();
        this.data = new Data(el[0].humidity, date);
        this.saveData(this.data);
    };
    HumidorComponent.prototype.refreshData = function () {
        var _this = this;
        var observer = this.http.get('https://testproject-91ab2.firebaseio.com/5c:cf:7f:8b:61:6f/latest.json');
        observer.subscribe(function (data) { return _this.parse(data); }, function (error) { return console.error('Error: ' + error); }, function () { return console.log('Received Humidor Data from Firebase'); });
    };
    HumidorComponent.prototype.loadSavedData = function () {
        this.data = _super.prototype.loadSavedData.call(this);
    };
    HumidorComponent.prototype.enableConditions = function () {
        return {
            onlineStatus: this.onlineStatus === 'online'
        };
    };
    return HumidorComponent;
}(__WEBPACK_IMPORTED_MODULE_3__shared_basePanel__["a" /* BasePanel */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], HumidorComponent.prototype, "onlineStatus", void 0);
HumidorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-humidor',
        template: __webpack_require__(282),
        styles: [__webpack_require__(267)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__["CookieService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__["CookieService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _b || Object])
], HumidorComponent);

var _a, _b;
//# sourceMappingURL=humidor.component.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__humidor_component__ = __webpack_require__(236);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__humidor_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__news_component__ = __webpack_require__(239);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__news_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_basePanel__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsComponent; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var News = (function () {
    function News(title, image, summary, date) {
        this.title = title;
        this.image = image;
        this.summary = summary;
        this.date = date;
    }
    return News;
}());
var NewsComponent = (function (_super) {
    __extends(NewsComponent, _super);
    function NewsComponent(cookieService, http) {
        var _this = _super.call(this, 'news', 15 * 60, cookieService) || this;
        _this.cookieService = cookieService;
        _this.http = http;
        _this.newsItems = [];
        return _this;
    }
    NewsComponent.prototype.loadSavedData = function () {
        this.newsItems = _super.prototype.loadSavedData.call(this);
    };
    NewsComponent.prototype.enableConditions = function () {
        return {
            onlineStatus: this.onlineStatus === 'online'
        };
    };
    NewsComponent.prototype.parse = function (data) {
        var newsItems = [];
        var items = $(data.text()).find('item').slice(0, 6);
        for (var i = 0; i < items.length; i++) {
            var el = $(items[i]);
            var image = el.find('enclosure').attr('url');
            if (image) {
                image = image.replace('http:', 'https:');
            }
            newsItems.push(new News(el.find('title').text(), image, el.find('description').text(), new Date(el.find('pubDate').text())));
        }
        this.newsItems = newsItems;
        this.saveData(newsItems);
    };
    NewsComponent.prototype.refreshData = function () {
        var _this = this;
        var observer = this.http.get('https://crossorigin.me/http://www.spiegel.de/schlagzeilen/tops/index.rss');
        observer.subscribe(function (data) { return _this.parse(data); }, function (error) { return console.error('Error: ' + error); }, function () { return console.log('Received News Headlines!'); });
    };
    return NewsComponent;
}(__WEBPACK_IMPORTED_MODULE_3__shared_basePanel__["a" /* BasePanel */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], NewsComponent.prototype, "onlineStatus", void 0);
NewsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-news',
        template: __webpack_require__(283),
        styles: [__webpack_require__(268)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__["CookieService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__["CookieService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _b || Object])
], NewsComponent);

var _a, _b;
//# sourceMappingURL=news.component.js.map

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__next_events_component__ = __webpack_require__(241);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__next_events_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_index__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_settings__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_basePanel__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NextEventsComponent; });
/// <reference path="../../../typings/globals/gapi.client/gapi.client.calendar.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NextEventsComponent = (function (_super) {
    __extends(NextEventsComponent, _super);
    function NextEventsComponent(appointmentsService, cookieService, settings, nextEventsService) {
        var _this = _super.call(this, 'nextEvents', 10 * 60, cookieService) || this;
        _this.appointmentsService = appointmentsService;
        _this.cookieService = cookieService;
        _this.settings = settings;
        _this.nextEventsService = nextEventsService;
        return _this;
    }
    NextEventsComponent.prototype.enableConditions = function () {
        return {
            googleApiKey: this.settings.googleApiKey != null,
            googleClientId: this.settings.googleClientId != null,
            onlineStatus: this.onlineStatus === 'online',
            gapi: typeof (gapi) !== 'undefined'
        };
    };
    NextEventsComponent.prototype.loadSavedData = function () {
        this.daysWithEvents = _super.prototype.loadSavedData.call(this);
    };
    NextEventsComponent.prototype.rowClass = function (day) {
        if (day === undefined) {
            return '';
        }
        var today = new Date();
        var tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        var dateString = __WEBPACK_IMPORTED_MODULE_2__services_index__["c" /* NextEventsService */].dateToString(new Date(day.date.toString()));
        if (dateString === __WEBPACK_IMPORTED_MODULE_2__services_index__["c" /* NextEventsService */].dateToString(today)) {
            return 'success';
        }
        else if (dateString === __WEBPACK_IMPORTED_MODULE_2__services_index__["c" /* NextEventsService */].dateToString(tomorrow)) {
            return 'info';
        }
        else {
            return '';
        }
    };
    NextEventsComponent.prototype.refreshData = function () {
        var _this = this;
        var saveCallback = function (daysWithEvents) {
            _this.saveData(daysWithEvents);
        };
        this.nextEventsService.getDaysWithEvents(4, saveCallback);
    };
    return NextEventsComponent;
}(__WEBPACK_IMPORTED_MODULE_4__shared_basePanel__["a" /* BasePanel */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], NextEventsComponent.prototype, "onlineStatus", void 0);
NextEventsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-next-events',
        template: __webpack_require__(284),
        styles: [__webpack_require__(269)],
        providers: [__WEBPACK_IMPORTED_MODULE_2__services_index__["b" /* AppointmentsService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_index__["b" /* AppointmentsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_index__["b" /* AppointmentsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__["CookieService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__["CookieService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_settings__["a" /* Settings */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_settings__["a" /* Settings */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_index__["c" /* NextEventsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_index__["c" /* NextEventsService */]) === "function" && _d || Object])
], NextEventsComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=next-events.component.js.map

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Day; });
var Day = (function () {
    function Day(date) {
        this.events = [];
        this.date = date;
    }
    return Day;
}());

//# sourceMappingURL=day.js.map

/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Event; });
var Event = (function () {
    function Event(date, summary, hasTime, person) {
        this.date = date;
        this.summary = summary;
        this.hasTime = hasTime;
        this.person = person;
    }
    return Event;
}());

//# sourceMappingURL=event.js.map

/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__quote_component__ = __webpack_require__(245);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__quote_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_basePanel__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuoteComponent; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Quote = (function () {
    function Quote(text, author) {
        this.text = text;
        this.author = author;
    }
    return Quote;
}());
var QuoteComponent = (function (_super) {
    __extends(QuoteComponent, _super);
    function QuoteComponent(cookieService, http) {
        var _this = _super.call(this, 'quote', 60 * 60, cookieService) || this;
        _this.cookieService = cookieService;
        _this.http = http;
        _this.quote = new Quote('', '');
        return _this;
    }
    QuoteComponent.prototype.parse = function (data) {
        var el = $($.parseXML(data.text()));
        this.quote = new Quote(el.find('item description').text(), el.find('author').text());
        this.saveData(this.quote);
    };
    QuoteComponent.prototype.refreshData = function () {
        var _this = this;
        var observer = this.http.get('https://crossorigin.me/http://spruchsammlung.com/content/rssquotes');
        observer.subscribe(function (data) { return _this.parse(data); }, function (error) { return console.error('Error: ' + error); }, function () { return console.log('Received Quote!'); });
    };
    QuoteComponent.prototype.loadSavedData = function () {
        this.quote = _super.prototype.loadSavedData.call(this);
    };
    QuoteComponent.prototype.enableConditions = function () {
        return {
            onlineStatus: this.onlineStatus === 'online'
        };
    };
    return QuoteComponent;
}(__WEBPACK_IMPORTED_MODULE_3__shared_basePanel__["a" /* BasePanel */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], QuoteComponent.prototype, "onlineStatus", void 0);
QuoteComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-quote',
        template: __webpack_require__(285),
        styles: [__webpack_require__(270)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__["CookieService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__["CookieService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _b || Object])
], QuoteComponent);

var _a, _b;
//# sourceMappingURL=quote.component.js.map

/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__schedule_component__ = __webpack_require__(247);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__schedule_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_basePanel__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_classDuration__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_settings__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScheduleComponent; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ClassInfo = (function () {
    function ClassInfo(classDuration, subject) {
        this.classDuration = classDuration;
        this.subject = subject;
    }
    return ClassInfo;
}());
var Schedule = (function () {
    function Schedule(displayedDate, classInfos) {
        this.displayedDate = displayedDate;
        this.classInfos = classInfos;
    }
    return Schedule;
}());
var ScheduleComponent = (function (_super) {
    __extends(ScheduleComponent, _super);
    function ScheduleComponent(cookieService, settings) {
        var _this = _super.call(this, 'schedule', 5 * 60, cookieService) || this;
        _this.cookieService = cookieService;
        _this.settings = settings;
        _this.classDurations = __WEBPACK_IMPORTED_MODULE_3__shared_classDuration__["a" /* ClassDuration */].importFromClassDurationNumbers(settings.classDurationNumbers);
        return _this;
    }
    ScheduleComponent.prototype.enableConditions = function () {
        return {};
    };
    ScheduleComponent.prototype.timeTableHasClasses = function (date) {
        return this.settings.timeTable[date.getDay()].length > 0;
    };
    ScheduleComponent.prototype.getNextDay = function (day) {
        return new Date(day.getTime() + 24 * 60 * 60 * 1000);
    };
    ScheduleComponent.prototype.getDisplayedDate = function (currentDate) {
        var displayedDay;
        if (currentDate > this.classDurations[this.classDurations.length - 1].to) {
            displayedDay = this.getNextDay(currentDate);
        }
        else {
            displayedDay = currentDate;
        }
        while (!this.timeTableHasClasses(displayedDay)) {
            displayedDay = this.getNextDay(displayedDay);
        }
        return displayedDay;
    };
    ScheduleComponent.prototype.getClassInfos = function (classDurations, timeTable, date) {
        return timeTable[date.getDay()].map(function (e, i) { return new ClassInfo(classDurations[i], e); });
    };
    ScheduleComponent.prototype.refreshData = function () {
        var displayedDay = this.getDisplayedDate(new Date());
        var classInfos = this.getClassInfos(this.classDurations, this.settings.timeTable, displayedDay);
        this.schedule = new Schedule(displayedDay, classInfos);
        this.saveData(this.schedule);
    };
    ScheduleComponent.prototype.getClassInfoClass = function (classDuration) {
        if (this.isDateInClassDuration(new Date(), classDuration)) {
            return 'info';
        }
        else {
            return '';
        }
    };
    ScheduleComponent.prototype.isDateInClassDuration = function (date, classDuration) {
        return date === this.getDisplayedDate(date) && date > classDuration.from && date < classDuration.to;
    };
    return ScheduleComponent;
}(__WEBPACK_IMPORTED_MODULE_1__shared_basePanel__["a" /* BasePanel */]));
ScheduleComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-schedule',
        template: __webpack_require__(286),
        styles: [__webpack_require__(271)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__["CookieService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__["CookieService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__shared_settings__["a" /* Settings */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_settings__["a" /* Settings */]) === "function" && _b || Object])
], ScheduleComponent);

var _a, _b;
//# sourceMappingURL=schedule.component.js.map

/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClassDuration; });
var ClassDuration = (function () {
    function ClassDuration(classDurationNumbers) {
        this.from = ClassDuration.dateFromHourAndMinute(classDurationNumbers[0][0], classDurationNumbers[0][1]);
        this.to = ClassDuration.dateFromHourAndMinute(classDurationNumbers[1][0], classDurationNumbers[1][1]);
    }
    ClassDuration.dateFromHourAndMinute = function (hour, minute) {
        var today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minute);
    };
    ClassDuration.importFromClassDurationNumbers = function (classDurationNumbers) {
        var classDurations = [];
        for (var i = 0; i < classDurationNumbers.length; i++) {
            classDurations.push(new ClassDuration(classDurationNumbers[i]));
        }
        return classDurations;
    };
    return ClassDuration;
}());

//# sourceMappingURL=classDuration.js.map

/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_settings__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
/// <reference path="../../../typings/globals/gapi.client/gapi.client.plus.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthenticationService = AuthenticationService_1 = (function () {
    function AuthenticationService(settings) {
        this.settings = settings;
        /*
         * global application state, so it's OK to keep it as field value of a singleton. alternative would be a
         * buitl-in global value store.
         */
        this.isAuthenticated = false;
        // check the authentication silently
        this.internalAuthenticate(true);
    }
    AuthenticationService.prototype.login = function () {
        // check the authentication and present a dialog on failure
        this.internalAuthenticate(false);
    };
    AuthenticationService.prototype.internalAuthenticate = function (immediate) {
        var _this = this;
        /* heavily use promises here for 2 reasons:
         *
         * nr1: readability (image callback syntax here :( )
         * nr2: ui synchronisation: due to the GAPI, the result is handled in a callback,
         *		angular does therefor not know of any scope changes. since ther is no scope
         *		as in angular1 one cannot manually trigger the scope digest.
         *		Using Promises solves this problem since the scope digest is triggered on
         *		resove() and reject().
         * The callbacks passed to then() are lambdas to ensure the call applies to the correct
         * scope.
         */
        return __WEBPACK_IMPORTED_MODULE_2__index__["d" /* WaitService */].waitForIt(gapi, 'client')
            .then(function () { return _this.proceedAuthentication(immediate); })
            .then(function () { return _this.initializeGooglePlusAPI(); })
            .then(function () { return _this.initializeGoogleCalendarAPI(); })
            .then(function () { return _this.loadGooglePlusUserData(); })
            .then(function (response) { return _this.setUserData(response.result.displayName, response.result.image.url); })
            .catch(function (error) { console.log('authentication failed: ' + error); });
    };
    AuthenticationService.prototype.proceedAuthentication = function (immediate) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('proceed authentication - immediate: ' + immediate);
            gapi.client.setApiKey(AuthenticationService_1.apiKey);
            var authorisationRequestData = {
                client_id: AuthenticationService_1.clientId,
                scope: AuthenticationService_1.scopes,
                immediate: immediate,
                response_type: 'token'
            };
            gapi.auth.authorize(authorisationRequestData, function (authenticationResult) {
                if (authenticationResult && !authenticationResult.error) {
                    _this.isAuthenticated = true;
                    _this.setUserData('unknown', '');
                    resolve('authenticated');
                }
                else {
                    _this.isAuthenticated = false;
                    _this.setUserData('', '');
                    reject('not authenticated');
                }
            });
        }).catch(function (reason) {
            console.log('proceedAuthentication Error: ' + reason);
        });
    };
    AuthenticationService.prototype.initializeGooglePlusAPI = function () {
        return new Promise(function (resolve, reject) {
            console.log('initialize Google Plus API');
            var loadPromise = gapi.client.load('plus', 'v1');
            if (loadPromise.catch !== undefined) {
                loadPromise.catch(function (reason) { debugger; });
            }
            resolve(loadPromise);
        }).catch(function (reason) {
            console.log('initializeGooglePlusAPI Error: ' + reason);
        });
    };
    AuthenticationService.prototype.initializeGoogleCalendarAPI = function () {
        return new Promise(function (resolve, reject) {
            console.log('initialize Google Calendar API');
            resolve(gapi.client.load('calendar', 'v3'));
        }).catch(function (reason) {
            console.log('initializeGoogleCalendarAPI Error: ' + reason);
        });
    };
    AuthenticationService.prototype.loadGooglePlusUserData = function () {
        return new Promise(function (resolve, reject) {
            console.log('load Google Plus data');
            resolve(gapi.client.plus.people.get({ 'userId': 'me' }));
        }).catch(function (reason) {
            console.log('loadGooglePlusUserData Error: ' + reason);
        });
    };
    AuthenticationService.prototype.setUserData = function (userName, userImageUrl) {
        this.userName = userName;
        this.userImageUrl = userImageUrl;
        console.log('user: ' + this.userName + ', image: ' + this.userImageUrl);
    };
    return AuthenticationService;
}());
AuthenticationService.clientId = '1078497277864-qqbub1tptpk82t6n79of58t4san95sng.apps.googleusercontent.com';
AuthenticationService.apiKey = 'AIzaSyDqnBamyp-2_KLiekRLSkq4dtYVOnM0dbA';
AuthenticationService.scopes = ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/calendar.readonly'];
AuthenticationService = AuthenticationService_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_settings__["a" /* Settings */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_settings__["a" /* Settings */]) === "function" && _a || Object])
], AuthenticationService);

var AuthenticationService_1, _a;
//# sourceMappingURL=authentication.service.js.map

/***/ }),

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calendar_shared_calendar__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var CalendarService = CalendarService_1 = (function () {
    function CalendarService() {
    }
    CalendarService.getDayCountOfMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    };
    CalendarService.getFirstDayNumber = function (date) {
        var firstDayNumber = date.getDay() - 1;
        if (firstDayNumber === -1) {
            firstDayNumber = 7;
        }
        return firstDayNumber;
    };
    CalendarService.getDateString = function (date) {
        var mm = date.getMonth() + 1; // getMonth() is zero-based
        var dd = date.getDate();
        return [date.getFullYear(), !mm[1] && '0', mm, !dd[1] && '0', dd].join(''); // padding
    };
    CalendarService.isToday = function (date) {
        var today = new Date();
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth();
    };
    CalendarService.isWeekend = function (date) {
        var weekday = date.getDay();
        return weekday === 0 || weekday === 6;
    };
    CalendarService.prototype.getCalendarDaysArray = function (date, events) {
        var days = [];
        var year = date.getFullYear();
        var month = date.getMonth();
        var dayCountOfMonth = CalendarService_1.getDayCountOfMonth(date);
        var firstDayNumber = CalendarService_1.getFirstDayNumber(date);
        var offset = firstDayNumber;
        var eventDates = events.map(function (event) { return CalendarService_1.getDateString(event.date); });
        for (var i = 0 + offset; i < dayCountOfMonth + offset - 1; i++) {
            var row = Math.floor(i / 7);
            days[row] = days[row] || [];
            var newDate = new Date(year, month, i - offset + 1);
            var calendarDay = new __WEBPACK_IMPORTED_MODULE_0__calendar_shared_calendar__["b" /* CalendarDay */]();
            calendarDay.date = newDate;
            calendarDay.hasEvents = eventDates.indexOf(CalendarService_1.getDateString(newDate)) !== -1;
            days[row][i % 7] = calendarDay;
        }
        return days;
    };
    CalendarService.prototype.getCalendar = function (date, events) {
        var calendar = new __WEBPACK_IMPORTED_MODULE_0__calendar_shared_calendar__["a" /* Calendar */]();
        calendar.date = date;
        calendar.days = this.getCalendarDaysArray(date, events);
        return calendar;
    };
    return CalendarService;
}());
CalendarService = CalendarService_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])()
], CalendarService);

var CalendarService_1;
//# sourceMappingURL=calendar.service.js.map

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__next_events_shared_event__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__next_events_shared_day__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appointments_service__ = __webpack_require__(53);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NextEventsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NextEventsService = NextEventsService_1 = (function () {
    function NextEventsService(appointmentsService) {
        this.appointmentsService = appointmentsService;
    }
    NextEventsService.dateToString = function (date) {
        return date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString();
    };
    NextEventsService.prototype.getDaysWithEvents = function (count, callback) {
        var _this = this;
        this.appointmentsService.loadAppointments().then(function (appointments) {
            var daysWithEvents = _this.getDaysWithEventsFromAppointments(appointments).slice(0, count);
            callback(daysWithEvents);
        });
    };
    NextEventsService.prototype.getDaysWithEventsFromAppointments = function (appointments) {
        var _this = this;
        var events = this.getEvents(appointments);
        var days = [];
        var startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        events.forEach(function (event) {
            var date = event.date;
            if (date.toString() === 'NaN') {
                return;
            }
            ;
            if (date < startOfToday) {
                return;
            }
            ;
            _this.addDayToArrayIfNeeded(date, days);
            var day = _this.findDayForDate(date, days);
            day.events.push(event);
        });
        return days;
    };
    NextEventsService.prototype.getEvents = function (appointments) {
        var _this = this;
        return appointments
            .filter(function (eventItem) { return eventItem.start !== undefined; })
            .map(function (eventItem) { return _this.createEventFromIEvent(eventItem); })
            .sort(function (a, b) { return a.date.getTime() - b.date.getTime(); });
    };
    NextEventsService.prototype.createEventFromIEvent = function (eventItem) {
        var hasTime = eventItem.start.dateTime !== undefined;
        var date = hasTime ? eventItem.start.dateTime : eventItem.start.date;
        var displayName = eventItem.creator.displayName;
        if (displayName.includes('webcal')) {
            displayName = null;
        }
        return new __WEBPACK_IMPORTED_MODULE_0__next_events_shared_event__["a" /* Event */](new Date(date), eventItem.summary, hasTime, displayName);
    };
    NextEventsService.prototype.addDayToArrayIfNeeded = function (date, days) {
        var newDays = days;
        var day = this.findDayForDate(date, days);
        if (day == null) {
            newDays.push(new __WEBPACK_IMPORTED_MODULE_1__next_events_shared_day__["a" /* Day */](date));
        }
    };
    NextEventsService.prototype.findDayForDate = function (date, days) {
        return days.find(function (day) { return (NextEventsService_1.dateToString(day.date) === NextEventsService_1.dateToString(date)); });
    };
    return NextEventsService;
}());
NextEventsService = NextEventsService_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__appointments_service__["a" /* AppointmentsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__appointments_service__["a" /* AppointmentsService */]) === "function" && _a || Object])
], NextEventsService);

var NextEventsService_1, _a;
//# sourceMappingURL=next-events.service.js.map

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WaitService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var WaitService = (function () {
    function WaitService() {
    }
    WaitService.waitForIt = function (objectToObserve, propertyToObserve) {
        return new Promise(function (resolve, reject) {
            var checkIt = function (objectToObserve, propertyToObserve) {
                if (typeof objectToObserve[propertyToObserve] == 'undefined') {
                    console.log('Waiting 0.5 Second for property ' + propertyToObserve + ' on ' + objectToObserve);
                    setTimeout(checkIt, 500, objectToObserve, propertyToObserve);
                }
                else {
                    resolve(objectToObserve[propertyToObserve]);
                }
            };
            checkIt(objectToObserve, propertyToObserve);
        });
    };
    WaitService.waitForTrue = function (objectToObserve, propertyToObserve) {
        return new Promise(function (resolve, reject) {
            var checkIt = function (objectToObserve, propertyToObserve) {
                if (objectToObserve[propertyToObserve] === false) {
                    console.log('Waiting 0.5 Second for property ' + propertyToObserve + ' on ' + objectToObserve);
                    setTimeout(checkIt, 500, objectToObserve, propertyToObserve);
                }
                else {
                    console.log('Found property ' + propertyToObserve + ' in state ' + objectToObserve[propertyToObserve]);
                    resolve(objectToObserve[propertyToObserve]);
                }
            };
            checkIt(objectToObserve, propertyToObserve);
        });
    };
    return WaitService;
}());
WaitService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], WaitService);

//# sourceMappingURL=waitService.js.map

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_settings__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SettingsComponent = (function () {
    function SettingsComponent(cookieService, settings) {
        this.cookieService = cookieService;
        this.settings = settings;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        this.settings = this.settings || new __WEBPACK_IMPORTED_MODULE_2__shared_settings__["a" /* Settings */]();
    };
    SettingsComponent.prototype.addHourToSchedule = function () {
        this.settings.classDurationNumbers.push([[0, 0], [0, 0]]);
        event.preventDefault();
    };
    SettingsComponent.prototype.removeHourFromSchedule = function () {
        this.settings.classDurationNumbers.pop();
        event.preventDefault();
    };
    SettingsComponent.prototype.hourArray = function () {
        return this.settings.classDurationNumbers.map(function (_, i) { return i; });
    };
    SettingsComponent.prototype.onSubmit = function () {
        this.cookieService.putObject('settings', this.settings);
        window.history.back();
    };
    return SettingsComponent;
}());
SettingsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-settings',
        template: __webpack_require__(287),
        styles: [__webpack_require__(272)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__["CookieService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__["CookieService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_settings__["a" /* Settings */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_settings__["a" /* Settings */]) === "function" && _b || Object])
], SettingsComponent);

var _a, _b;
//# sourceMappingURL=settings.component.js.map

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__weather_component__ = __webpack_require__(255);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__weather_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_settings__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_basePanel__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WeatherComponent; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Weather = (function () {
    function Weather(averageTemp, icon) {
        this.averageTemp = averageTemp;
        this.icon = icon;
    }
    return Weather;
}());
var DailyWeatherInfo = (function () {
    function DailyWeatherInfo(date, icon, minTemp, maxTemp) {
        this.date = date;
        this.icon = icon;
        this.minTemp = minTemp;
        this.maxTemp = maxTemp;
    }
    return DailyWeatherInfo;
}());
var WeatherForcast = (function () {
    function WeatherForcast(summary) {
        this.summary = summary;
        this.dailyWeatherInfos = [];
    }
    return WeatherForcast;
}());
var WeatherComponent = (function (_super) {
    __extends(WeatherComponent, _super);
    function WeatherComponent(cookieService, http, settings) {
        var _this = _super.call(this, 'weather', 30 * 6, cookieService) || this;
        _this.cookieService = cookieService;
        _this.http = http;
        _this.settings = settings;
        return _this;
    }
    WeatherComponent.prototype.enableConditions = function () {
        return {
            forecastIoApiKey: this.settings.forecastIoApiKey !== undefined,
            onlineStatus: this.onlineStatus === 'online',
        };
    };
    WeatherComponent.prototype.loadSavedData = function () {
        this.weatherForcast = _super.prototype.loadSavedData.call(this);
    };
    WeatherComponent.prototype.getIconClass = function (icon) {
        switch (icon) {
            case 'clear-day':
                return 'icon-sun-inv';
            case 'clear-night':
                return 'icon-moon-inv';
            case 'rain':
                return 'icon-rain-inv';
            case 'sleet':
            case 'snow':
                return 'icon-snow-heavy-inv';
            case 'wind':
                return 'icon-windy-inv';
            case 'fog':
                return 'icon-fog';
            case 'cloudy':
                return 'icon-cloud-inv';
            case 'partly-cloudy-day':
                return 'icon-cloud-sun-inv';
            case 'partly-cloudy-night':
                return 'icon-cloud-moon-inv';
        }
    };
    WeatherComponent.prototype.darkSkyRequestString = function () {
        var apiKey = this.settings.forecastIoApiKey;
        var darkSkyPath = "https://api.darksky.net/forecast/" + apiKey + "/" + this.longitude + "," + this.latitude + "?units=ca&lang=de";
        return "https://crossorigin.me/" + darkSkyPath;
    };
    WeatherComponent.prototype.createDailyWeatherInfos = function (dailyData) {
        var dailyWeatherInfos = [];
        dailyData.slice(0, 2).forEach(function (dayData) {
            var maxTemp = Math.round(parseFloat(dayData.temperatureMax));
            var minTemp = Math.round(parseFloat(dayData.temperatureMin));
            var date = new Date(dayData.time * 1000);
            var dailyWeatherInfo = new DailyWeatherInfo(date, dayData.icon, maxTemp, minTemp);
            dailyWeatherInfos.push(dailyWeatherInfo);
        });
        return dailyWeatherInfos;
    };
    WeatherComponent.prototype.enrichDailyWeatherInfos = function (hourlyData, dailyWeatherInfos) {
        hourlyData.slice(1).forEach(function (entry, index) {
            var date = new Date(entry.time * 1000);
            var dailyWeatherInfo = dailyWeatherInfos[date.getDate() - (new Date()).getDate()];
            if (dailyWeatherInfo) {
                var weather = new Weather(Math.round(entry.temperature), entry.icon);
                if (date.getHours() === 8) {
                    dailyWeatherInfo.morning = weather;
                }
                if (date.getHours() === 13) {
                    dailyWeatherInfo.midday = weather;
                }
                if (date.getHours() === 17) {
                    dailyWeatherInfo.afternoon = weather;
                }
                if (date.getHours() === 20) {
                    dailyWeatherInfo.evening = weather;
                }
            }
        });
        return dailyWeatherInfos;
    };
    WeatherComponent.prototype.refreshData = function () {
        var _this = this;
        this.http.get(this.darkSkyRequestString()).subscribe(function (data) {
            var json = data.json();
            _this.weatherForcast = new WeatherForcast(json.daily.summary);
            var basicDailyWeatherInfos = _this.createDailyWeatherInfos(json.daily.data);
            _this.weatherForcast.isCurrentyRaining = json.hourly.data[0].icon === 'rain';
            _this.weatherForcast.dailyWeatherInfos = _this.enrichDailyWeatherInfos(json.hourly.data, basicDailyWeatherInfos);
            json.hourly.data.slice(1).forEach(function (entry, index) {
                var date = new Date(entry.time * 1000);
                if (_this.weatherForcast.precipAt == null) {
                    var precipProbability = Math.round(entry.precipProbability * 100);
                    if (precipProbability > 20) {
                        _this.weatherForcast.precipProbability = precipProbability;
                        _this.weatherForcast.precipAt = date;
                    }
                }
                if (_this.weatherForcast.precipStopAt == null) {
                    var precipProbability = Math.round(entry.precipProbability * 100);
                    if (precipProbability < 20) {
                        _this.weatherForcast.precipStopAt = date;
                    }
                }
            });
            _super.prototype.saveData.call(_this, _this.weatherForcast);
        });
    };
    return WeatherComponent;
}(__WEBPACK_IMPORTED_MODULE_4__shared_basePanel__["a" /* BasePanel */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], WeatherComponent.prototype, "city", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], WeatherComponent.prototype, "longitude", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], WeatherComponent.prototype, "latitude", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], WeatherComponent.prototype, "onlineStatus", void 0);
WeatherComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-weather',
        template: __webpack_require__(288),
        styles: [__webpack_require__(274), __webpack_require__(273)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__["CookieService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__["CookieService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_settings__["a" /* Settings */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_settings__["a" /* Settings */]) === "function" && _c || Object])
], WeatherComponent);

var _a, _b, _c;
// 7-10 11-14 15-18 
//# sourceMappingURL=weather.component.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, ".navbar-right{\n     margin-right: 10px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, "table.calendar tr th, table.calendar tr td {\r\n  padding: 1px;\r\n  text-align: center;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, ".camera image {\r\n  max-height: 100%;\r\n}\r\n.last-update {\r\n  float: right;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, ".clock .time {\r\n  font-size: 4.5em;\r\n  font-size: 4.5vw;\r\n}\r\n.clock .date {\r\n  font-size: 3em;\r\n  font-size: 3vw;\r\n}\r\n.clock .day {\r\n  font-size: 3em;\r\n  font-size: 3vw;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, ".dashboard{\r\n    margin-top:60px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, ".humidity{\n  margin-top: 5px;\n  text-align: center;\n  font-size: 1.9em;\n}\n.date{\n  margin: 0 5px 5px 0;\n  text-align: right;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, "img {\r\n  height: 50px;\r\n  width: 50px;\r\n  float: left;\r\n  margin: 0 5px 5px 0;\r\n}\r\nli {\r\n  min-height: 70px\r\n}\r\n.last-update {\r\n  float: right;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, ".date {\r\n  padding: 5px;\r\n  font-size: 1em;\r\n  font-size: 1.2vw;\r\n  border-right: 1px solid;\r\n  border-color: #ddd;\r\n}\r\n.list-group-item {\r\n  border: none;\r\n  background-color: transparent;\r\n}\r\n.list-group {\r\n  margin-bottom: 0px;\r\n}\r\n.last-update {\r\n  float: right;\r\n}\r\n.error-message {\r\n  color: red;\r\n}\r\n.table li {\r\n  padding: 2px;\r\n}\r\n.table>tbody>tr>td {\r\n  vertical-align: middle;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, ".last-update {\r\n  float: right;\r\n}\r\nblockquote {\r\n  margin: 0;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 271:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, ".lead {\r\n  margin-bottom: 0px;\r\n}\r\n.time {\r\n  text-align: center;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, ".classDurationSpacer{\r\n  width: 5px;\r\n}\r\n.classDurationColumn{\r\n  width: 25px;\r\n}\r\n.settings{\r\n    margin-top:60px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 273:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, "@font-face {\r\n  font-family: 'kitchenboardweather';\r\n  src: url('/http:/dmasur.github.io/kitchen-board/src/assets/font/kitchenboardweather.eot?21755287');\r\n  src: url('/http:/dmasur.github.io/kitchen-board/src/assets/font/kitchenboardweather.eot?21755287#iefix') format('embedded-opentype'),\r\n       url('/http:/dmasur.github.io/kitchen-board/src/assets/font/kitchenboardweather.woff2?21755287') format('woff2'),\r\n       url('/http:/dmasur.github.io/kitchen-board/src/assets/font/kitchenboardweather.woff?21755287') format('woff'),\r\n       url('/http:/dmasur.github.io/kitchen-board/src/assets/font/kitchenboardweather.ttf?21755287') format('truetype'),\r\n       url('/http:/dmasur.github.io/kitchen-board/src/assets/font/kitchenboardweather.svg?21755287#kitchenboardweather') format('svg');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n}\r\n/* Chrome hack: SVG is rendered more smooth in Windozze. 100% magic, uncomment if you need it. */\r\n/* Note, that will break hinting! In other OS-es font will be not as sharp as it could be */\r\n/*\r\n@media screen and (-webkit-min-device-pixel-ratio:0) {\r\n  @font-face {\r\n    font-family: 'kitchenboardweather';\r\n    src: url('../font/kitchenboardweather.svg?21755287#kitchenboardweather') format('svg');\r\n  }\r\n}\r\n*/\r\n\r\n [class^=\"icon-\"]:before, [class*=\" icon-\"]:before {\r\n  font-family: \"kitchenboardweather\";\r\n  font-style: normal;\r\n  font-weight: normal;\r\n  speak: none;\r\n\r\n  display: inline-block;\r\n  text-decoration: inherit;\r\n  width: 1em;\r\n  margin-right: .2em;\r\n  text-align: center;\r\n  /* opacity: .8; */\r\n\r\n  /* For safety - reset parent styles, that can break glyph codes*/\r\n  font-variant: normal;\r\n  text-transform: none;\r\n\r\n  /* fix buttons height, for twitter bootstrap */\r\n  line-height: 1em;\r\n\r\n  /* Animation center compensation - margins should be symmetric */\r\n  /* remove if not needed */\r\n  margin-left: .2em;\r\n\r\n  /* you can be more comfortable with increased icons size */\r\n  /* font-size: 120%; */\r\n\r\n  /* Font smoothing. That was taken from TWBS */\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n\r\n  /* Uncomment for 3D effect */\r\n  /* text-shadow: 1px 1px 1px rgba(127, 127, 127, 0.3); */\r\n}\r\n\r\n.icon-sun-inv:before { content: '\\E800'; } /* '' */\r\n.icon-moon-inv:before { content: '\\E801'; } /* '' */\r\n.icon-cloud-sun-inv:before { content: '\\E802'; } /* '' */\r\n.icon-cloud-moon-inv:before { content: '\\E803'; } /* '' */\r\n.icon-rain-inv:before { content: '\\E804'; } /* '' */\r\n.icon-snow-heavy-inv:before { content: '\\E805'; } /* '' */\r\n.icon-windy-inv:before { content: '\\E806'; } /* '' */\r\n.icon-fog:before { content: '\\E807'; } /* '' */\r\n.icon-cloud-inv:before { content: '\\E808'; } /* '' */", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 274:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, "i {\r\n  font-size: 2em;\r\n}\r\n.icon {\r\n  text-align: center;\r\n}\r\n.time, .temp, .precip, .day {\r\n  font-size: 1.9vw;\r\n  vertical-align: center;\r\n  text-align: center;\r\n}\r\n.last-update {\r\n  float: right;\r\n}\r\n.rain {\r\n  font-size: 1.5vw;\r\n  text-align: center;\r\n}\r\n.dailyInfos{\r\n  width: 100%;\r\n  vertical-align: center;\r\n  text-align: center;\r\n}\r\n.weather{\r\n  font-size: 1em;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 66,
	"./af.js": 66,
	"./ar": 73,
	"./ar-dz": 67,
	"./ar-dz.js": 67,
	"./ar-kw": 68,
	"./ar-kw.js": 68,
	"./ar-ly": 69,
	"./ar-ly.js": 69,
	"./ar-ma": 70,
	"./ar-ma.js": 70,
	"./ar-sa": 71,
	"./ar-sa.js": 71,
	"./ar-tn": 72,
	"./ar-tn.js": 72,
	"./ar.js": 73,
	"./az": 74,
	"./az.js": 74,
	"./be": 75,
	"./be.js": 75,
	"./bg": 76,
	"./bg.js": 76,
	"./bn": 77,
	"./bn.js": 77,
	"./bo": 78,
	"./bo.js": 78,
	"./br": 79,
	"./br.js": 79,
	"./bs": 80,
	"./bs.js": 80,
	"./ca": 81,
	"./ca.js": 81,
	"./cs": 82,
	"./cs.js": 82,
	"./cv": 83,
	"./cv.js": 83,
	"./cy": 84,
	"./cy.js": 84,
	"./da": 85,
	"./da.js": 85,
	"./de": 88,
	"./de-at": 86,
	"./de-at.js": 86,
	"./de-ch": 87,
	"./de-ch.js": 87,
	"./de.js": 88,
	"./dv": 89,
	"./dv.js": 89,
	"./el": 90,
	"./el.js": 90,
	"./en-au": 91,
	"./en-au.js": 91,
	"./en-ca": 92,
	"./en-ca.js": 92,
	"./en-gb": 93,
	"./en-gb.js": 93,
	"./en-ie": 94,
	"./en-ie.js": 94,
	"./en-nz": 95,
	"./en-nz.js": 95,
	"./eo": 96,
	"./eo.js": 96,
	"./es": 98,
	"./es-do": 97,
	"./es-do.js": 97,
	"./es.js": 98,
	"./et": 99,
	"./et.js": 99,
	"./eu": 100,
	"./eu.js": 100,
	"./fa": 101,
	"./fa.js": 101,
	"./fi": 102,
	"./fi.js": 102,
	"./fo": 103,
	"./fo.js": 103,
	"./fr": 106,
	"./fr-ca": 104,
	"./fr-ca.js": 104,
	"./fr-ch": 105,
	"./fr-ch.js": 105,
	"./fr.js": 106,
	"./fy": 107,
	"./fy.js": 107,
	"./gd": 108,
	"./gd.js": 108,
	"./gl": 109,
	"./gl.js": 109,
	"./gom-latn": 110,
	"./gom-latn.js": 110,
	"./he": 111,
	"./he.js": 111,
	"./hi": 112,
	"./hi.js": 112,
	"./hr": 113,
	"./hr.js": 113,
	"./hu": 114,
	"./hu.js": 114,
	"./hy-am": 115,
	"./hy-am.js": 115,
	"./id": 116,
	"./id.js": 116,
	"./is": 117,
	"./is.js": 117,
	"./it": 118,
	"./it.js": 118,
	"./ja": 119,
	"./ja.js": 119,
	"./jv": 120,
	"./jv.js": 120,
	"./ka": 121,
	"./ka.js": 121,
	"./kk": 122,
	"./kk.js": 122,
	"./km": 123,
	"./km.js": 123,
	"./kn": 124,
	"./kn.js": 124,
	"./ko": 125,
	"./ko.js": 125,
	"./ky": 126,
	"./ky.js": 126,
	"./lb": 127,
	"./lb.js": 127,
	"./lo": 128,
	"./lo.js": 128,
	"./lt": 129,
	"./lt.js": 129,
	"./lv": 130,
	"./lv.js": 130,
	"./me": 131,
	"./me.js": 131,
	"./mi": 132,
	"./mi.js": 132,
	"./mk": 133,
	"./mk.js": 133,
	"./ml": 134,
	"./ml.js": 134,
	"./mr": 135,
	"./mr.js": 135,
	"./ms": 137,
	"./ms-my": 136,
	"./ms-my.js": 136,
	"./ms.js": 137,
	"./my": 138,
	"./my.js": 138,
	"./nb": 139,
	"./nb.js": 139,
	"./ne": 140,
	"./ne.js": 140,
	"./nl": 142,
	"./nl-be": 141,
	"./nl-be.js": 141,
	"./nl.js": 142,
	"./nn": 143,
	"./nn.js": 143,
	"./pa-in": 144,
	"./pa-in.js": 144,
	"./pl": 145,
	"./pl.js": 145,
	"./pt": 147,
	"./pt-br": 146,
	"./pt-br.js": 146,
	"./pt.js": 147,
	"./ro": 148,
	"./ro.js": 148,
	"./ru": 149,
	"./ru.js": 149,
	"./sd": 150,
	"./sd.js": 150,
	"./se": 151,
	"./se.js": 151,
	"./si": 152,
	"./si.js": 152,
	"./sk": 153,
	"./sk.js": 153,
	"./sl": 154,
	"./sl.js": 154,
	"./sq": 155,
	"./sq.js": 155,
	"./sr": 157,
	"./sr-cyrl": 156,
	"./sr-cyrl.js": 156,
	"./sr.js": 157,
	"./ss": 158,
	"./ss.js": 158,
	"./sv": 159,
	"./sv.js": 159,
	"./sw": 160,
	"./sw.js": 160,
	"./ta": 161,
	"./ta.js": 161,
	"./te": 162,
	"./te.js": 162,
	"./tet": 163,
	"./tet.js": 163,
	"./th": 164,
	"./th.js": 164,
	"./tl-ph": 165,
	"./tl-ph.js": 165,
	"./tlh": 166,
	"./tlh.js": 166,
	"./tr": 167,
	"./tr.js": 167,
	"./tzl": 168,
	"./tzl.js": 168,
	"./tzm": 170,
	"./tzm-latn": 169,
	"./tzm-latn.js": 169,
	"./tzm.js": 170,
	"./uk": 171,
	"./uk.js": 171,
	"./ur": 172,
	"./ur.js": 172,
	"./uz": 174,
	"./uz-latn": 173,
	"./uz-latn.js": 173,
	"./uz.js": 174,
	"./vi": 175,
	"./vi.js": 175,
	"./x-pseudo": 176,
	"./x-pseudo.js": 176,
	"./yo": 177,
	"./yo.js": 177,
	"./zh-cn": 178,
	"./zh-cn.js": 178,
	"./zh-hk": 179,
	"./zh-hk.js": 179,
	"./zh-tw": 180,
	"./zh-tw.js": 180
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 276;


/***/ }),

/***/ 277:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\n  <div class=\"container-fluid\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" [routerLink]=\"['/dashboard']\">Übersicht<span *ngIf=\"onlineStatus == 'offline'\"> (Offine Mode)</span></a>\n    </div>\n    <div id=\"navbar\" class=\"navbar-collapse collapse\">\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li><a [routerLink]=\"['/settings']\">Einstellungen</a></li>\n        <li *ngIf=\"!authenticationService.isAuthenticated\">\n          <!-- (click) binds the components authenticationService.login() method to the onClick-event -->\n          <button class=\"btn btn-default navbar-btn\" (click)=\"authenticationService.login()\">Login with Google</button>\n        </li>\n        <li *ngIf=\"authenticationService.isAuthenticated\">\n          <p class=\"navbar-text\">{{authenticationService.userName}}</p>\n        </li>\n      </ul>\n    </div>\n  </div>\n</nav>\n<router-outlet></router-outlet>"

/***/ }),

/***/ 278:
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-default\">\r\n  <div class=\"panel-heading\">\r\n    <span class=\"lead\" *ngIf=\"calendar\">{{calendar.date | amDateFormat:'MMMM'}}</span>\r\n    <span *ngIf=\"!isEnabled\" class=\"alert-danger\">Disabled</span>\r\n  </div>\r\n  <table class=\"table calendar\" *ngIf=\"calendar\">\r\n    <thead>\r\n      <tr class=\"days\">\r\n        <th>M</th>\r\n        <th>D</th>\r\n        <th>M</th>\r\n        <th>D</th>\r\n        <th>F</th>\r\n        <th>S</th>\r\n        <th>S</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr *ngFor=\"let week of calendar.days\">\r\n        <td *ngFor=\"let day of week\" class=\"{{getDayClass(day)}}\">\r\n          <span *ngIf=\"day\">{{day.date | amDateFormat:'D'}}</span>\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</div>"

/***/ }),

/***/ 279:
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-default camera\">\r\n  <div class=\"panel-heading\">\r\n    <span class=\"lead\">Eingang</span>\r\n    <span class=\"small last-update\">Stand: {{lastUpdate | amDateFormat: 'LT'}}</span>\r\n    <span class=\"small error-message\" *ngIf=\"errorMessage\"><br />Fehler: {{errorMessage}}</span>\r\n  </div>\r\n  <img id=\"cameraImage\" src=\"{{createUrl()}}\" style=\"max-height: 180px\"/>\r\n</div>"

/***/ }),

/***/ 280:
/***/ (function(module, exports) {

module.exports = "<div class=\"clock well well-lg\">\r\n  <div class=\"time text-center\">{{dateTime | amDateFormat:'LTS'}}</div>\r\n  <div class=\"day text-center\">{{dateTime | amDateFormat:'dddd'}}</div>\r\n  <div class=\"date text-center\">{{dateTime | amDateFormat:'LL'}}</div>\r\n</div>"

/***/ }),

/***/ 281:
/***/ (function(module, exports) {

module.exports = "<div class=\"dashboard container-fluid\">\r\n  <div class=\"row\">\r\n    <div class=\"col-md-6\">\r\n      <div class=\"row\">\r\n        <div class=\"item col-md-9\">\r\n          <app-quote onlineStatus={{onlineStatus}}></app-quote>\r\n        </div>\r\n          <div class=\"item col-md-3\">\r\n            <app-humidor onlineStatus={{onlineStatus}}></app-humidor>\r\n          </div>\r\n        <div class=\"item col-md-6\">\r\n          <app-clock></app-clock>\r\n          <app-schedule></app-schedule>\r\n        </div>\r\n        <div class=\"item col-md-6\">\r\n          <app-news onlineStatus={{onlineStatus}}></app-news>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"item col-md-6\">\r\n      <div class=\"row\">\r\n        <div class=\"item col-md-3\">\r\n          <div class=\"row\">\r\n            <div class=\"item col-md-12\">\r\n              <app-calendar dateString={{thisMonth}} onlineStatus={{onlineStatus}}></app-calendar>\r\n            </div>\r\n          </div>\r\n          <div class=\"row\">\r\n            <div class=\"item col-md-12\">\r\n              <app-calendar dateString={{nextMonth}} onlineStatus={{onlineStatus}}></app-calendar>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"item col-md-9\">\r\n          <app-next-events onlineStatus={{onlineStatus}}></app-next-events>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"item col-md-6\">\r\n          <app-weather city=\"Bottrop\" longitude=\"51.524722\" latitude=\"6.922778\" onlineStatus={{onlineStatus}}></app-weather>\r\n        </div>\r\n        <div class=\"item col-md-6\">\r\n          <!--<app-weather city=\"Düsseldorf\" longitude=\"51.233333\" latitude=\"6.783333\" onlineStatus={{onlineStatus}}></app-weather>-->\r\n          <app-camera onlineStatus={{onlineStatus}}></app-camera>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 282:
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-default\">\r\n  <div class=\"panel-heading\"><span class=\"lead\">Humidor</span>\r\n    <span class=\"small error-message\" *ngIf=\"errorMessage\"><br />Fehler: {{errorMessage}}</span>\r\n  </div>\r\n  <div *ngIf=\"data\">\r\n    <p class=\"humidity\">{{data.humidity}} %</p>\r\n    <footer class=\"date\">{{data.time | amTimeAgo}}</footer>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 283:
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-default\">\r\n  <div class=\"panel-heading\">\r\n    <span class=\"lead\">Nachrichten</span>\r\n    <span class=\"small last-update\">Stand: {{lastUpdate | amDateFormat: 'LT'}}</span>\r\n    <span class=\"small error-message\" *ngIf=\"errorMessage\"><br />Fehler: {{errorMessage}}</span>\r\n  </div>\r\n  <ul class=\"list-group\">\r\n    <li class=\"list-group-item\" *ngFor=\"let news of newsItems\">\r\n      <img *ngIf=\"news.image\" src=\"{{news.image}}\" />\r\n      <span>{{news.date | amDateFormat: 'LT'}}: {{news.title}}</span>\r\n    </li>\r\n  </ul>\r\n</div>"

/***/ }),

/***/ 284:
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-default\">\r\n  <div class=\"panel-heading\">\r\n    <span class=\"lead\">Nächste Termine</span>\r\n    <span class=\"small last-update\">Stand: {{lastUpdate | amDateFormat: 'LT'}}</span>\r\n    <span class=\"small error-message\" *ngIf=\"errorMessage\"><br />Fehler: {{errorMessage}}</span>\r\n    <span *ngIf=\"!isEnabled\" class=\"alert-danger\">Disabled</span>\r\n  </div>\r\n  <table class=\"table\">\r\n    <tr class=\"day row {{rowClass(day)}}\" *ngFor=\"let day of daysWithEvents\">\r\n      <td class=\"text-center date\">{{day.date | amDateFormat:'dddd'}}\r\n        <br/>{{day.events[0].date | amDateFormat:'D. MMMM'}}\r\n        <br/>{{day.date | amTimeAgo}}</td>\r\n      <td>\r\n        <ul class=\"list-group\">\r\n          <li class=\"list-group-item\" *ngFor=\"let event of day.events\">\r\n            <span *ngIf=\"event.hasTime\">{{event.date | amDateFormat:'LT'}} | </span>{{event.summary}}\r\n            <span *ngIf=\"event.person\"> | {{event.person}}</span>\r\n          </li>\r\n        </ul>\r\n      </td>\r\n    </tr>\r\n  </table>\r\n</div>"

/***/ }),

/***/ 285:
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-default\">\r\n  <div class=\"panel-heading\"><span class=\"lead\">Zitat des Tages</span>\r\n    <span class=\"small last-update\">Stand: {{lastUpdate | amDateFormat: 'LT'}}</span>\r\n    <span class=\"small error-message\" *ngIf=\"errorMessage\"><br />Fehler: {{errorMessage}}</span>\r\n  </div>\r\n  <blockquote *ngIf=\"quote\">\r\n    <p>{{quote.text}}</p>\r\n    <footer>{{quote.author}}</footer>\r\n  </blockquote>\r\n</div>"

/***/ }),

/***/ 286:
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-default\" *ngIf=\"schedule\">\r\n  <div class=\"panel-heading lead\">Stundenplan {{schedule.displayedDate | amDateFormat:'dddd'}}</div>\r\n  <table class=\"table table-striped\">\r\n    <tbody>\r\n      <tr *ngFor=\"let classInfo of schedule.classInfos\" class=\"{{getClassInfoClass(classInfo.classDuration)}}\">\r\n        <td class=\"time\">\r\n          {{classInfo.classDuration.from | amDateFormat:'LT'}} - {{classInfo.classDuration.to | amDateFormat:'LT'}}\r\n        </td>\r\n        <td>\r\n          {{classInfo.subject}}\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</div>"

/***/ }),

/***/ 287:
/***/ (function(module, exports) {

module.exports = "<div class=\"settings container\">\r\n  <form (ngSubmit)=\"onSubmit()\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-6\">\r\n        <div class=\"form-group\">\r\n          <label for=\"forecastIoApiKey\">Forecast.io Api Key</label>\r\n          <input [(ngModel)]=\"settings.forecastIoApiKey\" [ngModelOptions]=\"{standalone: true}\" type=\"text\" class=\"form-control\" id=\"forecastIoApiKey\">\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label for=\"googleClientId\">Google Client ID</label>\r\n          <input [(ngModel)]=\"settings.googleClientId\" [ngModelOptions]=\"{standalone: true}\" type=\"text\" class=\"form-control\" id=\"googleClientId\">\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label for=\"googleApiKey\">Google Api Key</label>\r\n          <input [(ngModel)]=\"settings.googleApiKey\" [ngModelOptions]=\"{standalone: true}\" type=\"text\" class=\"form-control\" id=\"googleApiKey\">\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label for=\"cameraUsername\">Foscam Username</label>\r\n          <input [(ngModel)]=\"settings.cameraUsername\" [ngModelOptions]=\"{standalone: true}\" type=\"text\" class=\"form-control\" id=\"cameraUsername\">\r\n        \r\n          <label for=\"cameraPassword\">Foscam Password</label>\r\n          <input [(ngModel)]=\"settings.cameraPassword\" [ngModelOptions]=\"{standalone: true}\" type=\"text\" class=\"form-control\" id=\"cameraPassword\">\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-12\">\r\n        <h3>TimeTable</h3>\r\n        <table class=\"table\">\r\n          <thead>\r\n            <tr>\r\n              <th colspan=3>Stundenanfang</th>\r\n              <th colspan=3>Stundenende</th>\r\n              <th>Montag</th>\r\n              <th>Dienstag</th>\r\n              <th>Mittwoch</th>\r\n              <th>Donnerstag</th>\r\n              <th>Freitag</th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr *ngFor=\"let i of hourArray()\">\r\n              <ng-template ngFor [ngForOf]=[0,1] let-j>\r\n                <td><input [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"settings.classDurationNumbers[i][j][0]\" class=\"classDurationColumn\"/></td>\r\n                <td class=\"classDurationSpacer\">:</td>\r\n                <td><input [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"settings.classDurationNumbers[i][j][1]\" class=\"classDurationColumn\"/></td>\r\n              </ng-template>\r\n              <ng-template ngFor [ngForOf]=[1,2,3,4,5] let-j>\r\n                <td><input [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"settings.timeTable[j][i]\"/></td>\r\n              </ng-template>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n        <a href=\"#\" class=\"btn btn-default\" (click)=\"addHourToSchedule()\">Add hour to schedule</a>\r\n        <a href=\"#\" class=\"btn btn-default\" (click)=\"removeHourFromSchedule()\">Remove hour from schedule</a>\r\n      </div>\r\n    </div>\r\n    <hr/>\r\n    <div class=\"row\">\r\n      <div class=\"col-md-12\">\r\n        <button type=\"submit\" class=\"btn btn-default\">Speichern</button>\r\n      </div>\r\n    </div>\r\n  </form>\r\n</div>"

/***/ }),

/***/ 288:
/***/ (function(module, exports) {

module.exports = "<div class=\"weather panel panel-default\">\r\n  <div class=\"panel-heading\"><span class=\"lead\">{{city}}</span>\r\n    <span class=\"small last-update\">Stand: {{lastUpdate | amDateFormat: 'LT'}}</span>\r\n    <span class=\"small error-message\" *ngIf=\"errorMessage\"><br />Fehler: {{errorMessage}}</span>\r\n    <span *ngIf=\"!isEnabled\" class=\"alert-danger\">Disabled</span>\r\n  </div>\r\n  <table class=\"table\" *ngIf=\"weatherForcast\">\r\n    <tr *ngFor=\"let dailyWeatherInfo of weatherForcast.dailyWeatherInfos\">\r\n      <td class=\"day\">{{dailyWeatherInfo.date | amDateFormat: 'dd'}}</td>\r\n      <td class=\"icon\"><i class=\"{{getIconClass(dailyWeatherInfo.icon)}}\"></i></td>\r\n      <td class=\"temp\" colspan=2>{{dailyWeatherInfo.maxTemp}}°C - {{dailyWeatherInfo.minTemp}}°C</td>\r\n    </tr>\r\n    <tr>\r\n      <td colspan=\"4\">\r\n        <table class=\"dailyInfos\">\r\n          <tr *ngFor=\"let dailyWeatherInfo of weatherForcast.dailyWeatherInfos\">\r\n            <td>\r\n              <span *ngIf=\"dailyWeatherInfo.morning\">\r\n                <i class=\"{{getIconClass(dailyWeatherInfo.morning.icon)}}\"></i><br/>{{dailyWeatherInfo.morning.averageTemp}}°C\r\n              </span>\r\n            </td>\r\n            <td>\r\n              <span *ngIf=\"dailyWeatherInfo.midday\">\r\n                <i class=\"{{getIconClass(dailyWeatherInfo.midday.icon)}}\"></i><br/>{{dailyWeatherInfo.midday.averageTemp}}°C\r\n              </span>\r\n            </td>\r\n            <td>\r\n              <span *ngIf=\"dailyWeatherInfo.afternoon\">\r\n                <i class=\"{{getIconClass(dailyWeatherInfo.afternoon.icon)}}\"></i><br/>{{dailyWeatherInfo.afternoon.averageTemp}}°C\r\n              </span>\r\n            </td>\r\n            <td>\r\n              <span *ngIf=\"dailyWeatherInfo.evening\">\r\n                <i class=\"{{getIconClass(dailyWeatherInfo.evening.icon)}}\"></i><br/>{{dailyWeatherInfo.evening.averageTemp}}°C\r\n              </span>\r\n            </td>\r\n          </tr>\r\n        </table>\r\n      </td>\r\n    </tr>\r\n    <tr>\r\n      <td colspan=\"4\">{{weatherForcast.summary}}</td>\r\n    </tr>\r\n  </table>\r\n</div>"

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CalendarDay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Calendar; });
var CalendarDay = (function () {
    function CalendarDay() {
    }
    return CalendarDay;
}());

var Calendar = (function () {
    function Calendar() {
        this.days = [];
    }
    return Calendar;
}());

//# sourceMappingURL=calendar.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppointmentsService; });
/// <reference path="../../../typings/globals/gapi.client/gapi.client.calendar.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppointmentsService = (function () {
    function AppointmentsService(authenticationService) {
        this.authenticationService = authenticationService;
    }
    AppointmentsService.prototype.getAllCalendars = function () {
        return __WEBPACK_IMPORTED_MODULE_1__index__["d" /* WaitService */].waitForTrue(this.authenticationService, 'isAuthenticated')
            .then(function () {
            return new Promise(function (resolve, reject) {
                gapi.client.load('calendar', 'v3', function () {
                    gapi.client.calendar.calendarList.list({}).execute(function (data) {
                        if (!data.error) {
                            resolve(data.result.items);
                        }
                        else {
                            reject(data.error);
                        }
                    });
                });
            }).catch(function (reason) {
                console.log('getAllCalendars Error: ');
                console.log(reason);
            });
        });
    };
    AppointmentsService.prototype.getEvents = function (calendar) {
        return new Promise(function (resolve, reject) {
            gapi.client.calendar.events.list({
                'calendarId': calendar.id,
                'timeMin': (new Date()).toISOString(),
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': 10,
                'orderBy': 'startTime'
            }).execute(function (resp) {
                resolve(resp.result.items);
            });
        }).catch(function (reason) {
            console.log('getEvents Error: ' + reason);
        });
    };
    ;
    AppointmentsService.prototype.loadAppointments = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getAllCalendars().then(function (calendars) {
                var eventPromises = calendars.map(function (calendar) { return _this.getEvents(calendar); });
                Promise.all(eventPromises).then(function (result) {
                    resolve([].concat.apply([], result));
                });
            });
        }).catch(function (reason) {
            console.log('loadApppointment Error: ' + reason);
        });
    };
    return AppointmentsService;
}());
AppointmentsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__index__["e" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__index__["e" /* AuthenticationService */]) === "function" && _a || Object])
], AppointmentsService);

var _a;
//# sourceMappingURL=appointments.service.js.map

/***/ }),

/***/ 559:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(220);


/***/ })

},[559]);
//# sourceMappingURL=main.bundle.js.map