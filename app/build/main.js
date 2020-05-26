webpackJsonp([5],{

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
Generated class for the AlertProvider provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
var AlertProvider = (function () {
    function AlertProvider(alertCtrl) {
        this.alertCtrl = alertCtrl;
    }
    ;
    AlertProvider.prototype.createAlert = function (title, subTitle, buttons, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            message: message,
            buttons: buttons
        });
        return alert;
    };
    AlertProvider.prototype.createButton = function (text, handler) {
        return {
            text: text,
            handler: handler
        };
    };
    AlertProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
    ], AlertProvider);
    return AlertProvider;
}());

//# sourceMappingURL=alert.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_createUserAccount_createUserAccount__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__selectUserProfile_selectUserProfile__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_platform_platform__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_common_storage__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_simple_toast_simple_toast__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_platform_bridge_platform_bridge__ = __webpack_require__(117);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { SpeechRecognition } from "@ionic-native/speech-recognition";





var StartPage = (function () {
    // load settings provider to make sure an instance is created on startup,
    // actually only necessary because settings page uses settings provider directly as datamodel
    function StartPage(navCtrl, storageProvider, authProvider, 
        //private speechRecognition: SpeechRecognition,
        platform, toastProvider, translate, platformBridge) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.storageProvider = storageProvider;
        this.authProvider = authProvider;
        this.platform = platform;
        this.toastProvider = toastProvider;
        this.translate = translate;
        this.platformBridge = platformBridge;
        this.platform.ready().then(function () {
            /*this.speechRecognition.requestPermission().then(
              () => {
                console.log("Permission granted - everything OK!");
                /* To get the file permission needed for downloads, we have to check/create a file or folder
                this.requestFilePermission(this.storageProvider);
              }
            );*/
            _this.requestFilePermission(_this.storageProvider);
        });
    }
    StartPage.prototype.requestFilePermission = function (storage) {
        var _this = this;
        storage.createAppDirOnExtRoot().then(function () {
            _this.signIn();
        }).catch(function () {
            _this.translate.get('PERMISSION_FILE_NEEDED').subscribe(function (msg) {
                _this.toastProvider.displayToast(msg, null, true, function () {
                    //this.requestFilePermission(storage);
                });
            });
        });
        if (this.platformBridge.platformIsBrowser()) {
            this.authProvider.addTestUser();
            this.authProvider.login({ name: "Test", email: "test@mail.com", pin: "1234" }).subscribe(function (allowed) {
                if (allowed) {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__selectUserProfile_selectUserProfile__["a" /* SelectUserProfilePage */]);
                }
            });
            this.signIn();
        }
    };
    StartPage.prototype.signIn = function () {
        var self = this;
        this.authProvider.getUserAccount(function (userAccount) {
            if (userAccount) {
                self.authProvider.login(userAccount).subscribe(function (allowed) {
                    if (allowed) {
                        self.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__selectUserProfile_selectUserProfile__["a" /* SelectUserProfilePage */]);
                    }
                });
            }
        });
    };
    StartPage.prototype.goToCreateAccount = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_createUserAccount_createUserAccount__["a" /* CreateUserAccountPage */]);
    };
    StartPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-start',template:/*ion-inline-start:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/start/start.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>TaleTime</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="content" padding>\n\n\n\n  <div class="center">\n\n    <h1>{{\'START_WELCOME\' | translate }} Taletime</h1>\n\n\n\n    <ion-img width="100" height="100" src="assets/icon/appicon.png"></ion-img>\n\n\n\n    <h4>{{\'START_DESCRIPTION\' | translate }}</h4>\n\n\n\n    <button ion-button (click)="goToCreateAccount()">{{\'START_CONTINUE\' | translate }}</button>\n\n  </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/start/start.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_common_storage__["a" /* StorageProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular_platform_platform__["a" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__providers_simple_toast_simple_toast__["a" /* SimpleToastProvider */],
            __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_9__providers_platform_bridge_platform_bridge__["a" /* PlatformBridgeProvider */]])
    ], StartPage);
    return StartPage;
}());

//# sourceMappingURL=start.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoryMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__selectUserProfile_selectUserProfile__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__storyDetails_storyDetails__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_story_story__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__player_player__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_app_app__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var StoryMenuPage = (function () {
    function StoryMenuPage(platform, app, navCtrl, menuCtrl, authProvider, storyProvider) {
        this.platform = platform;
        this.app = app;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.authProvider = authProvider;
        this.storyProvider = storyProvider;
        var activeUserProfile = this.authProvider.getActiveUserProfile();
        if (activeUserProfile) {
            this.activeUserProfileName = activeUserProfile.name;
            this.activeUserProfileAvatarName = activeUserProfile.avatar.name;
        }
    }
    Object.defineProperty(StoryMenuPage.prototype, "stories", {
        get: function () {
            return this.storyProvider.stories;
        },
        enumerable: true,
        configurable: true
    });
    StoryMenuPage.prototype.goToSelectUserProfilePage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__selectUserProfile_selectUserProfile__["a" /* SelectUserProfilePage */]);
    };
    StoryMenuPage.prototype.showDetails = function (story) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__storyDetails_storyDetails__["a" /* StoryDetailsPage */], {
            selectedStory: story
        });
    };
    StoryMenuPage.prototype.deleteStory = function (story) {
        this.storyProvider.deleteStory(story.id);
    };
    StoryMenuPage.prototype.goToPlayerPage = function (storyId) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__player_player__["a" /* PlayerPage */], {
            storyId: storyId,
            mode: "continue"
        });
    };
    StoryMenuPage.prototype.goToAvailableStories = function () {
        this.navCtrl.parent.select(1);
    };
    StoryMenuPage.prototype.getSubtitle = function (r) {
        return ' ' + r.name;
    };
    StoryMenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-storyMenu',template:/*ion-inline-start:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/storyMenu/storyMenu.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle icon-only color="dark">\n\n            <ion-icon name=\'menu\'></ion-icon>\n\n        </button>\n\n    <ion-title>{{\'STORYMENU_HEADER\' | translate}}</ion-title>\n\n\n\n    <ion-buttons end>\n\n\n\n      <button ion-button color="dark" (click)="goToSelectUserProfilePage()">\n\n        <!-- <ion-icon name="person"></ion-icon><ion-label>{{activeUserProfileName}}</ion-label> -->\n\n        <img width="40px" height="40px" src=\'assets/imgs/profile/{{activeUserProfileAvatarName}}\' /> <!-- TODO remove static width and height of image -->\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="content">\n\n  <ion-row padding *ngIf="this.stories.length < 1">\n\n    <p>{{ \'STORYMENU_NO_STORIES_YET\' | translate }}</p>\n\n    <button full ion-button (click)="goToAvailableStories()">{{ \'STORYMENU_ADD_SOME_STORIES\' | translate }}</button>\n\n  </ion-row>\n\n  <ion-card *ngFor="let story of this.stories">\n\n    <ion-item>\n\n      <ion-icon item-start name="book" style="font-size: 64px;"></ion-icon>\n\n      <h1>{{story.title}}</h1>\n\n      <h2>{{story.author}}</h2>\n\n      <p>{{story.date}}</p>\n\n    </ion-item>\n\n    <ion-card-content>\n\n      <p>{{story.readers.map(getSubtitle)}}</p>\n\n    </ion-card-content>\n\n    <ion-grid>\n\n      <ion-row justify-content-end>\n\n        <ion-col>\n\n          <button color="secondary" ion-button icon-only (click)="goToPlayerPage(story.id)">\n\n                            <ion-icon name="play"></ion-icon>\n\n                        </button>\n\n          <button ion-button icon-only (click)="showDetails(story)">\n\n                            <ion-icon name="information-circle"></ion-icon>\n\n                        </button>\n\n          <button color="danger" ion-button icon-only (click)="deleteStory(story)">\n\n                            <ion-icon name="trash"></ion-icon>\n\n                        </button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/storyMenu/storyMenu.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_app_app__["a" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_story_story__["a" /* StoryProvider */]])
    ], StoryMenuPage);
    return StoryMenuPage;
}());

//# sourceMappingURL=storyMenu.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_story_story__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_audio_audio__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_speechRecognition_answerMatching__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_settings_settings__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_speechRecognition_ttsText__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_speech_recognition__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_text_to_speech__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__datamodels_story_story__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_constants__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__storyMenu_storyMenu__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_savegame_savegame__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_public_story_helper_public_story_helper__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_platform_bridge_platform_bridge__ = __webpack_require__(117);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//Provider





//Plugins


//Datamodels & Constants






//import Stack from "ts-data.stack";
/**
 * @author Janis Schacht
 * @author Kevin Münch
 * @author Markus Altmeyer
 * player.ts contains the logic that is necessary to play stories
 */
var BEGIN = "begin";
var CONTINUE = "continue";
var FIRST_NODE = 1;
var PlayerPage = (function () {
    function PlayerPage(navCtrl, navParams, savegameProvider, audioProvider, platform, story, appRef, speechRecognition, ttsTexts, tts, matching, settings, publicStoryHelper, platformBridge) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.savegameProvider = savegameProvider;
        this.audioProvider = audioProvider;
        this.platform = platform;
        this.story = story;
        this.appRef = appRef;
        this.speechRecognition = speechRecognition;
        this.ttsTexts = ttsTexts;
        this.tts = tts;
        this.matching = matching;
        this.settings = settings;
        this.publicStoryHelper = publicStoryHelper;
        this.platformBridge = platformBridge;
        this.playing = false;
        //if an audio file is not available, audio changes to tts for this audiofile
        this.temporaryTTS = false;
        this.metadata = new __WEBPACK_IMPORTED_MODULE_9__datamodels_story_story__["b" /* StoryMetaData */]();
        //While tts is reading answers out or while speechrecognition is listening, block playPause-Button
        this.isPlayPauseBlocked = false;
        this.platform.ready().then(function () {
            console.log("PlayerPage started");
            _this.storyId = _this.navParams.get("storyId");
            console.log("storyid:", _this.storyId);
            _this.loadSavegame();
            //DEFAULT_READER if new savegame
            _this.selectedReader = _this.savegame.reader;
            _this.mode = _this.navParams.get("mode"); // differentiate between starting story over or continuing from savegame
            console.log("storyId:" + _this.storyId);
            console.log("reader:" + _this.selectedReader);
            console.log("mode: " + _this.mode);
            _this.attr = new __WEBPACK_IMPORTED_MODULE_9__datamodels_story_story__["a" /* ChapterAttributes */]();
            // this.savegame = new Savegame();
            if (_this.selectedReader === __WEBPACK_IMPORTED_MODULE_10__app_constants__["g" /* DEFAULT_READER */]) {
                _this.usingTTS = true;
                console.log("using tts");
            }
            else {
                _this.usingTTS = false;
            }
            if (settings.speechRecognition && !_this.platformBridge.platformIsBrowser()) {
                _this.speechRecognition.requestPermission()
                    .then(function () { return settings.speechRecognition = true; })
                    .catch(function () { return settings.speechRecognition = false; });
            }
            _this.loadStory(_this.storyId);
        });
    }
    PlayerPage.prototype.ionViewWillLeave = function () {
        //This is triggered when another screen is loaded
        console.log("Player leaved, stop audio");
        this.pause();
        if (!this.platformBridge.platformIsBrowser()) {
            //If speechRecogniton is listening, stop it
            this.speechRecognition.stopListening();
            //If tts is reading answers out, stop it
            this.tts.speak(" ");
        }
    };
    PlayerPage.prototype.ngOnDestroy = function () {
        console.log("Destroy Player");
        this.audioProvider.stop();
    };
    PlayerPage.prototype.onBackKeyDown = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__storyMenu_storyMenu__["a" /* StoryMenuPage */], {});
    };
    /**
     * Toggles play / pause
     */
    PlayerPage.prototype.playPause = function () {
        console.log('Click on Play/Pause');
        if (this.isPlayPauseBlocked) {
            console.log("playPause ist blocked, do not play");
            return;
        }
        if (this.playing == false) {
            console.log("Audio is not running, start it");
            this.play();
        }
        else {
            console.log("Audio is currently running, pause it now");
            this.pause();
        }
    };
    /**
     * Loads the next chapter
     * @param answer id of the answer
     */
    PlayerPage.prototype.nextChapter = function (answer) {
        if (this.answers[0].attributes.id === "-1") {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_11__storyMenu_storyMenu__["a" /* StoryMenuPage */], {}, { animate: true, direction: 'backward' });
        }
        else {
            this.loadNodeFromAnswer(answer);
            this.updateSavegame();
        }
    };
    /**
     *  switches current node to previous node
     */
    PlayerPage.prototype.previousChapter = function () {
        var _this = this;
        console.log("----------click on Back---------------");
        console.log("Current Node: " + this.attr.storyNodeId);
        var peekObject = this.savegame.chosenPath[this.savegame.chosenPath.length - 1];
        if (peekObject != 1) {
            this.pause().then(function () {
                _this.savegame.chosenPath.length = _this.savegame.chosenPath.length - 1;
                _this.loadNode();
                _this.updateSavegame();
            });
        }
        else {
            console.log("Already at first node");
            //maybe add an alert to indicate it
        }
        console.log("-------------------------------------------");
    };
    /**
     * Get the full path for an audiofile, either on internal storage or sd card
     * @param audioSrc Name of audiofile
     */
    PlayerPage.prototype.getAudioPath = function (audioSrc) {
        var story = this.story.getStoryInformation(this.storyId);
        var audioPath = '';
        if (story.medium === 'cloud') {
            audioPath = this.publicStoryHelper.getAudioPathForStory(story, audioSrc, this.selectedReader);
        }
        else {
            audioPath = this.platformBridge.getAppDirectory();
            audioPath += __WEBPACK_IMPORTED_MODULE_10__app_constants__["l" /* STORY_DIR */] + this.storyId + '/' + this.settings.getShortLangCode() + __WEBPACK_IMPORTED_MODULE_10__app_constants__["j" /* READER_DIR */] + this.selectedReader + '/' + audioSrc + __WEBPACK_IMPORTED_MODULE_10__app_constants__["i" /* FILETYPE_MP4 */];
        }
        return audioPath;
    };
    /**
     * Starts playing the audio output
     * depends on whether tts or real audio file is used
     */
    PlayerPage.prototype.play = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.stopped = false;
            if (_this.usingTTS || _this.temporaryTTS) {
                if (!_this.platformBridge.platformIsBrowser()) {
                    console.log("Playing the following text: " + _this.text);
                    _this.tts.speak({ text: _this.text, locale: _this.settings.language, rate: _this.settings.ttsRate }).then(function () {
                        _this.playing = false;
                        _this.temporaryTTS = false;
                        _this.readAnswersOut(0);
                    }).catch(function (error) {
                        //TODO: Hier wurde ein error 'UNKNOW_ERROR' geworfen, manchmal ging es manchmal nicht
                        //Bei Geschichte der verlorene Ball -> Knoten id  3
                        console.log("TTS error, play()", JSON.stringify(error));
                    });
                    _this.playing = true;
                    _this.appRef.tick();
                }
                resolve();
            }
            else {
                _this.audioProvider.play().then(function () {
                    _this.playing = true;
                    _this.appRef.tick();
                    resolve();
                });
            }
        });
    };
    /**
     * pauses the audio output
     */
    PlayerPage.prototype.pause = function () {
        var _this = this;
        console.log("Pressed pause");
        return new Promise(function (resolve) {
            if (_this.usingTTS || _this.temporaryTTS) {
                if (!_this.platformBridge.platformIsBrowser()) {
                    //text has to be whitespace to work correct for some tts versions, not empty string
                    _this.tts.speak(" ").then(function () {
                        console.log("Stop successful ");
                        _this.playing = false;
                        _this.stopped = true;
                        resolve();
                    }, function (e) {
                        console.log("TTS error, pause()", JSON.stringify(e));
                    });
                }
                else {
                    resolve();
                }
            }
            else {
                _this.audioProvider.pause().then(function () {
                    _this.playing = false;
                    _this.stopped = true;
                    resolve();
                });
            }
        });
    };
    /**
     * Tells the story provider to load a story.
     * Calls  @method loadSavegame to load savegame for active user
     * @param name of the story
     */
    PlayerPage.prototype.loadStory = function (name) {
        var _this = this;
        this.story.loadStory(name).subscribe(function () {
            _this.metadata = _this.story.getStoryAttributes();
            // this.loadSavegame();
            if (_this.mode === BEGIN) {
                console.log("Start story from beginning, delete old progress");
                //this.savegame.chosenPath = new Stack<number>();
                _this.savegame.chosenPath = [];
                _this.savegame.chosenPath.push(FIRST_NODE);
            }
            else if (_this.mode === CONTINUE) {
            }
            _this.loadNode();
            console.log("Story loaded");
        });
    };
    /**
     * loads savegame for active user
     * if no savegame exists for that user a new one will be created
     */
    PlayerPage.prototype.loadSavegame = function () {
        this.savegame = this.savegameProvider.loadSavegame(this.storyId);
        console.log("Current savegame:");
        console.log(JSON.stringify(this.savegame));
        //Check if Savegame exists or if a new one has to be created
        console.log("Savegame geladen ? " + this.savegame.storyId);
        if (this.savegame.chosenPath.length === 0) {
            console.log("No existing Savegame!");
            console.log("Creating a new on!");
            this.createNewSavegame();
        }
    };
    PlayerPage.prototype.createNewSavegame = function () {
        this.savegame.storyId = this.storyId;
        this.savegame.chosenPath.push(FIRST_NODE);
        this.savegameProvider.addSavegame(this.savegame);
    };
    /**
     * Updates Savegame, so that Users progress in Story is written to the Users File
     */
    PlayerPage.prototype.updateSavegame = function () {
        this.savegameProvider.updateSavegame(this.savegame);
        console.log("Savegame successfully updated!");
        console.log(JSON.stringify(this.savegame));
    };
    /**
     * Updates the fields from the story provider
     * @param indicator indicates if user move back or forward in the story,
     * or if story was just loaded
     */
    PlayerPage.prototype.updateFields = function () {
        this.answers = this.story.getAnswers();
        this.checkAnswers();
        this.text = this.story.getText();
        this.attr = this.story.getChapterAtrributes();
    };
    /**
     * check if there are answers for current node
     * if not, create an artificial one that will lead back to the story menu page
     */
    PlayerPage.prototype.checkAnswers = function () {
        if (this.answers[0].value == null) {
            this.answers[0].attributes.id = "-1";
            this.answers[0].value = "Back to the menu";
        }
    };
    /**
     * loads Node which is in top of the savegame stack
     * necessary for backwards navigation and loading from Savegame
     * calls @method loadAudioForNode which loads the audio for the loaded node
     */
    PlayerPage.prototype.loadNode = function () {
        // console.log("chosenPath[]: " + this.savegame.chosenPath.peek());
        // this.story.loadNode(this.savegame.chosenPath.peek() - 1);
        var peekObject = this.savegame.chosenPath[this.savegame.chosenPath.length - 1];
        console.log("chosenPath[]: " + peekObject);
        this.story.loadNode(peekObject - 1);
        this.updateFields();
        this.stopped = false;
        this.appRef.tick();
        //Check if tts or audio is used
        if (!this.usingTTS) {
            this.setupAudioForNode();
        }
        if (this.settings.autoPlay) {
            this.play();
        }
    };
    /**
     * Set up the audio for the current Node
     */
    PlayerPage.prototype.setupAudioForNode = function () {
        var _this = this;
        console.log("setupAudioForNode:");
        //Change back to audio if there was temporary tts
        this.temporaryTTS = false;
        var nodeAudioFileName = this.story.getCurrentAudioSrc();
        var audioPath = this.getAudioPath(nodeAudioFileName);
        console.log("Audio-Path:", audioPath);
        this.audioProvider.loadAudio(audioPath, function () {
            console.log("Audio finished");
            _this.playing = false;
            //Angular does not detect the change
            _this.appRef.tick();
            _this.readAnswersOut(0);
        }, function (error) {
            console.log("Audio player Error:");
            console.log(JSON.stringify(error));
            console.log("Audiofile nicht verfügbar, verwende tts");
            // this.usingTTS = true;
            _this.temporaryTTS = true;
            if (_this.settings.autoPlay) {
                _this.play();
            }
        });
    };
    /**
     * Starts reading the answers out
     * @param counter how often was it read out
     */
    PlayerPage.prototype.readAnswersOut = function (counter) {
        var _this = this;
        if (counter === void 0) { counter = 0; }
        console.log("readAnswersOut");
        if (!this.stopped) {
            // if paused then the answers do not need to be read out
            // TODO we can use pre recorded audio files here as well to read out custom questions
            // only read answers out if this is not part of the audio file
            if (!this.usingTTS && !this.temporaryTTS && this.story.isCurrentSpeakerReadingAnswersOut()) {
                if (this.settings.speechRecognition) {
                    this.isPlayPauseBlocked = true;
                    this.startSpeechRecognition(counter);
                }
            }
            else {
                // check if it is the last node
                if (this.answers[0].attributes.id != "-1") {
                    var readAnswer = this.ttsTexts.createAnswersText(this.answers);
                    if (!this.platformBridge.platformIsBrowser()) {
                        this.isPlayPauseBlocked = true;
                        this.tts.speak({ text: readAnswer, locale: this.settings.language, rate: this.settings.ttsRate }).then(function () {
                            if (_this.settings.speechRecognition) {
                                _this.startSpeechRecognition(counter);
                            }
                            else {
                                _this.isPlayPauseBlocked = false;
                            }
                        }).catch(function (error) {
                            console.log("TTS error, readAnswersOut()", JSON.stringify(error));
                        });
                    }
                }
            }
        }
    };
    /**
     * Starts the speech recognition
     * @param counter how often was this already done
     */
    PlayerPage.prototype.startSpeechRecognition = function (counter) {
        var _this = this;
        this.speechRecognition.isRecognitionAvailable().then(function (available) {
            if (available) {
                var options = {
                    language: _this.settings.language,
                    showPopup: false
                };
                _this.speechRecognition.startListening(options).subscribe(function (matches) {
                    // the magic
                    console.log(matches);
                    var answer = _this.matching.match(matches, _this.answers);
                    console.log("Answer was " + JSON.stringify(answer));
                    if (answer == null) {
                        console.log("No match! Repeating!");
                        _this.repeatSpeechRecognition(counter);
                    }
                    else {
                        _this.isPlayPauseBlocked = false;
                        console.log("Is answer a String?");
                        console.log(typeof answer === "string");
                        if (typeof answer === "string") {
                            console.log("Answer was a special type and is instructed to do a command");
                            switch (answer) {
                                case __WEBPACK_IMPORTED_MODULE_10__app_constants__["b" /* ANSWER_CHAPTER_REPEAT */]:
                                    console.log("Repeating chapter");
                                    _this.play();
                                    break;
                                case __WEBPACK_IMPORTED_MODULE_10__app_constants__["a" /* ANSWER_CHAPTER_BACKWARDS */]:
                                    console.log("Going to previous chapter");
                                    _this.previousChapter();
                                    break;
                            }
                        }
                        else {
                            console.log("Matched " + answer.value + ". Going on!");
                            var pos = _this.findAnswerInList(answer);
                            _this.loadNodeFromAnswer(pos);
                        }
                    }
                }, function (err) {
                    console.log("There was an error while recording speech " + err);
                    _this.adviseUserToUseGUI();
                });
            }
            else {
                console.log("Speech recognition not available!");
                _this.isPlayPauseBlocked = false;
            }
        });
    };
    /**
     * Loads the next chapter from the index of an answer
     * @param pos index of the answer given by the user
     */
    PlayerPage.prototype.loadNodeFromAnswer = function (pos) {
        var _this = this;
        if (this.playing) {
            this.pause().then(function () {
                console.log("Paused. Loading next node for answer #" + pos);
                _this.story.loadNodeForAnswer(pos);
                _this.updateFields();
                _this.savegame.chosenPath.push(Number(_this.attr.storyNodeId));
                _this.pulseClass = '';
                _this.appRef.tick();
                //Check if tts or audio is used
                if (!_this.usingTTS) {
                    _this.setupAudioForNode();
                }
                if (_this.settings.autoPlay) {
                    _this.play();
                }
            });
        }
        else {
            this.story.loadNodeForAnswer(pos);
            this.updateFields();
            this.savegame.chosenPath.push(Number(this.attr.storyNodeId));
            this.pulseClass = '';
            this.appRef.tick();
            //Check if tts or audio is used
            if (!this.usingTTS) {
                this.setupAudioForNode();
            }
            if (this.settings.autoPlay) {
                this.play();
            }
        }
    };
    /**
     * Starts the speech recognition again
     * @param counter how often was speech recognition used so far
     */
    PlayerPage.prototype.repeatSpeechRecognition = function (counter) {
        var _this = this;
        console.log("Repeating speech recognition for the " + counter + " time");
        if (counter < 1) {
            var repeatText = this.ttsTexts.createRepeatText();
            this.tts.speak({ text: repeatText, locale: this.settings.language, rate: this.settings.ttsRate }).then(function () {
                _this.startSpeechRecognition(++counter);
            }).catch(function (error) {
                console.log("TTS error, repeatSpeechRecognition()", JSON.stringify(error));
            });
        }
        else {
            if (counter < 2) {
                this.readAnswersOut(++counter);
            }
            else {
                // user should tap button
                this.adviseUserToUseGUI();
            }
        }
    };
    /**
     * User is advised to use GUI because there was a problem with the VUI
     */
    PlayerPage.prototype.adviseUserToUseGUI = function () {
        var _this = this;
        var endText = this.ttsTexts.createAnswerHelp();
        this.tts.speak({ text: endText, locale: this.settings.language, rate: this.settings.ttsRate }).then(function () {
            _this.pulseClass = __WEBPACK_IMPORTED_MODULE_10__app_constants__["e" /* CSS_PULSE_CLASS */];
            _this.appRef.tick();
            _this.isPlayPauseBlocked = false;
        }).catch(function (error) {
            console.log("TTS error, adviseUserToUseGUI()", JSON.stringify(error));
        });
    };
    /**
     *    Finds the index of an answer
     * @param answer you're looking for
     * @returns {number} index
     */
    PlayerPage.prototype.findAnswerInList = function (answer) {
        var index = -1;
        for (var i = 0; i < this.answers.length; i++) {
            if (answer.value === this.answers[i].value) {
                index = i;
                break;
            }
        }
        return index;
    };
    PlayerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-player',template:/*ion-inline-start:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/player/player.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>\n\n            {{metadata.title}}\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n    <h1 text-center>\n\n        {{attr.name}}\n\n    </h1>\n\n\n\n    <p class="chapterText">\n\n        {{text}}\n\n    </p>\n\n\n\n    <ion-list>\n\n        <button ion-button class="buttons" *ngFor="let a of answers; index as i" (click)="nextChapter(i)" [ngClass]="pulseClass">\n\n            {{a.value}}\n\n        </button>\n\n    </ion-list>\n\n\n\n</ion-content>\n\n\n\n<ion-footer>\n\n    <ion-toolbar>\n\n        <ion-grid>\n\n            <ion-row no-padding no-margin>\n\n                <ion-col col-4 center text-center>\n\n                    <button ion-button small block icon-only (click)="previousChapter()">\n\n                        <ion-icon name="arrow-round-back"></ion-icon>\n\n                    </button>\n\n                </ion-col>\n\n                <ion-col col-4 center text-center>\n\n                        <button small ion-button block icon-only (click)="playPause()">\n\n                            <ion-icon *ngIf="!playing" name="play"></ion-icon>\n\n                            <ion-icon *ngIf="playing" name="pause"></ion-icon>\n\n                        </button>\n\n                </ion-col>\n\n                <ion-col col-4>\n\n                    <!-- Intentionally empty to center the play button -->\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-grid>\n\n    </ion-toolbar>\n\n\n\n</ion-footer>\n\n'/*ion-inline-end:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/player/player.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_12__providers_savegame_savegame__["a" /* SaveGameProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_audio_audio__["a" /* AudioProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__providers_story_story__["a" /* StoryProvider */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_speech_recognition__["a" /* SpeechRecognition */],
            __WEBPACK_IMPORTED_MODULE_6__providers_speechRecognition_ttsText__["a" /* TtsTextProvider */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_text_to_speech__["a" /* TextToSpeech */],
            __WEBPACK_IMPORTED_MODULE_4__providers_speechRecognition_answerMatching__["a" /* AnswerMatchingProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_settings_settings__["a" /* SettingsProvider */],
            __WEBPACK_IMPORTED_MODULE_13__providers_public_story_helper_public_story_helper__["a" /* PublicStoryHelperProvider */],
            __WEBPACK_IMPORTED_MODULE_14__providers_platform_bridge_platform_bridge__["a" /* PlatformBridgeProvider */]])
    ], PlayerPage);
    return PlayerPage;
}());

//# sourceMappingURL=player.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlatformBridgeProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_platform_platform__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_constants__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the PlatformBridgeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
/**
 * Helper class to detect the current platform the app is running on
 * and for handling differences between them
 * @export
 * @class PlatformBridgeProvider
 */
var PlatformBridgeProvider = (function () {
    function PlatformBridgeProvider(platform, file) {
        this.platform = platform;
        this.file = file;
    }
    /**
     * Tells if the app runs in a browser (mobile or desktop)
     */
    PlatformBridgeProvider.prototype.platformIsBrowser = function () {
        return (this.platform.is('core') || this.platform.is('mobileweb'));
    };
    /**
     * Tells if the app runs natively
     */
    PlatformBridgeProvider.prototype.platformIsNative = function () {
        return !this.platformIsBrowser();
    };
    /**
     * Get the base app path where e.g. the asset folder is located
     */
    PlatformBridgeProvider.prototype.getAppDirectory = function () {
        if (this.platformIsBrowser()) {
            //Browser needs the relative path
            return '';
        }
        else {
            //Native platforms need an absolute path
            return this.file.applicationDirectory + __WEBPACK_IMPORTED_MODULE_2__app_constants__["t" /* WWW */] + "/";
        }
    };
    PlatformBridgeProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular_platform_platform__["a" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */]])
    ], PlatformBridgeProvider);
    return PlatformBridgeProvider;
}());

//# sourceMappingURL=platform-bridge.js.map

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreditsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the CreditsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CreditsPage = (function () {
    function CreditsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CreditsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreditsPage');
    };
    CreditsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-credits',template:/*ion-inline-start:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/credits/credits.html"*/'<!--\n\n  Generated template for the CreditsPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Credits</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-card>\n\n    <ion-card-content>\n\n      <ion-card-title>\n\n        Programmers (htw saar)\n\n      </ion-card-title>\n\n      <p>\n\n        Markus Altmeyer\n\n        <br> Lukas Becker\n\n        <br> Christopher Biel\n\n        <br> Robert Cios\n\n        <br> Janek Dahl\n\n        <br> Nico Enderlein\n\n        <br> Florian Foss\n\n        <br> Nikolas Fritzen\n\n        <br> Marvin Hoff\n\n        <br> Matthias Kiefer\n\n        <br> Kevin P. Kuntz\n\n        <br> Tobias Meiser\n\n        <br> Maximilian Mick\n\n        <br> Lennart Monir\n\n        <br> Kevin M&uuml;nch\n\n        <br> Urs Oberdorf\n\n        <br> Jonas Plum\n\n        <br> Lukas Raubuch\n\n        <br> Janis D. Schacht\n\n        <br> Thomas Seiwert\n\n        <br> Joris Alexander Seyler\n\n        <br> Maximilian Weiler\n\n        <br> Mathias Wittling\n\n        <br>\n\n      </p>\n\n    </ion-card-content>\n\n  </ion-card>\n\n\n\n  <ion-card>\n\n    <ion-card-content>\n\n      <ion-card-title>\n\n        Artists and Stories (HBKsaar)\n\n      </ion-card-title>\n\n      <p>\n\n        Janina Heese\n\n        <br> Sarah Philippi\n\n        <br> Lisa Roisch\n\n        <br> Kevin Schneider\n\n        <br> Raoul Sinner\n\n        <br>\n\n      </p>\n\n    </ion-card-content>\n\n  </ion-card>\n\n</ion-content>'/*ion-inline-end:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/credits/credits.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], CreditsPage);
    return CreditsPage;
}());

//# sourceMappingURL=credits.js.map

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImpressumPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ImpressumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ImpressumPage = (function () {
    function ImpressumPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ImpressumPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ImpressumPage');
    };
    ImpressumPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-impressum',template:/*ion-inline-start:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/impressum/impressum.html"*/'<!--\n\n  Generated template for the ImpressumPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>impressum</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n    <ion-card>\n\n        <!--<img src="img/nin-live.png"/>-->\n\n        <ion-card-content>\n\n          <ion-card-title>\n\n           Ansprechpartner\n\n            </ion-card-title>\n\n          <p>\n\n            Max Mustermann\n\n            <br>\n\n            Musterstraße 37<br>\n\n            11111 Musterstadt<br>\n\n            max@mustermann.de<br>\n\n            0681/12345\n\n          </p>\n\n        </ion-card-content>\n\n      </ion-card>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/impressum/impressum.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], ImpressumPage);
    return ImpressumPage;
}());

//# sourceMappingURL=impressum.js.map

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return FILETYPE_JSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return FILETYPE_MP4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return APP_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return STORY_DIR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return TTS_RES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return READER_DIR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return WWW; });
/* unused harmony export SETTINGS_FILE_NAME */
/* unused harmony export STORY_FILE_NAME */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return SINGLE_STORY_FILE_NAME; });
/* unused harmony export USER_FILE_NAME */
/* unused harmony export MTGA_STORY */
/* unused harmony export MTGA_NODE */
/* unused harmony export MTGA_NEXT_NODE */
/* unused harmony export MTGA_NODE_TEXT */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ANSWER_CHAPTER_BACKWARDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ANSWER_CHAPTER_REPEAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return TTS_RATE_SLOW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return TTS_RATE_NORMAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return TTS_RATE_FAST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return TTS_RATE_SLOW_VALUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return TTS_RATE_NORMAL_VALUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return TTS_RATE_FAST_VALUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return AVAILABLE_LANGUAGES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return DEFAULT_LANG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return DEFAULT_READER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return CSS_PULSE_CLASS; });
/**
 * Created by Kevin on 06.07.2017.
 */
/** general */
var FILETYPE_JSON = '.json';
var FILETYPE_MP4 = '.m4a';
/** directories */
var APP_NAME = 'taletime';
var STORY_DIR = 'assets/stories/';
var TTS_RES = 'assets/tts/';
var READER_DIR = '/readers/';
var WWW = "www";
/** file names */
var SETTINGS_FILE_NAME = 'settings.json';
var STORY_FILE_NAME = 'storyies.json';
var SINGLE_STORY_FILE_NAME = 'story.json';
var USER_FILE_NAME = 'users.json';
/** for story data structure TODO names need to be defined properly */
var MTGA_STORY = 'mtga-story';
var MTGA_NODE = 'mtga-story-node';
var MTGA_NEXT_NODE = 'mtga-nextStoryNode';
var MTGA_NODE_TEXT = 'mtga-nodeText';
/** for answer matching */
var ANSWER_CHAPTER_BACKWARDS = 'chapter_back';
var ANSWER_CHAPTER_REPEAT = 'chapter_repeat';
/** TTS rates*/
var TTS_RATE_SLOW = 'TTS_SLOW';
var TTS_RATE_NORMAL = 'TTS_NORMAL';
var TTS_RATE_FAST = 'TTS_FAST';
var TTS_RATE_SLOW_VALUE = 0.5;
var TTS_RATE_NORMAL_VALUE = 0.75;
var TTS_RATE_FAST_VALUE = 1;
/** Language */
var AVAILABLE_LANGUAGES = [{
        code: 'en-US',
        name: 'English'
    }, {
        code: 'de-DE',
        name: 'Deutsch'
    }];
var DEFAULT_LANG = 'en-US';
/** Reader*/
var DEFAULT_READER = 'default';
/** CSS */
var CSS_PULSE_CLASS = 'pulse';
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_settings_settings__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_userAccount_userAccount__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_simple_toast_simple_toast__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_credits_credits__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_impressum_impressum__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_constants__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


 // added for translation 2017-11-14







/**
 * Generated class for the Settings page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SettingsPage = (function () {
    function SettingsPage(navCtrl, settings, translate, authProvider, toastProvider) {
        this.navCtrl = navCtrl;
        this.settings = settings;
        this.translate = translate;
        this.authProvider = authProvider;
        this.toastProvider = toastProvider;
        this.languages = __WEBPACK_IMPORTED_MODULE_9__app_constants__["d" /* AVAILABLE_LANGUAGES */];
        this.ttsRates = [__WEBPACK_IMPORTED_MODULE_9__app_constants__["q" /* TTS_RATE_SLOW */], __WEBPACK_IMPORTED_MODULE_9__app_constants__["o" /* TTS_RATE_NORMAL */], __WEBPACK_IMPORTED_MODULE_9__app_constants__["m" /* TTS_RATE_FAST */]];
        this.selectedLanguage = SettingsPage_1.getLanguageFromCode(this.settings.language);
        switch (this.settings.ttsRate) {
            case __WEBPACK_IMPORTED_MODULE_9__app_constants__["r" /* TTS_RATE_SLOW_VALUE */]:
                this.ttsRate = __WEBPACK_IMPORTED_MODULE_9__app_constants__["q" /* TTS_RATE_SLOW */];
                break;
            case __WEBPACK_IMPORTED_MODULE_9__app_constants__["p" /* TTS_RATE_NORMAL_VALUE */]:
                this.ttsRate = __WEBPACK_IMPORTED_MODULE_9__app_constants__["o" /* TTS_RATE_NORMAL */];
                break;
            case __WEBPACK_IMPORTED_MODULE_9__app_constants__["n" /* TTS_RATE_FAST_VALUE */]:
                this.ttsRate = __WEBPACK_IMPORTED_MODULE_9__app_constants__["m" /* TTS_RATE_FAST */];
                break;
            default:
                this.ttsRate = __WEBPACK_IMPORTED_MODULE_9__app_constants__["o" /* TTS_RATE_NORMAL */];
        }
    }
    SettingsPage_1 = SettingsPage;
    SettingsPage.prototype.changeLanguage = function () {
        console.log('Changing language to <' + this.selectedLanguage + '>');
        this.translate.use(SettingsPage_1.getCodeFromLanguage(this.selectedLanguage));
        this.settings.language = SettingsPage_1.getCodeFromLanguage(this.selectedLanguage);
    };
    SettingsPage.prototype.changeTtsRate = function () {
        console.log('Changing TTS rate to <' + this.ttsRate + '>');
        switch (this.ttsRate) {
            case __WEBPACK_IMPORTED_MODULE_9__app_constants__["q" /* TTS_RATE_SLOW */]:
                this.settings.ttsRate = __WEBPACK_IMPORTED_MODULE_9__app_constants__["r" /* TTS_RATE_SLOW_VALUE */];
                break;
            case __WEBPACK_IMPORTED_MODULE_9__app_constants__["o" /* TTS_RATE_NORMAL */]:
                this.settings.ttsRate = __WEBPACK_IMPORTED_MODULE_9__app_constants__["p" /* TTS_RATE_NORMAL_VALUE */];
                break;
            case __WEBPACK_IMPORTED_MODULE_9__app_constants__["m" /* TTS_RATE_FAST */]:
                this.settings.ttsRate = __WEBPACK_IMPORTED_MODULE_9__app_constants__["n" /* TTS_RATE_FAST_VALUE */];
                break;
        }
    };
    SettingsPage.prototype.goToUserAccount = function () {
        var _this = this;
        var alert = this.authProvider.presentPinPrompt(function (valid) {
            if (valid) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_userAccount_userAccount__["a" /* UserAccountPage */]);
            }
            else {
                _this.toastProvider.displayToast("Wrong pin."); // TODO tobi i18
                return false;
            }
        });
        alert.present();
    };
    SettingsPage.prototype.goToCreditspage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__pages_credits_credits__["a" /* CreditsPage */]);
    };
    SettingsPage.prototype.goToImpressumpage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__pages_impressum_impressum__["a" /* ImpressumPage */]);
    };
    SettingsPage.getCodeFromLanguage = function (lang) {
        for (var _i = 0, AVAILABLE_LANGUAGES_1 = __WEBPACK_IMPORTED_MODULE_9__app_constants__["d" /* AVAILABLE_LANGUAGES */]; _i < AVAILABLE_LANGUAGES_1.length; _i++) {
            var l = AVAILABLE_LANGUAGES_1[_i];
            if (l.name === lang) {
                return l.code;
            }
        }
        return null;
    };
    SettingsPage.getLanguageFromCode = function (code) {
        for (var _i = 0, AVAILABLE_LANGUAGES_2 = __WEBPACK_IMPORTED_MODULE_9__app_constants__["d" /* AVAILABLE_LANGUAGES */]; _i < AVAILABLE_LANGUAGES_2.length; _i++) {
            var l = AVAILABLE_LANGUAGES_2[_i];
            if (l.code === code) {
                return l.name;
            }
        }
        return null;
    };
    SettingsPage = SettingsPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/settings/settings.html"*/'<!--\n\n  Generated template for the Settings page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>{{\'APP_SETTINGS\' | translate}}</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-list>\n\n    <ion-item>\n\n      <ion-label>{{\'SETTINGS_INTERACTION\' | translate}}</ion-label>\n\n      <ion-toggle color="oldrose" [(ngModel)]="settings.interaction"> </ion-toggle>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>{{\'SETTINGS_VOICE_CONTROL\' | translate}}</ion-label>\n\n      <ion-toggle color="oldrose" [(ngModel)]="settings.speechRecognition"> </ion-toggle>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>{{\'SETTINGS_AUTO_PLAY\' | translate}}</ion-label>\n\n      <ion-toggle color="oldrose" [(ngModel)]="settings.autoPlay"></ion-toggle>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>{{\'SETTINGS_LANGUAGE\' | translate}}</ion-label>\n\n      <ion-select [(ngModel)]="selectedLanguage" (ngModelChange)="changeLanguage()">\n\n        <ion-option *ngFor="let lang of languages">{{lang.name}}</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>{{\'SETTINGS_TTS_RATE\' | translate}}</ion-label>\n\n      <ion-select [(ngModel)]="ttsRate" (ngModelChange)="changeTtsRate()">\n\n        <ion-option *ngFor="let rate of ttsRates" [value]="rate">{{rate | translate}}</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>{{\'SETTINGS_FONT_SIZE\' | translate}}</ion-label>\n\n      <ion-select [(ngModel)]="fonts" interface="action-sheet">\n\n        <ion-option value="pixel12">12px</ion-option>\n\n        <ion-option value="pixel14">14px</ion-option>\n\n        <ion-option value="pixel16">16px</ion-option>\n\n        <ion-option value="pixel18">18px</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n\n\n    <ion-item (click)="goToUserAccount()">\n\n      <ion-label>{{\'SETTINGS_GO_TO_ACCOUNT\' | translate}}</ion-label>\n\n    </ion-item>\n\n\n\n    <ion-item (click)="goToCreditspage()">\n\n      <ion-label>Credits</ion-label>\n\n    </ion-item>\n\n\n\n      <ion-item (click)="goToImpressumpage()">\n\n        <ion-label>Impressum</ion-label>\n\n      </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/settings/settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_settings_settings__["a" /* SettingsProvider */],
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_simple_toast_simple_toast__["a" /* SimpleToastProvider */]])
    ], SettingsPage);
    return SettingsPage;
    var SettingsPage_1;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoryDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_story_story__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__player_player__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_constants__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_savegame_savegame__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_public_story_helper_public_story_helper__ = __webpack_require__(64);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the StoryDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var StoryDetailsPage = (
    function () {
    function StoryDetailsPage(navCtrl, navParams, storyProvider, savegameProvider, publicStoryHelper) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storyProvider = storyProvider;
        this.savegameProvider = savegameProvider;
        this.publicStoryHelper = publicStoryHelper;
        this.imgPath = 'dummy.png';
        this.selectedStory = navParams.get("selectedStory");
        console.log("Show Details: " + JSON.stringify(this.selectedStory));
        if (this.selectedStory.medium === "cloud") {
            this.imgPath = this.publicStoryHelper.getThumbnailPathForStory(this.selectedStory);
        }
        else {
            this.imgPath = __WEBPACK_IMPORTED_MODULE_4__app_constants__["l" /* STORY_DIR */] + this.selectedStory.id + '/icon.png';
        }
        console.log("ImgPath:", this.imgPath);
        this.selectedReader = this.savegameProvider.loadSavegame(this.selectedStory.id).reader;
    }
    //Muss noch implementiert werden
    StoryDetailsPage.prototype.saveReader = function () {
        var sg = this.savegameProvider.loadSavegame(this.selectedStory.id);
        sg.reader = this.selectedReader;
        this.savegameProvider.updateSavegame(sg);
    };
    StoryDetailsPage.prototype.deleteStory = function (id) {
        this.storyProvider.deleteStory(id);
        //Muss noch implementiert werden
        //deleteSaveGame();
        this.navCtrl.pop();
    };
    StoryDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StoryDetailsPage');
    };
    StoryDetailsPage.prototype.goToPlayerPageNew = function (storyId) {
        console.log("StoryId: " + storyId);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__player_player__["a" /* PlayerPage */], {
            storyId: storyId,
            mode: "begin"
        });
    };
    StoryDetailsPage.prototype.goToPlayerPageContinue = function (storyId) {
        console.log("StoryId: " + storyId);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__player_player__["a" /* PlayerPage */], {
            storyId: storyId,
            mode: "continue"
        });
    };
    StoryDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-storyDetails',template:/*ion-inline-start:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/storyDetails/storyDetails.html"*/'<!--\n\n  Generated template for the StoryDetailsPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n' +
                '   }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_story_story__["a" /* StoryProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_savegame_savegame__["a" /* SaveGameProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_public_story_helper_public_story_helper__["a" /* PublicStoryHelperProvider */]])
    ], StoryDetailsPage);
    return StoryDetailsPage;
}());

//# sourceMappingURL=storyDetails.js.map

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangeUserAccountPinPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ChangeUserAccountPinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChangeUserAccountPinPage = (function () {
    function ChangeUserAccountPinPage(navCtrl, navParams, authProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authProvider = authProvider;
        this.createSuccess = false;
        this.credentials = { oldPin: '', pin: '', retypePin: '' };
    }
    ChangeUserAccountPinPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChangeUserAccountPinPage');
    };
    ChangeUserAccountPinPage.prototype.changePin = function () {
        var _this = this;
        this.authProvider.changePin(this.credentials.oldPin, this.credentials.pin, this.credentials.retypePin).subscribe(function (response) {
            if (response.success) {
                _this.navCtrl.pop();
            }
            else {
                // TODO popup with info
                console.log(response.reason);
            }
        }, function (error) {
            console.log("ChangeUserAccountPinPage-changePin(): " + error.prototype.toString() + ":" + JSON.stringify(error));
        });
    };
    ChangeUserAccountPinPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-change-user-account-pin',template:/*ion-inline-start:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/change-user-account-pin/change-user-account-pin.html"*/'<!--\n\n  Generated template for the ChangeUserAccountPinPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Change pin</ion-title> <!-- TODO i18n Tobi -->\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <form (ngSubmit)="changePin()" #changePinForm="ngForm">\n\n    <ion-row>\n\n      <ion-col>\n\n        <ion-list inset>\n\n          <ion-item>\n\n            <ion-label floating>Type your current pin</ion-label> <!-- TODO i18n Tobi -->\n\n            <ion-input type="password" name="old-pin" [(ngModel)]="credentials.oldPin" required></ion-input>\n\n          </ion-item>\n\n\n\n          <ion-item>\n\n            <ion-label floating>Type your new pin</ion-label> <!-- TODO i18n Tobi -->\n\n            <ion-input type="password" name="pin" [(ngModel)]="credentials.pin" required></ion-input>\n\n          </ion-item>\n\n\n\n          <ion-item>\n\n            <ion-label floating>Retype your new pin</ion-label> <!-- TODO i18n Tobi -->\n\n            <ion-input type="password" name="retype-pin" [(ngModel)]="credentials.retypePin" required></ion-input>\n\n          </ion-item>\n\n\n\n        </ion-list>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col>\n\n        <button ion-button class="submit-btn" full type="submit" [disabled]="!changePinForm.form.valid">Save</button> <!-- TODO i18n Tobi -->\n\n      </ion-col>\n\n    </ion-row>\n\n  </form>\n\n</ion-content>\n\n'/*ion-inline-end:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/change-user-account-pin/change-user-account-pin.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */]])
    ], ChangeUserAccountPinPage);
    return ChangeUserAccountPinPage;
}());

//# sourceMappingURL=change-user-account-pin.js.map

/***/ }),

/***/ 156:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 156;

/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/change-user-account-pin/change-user-account-pin.module": [
		370,
		4
	],
	"../pages/credits/credits.module": [
		366,
		3
	],
	"../pages/impressum/impressum.module": [
		367,
		2
	],
	"../pages/settings/settings.module": [
		368,
		1
	],
	"../pages/storyDetails/storyDetails.module": [
		369,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 197;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfile; });
/**
 *
 * @author Matthias Kiefer
 * @date 20.11.2017
 */
var UserProfile = (function () {
    function UserProfile(name, avatarId, child) {
        this.id = Math.random().toString(36).substr(2, 9);
        this.name = name;
        this.avatar = UserProfile.avatars(avatarId);
        this.child = child;
    }
    UserProfile.avatars = function (id) {
        if (id !== undefined) {
            return UserProfile.AVATARS[id];
        }
        else {
            return UserProfile.AVATARS;
        }
    };
    UserProfile.AVATARS = [
        { id: 0, name: 'profile_standard.png', fullPath: '/www/assets/imgs/profile/profile_standard.png' },
        { id: 1, name: 'profile_girl_01.png', fullPath: '/www/assets/imgs/profile/profile_girl_01.png' },
        { id: 2, name: 'profile_boy_01.png', fullPath: '/www/assets/imgs/profile/profile_boy_01.png' },
        { id: 3, name: 'profile_girl_02.png', fullPath: '/www/assets/imgs/profile/profile_girl_02.png' },
        { id: 4, name: 'profile_boy_02.png', fullPath: '/www/assets/imgs/profile/profile_boy_02.png' }
    ];
    return UserProfile;
}());

//# sourceMappingURL=userProfile.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserAccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_start_start__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_change_user_account_pin_change_user_account_pin__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 *
 * @author Matthias Kiefer
 * @date 2017-11-20
 */





var UserAccountPage = (function () {
    function UserAccountPage(app, navCtrl, platform, authProvider) {
        var _this = this;
        this.app = app;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.authProvider = authProvider;
        this.platform.ready().then(function () {
            _this.userAccount = _this.authProvider.currentUserAccount;
        });
    }
    UserAccountPage.prototype.changePin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_change_user_account_pin_change_user_account_pin__["a" /* ChangeUserAccountPinPage */]);
    };
    UserAccountPage.prototype.logout = function () {
        var _this = this;
        this.authProvider.logout().subscribe(function (success) {
            // TODO is this pretty?
            _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_2__pages_start_start__["a" /* StartPage */]);
        });
    };
    UserAccountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-userAccount',template:/*ion-inline-start:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/userAccount/userAccount.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>{{\'USER_MANAGEMENT_MY_ACCOUNT\' | translate}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-card>\n\n    <ion-card-header>\n\n      {{userAccount.name}}\n\n    </ion-card-header>\n\n    <ion-card-content>\n\n      <p>\n\n        {{userAccount.email}}\n\n      </p>\n\n      <p>\n\n        {{userAccount.pin}}\n\n      </p>\n\n      <p>\n\n        <button ion-button (click)="logout()">Delete account</button> <!-- TODO i18n Tobi -->\n\n      </p>\n\n    </ion-card-content>\n\n  </ion-card>\n\n\n\n  pages/\n\n    <button ion-item (click)="changePin()">\n\n      <ion-item>\n\n        <h2>Change pin</h2>\n\n        <p>Choose a unique pin</p>\n\n      </ion-item>\n\n    </button>\n\n  </ion-list>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/userAccount/userAccount.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* AuthProvider */]])
    ], UserAccountPage);
    return UserAccountPage;
}());

//# sourceMappingURL=userAccount.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateUserAccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__selectUserProfile_selectUserProfile__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 *
 * @author Matthias Kiefer
 * @date 2017-11-19
 */




var CreateUserAccountPage = (function () {
    function CreateUserAccountPage(navCtrl, authProvider, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.authProvider = authProvider;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.createSuccess = false;
        this.registerCredentials = { name: '', email: '', pin: '' };
    }
    CreateUserAccountPage.prototype.register = function () {
        var _this = this;
        this.showLoading();
        this.authProvider.register(this.registerCredentials).subscribe(function (success) {
            if (success) {
                _this.createSuccess = true;
                // automatic login user
                _this.login();
            }
            else {
                _this.showPopup("Error", "Problem creating account.");
            }
        }, function (error) {
            _this.showPopup("Error", error);
        });
    };
    CreateUserAccountPage.prototype.login = function () {
        var _this = this;
        this.authProvider.login(this.registerCredentials).subscribe(function (allowed) {
            if (allowed) {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__selectUserProfile_selectUserProfile__["a" /* SelectUserProfilePage */]);
            }
            else {
                _this.showError("Access Denied");
            }
        }, function (error) {
            _this.showError(error);
        });
    };
    CreateUserAccountPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    CreateUserAccountPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    CreateUserAccountPage.prototype.showPopup = function (title, text) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: [
                {
                    text: 'OK',
                    handler: function (data) {
                        if (_this.createSuccess) {
                            _this.navCtrl.popToRoot();
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    CreateUserAccountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-createUserAccount',template:/*ion-inline-start:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/createUserAccount/createUserAccount.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>{{ \'USER_MANAGEMENT_CREATE_ACCOUNT\' | translate }}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="login-content" padding>\n\n  <div class="login-box">\n\n\n\n    <form (ngSubmit)="register()" #registerForm="ngForm">\n\n      <ion-row>\n\n        <ion-col>\n\n          <ion-list inset>\n\n            <ion-item>\n\n              <ion-label floating>{{\'USER_MANAGEMENT_NAME\' | translate }}</ion-label>\n\n              <ion-input type="text" name="name" [(ngModel)]="registerCredentials.name" required></ion-input>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n              <ion-label floating>{{\'USER_MANAGEMENT_EMAIL\' | translate }}</ion-label>\n\n              <ion-input type="email" name="email" [(ngModel)]="registerCredentials.email" required></ion-input>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n              <ion-label floating>{{\'USER_MANAGEMENT_PIN\' | translate }}</ion-label>\n\n              <ion-input type="password" name="pin" [(ngModel)]="registerCredentials.pin" required></ion-input>\n\n            </ion-item>\n\n\n\n          </ion-list>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col>\n\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.form.valid">{{\'USER_MANAGEMENT_CREATE\' | translate }}</button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </form>\n\n\n\n    <!-- TODO connect with google\n\n        https://developers.google.com/identity/sign-in/web/sign-in\n\n   --->\n\n\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/createUserAccount/createUserAccount.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], CreateUserAccountPage);
    return CreateUserAccountPage;
}());

//# sourceMappingURL=createUserAccount.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__availableStories_availableStories__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_settings__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__storyMenu_storyMenu__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = (function () {
    function TabsPage() {
        this.tabs = [
            { title: 'APP_MY_STORIES', icon: 'book', component: __WEBPACK_IMPORTED_MODULE_3__storyMenu_storyMenu__["a" /* StoryMenuPage */] },
            { title: 'APP_NEW_STORIES', icon: 'add-circle', component: __WEBPACK_IMPORTED_MODULE_1__availableStories_availableStories__["a" /* AvailableStoriesPage */] },
            { title: 'APP_SETTINGS', icon: 'settings', component: __WEBPACK_IMPORTED_MODULE_2__settings_settings__["a" /* SettingsPage */] }
        ];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/tabs/tabs.html"*/'<ion-tabs selectedIndex="0">\n\n  <ion-tab *ngFor="let tab of tabs" [root]="tab.component"\n\n    tabTitle="{{tab.title | translate}}"\n\n    tabIcon="{{tab.icon}}">\n\n  </ion-tab>\n\n</ion-tabs>\n\n'/*ion-inline-end:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AvailableStoriesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__datamodels_storyInformation__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_story_story__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alert_alert__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_zip__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_angular_platform_platform__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_angular_components_loading_loading_controller__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_simple_toast_simple_toast__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var AvailableStoriesPage = (function () {
    function AvailableStoriesPage(zone, navCtrl, http, translate, storyProvider, alert, platform, transfer, file, zip, loadingCntrl, toastProvider) {
        var _this = this;
        this.zone = zone;
        this.navCtrl = navCtrl;
        this.http = http;
        this.translate = translate;
        this.storyProvider = storyProvider;
        this.alert = alert;
        this.platform = platform;
        this.transfer = transfer;
        this.file = file;
        this.zip = zip;
        this.loadingCntrl = loadingCntrl;
        this.toastProvider = toastProvider;
        this.availableStories = new Array();
        this.PUBLIC_STORY_URL = 'https://raw.githubusercontent.com/TaleTime/Stories/master/index.json';
        this.loadDeviceDefaultStories();
        this.platform.ready().then(function () {
            _this.loadPublicStories();
        });
    }
    /**
     * Loads the (hardcoded) default stories into the availableStories array
     */
    AvailableStoriesPage.prototype.loadDeviceDefaultStories = function () {
        var newstory = new __WEBPACK_IMPORTED_MODULE_3__datamodels_storyInformation__["a" /* StoryInformation */]();
        newstory.title = "Der verlorene Ball";
        newstory.id = "Der_verlorene_Ball";
        newstory.author = ["Sarah Philippi", "Lisa Roisch"];
        newstory.date = 2016;
        newstory.cover = "Titelbild_Der_verlorene_Ball-02.png";
        newstory.language = "Deutsch";
        newstory.shortDescription = "Hey, ich bin eine Beschreibung von \"Der verlorene Ball\"";
        newstory.medium = 'device';
        newstory.readers = [{ name: "Kevin", answersPartOfAudioFile: true },
            { name: "Raoul", answersPartOfAudioFile: false }];
        this.availableStories.push(newstory);
    };
    AvailableStoriesPage.prototype.addStory = function (story) {
        console.log("addStory(): " + JSON.stringify(story));
        if (story.medium === 'cloud' && 'url' in story) {
            // story is a public story and the URL is defined in the object
            this.installPublicStory(story);
        }
        else if (this.storyProvider.exists(story.id)) {
            //story already exists
            this.alertStoryAlreadyExists(story.title);
        }
        else {
            //add new (non cloud) story
            this.storyProvider.addStory(story);
            this.alertStoryAddedSucessfully(story.title);
        }
    };
    /**
     * Load the public stories available from the remote JSON file or an API
     * specified by the PUBLIC_STORY_URL
     */
    AvailableStoriesPage.prototype.loadPublicStories = function () {
        var that = this;
        this.http.get(this.PUBLIC_STORY_URL, {}, {})
            .then(function (data) {
            var content = data = JSON.parse(data.data);
            for (var i = 0; i < content.length; i++) {
                content[i].medium = 'cloud'; // TODO const and object
                that.availableStories.push(content[i]);
            }
        })
            .catch(function (error) {
            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);
        });
    };
    /**
     * Creates a loading view without presenting it
     * @param content content for the loading view
     */
    AvailableStoriesPage.prototype.createLoading = function (content) {
        var options = {
            content: content
        };
        var loading = this.loadingCntrl.create(options);
        return loading;
    };
    AvailableStoriesPage.prototype.downloadProgressStr = function (title, loaded, total) {
        return this.translate.instant('STORY_DOWNLOAD_PROGRESS', {
            "title": title,
            "progress": Math.round((loaded / total) * 100) + '%'
        });
    };
    AvailableStoriesPage.prototype.unpackingProgressStr = function (title, loaded, total) {
        return this.translate.instant('STORY_UNPACKING_PROGRESS', {
            "title": title,
            "progress": Math.round((loaded / total) * 100) + '%'
        });
    };
    /**
     * Updates the content of a loading and forces a ui refresh
     * @param content new content for the loading
     * @param loading loading to be updated
     */
    AvailableStoriesPage.prototype.updateLoadingContent = function (content, loading) {
        //Without zone.run, the new content is not displayed
        this.zone.run(function () {
            loading.setContent(content);
        });
    };
    /**
     * Downloads and installs a story from a remote URL specified in the StoryInformationWithUrl
     * @param story Story to download and install
     */
    AvailableStoriesPage.prototype.installPublicStory = function (story) {
        var _this = this;
        if (this.storyProvider.exists(story.id)) {
            this.alertStoryAlreadyExists(story.title);
        }
        else {
            var url_1 = story.url;
            var zipFileName_1 = story.id + ".zip";
            var targetFolderForZip_1 = this.file.externalRootDirectory + "taletime/";
            var zipFilePath_1 = targetFolderForZip_1 + zipFileName_1;
            var loading_1 = this.createLoading(this.downloadProgressStr(story.title, 0, 100));
            var fileTransfer = this.transfer.create();
            loading_1.present();
            fileTransfer.onProgress(function (event) {
                //The loading instance hast to be refreshed within the zone.run method because otherwise
                //the progress is not updated automatically
                _this.updateLoadingContent(_this.downloadProgressStr(story.title, event.loaded, event.total), loading_1);
            });
            //Download the Zip-File
            fileTransfer.download(url_1, zipFilePath_1).then(function (entry) {
                var localUrl = entry.toURL();
                //Unzip into the story folder
                _this.zip.unzip(localUrl, targetFolderForZip_1, function (progressEvent) {
                    //Display unpacking progress
                    _this.updateLoadingContent(_this.unpackingProgressStr(story.title, progressEvent.loaded, progressEvent.total), loading_1);
                }).then(function (result) {
                    if (result === 0) {
                        _this.file.removeFile(targetFolderForZip_1, zipFileName_1).then(function (removeRes) {
                            _this.storyProvider.addStory(story);
                            loading_1.dismiss();
                            _this.alertStoryAddedSucessfully(story.title);
                        }).catch(function (error) {
                            loading_1.dismiss();
                            _this.toastProvider.displayToast(_this.translate.instant('STORY_ZIP_REMOVE_FAIL'));
                            console.log("Could not remove downloaded Zip!");
                        });
                    }
                    else if (result === -1) {
                        console.log('Unzipping the file failed!');
                        _this.toastProvider.displayToast(_this.translate.instant('STORY_ZIP_UNPACK_FAIL'));
                    }
                });
            }, function (error) {
                loading_1.dismiss();
                _this.toastProvider.displayToast(_this.translate.instant('STORY_DOWNLOAD_FAIL'));
                console.error("Could not download the file: " + url_1 + " to path: " + zipFilePath_1);
                console.error(JSON.stringify(error));
            });
        }
    };
    /**
     * Alert for already existing story
     * @param storyTitle title of the story
     */
    AvailableStoriesPage.prototype.alertStoryAlreadyExists = function (storyTitle) {
        //story already exists --> display a message and return
        this.alert.createAlert(this.translate.instant('STORY_ALREADY_EXISTS_TITLE'), '', [{ text: this.translate.instant('COMMON_OK') }], this.translate.instant('STORY_ALREADY_EXISTS_MSG', { story_title: storyTitle })).present();
    };
    /**
     * Alert for successful installation of a story
     * @param storyTitle title of the new story
     */
    AvailableStoriesPage.prototype.alertStoryAddedSucessfully = function (storyTitle) {
        this.alert.createAlert(this.translate.instant('STORY_ADDED'), '', [{ text: this.translate.instant('COMMON_OK') }], this.translate.instant('STORY_ADDED_MSG', { story_title: storyTitle })).present();
    };
    AvailableStoriesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-availableStories',template:/*ion-inline-start:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/availableStories/availableStories.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>{{ \'APP_AVAILABLE_STORIES\' | translate }}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="content">\n\n  <ion-card *ngFor="let story of availableStories" (click)="addStory(story)">\n\n    <ion-item>\n\n      <ion-thumbnail item-start>\n\n        <ion-icon *ngIf="!story.cover" item-start name="book" style="font-size: 64px;"></ion-icon>\n\n        <ion-img *ngIf="story.cover" item-start src=\'assets/imgs/story/{{story.cover}}\'></ion-img>\n\n      </ion-thumbnail>\n\n\n\n\n\n      <h1><ion-icon name="cloud-download" *ngIf="story.medium === \'cloud\'"></ion-icon> {{story.title}}</h1>\n\n      <h2>{{story.author}}</h2>\n\n      <p>{{story.date}}</p>\n\n    </ion-item>\n\n    <ion-card-content>\n\n      <p>{{story.shortDescription}}</p>\n\n    </ion-card-content>\n\n  </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/availableStories/availableStories.html"*/
        })
        /**
         * Die Klasse wird momentan als provisorischer Store zum testen genutzt
         */
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_4__providers_story_story__["a" /* StoryProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_alert_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_10_ionic_angular_platform_platform__["a" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_zip__["a" /* Zip */],
            __WEBPACK_IMPORTED_MODULE_11_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_12__providers_simple_toast_simple_toast__["a" /* SimpleToastProvider */]])
    ], AvailableStoriesPage);
    return AvailableStoriesPage;
}());

//# sourceMappingURL=availableStories.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AudioProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_media__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_events__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logger_logger__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * @author Markus Altmeyer
 */
var AudioProvider = (function () {
    function AudioProvider(media, logger) {
        this.media = media;
        this.logger = logger;
        this.isPlaying = false;
    }
    /**
     * Loads an audio file. After this the file can be played, stopped etc
     * @param audioPath Pfad zur Audiodatei
     * @param audioFinishedCallback  Gets called when the audio file finishes playing. This is true if auido finishes playing or when stop is called while audio is playing
     * @param errorCallback Gets called when an error occures.
     */
    AudioProvider.prototype.loadAudio = function (audioPath, audioFinishedCallback, errorCallback) {
        var _this = this;
        this.mediaObject = this.media.create(audioPath);
        this.emitter = new __WEBPACK_IMPORTED_MODULE_2_events__["EventEmitter"];
        //Subscribe for events
        this.mediaObject.onStatusUpdate.subscribe(function (status) {
            switch (status) {
                case _this.media.MEDIA_STARTING:
                    _this.logger.log("[Media] Started");
                    // this.emitter.emit("started");
                    break;
                case _this.media.MEDIA_RUNNING:
                    _this.logger.log("[Media] Running");
                    _this.emitter.emit("started");
                    break;
                case _this.media.MEDIA_PAUSED:
                    _this.logger.log("[Media] Paused");
                    _this.emitter.emit("paused");
                    break;
                case _this.media.MEDIA_STOPPED:
                    _this.logger.log("[Media] Stopped");
                    _this.emitter.emit("stopped");
                    break;
            }
        });
        // Gets called when audio finishes playing. Could be either when the file finishes, or when stop gets called while audio was playing
        this.mediaObject.onSuccess.subscribe(function () {
            _this.logger.log("[Media] Audio finished");
            _this.isPlaying = false;
            //file finishes playing or was stopped
            if (audioFinishedCallback) {
                audioFinishedCallback();
            }
        });
        //Error could be an error while loading the audio file
        //Error code: https://github.com/apache/cordova-plugin-media#constants-1
        this.mediaObject.onError.subscribe(function (error) {
            _this.logger.log(error);
            _this.isPlaying = false;
            if (errorCallback) {
                errorCallback(error);
            }
        });
    };
    /**
     * Starts playing or resuming an audio file
     */
    AudioProvider.prototype.play = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (!_this.isPlaying) {
                _this.isPlaying = true;
                _this.emitter.once('started', function () {
                    resolve();
                });
                _this.mediaObject.play();
            }
            else {
                resolve();
            }
        });
    };
    /**
     * Pauses an audio file if playing
     */
    AudioProvider.prototype.pause = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.isPlaying) {
                _this.isPlaying = false;
                _this.emitter.once('paused', function () {
                    resolve();
                });
                _this.mediaObject.pause();
            }
            else {
                resolve();
            }
        });
    };
    /**
     * Stops an Audio file if playing
     */
    AudioProvider.prototype.stop = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.isPlaying) {
                _this.isPlaying = false;
                _this.emitter.once('stopped', function () {
                    resolve();
                });
                _this.mediaObject.stop();
            }
            else {
                resolve();
            }
        });
    };
    AudioProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_media__["a" /* Media */], __WEBPACK_IMPORTED_MODULE_3__logger_logger__["a" /* LoggerProvider */]])
    ], AudioProvider);
    return AudioProvider;
}());

//# sourceMappingURL=audio.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnswerMatchingProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__languageFile__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_constants__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logger_logger__ = __webpack_require__(22);
/**
 * Created by Kevin on 24.06.2017.
 * Matches a s string of speech recognition results to an answer
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AnswerMatchingProvider = (function () {
    function AnswerMatchingProvider(languageFileProvider, logger) {
        this.languageFileProvider = languageFileProvider;
        this.logger = logger;
    }
    AnswerMatchingProvider_1 = AnswerMatchingProvider;
    AnswerMatchingProvider.prototype.match = function (result, answers) {
        if (answers.length != 1) {
            // find exact math considering the hierachy
            for (var i = 0; i < result.length; i++) {
                for (var _i = 0, answers_1 = answers; _i < answers_1.length; _i++) {
                    var answer = answers_1[_i];
                    if (AnswerMatchingProvider_1.checkContent(answer.value, result[i])) {
                        this.logger.log(answer.value + " matched to answer");
                        return answer;
                    }
                }
            }
        }
        else {
            // only one answer possible, the system asks if the user wants to continue
            // therefore check if user agrees
            for (var i = 0; i < result.length; i++) {
                for (var _a = 0, _b = this.languageFileProvider.preDefinedTexts.agree; _a < _b.length; _a++) {
                    var a = _b[_a];
                    if (AnswerMatchingProvider_1.checkContent(a.value, result[i])) {
                        this.logger.log(a.value + " matched to answer");
                        return answers[0]; // it is only one possible here
                    }
                }
            }
        }
        // nothing found so far, check for numbers
        for (var i = 0; i < result.length; i++) {
            for (var _c = 0, _d = this.languageFileProvider.preDefinedTexts.enum; _c < _d.length; _c++) {
                var e = _d[_c];
                if (AnswerMatchingProvider_1.checkContent(e.value, result[i])) {
                    return answers[e.index - 1];
                }
            }
        }
        // navigate backwards
        for (var i = 0; i < result.length; i++) {
            for (var _e = 0, _f = this.languageFileProvider.preDefinedTexts.backwards; _e < _f.length; _e++) {
                var e = _f[_e];
                if (AnswerMatchingProvider_1.checkContent(e.value, result[i])) {
                    return __WEBPACK_IMPORTED_MODULE_2__app_constants__["a" /* ANSWER_CHAPTER_BACKWARDS */];
                }
            }
        }
        // repeat current chapter
        for (var i = 0; i < result.length; i++) {
            for (var _g = 0, _h = this.languageFileProvider.preDefinedTexts.repeatChapter; _g < _h.length; _g++) {
                var e = _h[_g];
                if (AnswerMatchingProvider_1.checkContent(e.value, result[i])) {
                    return __WEBPACK_IMPORTED_MODULE_2__app_constants__["b" /* ANSWER_CHAPTER_REPEAT */];
                }
            }
        }
        // does not matter
        for (var i = 0; i < result.length; i++) {
            for (var _j = 0, _k = this.languageFileProvider.preDefinedTexts.doNotCare; _j < _k.length; _j++) {
                var e = _k[_j];
                if (AnswerMatchingProvider_1.checkContent(e.value, result[i])) {
                    return answers[AnswerMatchingProvider_1.createRandomNumber(answers.length)];
                }
            }
        }
        return null;
    };
    AnswerMatchingProvider.checkContent = function (search, containedIn) {
        search = AnswerMatchingProvider_1.removeSpecialCharacters(search);
        console.log("Checking if <" + containedIn.toLowerCase() + "> contains <" + search.toLowerCase() + ">");
        return containedIn.toLowerCase().indexOf(search.toLowerCase()) > -1;
    };
    AnswerMatchingProvider.removeSpecialCharacters = function (s) {
        return s.replace(/[^a-zA-Z0-9\s]/g, '');
    };
    AnswerMatchingProvider.createRandomNumber = function (max) {
        return Math.ceil(Math.random() * max);
    };
    AnswerMatchingProvider = AnswerMatchingProvider_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__languageFile__["a" /* LanguageFileProvider */], __WEBPACK_IMPORTED_MODULE_3__logger_logger__["a" /* LoggerProvider */]])
    ], AnswerMatchingProvider);
    return AnswerMatchingProvider;
    var AnswerMatchingProvider_1;
}());

//# sourceMappingURL=answerMatching.js.map

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TtsTextProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__languageFile__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logger_logger__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Created by Kevin on 24.06.2017.
 * Creates texts for reading out the answers
 */
var TtsTextProvider = (function () {
    function TtsTextProvider(languageFileProvider, logger) {
        this.languageFileProvider = languageFileProvider;
        this.logger = logger;
    }
    TtsTextProvider.prototype.createAnswersText = function (answers) {
        var text;
        this.logger.log("Reading answers out for these possible answers: " + JSON.stringify(answers));
        if (answers.length == 1) {
            // only one possible answer
            this.logger.log("There's only one possible answer");
            var i = this.generateRandomNumber(this.languageFileProvider.preDefinedTexts.answers.single.length);
            text = this.languageFileProvider.preDefinedTexts.answers.single[i].value;
        }
        else {
            // multiple possible answers
            this.logger.log("There are multiple possible answers");
            var i = this.generateRandomNumber(this.languageFileProvider.preDefinedTexts.answers.single.length);
            text = this.languageFileProvider.preDefinedTexts.answers.multiple[i].value;
            for (var i_1 = 0; i_1 < answers.length; i_1++) {
                if (i_1 != answers.length - 1) {
                    text = text + " " + answers[i_1].value;
                    if (i_1 < answers.length - 2) {
                        text = text + ",";
                    }
                }
                else {
                    var j = this.generateRandomNumber(this.languageFileProvider.preDefinedTexts.linking.or.length);
                    text = text + " " + this.languageFileProvider.preDefinedTexts.linking.or[j].value + " " + answers[i_1].value + "?";
                }
            }
        }
        this.logger.log("Created answer text : " + text);
        return text;
    };
    TtsTextProvider.prototype.generateRandomNumber = function (l) {
        this.logger.log("Generating random number less than " + l);
        return Math.ceil(Math.random() * l) - 1;
    };
    TtsTextProvider.prototype.createRepeatText = function () {
        var i = this.generateRandomNumber(this.languageFileProvider.preDefinedTexts.repeat.length);
        return this.languageFileProvider.preDefinedTexts.repeat[i].value;
    };
    TtsTextProvider.prototype.createAnswerHelp = function () {
        var i = this.generateRandomNumber(this.languageFileProvider.preDefinedTexts.answers.help.length);
        return this.languageFileProvider.preDefinedTexts.answers.help[i].value;
    };
    TtsTextProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__languageFile__["a" /* LanguageFileProvider */], __WEBPACK_IMPORTED_MODULE_2__logger_logger__["a" /* LoggerProvider */]])
    ], TtsTextProvider);
    return TtsTextProvider;
}());

//# sourceMappingURL=ttsText.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateUserProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__datamodels_userProfile__ = __webpack_require__(203);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 *
 * @author Matthias Kiefer
 * @date 2017-11-28
 */



 // for avatars
var CreateUserProfilePage = (function () {
    function CreateUserProfilePage(navCtrl, authProvider) {
        this.navCtrl = navCtrl;
        this.authProvider = authProvider;
        this.profileCredentials = { name: '', avatarId: 0, child: false };
        this.profileAvatars = __WEBPACK_IMPORTED_MODULE_3__datamodels_userProfile__["a" /* UserProfile */].avatars();
        this.selectAvatar(null, 0);
    }
    CreateUserProfilePage.prototype.selectAvatar = function (event, avatarId) {
        if (event) {
            event.stopPropagation();
        }
        this.activeAvatarId = avatarId;
    };
    CreateUserProfilePage.prototype.create = function () {
        var _this = this;
        this.profileCredentials.avatarId = this.activeAvatarId;
        this.authProvider.createUserProfile(this.profileCredentials).subscribe(function (success) {
            if (success) {
                _this.close();
            }
        }, function (error) {
            console.log("CreateUserProfilePage-create(): " + JSON.stringify(error));
        });
    };
    CreateUserProfilePage.prototype.close = function () {
        this.navCtrl.pop();
    };
    CreateUserProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-createUserProfile',template:/*ion-inline-start:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/createUserProfile/createUserProfile.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>{{ \'USER_MANAGEMENT_CREATE_PROFILE\' | translate }}</ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="close()">\n\n            <ion-icon name="close"></ion-icon>\n\n        </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="profile-content" padding>\n\n  <div class="profile-box">\n\n    <h2>\n\n      {{ \'USER_MANAGEMENT_CREATE_PROFILE_SUBTITLE\' | translate }}\n\n    </h2>\n\n    <form (ngSubmit)="create()" #createProfileForm="ngForm">\n\n      <ion-row>\n\n        <ion-col>\n\n          <ion-list>\n\n            <ion-item>\n\n              <ion-label floating>{{\'USER_MANAGEMENT_NAME\' | translate }}</ion-label>\n\n              <ion-input type="text" name="name" [(ngModel)]="profileCredentials.name" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n              <ion-label>Für Kinder</ion-label>\n\n              <ion-toggle name="child" [(ngModel)]="profileCredentials.child"></ion-toggle>\n\n            </ion-item>\n\n          </ion-list>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n      <ion-row>\n\n        <ion-col width-33 *ngFor="let profileAvatar of profileAvatars" class="col">\n\n          <img [class.highlightAvatar]="profileAvatar.id == this.activeAvatarId" src=\'assets/imgs/profile/{{profileAvatar.name}}\' (click)="selectAvatar($event, profileAvatar.id)" />\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n      <ion-row>\n\n        <ion-col>\n\n          <button ion-button full type="submit" [disabled]="!createProfileForm.form.valid">{{\'COMMON_CONTINUE\' | translate }}</button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </form>\n\n\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/createUserProfile/createUserProfile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */]])
    ], CreateUserProfilePage);
    return CreateUserProfilePage;
}());

//# sourceMappingURL=createUserProfile.js.map

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_constants__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logger_logger__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StorageProvider = (function () {
    function StorageProvider(file, logger) {
        this.file = file;
        this.logger = logger;
    }
    /**
     * Check if the taletime directory on the external root dir exists
     * or create it and ask for the file permission
     */
    StorageProvider.prototype.createAppDirOnExtRoot = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var path = _this.file.externalRootDirectory;
            var datadir = path + __WEBPACK_IMPORTED_MODULE_2__app_constants__["c" /* APP_NAME */] + "/";
            //make sure dir exists
            _this.file.checkDir(path, __WEBPACK_IMPORTED_MODULE_2__app_constants__["c" /* APP_NAME */]).then(function () {
                _this.logger.log(path + "/" + __WEBPACK_IMPORTED_MODULE_2__app_constants__["c" /* APP_NAME */] + " exists!");
                _this.getPermission(path).then(function () {
                    resolve(true);
                }).catch(function (error) { return reject(error); });
            }).catch(function () {
                _this.logger.log("<" + datadir + " does not exist!");
                _this.logger.log("Creating directory <" + datadir + ">");
                _this.file.createDir(path, __WEBPACK_IMPORTED_MODULE_2__app_constants__["c" /* APP_NAME */], true).then(function () {
                    _this.logger.log("Directory created successfully");
                    _this.getPermission(path).then(function () { return resolve(true); }).catch(function (error) { return reject(error); });
                }).catch(function (err) {
                    _this.logger.error("Directory <" + datadir + "> could not be created");
                    _this.logger.error(JSON.stringify(err));
                    reject(err);
                });
            });
        });
        return promise;
    };
    /**
     * Creates an empty file named 0 to ask for the file permission
     * @TODO: Find a better way to ask for the permission
     * @param path app folder path on the external root dir
     */
    StorageProvider.prototype.getPermission = function (path) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.file.createFile(path, '0', true).then(function () {
                resolve(true);
            }).catch(function (error) {
                reject(new Error("Could not write to app directory!"));
            });
        });
        return promise;
    };
    StorageProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_3__logger_logger__["a" /* LoggerProvider */]])
    ], StorageProvider);
    return StorageProvider;
}());

//# sourceMappingURL=storage.js.map

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoggerProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoggerProvider = (function () {
    function LoggerProvider() {
    }
    /**
     * log
  message   */
    LoggerProvider.prototype.log = function (message) {
        if (Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* isDevMode */])()) {
            console.log(this.expandToMessage(message));
        }
    };
    /**
     * warn
     */
    LoggerProvider.prototype.warn = function (message) {
        if (Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* isDevMode */])()) {
            console.warn(this.expandToMessage(message));
        }
    };
    LoggerProvider.prototype.expandToMessage = function (msgOrObj) {
        var message = "";
        if ((typeof msgOrObj) === 'string' || msgOrObj instanceof String) {
            //error is a string
            message = msgOrObj;
        }
        else {
            if (msgOrObj.hasOwnProperty("constructor") && msgOrObj.constructor.hasOwnProperty("name")) {
                //There is a constructor/class name defined
                message = msgOrObj.constructor.name;
            }
            else {
                //No constructor name is set --> use the object's prototype name as fallback method
                message = Object.prototype.toString.call(msgOrObj);
            }
            if (msgOrObj.hasOwnProperty("message")) {
                message += " : " + msgOrObj.message;
            }
            else {
                message += " : " + JSON.stringify(msgOrObj);
            }
        }
        return message;
    };
    /**
     * error
     */
    LoggerProvider.prototype.error = function (error) {
        if (Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* isDevMode */])()) {
            console.error(this.expandToMessage(error));
        }
    };
    LoggerProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], LoggerProvider);
    return LoggerProvider;
}());

//# sourceMappingURL=logger.js.map

/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__datamodels_userAccount__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__datamodels_userProfile__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__logger_logger__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthProvider = (function () {
    function AuthProvider(storage, alertCtrl, logger) {
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.logger = logger;
    }
    AuthProvider_1 = AuthProvider;
    AuthProvider.prototype.login = function (credentials) {
        var _this = this;
        console.log(credentials);
        if (credentials.email === null || credentials.pin === null) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw("Please insert credentials");
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
                // TODO At this point make a request to your backend to make a real check!
                var access = false;
                _this.storage.ready().then(function () { return _this.storage.get(AuthProvider_1.USER_ACCOUNT_KEY).then(function (val) {
                    console.log(val);
                    if (val) {
                        var storageUser = new __WEBPACK_IMPORTED_MODULE_5__datamodels_userAccount__["a" /* UserAccount */](val.name, val.email, val.pin, val.userProfiles);
                        access = (credentials.pin === storageUser.pin && credentials.email === storageUser.email); // TODO workaround because pin is store as pin (later in hash). Must be check via UserAccount and checkPin()
                        if (access) {
                            _this.currentUser = storageUser;
                        }
                    }
                    observer.next(access);
                    observer.complete();
                }); });
            });
        }
    };
    AuthProvider.prototype.addTestUser = function () {
        var _this = this;
        console.log("Test");
        var userAccount = new __WEBPACK_IMPORTED_MODULE_5__datamodels_userAccount__["a" /* UserAccount */]("Test", "test@mail.com", "1234");
        this.storage.set(AuthProvider_1.USER_ACCOUNT_KEY, userAccount);
        this.storage.ready().then(function () { return _this.storage.get(AuthProvider_1.USER_ACCOUNT_KEY).then(function (val) {
            console.log(val);
        }); });
    };
    AuthProvider.prototype.register = function (credentials) {
        if (credentials.email === null || credentials.name === null || credentials.pin === null) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw("Please insert credentials");
        }
        else {
            // TODO At this point store the credentials to your backend!
            var userAccount = new __WEBPACK_IMPORTED_MODULE_5__datamodels_userAccount__["a" /* UserAccount */](credentials.name, credentials.email, credentials.pin);
            this.save(userAccount);
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
                observer.next(true);
                observer.complete();
            });
        }
    };
    AuthProvider.prototype.createUserProfile = function (credentials) {
        if (credentials.name === null) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw("Please insert credentials");
        }
        else {
            // TODO At this point store the credentials to your backend!
            var userProfile = new __WEBPACK_IMPORTED_MODULE_6__datamodels_userProfile__["a" /* UserProfile */](credentials.name, credentials.avatarId, credentials.child);
            this.currentUserAccount.addUserProfile(userProfile);
            this.save();
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
                observer.next(true);
                observer.complete();
            });
        }
    };
    AuthProvider.prototype.changePin = function (oldPin, newPin, retypePin) {
        var response = {
            success: true,
            reason: ''
        };
        if (this.currentUserAccount.checkPin(oldPin)) {
            if (newPin === retypePin) {
                this.currentUserAccount.pin = newPin;
                this.save();
            }
            else {
                response.success = false;
                response.reason = 'New pin do not match'; // TODO Tobi i18n
            }
        }
        else {
            response.success = false;
            response.reason = 'Old pin do not match'; // TODO Tobi i18n
        }
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            observer.next(response);
            observer.complete();
        });
    };
    AuthProvider.prototype.deleteUserProfile = function (userProfileId) {
        this.currentUserAccount.removeUserProfile(userProfileId);
        this.save();
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            observer.next(true);
            observer.complete();
        });
    };
    AuthProvider.prototype.setActiveUserProfile = function (userProfileId) {
        this.currentUserAccount.setActiveUserProfile(userProfileId);
        this.save();
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            observer.next(true);
            observer.complete();
        });
    };
    AuthProvider.prototype.getActiveUserProfile = function () {
        return this.currentUserAccount.activeUserProfile;
    };
    AuthProvider.prototype.getUserAccount = function (callback) {
        var _this = this;
        var userAccount;
        this.storage.ready().then(function () { return _this.storage.get(AuthProvider_1.USER_ACCOUNT_KEY).then(function (val) {
            if (val) {
                userAccount = new __WEBPACK_IMPORTED_MODULE_5__datamodels_userAccount__["a" /* UserAccount */](val.name, val.email, val.pin);
            }
            callback(userAccount);
        }).catch(function (storageError) {
            //TODO: Matthias - Handle storage errors
            _this.logger.error(storageError);
        }); });
    };
    AuthProvider.prototype.logout = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            _this.currentUser = null;
            _this.storage.remove(AuthProvider_1.USER_ACCOUNT_KEY);
            observer.next(true);
            observer.complete();
        });
    };
    AuthProvider.prototype.save = function (userAccount) {
        this.storage.set(AuthProvider_1.USER_ACCOUNT_KEY, (userAccount || this.currentUserAccount));
    };
    AuthProvider.prototype.isValid = function (pin) {
        return this.currentUser.isValid(pin);
    };
    Object.defineProperty(AuthProvider.prototype, "currentUserAccount", {
        get: function () {
            return this.currentUser;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthProvider.prototype, "userProfiles", {
        get: function () {
            return Array.from(this.currentUserAccount.userProfiles.values());
        },
        enumerable: true,
        configurable: true
    });
    /*** UI ***/
    AuthProvider.prototype.presentPinPrompt = function (validFn, cancelFn) {
        var _this = this;
        return this.alertCtrl.create({
            title: 'PIN-Eingabe',
            inputs: [
                {
                    name: 'pin',
                    placeholder: 'Pin',
                    type: 'password'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        if (cancelFn) {
                            cancelFn(data);
                        }
                        else {
                            _this.logger.log('Cancel clicked');
                        }
                    }
                },
                {
                    text: 'Ok',
                    handler: function (data) {
                        if (validFn) {
                            validFn(_this.isValid(data.pin));
                        }
                        else {
                            _this.logger.log('Ok clicked');
                        }
                    }
                }
            ]
        });
    };
    AuthProvider.USER_ACCOUNT_KEY = 'userAccount';
    AuthProvider = AuthProvider_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_7__logger_logger__["a" /* LoggerProvider */]])
    ], AuthProvider);
    return AuthProvider;
    var AuthProvider_1;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(273);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_start_start__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_storyMenu_storyMenu__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_userAccount_userAccount__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_createUserAccount_createUserAccount__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_selectUserProfile_selectUserProfile__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_createUserProfile_createUserProfile__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_settings_settings__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_availableStories_availableStories__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_storyDetails_storyDetails__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_info_info__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_player_player__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_change_user_account_pin_change_user_account_pin__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_credits_credits__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_impressum_impressum__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_alert_alert__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_story_story__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_settings_settings__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_speechRecognition_answerMatching__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_speechRecognition_languageFile__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_speechRecognition_ttsText__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__providers_common_storage__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__providers_audio_audio__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__providers_auth_auth__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__angular_common_http__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ngx_translate_core__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ngx_translate_http_loader__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_storage__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_text_to_speech__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_speech_recognition__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_native_audio__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_native_globalization__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_file__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_status_bar__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ionic_native_splash_screen__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__providers_savegame_savegame__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__ionic_native_file_transfer__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__ionic_native_zip__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__providers_public_story_helper_public_story_helper__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__ionic_native_media__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__providers_simple_toast_simple_toast__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__providers_logger_logger__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__providers_platform_bridge_platform_bridge__ = __webpack_require__(117);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





/** Pages import */















/** Providers import */









/** Ionic framework imports */















//installed version 4.0.0 instead of latest, latest requires cordova-plugin-file@6.0.0 but file-transfer plugin requires cordova-plugin-file@5.0.0




function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_31__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_start_start__["a" /* StartPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_userAccount_userAccount__["a" /* UserAccountPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_createUserAccount_createUserAccount__["a" /* CreateUserAccountPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_createUserProfile_createUserProfile__["a" /* CreateUserProfilePage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_change_user_account_pin_change_user_account_pin__["a" /* ChangeUserAccountPinPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_selectUserProfile_selectUserProfile__["a" /* SelectUserProfilePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_storyMenu_storyMenu__["a" /* StoryMenuPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_availableStories_availableStories__["a" /* AvailableStoriesPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_storyDetails_storyDetails__["a" /* StoryDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_info_info__["a" /* InfoPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_player_player__["a" /* PlayerPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_credits_credits__["a" /* CreditsPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_impressum_impressum__["a" /* ImpressumPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/credits/credits.module#CreditsPageModule', name: 'CreditsPage', segment: 'credits', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/impressum/impressum.module#ImpressumPageModule', name: 'ImpressumPage', segment: 'impressum', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/storyDetails/storyDetails.module#StoryDetailsPageModule', name: 'StoryDetailsPage', segment: 'storyDetails', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/change-user-account-pin/change-user-account-pin.module#ChangeUserAccountPinPageModule', name: 'ChangeUserAccountPinPage', segment: 'change-user-account-pin', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_32__ionic_storage__["a" /* IonicStorageModule */].forRoot({
                    name: '__taletimedb',
                    driverOrder: ['indexeddb', 'sqlite', 'websql']
                }),
                __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_30__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_30__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: (createTranslateLoader),
                        deps: [__WEBPACK_IMPORTED_MODULE_29__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_start_start__["a" /* StartPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_createUserAccount_createUserAccount__["a" /* CreateUserAccountPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_createUserProfile_createUserProfile__["a" /* CreateUserProfilePage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_change_user_account_pin_change_user_account_pin__["a" /* ChangeUserAccountPinPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_selectUserProfile_selectUserProfile__["a" /* SelectUserProfilePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_userAccount_userAccount__["a" /* UserAccountPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_storyMenu_storyMenu__["a" /* StoryMenuPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_availableStories_availableStories__["a" /* AvailableStoriesPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_storyDetails_storyDetails__["a" /* StoryDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_info_info__["a" /* InfoPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_player_player__["a" /* PlayerPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_credits_credits__["a" /* CreditsPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_impressum_impressum__["a" /* ImpressumPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_38__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_39__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_20__providers_alert_alert__["a" /* AlertProvider */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__["a" /* HTTP */],
                __WEBPACK_IMPORTED_MODULE_21__providers_story_story__["a" /* StoryProvider */],
                __WEBPACK_IMPORTED_MODULE_46__providers_logger_logger__["a" /* LoggerProvider */],
                __WEBPACK_IMPORTED_MODULE_22__providers_settings_settings__["a" /* SettingsProvider */],
                __WEBPACK_IMPORTED_MODULE_23__providers_speechRecognition_answerMatching__["a" /* AnswerMatchingProvider */],
                __WEBPACK_IMPORTED_MODULE_24__providers_speechRecognition_languageFile__["a" /* LanguageFileProvider */],
                __WEBPACK_IMPORTED_MODULE_25__providers_speechRecognition_ttsText__["a" /* TtsTextProvider */],
                __WEBPACK_IMPORTED_MODULE_37__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_42__ionic_native_zip__["a" /* Zip */],
                __WEBPACK_IMPORTED_MODULE_41__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_35__ionic_native_native_audio__["a" /* NativeAudio */],
                __WEBPACK_IMPORTED_MODULE_33__ionic_native_text_to_speech__["a" /* TextToSpeech */],
                __WEBPACK_IMPORTED_MODULE_34__ionic_native_speech_recognition__["a" /* SpeechRecognition */],
                __WEBPACK_IMPORTED_MODULE_26__providers_common_storage__["a" /* StorageProvider */],
                __WEBPACK_IMPORTED_MODULE_27__providers_audio_audio__["a" /* AudioProvider */],
                __WEBPACK_IMPORTED_MODULE_36__ionic_native_globalization__["a" /* Globalization */],
                __WEBPACK_IMPORTED_MODULE_40__providers_savegame_savegame__["a" /* SaveGameProvider */],
                __WEBPACK_IMPORTED_MODULE_28__providers_auth_auth__["a" /* AuthProvider */],
                __WEBPACK_IMPORTED_MODULE_43__providers_public_story_helper_public_story_helper__["a" /* PublicStoryHelperProvider */],
                __WEBPACK_IMPORTED_MODULE_44__ionic_native_media__["a" /* Media */],
                __WEBPACK_IMPORTED_MODULE_45__providers_simple_toast_simple_toast__["a" /* SimpleToastProvider */],
                __WEBPACK_IMPORTED_MODULE_47__providers_platform_bridge_platform_bridge__["a" /* PlatformBridgeProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Settings; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_constants__ = __webpack_require__(14);

/**
 * Created by Kevin on 30.06.2017.
 * Datamodel for all settings available to control the general behavior of the app
 */
var Settings = (function () {
    function Settings() {
        this.autoPlay = true;
        this.language = 'de-DE';
        this.speechRecognition = false;
        this.interaction = false;
        this.ttsRate = __WEBPACK_IMPORTED_MODULE_0__app_constants__["p" /* TTS_RATE_NORMAL_VALUE */];
        // TODO font size needs to be added
    }
    return Settings;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserAccount; });
var UserAccount = (function () {
    function UserAccount(name, email, pin, userProfiles) {
        this.name = name;
        this.email = email;
        this.pin = pin;
        this.userProfiles = userProfiles || new Map();
    }
    // set pin(pin: any) {
    //   this._pin = pin; // TODO hash
    // }
    //
    // get pin() {
    //   return this._pin;
    // }
    UserAccount.prototype.checkPin = function (pin) {
        return (pin === this.pin);
    };
    UserAccount.prototype.addUserProfile = function (userProfile) {
        this.userProfiles.set(userProfile.id, userProfile);
    };
    UserAccount.prototype.removeUserProfile = function (userProfileId) {
        this.userProfiles.delete(userProfileId);
    };
    UserAccount.prototype.setActiveUserProfile = function (userProfileId) {
        this.activeUserProfile = this.userProfiles.get(userProfileId);
    };
    UserAccount.prototype.isValid = function (pin) {
        return (this.pin === pin);
    };
    return UserAccount;
}());

//# sourceMappingURL=userAccount.js.map

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoryInformation; });
/* unused harmony export StoryInformationWithUrl */
/* unused harmony export Reader */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var StoryInformation = (function () {
    function StoryInformation() {
    }
    return StoryInformation;
}());

var StoryInformationWithUrl = (function (_super) {
    __extends(StoryInformationWithUrl, _super);
    function StoryInformationWithUrl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StoryInformationWithUrl;
}(StoryInformation));

var Reader = (function () {
    function Reader() {
    }
    return Reader;
}());

//# sourceMappingURL=storyInformation.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Savegame; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_constants__ = __webpack_require__(14);

var Savegame = (function () {
    function Savegame() {
        this.reader = __WEBPACK_IMPORTED_MODULE_0__app_constants__["g" /* DEFAULT_READER */];
    }
    return Savegame;
}());

//# sourceMappingURL=savegame.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return StoryMetaData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChapterAttributes; });
/* unused harmony export MtgaNextStoryNode */
var StoryMetaData = (function () {
    function StoryMetaData() {
    }
    return StoryMetaData;
}());

var ChapterAttributes = (function () {
    function ChapterAttributes() {
    }
    return ChapterAttributes;
}());

var MtgaNextStoryNode = (function () {
    function MtgaNextStoryNode() {
    }
    return MtgaNextStoryNode;
}());

//# sourceMappingURL=story.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_globalization__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_settings_settings__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_start_start__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_logger_logger__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




 // added 2017-11-14
 // added 2017-11-14
 // added 2017-11-14
 // added for translation 2017-11-14


var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, settings, translate, logger, globalization) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.settings = settings;
        this.translate = translate;
        this.logger = logger;
        this.globalization = globalization;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_start_start__["a" /* StartPage */];
        this.initializeApp();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            // TODO add here the storage for user permission
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.translate.setDefaultLang(__WEBPACK_IMPORTED_MODULE_4__constants__["f" /* DEFAULT_LANG */]);
            _this.settingsSubscription = _this.settings.onSettingsLoaded().subscribe(function () {
                if (_this.settings.language == null) {
                    _this.globalization.getPreferredLanguage().then(function (result) {
                        _this.logger.log("Preferred language of this device is " + result.value);
                        var language = _this.getSuitableLanguage(result.value);
                        _this.translate.use(language);
                        _this.settings.language = language;
                    });
                }
                else {
                    _this.translate.use(_this.settings.language);
                }
            });
        });
    };
    MyApp.prototype.pushPage = function (page) {
        // we want the back button to show in this scenario
        this.nav.push(page.component);
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.getSuitableLanguage = function (language) {
        language = language.substring(0, 2).toLowerCase();
        return __WEBPACK_IMPORTED_MODULE_4__constants__["d" /* AVAILABLE_LANGUAGES */].some(function (x) { return x.code == language; }) ? language : __WEBPACK_IMPORTED_MODULE_4__constants__["f" /* DEFAULT_LANG */];
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6__providers_settings_settings__["a" /* SettingsProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_9__providers_logger_logger__["a" /* LoggerProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_globalization__["a" /* Globalization */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var InfoPage = (function () {
    function InfoPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    InfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-info',template:/*ion-inline-start:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/info/info.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>\n\n            {{\'INFO_ABOUT\' | translate}}\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content padding class="center">\n\n    <ion-icon name="book" style="font-size: 128px;"></ion-icon>\n\n    <h1>Taletime</h1>\n\n    <p>{{\'INFO_DESCRIPTION\' | translate}}</p>\n\n</ion-content>\n\n'/*ion-inline-end:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/info/info.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], InfoPage);
    return InfoPage;
}());

//# sourceMappingURL=info.js.map

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_speech_recognition__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__speechRecognition_languageFile__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__alert_alert__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__datamodels_settings__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular_platform_platform__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__logger_logger__ = __webpack_require__(22);
/**
 * Created by Kevin on 24.06.2017.
 * Keeps track of all the settings made during runtime.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SettingsProvider = (function () {
    function SettingsProvider(platform, languageFile, storage, speechRecognitionProvider, logger, alert) {
        var _this = this;
        this.platform = platform;
        this.languageFile = languageFile;
        this.storage = storage;
        this.speechRecognitionProvider = speechRecognitionProvider;
        this.logger = logger;
        this.alert = alert;
        // private logger : LoggerProvider;
        this.SETTINGS_KEY = 'SETTINGS';
        this.languageSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.settingsLoaded = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.platform.ready().then(function () {
            _this.storage.ready().then(function () {
                _this.loadSettings();
            });
        });
    }
    SettingsProvider.prototype.loadSettings = function () {
        var _this = this;
        this.storage.get(this.SETTINGS_KEY).then(function (settings) {
            _this.logger.log("Read settings from storage: " + JSON.stringify(settings));
            _this.settings = settings;
            _this.reloadLanguageFile();
            _this.settingsLoaded.next(true);
        }).catch(function (error) {
            _this.logger.log(error.message);
            _this.settings = new __WEBPACK_IMPORTED_MODULE_5__datamodels_settings__["a" /* Settings */]();
            _this.save();
            _this.settingsLoaded.next(true);
        });
    };
    Object.defineProperty(SettingsProvider.prototype, "autoPlay", {
        get: function () {
            return this.settings.autoPlay;
        },
        set: function (value) {
            this.settings.autoPlay = value;
            this.save();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsProvider.prototype, "language", {
        get: function () {
            return this.settings.language;
        },
        set: function (value) {
            this.settings.language = value;
            this.reloadLanguageFile();
            this.save();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsProvider.prototype, "speechRecognition", {
        get: function () {
            return this.settings.speechRecognition;
        },
        set: function (value) {
            var _this = this;
            // make sure the user gave the permission to use the microphone
            if (value && !this.speechRecognitionProvider.hasPermission()) {
                this.speechRecognitionProvider.requestPermission().then(function () { return _this.settings.speechRecognition = value; }, function () {
                    _this.alert.createAlert("Error", "Permission needed to use Speech Recognition", [{ text: "OK" }]).present();
                    _this.settings.speechRecognition = false;
                });
            }
            else {
                this.logger.log("Speech rec set to " + value);
                this.settings.speechRecognition = value;
            }
            this.save();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsProvider.prototype, "interaction", {
        get: function () {
            return this.settings.interaction;
        },
        set: function (value) {
            this.settings.interaction = value;
            this.save();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsProvider.prototype, "ttsRate", {
        get: function () {
            return this.settings.ttsRate;
        },
        set: function (value) {
            this.settings.ttsRate = value;
            this.save();
        },
        enumerable: true,
        configurable: true
    });
    SettingsProvider.prototype.onLanguageChanged = function () {
        return this.languageSubject.asObservable();
    };
    SettingsProvider.prototype.onSettingsLoaded = function () {
        return this.settingsLoaded.asObservable();
    };
    SettingsProvider.prototype.reloadLanguageFile = function () {
        var _this = this;
        this.languageFile.loadLanguageFile(this.settings.language).subscribe(function () {
            _this.logger.log("Language file reloaded for " + _this.settings.language);
            _this.languageSubject.next(_this.settings.language);
        });
    };
    /**
     * Save all the settings to ionic storage
     */
    SettingsProvider.prototype.save = function () {
        var _this = this;
        this.storage.set(this.SETTINGS_KEY, this.settings).then(function () { return _this.logger.log("Settings written: " + JSON.stringify(_this.settings)); }).catch(function (err) {
            _this.logger.error("Could not save setting file!");
            _this.logger.error(err);
        });
    };
    SettingsProvider.prototype.getShortLangCode = function () {
        return this.language.substring(0, this.language.indexOf('-'));
    };
    SettingsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7_ionic_angular_platform_platform__["a" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__speechRecognition_languageFile__["a" /* LanguageFileProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_speech_recognition__["a" /* SpeechRecognition */],
            __WEBPACK_IMPORTED_MODULE_8__logger_logger__["a" /* LoggerProvider */],
            __WEBPACK_IMPORTED_MODULE_4__alert_alert__["a" /* AlertProvider */]])
    ], SettingsProvider);
    return SettingsProvider;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoryProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_constants__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__settings_settings__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__savegame_savegame__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__public_story_helper_public_story_helper__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__logger_logger__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var StoryProvider = (function () {
    function StoryProvider(platform, logger, fileService, storage, http, settings, savegames, publicStoryHelper) {
        var _this = this;
        this.platform = platform;
        this.logger = logger;
        this.fileService = fileService;
        this.storage = storage;
        this.http = http;
        this.settings = settings;
        this.savegames = savegames;
        this.publicStoryHelper = publicStoryHelper;
        this.STORY_INFO_KEY = 'STORY_INFO';
        this.storyIndices = new Map();
        this._stories = new Array();
        this.story = null;
        this.platform.ready().then(function () {
            _this.storage.ready().then(function () {
                _this.storage.get(_this.STORY_INFO_KEY).then(function (loadedStories) {
                    if (loadedStories) {
                        _this._stories = loadedStories;
                        _this.buildIndex();
                    }
                }).catch(function (error) {
                    _this.logger.error(error);
                });
            });
        });
    }
    /**
     * Create an index map
     * to map story.id to array index
     */
    StoryProvider.prototype.buildIndex = function () {
        this.storyIndices.clear();
        for (var i = 0; i < this._stories.length; i++) {
            var story = this._stories[i];
            this.storyIndices.set(story.id, i);
        }
    };
    Object.defineProperty(StoryProvider.prototype, "stories", {
        get: function () {
            return this._stories;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add a new story to the storage and save
     * @param story Story to add
     */
    StoryProvider.prototype.addStory = function (story) {
        var exists = this.storyIndices.get(story.id);
        if (!exists) {
            var index = this._stories.push(story) - 1;
            this.storyIndices.set(story.id, index);
            this.storage.set(this.STORY_INFO_KEY, this._stories);
        }
    };
    /**
     * Returns the story information matching the id or null if it does not exist
     * @param id id of the story to look for
     */
    StoryProvider.prototype.getStoryInformation = function (id) {
        var index = this.storyIndices.get(id);
        if (index != null) {
            return this._stories[index];
        }
        else {
            return null;
        }
    };
    /**
     * Checks if a story already exists
     * @param storyId Story id
     */
    StoryProvider.prototype.exists = function (storyId) {
        var index = this.storyIndices.get(storyId);
        return (index != null);
    };
    /**
     * Deletes a story from the database (does not cleanup files on SD)
     * @param id id of the story to be removed
     */
    StoryProvider.prototype.deleteStory = function (id) {
        var index = this.storyIndices.get(id);
        if (index != null) {
            this._stories.splice(index, 1);
            this.buildIndex();
            this.storage.set(this.STORY_INFO_KEY, this._stories);
        }
    };
    /**
     * Load one of the storys that are deployed within the APK
     * @param story device story to load (one of the mock stories)
     * @param shortLangCode language code (2 chars)
     */
    StoryProvider.prototype.loadDeviceStory = function (story, shortLangCode) {
        var _this = this;
        var storyJson = 'assets/stories/' + story.id + '/' + shortLangCode + '/' + __WEBPACK_IMPORTED_MODULE_2__app_constants__["k" /* SINGLE_STORY_FILE_NAME */];
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].create(function (observer) {
            _this.http.get(storyJson).subscribe(function (s) {
                _this.story = s;
                _this.loadFirstNode();
                observer.next(true);
                observer.complete();
            });
        });
    };
    /**
     * Load one of the downloaded stories
     * @param story cloud/public story to load from SD/Root directory
     * @param shortLangCode language code (2 chars)
     */
    StoryProvider.prototype.loadPublicStory = function (story, shortLangCode) {
        var _this = this;
        var storyJsonBasePath = this.publicStoryHelper.getStoryJsonFolderPath(story, shortLangCode);
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].create(function (observer) {
            _this.fileService.readAsText(storyJsonBasePath, __WEBPACK_IMPORTED_MODULE_2__app_constants__["k" /* SINGLE_STORY_FILE_NAME */]).then(function (jsonText) {
                var story = JSON.parse(jsonText);
                _this.story = story;
                _this.loadFirstNode();
                observer.next(true);
                observer.complete();
            });
        });
    };
    /**
     * Loads a story (cloud or device based)
     * @param id id of the story to load
     */
    StoryProvider.prototype.loadStory = function (id) {
        var lang = this.settings.getShortLangCode();
        var story = this.getStoryInformation(id);
        this.logger.log("StoryProvider-loadStory(): Loading:" + JSON.stringify(story));
        this.logger.log('Loading story <' + id + '> with language <' + lang + '>');
        if (story.medium === 'cloud') {
            return this.loadPublicStory(story, lang);
        }
        else {
            return this.loadDeviceStory(story, lang);
        }
    };
    StoryProvider.prototype.getStoryAttributes = function () {
        if (this.story) {
            return this.story["mtga-story"].attributes;
        }
        else {
            return null;
        }
    };
    StoryProvider.prototype.loadFirstNode = function () {
        this.loadNode(0);
    };
    StoryProvider.prototype.loadNode = function (i) {
        this.currentNode = this.story["mtga-story"]["mtga-story-node"][i.toString()];
    };
    StoryProvider.prototype.loadNodeForAnswer = function (i) {
        // workaround TODO need to fix data
        var id;
        if (this.currentNode["mtga-nextStoryNode"][i]) {
            id = this.currentNode["mtga-nextStoryNode"][i].attributes.Id - 1;
        }
        else {
            id = this.currentNode["mtga-nextStoryNode"].attributes.Id - 1;
        }
        this.logger.log("Answer #" + i + " matched to the next node with the id: " + id + ". Loading node " + id);
        this.loadNode(id);
    };
    StoryProvider.prototype.getAnswers = function () {
        var result = [];
        for (var item in this.currentNode["mtga-nextStoryNode"]) {
            // workaround, TODO need to fix data
            if (Number.isNaN(+item)) {
                result.push(this.currentNode["mtga-nextStoryNode"]);
                break;
            }
            else {
                result.push(this.currentNode["mtga-nextStoryNode"][item]);
            }
        }
        return result;
    };
    StoryProvider.prototype.getText = function () {
        return this.currentNode["mtga-nodeText"].value;
    };
    StoryProvider.prototype.getChapterAtrributes = function () {
        return this.currentNode.attributes;
    };
    StoryProvider.prototype.getCurrentAudioSrc = function () {
        return this.currentNode.attributes.audioSrc;
    };
    StoryProvider.prototype.isCurrentSpeakerReadingAnswersOut = function () {
        var storyId = this.getStoryAttributes().id;
        var reader = this.savegames.loadSavegame(storyId).reader;
        this.logger.log("Current speaker is " + reader);
        if (reader === __WEBPACK_IMPORTED_MODULE_2__app_constants__["g" /* DEFAULT_READER */]) {
            return false;
        }
        else {
            for (var _i = 0, _a = this.getStoryInformation(storyId).readers; _i < _a.length; _i++) {
                var r = _a[_i];
                if (r.name === reader) {
                    this.logger.log("Found reader and returning " + r.answersPartOfAudioFile);
                    return r.answersPartOfAudioFile;
                }
            }
        }
        // if nothing was found assume the answers need to be read out
        return false;
    };
    StoryProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_10__logger_logger__["a" /* LoggerProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_5__settings_settings__["a" /* SettingsProvider */],
            __WEBPACK_IMPORTED_MODULE_8__savegame_savegame__["a" /* SaveGameProvider */],
            __WEBPACK_IMPORTED_MODULE_9__public_story_helper_public_story_helper__["a" /* PublicStoryHelperProvider */]])
    ], StoryProvider);
    return StoryProvider;
}());

//# sourceMappingURL=story.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SimpleToastProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_toast_toast_controller__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the SimpleToastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var SimpleToastProvider = (function () {
    function SimpleToastProvider(toastCtrl, translate) {
        this.toastCtrl = toastCtrl;
        this.translate = translate;
    }
    SimpleToastProvider.prototype.displayToast = function (message, duration, displayOkBtn, dismissHandler) {
        if (duration === void 0) { duration = 3000; }
        if (displayOkBtn === void 0) { displayOkBtn = false; }
        if (dismissHandler === void 0) { dismissHandler = null; }
        var toast = this.toastCtrl.create({
            message: message,
            showCloseButton: displayOkBtn,
            duration: duration,
            closeButtonText: this.translate.instant('COMMON_OK')
        });
        if (dismissHandler != null) {
            toast.onDidDismiss(dismissHandler);
        }
        toast.present();
    };
    SimpleToastProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_toast_toast_controller__["a" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */]])
    ], SimpleToastProvider);
    return SimpleToastProvider;
}());

//# sourceMappingURL=simple-toast.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LanguageFileProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_constants__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logger_logger__ = __webpack_require__(22);
/**
 * Created by Kevin on 26.06.2017.
 *
 * Accesses the predefined texts for TTS output
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LanguageFileProvider = (function () {
    function LanguageFileProvider(http, logger) {
        var _this = this;
        this.http = http;
        this.logger = logger;
        this.logger.log("Language file service instantiated");
        this.loadLanguageFile().subscribe(function () { return _this.logger.log("Language file subscription ok"); });
    }
    Object.defineProperty(LanguageFileProvider.prototype, "preDefinedTexts", {
        get: function () {
            return this._preDefinedTexts;
        },
        set: function (value) {
            this._preDefinedTexts = value;
        },
        enumerable: true,
        configurable: true
    });
    LanguageFileProvider.prototype.loadLanguageFile = function (language) {
        var _this = this;
        if (language === void 0) { language = 'de-DE'; }
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this.http.get(__WEBPACK_IMPORTED_MODULE_3__app_constants__["s" /* TTS_RES */] + language + __WEBPACK_IMPORTED_MODULE_3__app_constants__["h" /* FILETYPE_JSON */]).subscribe(function (texts) {
                _this.logger.log("Loaded language file for <" + language + ">");
                _this.preDefinedTexts = texts;
                _this.logger.log("Loaded language file is:");
                _this.logger.log(texts);
                observer.next(true);
                observer.complete();
            });
        });
    };
    LanguageFileProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__logger_logger__["a" /* LoggerProvider */]])
    ], LanguageFileProvider);
    return LanguageFileProvider;
}());

//# sourceMappingURL=languageFile.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectUserProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__createUserProfile_createUserProfile__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_auth__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_simple_toast_simple_toast__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 *
 * @author Matthias Kiefer
 * @date 2017-11-28
 *
 *
 * TODO The event variable in delete end select is a workaround.
 */







var SelectUserProfilePage = (function () {
    function SelectUserProfilePage(navCtrl, translate, authProvider, modalCtrl, toastProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.translate = translate;
        this.authProvider = authProvider;
        this.modalCtrl = modalCtrl;
        this.toastProvider = toastProvider;
        this.isShowingOptionsButton = false;
        this.isShowingOptions = false;
        this.translate.get('COMMON_EDIT').subscribe(function (value) {
            _this.showingOptionsLabel = value;
        });
        var activeUserProfile = this.authProvider.getActiveUserProfile();
        if (activeUserProfile && !activeUserProfile.child) {
            this.isShowingOptionsButton = true;
        }
    }
    SelectUserProfilePage.prototype.select = function (event, userProfileId) {
        var _this = this;
        event.stopPropagation(); // TODO read desc in file header
        this.authProvider.setActiveUserProfile(userProfileId).subscribe(function (success) {
            if (success) {
                // this.navCtrl.push(TabsPage);
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
            }
        }, function (error) {
            console.log("SelectUserProfilePage-select(): " + error.prototype.toString() + ":" + JSON.stringify(error));
        });
    };
    SelectUserProfilePage.prototype.delete = function (event, userProfileId) {
        event.stopPropagation(); // TODO read desc in file header
        console.log("delete: " + userProfileId);
        this.authProvider.deleteUserProfile(userProfileId);
    };
    SelectUserProfilePage.prototype.create = function () {
        var userProfileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__createUserProfile_createUserProfile__["a" /* CreateUserProfilePage */]);
        userProfileModal.present();
    };
    SelectUserProfilePage.prototype.showOptions = function () {
        var _this = this;
        if (!this.isShowingOptions) {
            var alert_1 = this.authProvider.presentPinPrompt(function (valid) {
                if (valid) {
                    _this.isShowingOptions = true;
                    _this.showingOptionsLabel = _this.translate.instant('COMMON_DONE');
                }
                else {
                    _this.toastProvider.displayToast("Wrong pin."); // TODO tobi i18
                    return false;
                }
            });
            alert_1.present();
        }
        else {
            this.isShowingOptions = false;
            this.showingOptionsLabel = this.translate.instant('COMMON_EDIT');
            ;
        }
    };
    SelectUserProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-selectUserProfile',template:/*ion-inline-start:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/selectUserProfile/selectUserProfile.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>{{ \'USER_MANAGEMENT_SELECT_PROFILE\' | translate }}</ion-title>\n\n\n\n    <ion-buttons end>\n\n      <button *ngIf="isShowingOptionsButton" (click)="showOptions()" ion-button>\n\n            <ion-label>{{showingOptionsLabel}}</ion-label>\n\n        </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-list>\n\n\n\n    <ion-item (click)="select($event, userProfile.id)" *ngFor="let userProfile of this.authProvider.userProfiles">\n\n      <ion-avatar item-start>\n\n        <img src=\'assets/imgs/profile/{{userProfile.avatar.name}}\'>\n\n      </ion-avatar>\n\n      <h2>{{userProfile.name}}</h2>\n\n\n\n      <button *ngIf="isShowingOptions" (click)="delete($event, userProfile.id)" ion-button clear item-end>{{ \'COMMON_DELETE\' | translate }}</button>\n\n    </ion-item>\n\n\n\n\n\n    <ion-item (click)="create()">\n\n      <ion-icon name="add-circle" item-start></ion-icon>\n\n      <h2>{{ \'USER_MANAGEMENT_CREATE_PROFILE\' | translate }}</h2>\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"/mnt/d/Github/Uni/TaleTime/TaleTime/src/pages/selectUserProfile/selectUserProfile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_5__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_simple_toast_simple_toast__["a" /* SimpleToastProvider */]])
    ], SelectUserProfilePage);
    return SelectUserProfilePage;
}());

//# sourceMappingURL=selectUserProfile.js.map

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SaveGameProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__datamodels_savegame__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the SaveGameProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var SaveGameProvider = (function () {
    function SaveGameProvider(storage, authProvider) {
        var _this = this;
        this.storage = storage;
        this.authProvider = authProvider;
        this.SAVEGAME_KEY = "SAVEGAMES";
        //Stores a Map, that maps profile ids to a story-id/savegame map
        this.savegames = new Map();
        this.storage.ready().then(function (storage) {
            _this.loadSavegames();
        }).catch(function (error) {
            console.error("Could not load savegames at all!");
        });
    }
    SaveGameProvider.prototype.loadSavegames = function () {
        var _this = this;
        return this.storage.get(this.SAVEGAME_KEY).then(function (savegames) {
            if (savegames != null) {
                _this.savegames = savegames;
            }
        });
    };
    SaveGameProvider.prototype.loadSavegame = function (storyId) {
        var emptySave = new __WEBPACK_IMPORTED_MODULE_1__datamodels_savegame__["a" /* Savegame */]();
        emptySave.storyId = storyId;
        emptySave.chosenPath = new Array();
        var userSaves = this.savegames.get(this.authProvider.getActiveUserProfile().id);
        if (userSaves == null) {
            return emptySave;
        }
        else {
            var savegame = userSaves.get(storyId);
            //If no savegame for story found --> return an empty savegame
            return savegame || emptySave;
        }
    };
    SaveGameProvider.prototype.addSavegame = function (savegame) {
        var profileSaves = this.getProfileSaves();
        profileSaves.set(savegame.storyId, savegame);
        this.save();
    };
    SaveGameProvider.prototype.getProfileSaves = function () {
        var profileId = this.authProvider.getActiveUserProfile().id;
        var profileSaves = this.savegames.get(profileId);
        if (profileSaves == null) {
            profileSaves = new Map();
            this.savegames.set(profileId, profileSaves);
        }
        return profileSaves;
    };
    SaveGameProvider.prototype.save = function () {
        this.storage.set(this.SAVEGAME_KEY, this.savegames).then(function (value) {
            console.log("SaveGameProvider: Saved savegames!");
        }, function (reason) {
            console.error("SaveGameProvider: Could not save savegames. Error: " + JSON.stringify(reason));
        });
    };
    SaveGameProvider.prototype.updateSavegame = function (savegame) {
        var profileSaves = this.getProfileSaves();
        profileSaves.set(savegame.storyId, savegame);
        this.save();
    };
    SaveGameProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */]])
    ], SaveGameProvider);
    return SaveGameProvider;
}());

//# sourceMappingURL=savegame.js.map

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicStoryHelperProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_constants__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_settings_settings__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Helper class to access file/folder paths of downloaded (public) stories
 * @Author Max Weiler
 */
var PublicStoryHelperProvider = (function () {
    function PublicStoryHelperProvider(platform, file, settings) {
        var _this = this;
        this.platform = platform;
        this.file = file;
        this.settings = settings;
        this.platform.ready().then(function (platform) {
            _this.publicStoryBasePath = _this.file.externalRootDirectory + __WEBPACK_IMPORTED_MODULE_3__app_constants__["c" /* APP_NAME */] + "/";
        });
    }
    /**
     * Returns the path to the folder where the main story json in the specified language is located
     * @param story the story information of the downloaded/public story
     * @param lang preferred language
     */
    PublicStoryHelperProvider.prototype.getStoryJsonFolderPath = function (story, lang) {
        return this.publicStoryBasePath + story.id + "/" + lang + "/";
    };
    /**
     * Returns the absolute path to a specific audio asset of the story
     * @param story the story information of the downloaded/public story
     * @param audioFile Filename assigned to the current story node
     * @param reader ID of the reader
     */
    PublicStoryHelperProvider.prototype.getAudioPathForStory = function (story, audioFile, reader) {
        var path = this.publicStoryBasePath + story.id + "/";
        path = path + this.settings.getShortLangCode() + __WEBPACK_IMPORTED_MODULE_3__app_constants__["j" /* READER_DIR */] + reader + '/' + audioFile + __WEBPACK_IMPORTED_MODULE_3__app_constants__["i" /* FILETYPE_MP4 */];
        return path;
    };
    /**
     * Returns the absolute path to the story icon for external stories
     * @param story External Story
     */
    PublicStoryHelperProvider.prototype.getThumbnailPathForStory = function (story) {
        return this.publicStoryBasePath + story.id + "/icon.png";
    };
    PublicStoryHelperProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_4__providers_settings_settings__["a" /* SettingsProvider */]])
    ], PublicStoryHelperProvider);
    return PublicStoryHelperProvider;
}());

//# sourceMappingURL=public-story-helper.js.map

/***/ })

},[259]);
//# sourceMappingURL=main.js.map
