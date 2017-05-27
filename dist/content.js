/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__emote__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pageCheck__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__emoteAutoComplete__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(2);





const DISALLOWED_CHARS = ['\\', ':', '/', '&', "'", '"', '?', '!', '#'],
             SCROLL_ENABLED_URL =  chrome.extension.getURL('icons/scroll-enabled.png'),
             SCROLL_DISABLED_URL =  chrome.extension.getURL('icons/scroll-disabled.png');
/* harmony export (immutable) */ __webpack_exports__["DISALLOWED_CHARS"] = DISALLOWED_CHARS;

/* harmony export (immutable) */ __webpack_exports__["SCROLL_ENABLED_URL"] = SCROLL_ENABLED_URL;

/* harmony export (immutable) */ __webpack_exports__["SCROLL_DISABLED_URL"] = SCROLL_DISABLED_URL;


let options = null;

const onNewPageLoad = function() {

    $('[class^="iptv-"]').remove();


    if (options !== null && options['redirectToYTGaming'] === true) {
        setTimeout(__WEBPACK_IMPORTED_MODULE_1__pageCheck__["a" /* default */].youtubeGaming, 2500);
    }
    __WEBPACK_IMPORTED_MODULE_2__emoteAutoComplete__["a" /* default */].emoteTabComplete();
    __WEBPACK_IMPORTED_MODULE_1__pageCheck__["a" /* default */].livestreamPage();
};

(function() {

    const target = document.querySelector('head > title');

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            onNewPageLoad();
        });
    });

    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["a" /* isNode */])(target)) {
        return;
    }

    observer.observe(target, { subtree: true, characterData: true, childList: true });
}());

chrome.runtime.sendMessage('requestLocalstorage', function(response) {

    options = response;

    if (options['disableAvatars']) {
        $('<style type="text/css">.style-scope .yt-live-chat-item-list-renderer #author-photo { width: 0px; height: 0px; margin-right: 0px; visibility: hidden; }.style-scope.yt-live-chat-message-input-renderer.no-transition{ display: none !important; }.style-scope yt-live-chat-message-input-renderer #avatar { display: none !important; }</style>').appendTo('head');
    }

    if (options['enableChatColors']) {
        const a = chrome.extension.getURL('external/chat-colors.css');
        $('<link rel="stylesheet" type="text/css" href="' + a + '" >').appendTo('head');
    }

    if (options['enableSplitChat']) {
        $('<style type="text/css">.style-scope yt-live-chat-text-message-renderer { border-top: 0.5px solid #333333; border-bottom: 0.5px solid #000000; }</style>').appendTo('head');
    }

    if(options['showDeletedMessages']) {
        $('<style type="text/css">.yt-live-chat-text-message-renderer-0[is-deleted]:not([show-original]) #message.yt-live-chat-text-message-renderer {display: inline;} .yt-live-chat-text-message-renderer-0 #deleted-state.yt-live-chat-text-message-renderer { color: rgba(255, 255, 255, 0.25); } .yt-live-chat-text-message-renderer-0[is-deleted]:not([show-original]) #message.yt-live-chat-text-message-renderer { color: rgba(255, 255, 255, 0.25); } .yt-live-chat-text-message-renderer-0 #deleted-state:before{content: "  "}</style>').appendTo('head');
    }

    if(options['mentionHighlight']) {
        $('<style type="text/css">.yt-live-chat-text-message-renderer-0 .mention.yt-live-chat-text-message-renderer { background-color: rgba(114, 15, 15, 0) !important; padding: 0px 0px !important; }</style>').appendTo('head');
    }

    onNewPageLoad();
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__overlay_loadingEmotesInfo__ = __webpack_require__(10);




class Emote
{
    /**
     * Load all enabled emotes.
     * @constructor
     */
    static loadEmotes()
    {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__overlay_loadingEmotesInfo__["a" /* default */])();

        setTimeout(function() {

            const $loading = $('.iptv-loading-emotes');

            if ($loading[0]) {

                $loading.css({
                    'color': '#c0392b',
                    'background-color': '#282828',
                    'right': '19px'
                });

                $loading.text('Failed loading some emotes (API servers down)');
            }

            setTimeout(function() {
                $('.iptv-loading-emotes').remove();
            }, 7.5 * 1000);

        }, 10 * 1000);

        if (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesTwitch']) Emote.loadTwitchEmotes();
        if (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesSub']) Emote.loadSubEmotes();
        if (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesIce']) Emote.loadIceEmotes();

        if (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesBTTV']) {
            Emote.loadBTTVEmotes();
            Emote.loadBTTVChannelEmotes();
        }

        Emote.waitTillEmotesLoaded();
    };

    /**
     * setTimeout that keeps running until all emotes are loaded.
     * @static
     */
    static waitTillEmotesLoaded()
    {
        if ((__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesTwitch'] !== Emote.states['twitch'].loaded) ||
            (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesSub'] !== Emote.states['sub'].loaded) ||
            (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesBTTV'] !== Emote.states['BTTV'].loaded) ||
            (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesBTTV'] !== Emote.states['BTTVChannels'].loaded)) {

            setTimeout(Emote.waitTillEmotesLoaded, 250);
            return;
        }

        // Temp fix to prevent ram from filling up with messages.
        setInterval(function () {
            Emote.messages = {};
        }, 1000 * 60 * 5);

        $('.iptv-loading-emotes').remove();
        Emote.replaceExistingEmotes();
    };

    /**
     * Replace existing text with emotes in chat, happens when emotes are done loading.
     * @static
     */
    static replaceExistingEmotes()
    {
        const chatElements = $('.style-scope.yt-live-chat-item-list-renderer.x-scope.yt-live-chat-text-message-renderer-0');

        if (chatElements.length < 1) {
            setTimeout(Emote.replaceExistingEmotes, 250);
            return;
        }

        chatElements.each(function (i, el) {
            Emote.emoteCheck(el);
        });
    };

    /**
     * Checks if a message contains emotes.
     * @static
     * @param {node} node - Message node
     */
    static emoteCheck(node)
    {
        const $message = $(node).find('#message');
        Emote.kappaCheck($message);

        let oldHTML = $message.html().trim();
        let msgHTML = oldHTML;

        if (typeof Emote.messages[msgHTML] == 'undefined') {

            const words = msgHTML.replace('/\xEF\xBB\xBF/', '').replace('﻿', '').split(' ');
            const uniqueWords = [];
            let emoteCount = 0;

            $.each(words, function (i, el) {
                if ($.inArray(el, uniqueWords) === -1) uniqueWords.push(el);
            });

            for (let i = 0; i < uniqueWords.length; i++) {

                const word = uniqueWords[i];

                if (typeof Emote.emotes[word] === 'undefined') {
                    continue;
                }

                emoteCount++;

                const span = document.createElement('span');
                span.setAttribute('aria-label', word);
                span.classList.add('hint--top');

                const img = document.createElement('img');
                img.src = Emote.emotes[word]['url'];
                img.alt = word;
                img.style.display = 'inline';
                img.style.width = 'auto';
                img.style.overflow = 'hidden';

                span.appendChild(img);

                msgHTML = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* replaceAll */])(msgHTML, word, span.outerHTML);
            }

            if (emoteCount < 1) return;

            $message.html(msgHTML);
            Emote.messages[oldHTML.replace(/\s/g,'')] = msgHTML;

        } else {
            $message.html(Emote.messages[oldHTML]);
        }

        $message.parent().parent().bind('DOMSubtreeModified', function () {

            const $message = $(this).find('#message');
            Emote.kappaCheck($message);

            let html = $message.html().trim();
            html = html.replace('/\xEF\xBB\xBF/', '').replace('﻿', '').replace(/\s/g,'');

            if (typeof Emote.messages[html] !== 'undefined') {

                if (html == Emote.messages[html]) {
                    return;
                }

                $message.html(Emote.messages[html]);
            }
        });
    };

    /**
     * Checks if a message contains a kappa emote.
     * @static
     * @param {node} msg - Message node
     */
    static kappaCheck(msg)
    {
        $('img', msg).each(function() {

            const $img = $(this);

            if (/\ud83c\udf1d/g.test($img.attr('alt'))) {
                $img.replaceWith(document.createTextNode('Kappa'));
            }
        });
    };

    /**
     * Load Twitch emotes.
     * @static
     */
    static loadTwitchEmotes()
    {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://twitchemotes.com/api_cache/v2/global.json');
        xhr.send();
        const urlTemplate = '//static-cdn.jtvnw.net/emoticons/v1/';

        xhr.ontimeout = function() {
            Emote.states['twitch'].loaded = true;
        };

        xhr.onload = function () {

            const emoteDic = JSON.parse(xhr.responseText)['emotes'];

            for (const emote in emoteDic) {

                Emote.emotes[emote] = {
                    url: urlTemplate + emoteDic[emote]['image_id'] + '/' + '1.0'
                };
            }

            Emote.states['twitch'].loaded = true;
        }
    };

    /**
     * Load Twitch subscriber emotes.
     * @static
     */
    static loadSubEmotes()
    {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://twitchemotes.com/api_cache/v2/subscriber.json');
        xhr.send();
        const urlTemplate = '//static-cdn.jtvnw.net/emoticons/v1/';

        xhr.ontimeout = function() {
            Emote.states['sub'].loaded = true;
        };

        xhr.onload = function () {

            const emoteDic = JSON.parse(xhr.responseText)['channels'];

            for (const channel in emoteDic) {

                for (const i in emoteDic[channel]['emotes']) {

                    const dict = emoteDic[channel]['emotes'][i];
                    const code = dict['code'];

                    if (Emote.isValidEmote(code)) {
                        Emote.emotes[code] = {
                            url: urlTemplate + dict['image_id'] + '/' + '1.0'
                        };
                    }
                }
            }

            Emote.states['sub'].loaded = true;
        }
    };

    /**
     * Load BTTV emotes.
     * @static
     */
    static loadBTTVEmotes()
    {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.betterttv.net/2/emotes');
        xhr.send();
        const urlTemplate = '//cdn.betterttv.net/emote/';

        xhr.ontimeout = function() {
            Emote.states['BTTV'].loaded = true;
        };

        xhr.onload = function () {

            const emoteList = JSON.parse(xhr.responseText)['emotes'];

            for (const i in emoteList) {

                const dict = emoteList[i];

                if (!Emote.containsDisallowedChar(dict['code'])) {
                    Emote.emotes[dict['code']] = {
                        url: urlTemplate + dict['id'] + '/' + '1x'
                    };
                }
            }

            Emote.states['BTTV'].loaded = true;
        }
    };

    /**
     * Load BTTV channel emotes.
     * @static
     */
    static loadBTTVChannelEmotes()
    {
        const channels = __WEBPACK_IMPORTED_MODULE_1__main__["options"]['BTTVChannels'];
        const commaChannels = channels.replace(/\s+/g, '').split(',');

        commaChannels.forEach(function (channel) {

            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://api.betterttv.net/2/channels/' + channel);
            xhr.send();
            const urlTemplate = '//cdn.betterttv.net/emote/';

            xhr.ontimeout = function() {

                Emote.states['BTTVChannels'].loadedCount++;

                if (Emote.states['BTTVChannels'].loadedCount >= commaChannels.length) {
                    Emote.states['BTTVChannels'].loaded = true;
                }
            }

            xhr.onload = function () {

                const emoteList = JSON.parse(xhr.responseText)['emotes'];

                for (const i in emoteList) {

                    const dict = emoteList[i];

                    if (!Emote.containsDisallowedChar(dict['code'])) {
                        Emote.emotes[dict['code']] = {
                            url: urlTemplate + dict['id'] + '/' + '1x',
                            channel: channel + ' (bttv)'
                        };
                    }
                }

                Emote.states['BTTVChannels'].loadedCount++;

                if (Emote.states['BTTVChannels'].loadedCount >= commaChannels.length) {
                    Emote.states['BTTVChannels'].loaded = true;
                }
            }
        }, this);
    };

    /**
     * Load Ice's old subscriber emotes.
     * @static
     */
    static loadIceEmotes()
    {
        const urlTemplate = 'https://static-cdn.jtvnw.net/emoticons/v1/';

        const iceEmotes = {
            "purple1": { "image_id": 96873 },
            "purple2": { "image_id": 96874 },
            "purple3": { "image_id": 96875 },
            "purple4": { "image_id": 96876 },
            "purpleArm1": { "image_id": 84687 },
            "purpleArm2": { "image_id": 84533 },
            "purpleBluescreen": { "image_id": 157415 },
            "purpleBruh": { "image_id": 132893 },
            "purpleCigrip": { "image_id": 161828 },
            "purpleCreep": { "image_id": 153620 },
            "purpleCx": { "image_id": 91876 },
            "purpleEnza": { "image_id": 105444 },
            "purpleFake": { "image_id": 91874 },
            "purpleFrank": { "image_id": 76640 },
            "purpleHuh": { "image_id": 133286 },
            "purpleIce": { "image_id": 80215 },
            "purpleKKona": { "image_id": 121771 },
            "purpleM": { "image_id": 121772 },
            "purpleNose": { "image_id": 65152 },
            "purpleOmg": { "image_id": 160462 },
            "purplePride": { "image_id": 62560 },
            "purpleRofl": { "image_id": 121495 },
            "purpleTaco": { "image_id": 132726 },
            "purpleThink": { "image_id": 121770 },
            "purpleW": { "image_id": 70838 },
            "purpleClaus": { "image_id": 132737 },
            "purpleCoolstory": { "image_id": 153621 },
            "purpleDog": { "image_id": 105228 },
            "purpleFro": { "image_id": 86444 },
            "purpleKkona": { "image_id": 121494 },
            "purpleLeo": { "image_id": 73632 },
            "purpleLUL": { "image_id": 126511 },
            "purpleReal": { "image_id": 91873 },
            "purpleThump": { "image_id": 86501 },
            "purpleTongue": { "image_id": 70838 },
            "purpleWalnut": { "image_id": 109084 },
            "purpleWat": { "image_id": 105229 },
            "purpleWut": { "image_id": 133844 }
        };

        for(const emote in iceEmotes) {
            Emote.emotes[emote] = {
                url: urlTemplate + iceEmotes[emote]['image_id'] + '/' + '1.0'
            }
        }
    };

    /**
     * Checks if text is a valid emote
     * @static
     * @param {string} text
     */
    static isValidEmote(text)
    {
        return !(text[0].match(/[A-Z]/g) ||
            text.match(/^[a-z]+$/g) ||
            text.match(/^\d*$/g)
        );
    };

    /**
     * Checks if text contains disallowed characters.
     * @static
     * @param {string} word
     */
    static containsDisallowedChar(word)
    {
        for (const c in __WEBPACK_IMPORTED_MODULE_1__main__["DISALLOWED_CHARS"]) {
            if (word.indexOf(c) > -1) {
                return true;
            }
        }

        return false;
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Emote;
;

Emote.states = {
    twitch: {
        loaded: false
    },
    sub: {
        loaded: false
    },
    BTTV: {
        loaded: false
    },
    BTTVChannels: {
        loaded: false,
        loadedCount: 0
    }
};

Emote.emotes = {};
Emote.messages = {};


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = replaceAll;
/* harmony export (immutable) */ __webpack_exports__["a"] = isNode;
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
};

function isNode(o) {
    return (
        typeof Node === 'object' ? o instanceof Node : o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
    );
};


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class emoteAutoComplete
{
    /**
     * Autocomplete for emotes
     *  -
     */


    static getCaretPosition(editableDiv) {
      var caretPos = 0,
        sel, range;
      if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
          range = sel.getRangeAt(0);
          if (range.commonAncestorContainer.parentNode == editableDiv) {
            caretPos = range.endOffset;
          }
        }
      } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        if (range.parentElement() == editableDiv) {
          var tempEl = document.createElement("span");
          editableDiv.insertBefore(tempEl, editableDiv.firstChild);
          var tempRange = range.duplicate();
          tempRange.moveToElementText(tempEl);
          tempRange.setEndPoint("EndToEnd", range);
          caretPos = tempRange.text.length;
        }
      }
      return caretPos;
    }

    static placeCaretAtEnd(el) {
        el.focus();
        if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
    }

    static getWord() {
        var sel, word = "";
        if (window.getSelection && (sel = window.getSelection()).modify) {
            var selectedRange = sel.getRangeAt(0);
            sel.collapseToStart();
            sel.modify("move", "backward", "word");
            sel.modify("extend", "forward", "word");
            word = sel.toString();
            sel.removeAllRanges();
            sel.addRange(selectedRange);
        } else if ( (sel = document.selection) && sel.type != "Control") {
            var range = sel.createRange();
            range.collapse(true);
            range.expand("word");
            word = range.text;
            index = startOffSet;
        }
        return word;
    }

    static emoteTabComplete() {

        var foundEmotes = [];
        var state = -1;
        var savePos = 0;
        var startStr;
        var endStr;

        const emoteArray = ['4Head', 'AMPTropPunch', 'ANELE', 'ArgieB8', 'ArigatoNas', 'ArsonNoSexy', 'AsianGlow', 'BabyRage', 'BatChest', 'BCWarrior', 'BegWan', 'BibleThump', 'BigBrother', 'BigPhish', 'BlargNaut', 'bleedPurple', 
        'BlessRNG', 'BloodTrail', 'BrainSlug', 'BrokeBack', 'BuddhaBar', 'BudStar', 'CarlSmile', 'ChefFrank', 'cmonBruh', 'CoolCat', 'CoolStoryBob', 'copyThis', 'CorgiDerp', 'CrreamAwk', 'CurseLit', 'DAESuppy', 'DansGame', 'DatSheffy', 
        'DBstyle', 'DendiFace', 'DogFace', 'DoritosChip', 'duDudu', 'DxCat', 'EagleEye', 'EleGiggle', 'FailFish', 'FrankerZ', 'FreakinStinkin', 'FUNgineer', 'FunRun', 'FutureMan', 'GingerPower', 'GivePLZ', 'GOWSkull', 'GrammarKing', 
        'HassaanChop', 'HassanChop', 'HeyGuys', 'HotPokket', 'HumbleLife', 'imGlitch', 'InuyoFace', 'ItsBoshyTime', 'Jebaited', 'JKanStyle', 'JonCarnage', 'KAPOW', 'Kappa', 'KappaClaus', 'KappaPride', 'KappaRoss', 'KappaWealth', 'Kappu', 
        'Keepo', 'KevinTurtle', 'Kippa', 'KonCha', 'Kreygasm', 'Mau5', 'mcaT', 'MikeHogu', 'MingLee', 'MorphinTime', 'MrDestructoid', 'MVGame', 'NinjaGrumpy', 'NomNom', 'NotATK', 'NotLikeThis', 'OhMyDog', 'OneHand', 'OpieOP', 'OptimizePrime', 
        'OSblob', 'OSfrog', 'OSkomodo', 'OSsloth', 'panicBasket', 'PanicVis', 'PartyTime', 'pastaThat', 'PeoplesChamp', 'PermaSmug', 'PicoMause', 'PipeHype', 'PJSalt', 'PJSugar', 'PMSTwin', 'PogChamp', 'Poooound', 'PraiseIt', 'PRChase', 
        'PrimeMe', 'PunchTrees', 'PunOko', 'RaccAttack', 'RalpherZ', 'RedCoat', 'ResidentSleeper', 'riPepperonis', 'RitzMitz', 'RlyTho', 'RuleFive', 'SabaPing', 'SeemsGood', 'ShadyLulu', 'ShazBotstix', 'SmoocherZ', 'SMOrc', 'SoBayed', 
        'SoonerLater', 'SPKFace', 'SPKWave', 'Squid1', 'Squid2', 'Squid3', 'Squid4', 'SSSsss', 'StinkyCheese', 'StoneLightning', 'StrawBeary', 'SuperVinlin', 'SwiftRage', 'TakeNRG', 'TBAngel', 'TBCheesePull', 'TBTacoLeft', 'TBTacoRight', 
        'TearGlove', 'TehePelo', 'TF2John', 'ThankEgg', 'TheIlluminati', 'TheRinger', 'TheTarFu', 'TheThing', 'ThunBeast', 'TinyFace', 'TooSpicy', 'TriHard', 'TTours', 'TwitchLit', 'twitchRaid', 'TwitchRPG', 'UncleNox', 'UnSane', 'UWot', 
        'VoHiYo', 'VoteNay', 'VoteYea', 'WholeWheat', 'WTRuck', 'WutFace', 'YouDontSay', 'YouWHY', 'OhMyGoodness', 'PancakeMix', 'PedoBear', 'PokerFace', 'RageFace', 'RebeccaBlack', ':tf:', 'aPliS', 'CiGrip', 'CHAccepted', 'FuckYea', 
        'DatSauce', 'ForeverAlone', 'GabeN', 'HailHelix', 'HerbPerve', 'iDog', 'rStrike', 'ShoopDaWhoop', 'SwedSwag', 'M&Mjc', 'bttvNice', 'TopHam', 'TwaT', 'WhatAYolk', 'WatChuSay', 'SavageJerky', 'HHydro', 'TaxiBro', 'BroBalt', 
        'ButterSauce', 'BaconEffect', 'SuchFraud', 'CandianRage', "She'llBeRight", 'OhhhKee', 'D:', 'SexPanda', '(poolparty)', ":'(", "(puke)", 'bttvWink', 'bttvAngry', 'bttvConfused', 'bttvCool', 'bttvHappy', 'bttvSad', 'bttvSleep',
        'bttvSurprised', 'bttvTongue', 'bttvUnsure', 'bttvGrin', 'bttvHeart', 'bttvTwink', 'VisLaud', 'KaRappa', 'YetiZ', 'miniJulia', 'sosGame', 'CruW', 'RarePepe', 'iamsocal', 'haHAA', 'FeelsBirthdayMan', 'RonSmug', 'KappaCool', 
        'Zappa', 'SqShy', 'BasedGod', 'bUrself', 'ConcernDoge', 'FapFapFap', 'FeelsBadMan', 'FeelsGoodMan', 'FireSpeed', 'FishMoley', 'Hhhehehe', 'KKona', 'NaM', 'OhGod', 'PoleDoge', 'tehPoleCat', 'AngelThump', 'SourPls', 'LUL', 
        'SaltyCorn', 'FCreep', 'VapeNation', 'ariW', 'notsquishY', 'FeelsAmazingMan', 'DuckerZ', 'Wowee'];

        $(document).on( "click", function() {
            if(typeof $('#input').attr('focused') != 'undefined') { // Resets tab clicks when mouse location is changed
                foundEmotes = [];
                state = -1;
                savePos = 0;
            }
        });

        $(document).keydown(function(event) {
            if (event.keyCode == 9 && typeof $('#input').attr('focused') != 'undefined') {
                event.preventDefault(); // Prevents TAB to select objects

                var fullMessage = $('#input #input').text() // Full message
                var selectedWord = emoteAutoComplete.getWord().trim(); // The word your caret is on
                var cursorPos = emoteAutoComplete.getCaretPosition($('#input #input')[0]) // Caret index

                if(selectedWord == "" || fullMessage[cursorPos-1] == " ") return;

                if(state == -1) {
                    foundEmotes = [];
                    for (var i = 0; i < emoteArray.length; i++) { // Checks array for matches
                        if(emoteArray[i].indexOf(selectedWord) == 0) {
                            foundEmotes.push(emoteArray[i]);
                        }
                    }
                    for (var i = cursorPos-1; i > 0; i--) { // Checks caret location compared to the word to find the starting point
                        if(fullMessage[i] == " ") {
                            savePos = cursorPos-(cursorPos-i)+1;
                            break;
                        }
                        else if(i == 0) {
                            savePos = 0; // Set pos 0 if first word
                        }
                    }
                    startStr = fullMessage.substring(0, savePos); // Starting part
                    endStr = fullMessage.substring(savePos+selectedWord.length); // Ending part
                }
                if(foundEmotes.length == 0) return; // No matching emotes found
                if(state > foundEmotes.length-2) state = -1; // Loop if at the end of the array
                state++

                var newMessage = startStr + foundEmotes[state] + endStr;

                $('#input #input').text(newMessage); // Sets the new message
                emoteAutoComplete.placeCaretAtEnd($('#input #input').get(0)); // Places cursor at the end
            }

            if ((event.keyCode == 32 || event.keyCode == 8 || event.keyCode == 17) && typeof $('#input').attr('focused') != 'undefined') { // Resets tab clicks when space, backspace etc pressed.
                foundEmotes = [];
                state = -1;
                savePos = 0;
            }
        })
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = emoteAutoComplete;
;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__emote__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chatObserver__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__overlay_donateButton__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__overlay_checkIfWatchingLive__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__overlay_alwaysScrollDown__ = __webpack_require__(7);







class PageCheck
{
    /**
     * Checks if user is watching from wrong livestream page and warns them.
     * @static
     */
    static youtubeGaming()
    {
        const iframe = document.getElementById('live-chat-iframe');

        const $textWrapper = $('.yt-user-info');
        const text = $textWrapper.find('a').text();

        const url = document.location.href;

        if (text == 'Ice Poseidon' && !url.includes('gaming.youtube') && iframe) {

            const redirectConfirm = confirm('[Ice PoseidonTV] Go to the official Ice Poseidon livestream page?');

            if (redirectConfirm === true) {
                window.location = 'https://gaming.youtube.com/ice_poseidon/live';
            }
        }
    };

    /**
     * Checks if user is watching a livestream on Youtube gaming.
     * @static
     */
    static livestreamPage()
    {
        const target = document.getElementById('owner');
        const chat = document.getElementById('chat');
        const text = $(target).find('span').text();

        const url = document.location.href;

        if ((!target || !chat) && (!url.includes('live_chat') && !url.includes('is_popout=1'))) {

            PageCheck.streampageChecks++;

            if (PageCheck.streampageChecks < 25) {
                setTimeout(PageCheck.livestreamPage, 250);
            }

            return;
        }

        if (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesTwitch'] === true || __WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesSub'] === true || __WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesBTTV'] === true || __WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesIce'] === true) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__chatObserver__["a" /* default */])();
        }

        if(text == 'Ice Poseidon') __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__overlay_donateButton__["a" /* default */])();

        __WEBPACK_IMPORTED_MODULE_0__emote__["a" /* default */].loadEmotes();
        __WEBPACK_IMPORTED_MODULE_5__overlay_alwaysScrollDown__["a" /* default */].init();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__overlay_checkIfWatchingLive__["a" /* default */])();
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PageCheck;
;

PageCheck.streampageChecks = 0;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = chatObserver;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__emote__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mentionHighlight__ = __webpack_require__(6);



/**
 * Binds chat mutation observer and listen for new chat messages.
 */
function chatObserver()
{
    const target = document.querySelector('.style-scope .yt-live-chat-item-list-renderer');
    const authorname = $('#author #author-name').text().toLowerCase();

    if (!target) {
        setTimeout(chatObserver, 250);
        return;
    }

    const observer = new MutationObserver(function (mutations) {

        mutations.forEach(function (mutation) {

            const newNodes = mutation.addedNodes;

            if (newNodes !== null) {

                const $nodes = $(newNodes);

                $nodes.each(function () {

                    const $node = $(this);

                    if (!$node.hasClass('yt-live-chat-item-list-renderer')) {
                        return;
                    }

                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__mentionHighlight__["a" /* default */])($node);
                    __WEBPACK_IMPORTED_MODULE_0__emote__["a" /* default */].emoteCheck($node);
                });
            }
        });
    });

    const options = {
        characterData: false,
        attributes: false,
        childList: true,
        subtree: true
    };

    observer.observe(target, options);
};


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = MentionHighlight;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(0);


/**
 * Checks if a message contains mention and changes background to BTTV style background.
 * @param {node} node - Message node
 */
function MentionHighlight(node)
{
    const authorname = $('#author #author-name').text().toLowerCase();

    if (__WEBPACK_IMPORTED_MODULE_0__main__["options"]['mentionHighlight'] && authorname.length > 2 && !node.hasClass('yt-live-chat-legacy-paid-message-renderer-0')) { // Check it's not sponsor / superchat, also mentionHighlight enabled

        const uniqueid = node.get(0).getAttribute('id') // Copy unique message id
        const message = (" " + node.find('#message').text().toLowerCase() + " ").replace(/[\u200B-\u200D\uFEFF]/g, '');

        if (uniqueid.length > 30 && (message.indexOf(' '+authorname+' ') !== -1 || message.indexOf('@'+authorname+' ') !== -1)) { // If your name is in the message, and it's not your message
            node.get(0).style.backgroundColor = "rgba(255,0,0,0.40)";
            node.find('#author-name').get(0).style.color = "#ffffff";
        }
    }
};


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(0);


class AlwaysScrollDown
{
    /**
     * Creates 'Always scroll down' overlay and binds the necessary listeners.
     * @constructor
     */
    static init()
    {
        if ($('.iptv-scrolldown-wrapper').length) {
            $('.iptv-scrolldown-wrapper').remove();
        };

        const scrollWrapper = document.createElement('div');

        scrollWrapper.setAttribute('aria-label', 'Always scroll down (Enabled)');
        scrollWrapper.classList.add('hint--top', 'iptv-scrolldown-wrapper');

        $(scrollWrapper).css({
            'position': 'absolute',
            'right': '113px',
            'bottom': '18px'
        });

        $(scrollWrapper).html(`
            <a href="javascript:void(0)" class="iptv-scrolldown-toggle" style="outline: 0;">
                <img src="${__WEBPACK_IMPORTED_MODULE_0__main__["SCROLL_ENABLED_URL"]}" alt="Always scroll down" height="11" width="11" class="iptv-scrolldown-toggle-icon">
            </a>
        `);

        document.body.appendChild(scrollWrapper);

        $(document).on('click', '.iptv-scrolldown-toggle', function() {
            AlwaysScrollDown.toggleScrollDown();
        });

        setInterval(function () {
            if (AlwaysScrollDown.scrollDown === true) {
                $('#item-scroller').scrollTop(999999999);
            }
        }, 100);

        AlwaysScrollDown.hideScrollOnCinema(scrollWrapper);
        AlwaysScrollDown.hideScrollOnSponsorMenu(scrollWrapper);
        AlwaysScrollDown.bindScrollListener();
        AlwaysScrollDown.bindScrollDownListener();
    };

    /**
     * Hides the 'Always scroll down' overlay when cinema mode is open
     * @static
     * @param {node} scrollWrapper
     */
    static hideScrollOnCinema(scrollWrapper)
    {
        const watchPage = 'ytg-watch-page';

        const observer = new MutationObserver(function(mutations) {
            mutations.forEach((m) => {
                $(m.target).is('[sidebar-collapsed]') ? $(scrollWrapper).hide() : $(scrollWrapper).show();
            });
        });

        const observerOpts = {
            childList: false,
            attributes: true,
            characterData: false,
            subtree: false,
            attributeFilter: ['sidebar-collapsed']
        }

        const addObserver = setInterval(() => {
            if ($(watchPage).length) {
                observer.observe($(watchPage)[0], observerOpts);
                clearInterval(addObserver);
            }
        }, 250);
    };

    /**
     * Hides the 'Always scroll down' overlay when sponsor menu is open.
     * @static
     * @param {node} scrollWrapper
     */
    static hideScrollOnSponsorMenu(scrollWrapper)
    {
        const chatInputRenderer = 'yt-live-chat-message-input-renderer';

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach((m) => {
                $(m.target).attr('creator-open') ? $(scrollWrapper).hide() : $(scrollWrapper).show();
            });
        });

        const observerOpts = {
            childList: false,
            attributes: true,
            characterData: false,
            subtree: false,
            attributeFilter: ['creator-open']
        }

        const sponsorClick = setInterval(() => {
            if ($(chatInputRenderer).length) {
                observer.observe($(chatInputRenderer)[0], observerOpts);
                clearInterval(sponsorClick);
            }
        }, 250);
    };

    /**
     * Disables 'Always scroll down' functionality when scrolling manually.
     * @static
     */
    static bindScrollListener()
    {
        const target = document.getElementById('item-scroller');

        if (!target) {
            setTimeout(() => { AlwaysScrollDown.bindScrollListener() }, 250);
            return;
        }

        $('#item-scroller').bind('mousewheel DOMMouseScroll', function (event) {
            AlwaysScrollDown.toggleScrollDown(false);
        });
    };

    /**
     * Enables 'Always scroll down' functionality when blue jump down button is clicked.
     * @static
     */
    static bindScrollDownListener()
    {
        const target = document.getElementById('show-more');

        if (!target) {
            window.setTimeout(() => { AlwaysScrollDown.bindScrollDownListener() }, 250);
            return;
        }

        target.onmousedown = function () {
            AlwaysScrollDown.toggleScrollDown(true);
            return true;
        };
    };

    /**
     * Toggle scrollDown state and adjust overlay accordingly.
     * @static
     */
    static toggleScrollDown(state)
    {
        AlwaysScrollDown.scrollDown = false;

        if (typeof state === 'undefined') {
            AlwaysScrollDown.scrollDown = !AlwaysScrollDown.scrollDown;
        } else {
            AlwaysScrollDown.scrollDown = state;
        }

        $('.iptv-scrolldown-wrapper').attr('aria-label', AlwaysScrollDown.scrollDown ? 'Always scroll down (Enabled)' : 'Always scroll down (Disabled)');
        $('.iptv-scrolldown-toggle-icon').attr('src', AlwaysScrollDown.scrollDown ? __WEBPACK_IMPORTED_MODULE_0__main__["SCROLL_ENABLED_URL"] : __WEBPACK_IMPORTED_MODULE_0__main__["SCROLL_DISABLED_URL"]);
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AlwaysScrollDown;
;

AlwaysScrollDown.scrollDown = true;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = checkIfWatchingLive;
/**
 * Checks if user is behind in livestream and warns them.
 */
function checkIfWatchingLive() {

    let liveCheckInterval = null;

    liveCheckInterval = setInterval(function() {

        const $liveButton = $('.ytp-live-badge.ytp-button');

        if ($liveButton.is(':enabled') && $liveButton.is(':visible')) {
            $('#player-container').append(`
                <div class="iptv-live-warning">
                    <div class="iptv-live-warning-text">
                        You\'re watching old footage, click the LIVE button in the bottom left corner to watch live.
                    </div>
                    <div class="iptv-live-warning-dismiss">
                        <a href="javascript:void(0)" class="iptv-live-warning-close">✕</a>
                    </div>
                </div>
            `);
        }
    }, 15 * 1000);

    $(document).on('click', '.iptv-live-warning-close', function() {
        $('.iptv-live-warning').remove();
        clearInterval(liveCheckInterval);
    });

    $(document).on('mousedown', '.ytp-live-badge', function() {
        $('.iptv-live-warning').remove();
    });
};


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = donateButton;
/**
 * Adds donate button to livestream page.
 */
function donateButton()
{
    $('.iptv-donate-button-0').remove();

    const donateIcon = chrome.extension.getURL('/icons/donate-icon.png');
    const sponsorIcon = chrome.extension.getURL('/icons/sponsor-icon.png');

    const sponsorImage = `<img src="${sponsorIcon}" alt="star" style="pointer-events: none; display: block; width: 100%; height: 100%;">`;

    const donateButton = `
        <iptv-donate-button style="display: inline-block;" raised="" supported-cold-load-actions="[&quot;sponsor&quot;]" wait-for-signal="watch-page-initialized" class="style-scope ytg-watch-footer x-scope iptv-donate-button-0">
            <iron-signals class="style-scope iptv-donate-button"></iron-signals>
            <paper-button style="color: #fff; background-color: #0f9d58; min-width: 0;" class="enabled style-scope iptv-donate-button x-scope paper-button-0" role="button" tabindex="0" animated="" aria-disabled="false" elevation="1" raised="" aria-label="Donate to Ice_Poseidon">
                <div class="layout horizontal center-justified style-scope iptv-donate-button">
                    <div style="width: 24px; height: 24px;" class="icon-container layout horizontal center-center style-scope iptv-donate-button">
                        <yt-icon class="style-scope iptv-donate-button x-scope yt-icon-0">
                        </yt-icon>
                    </div>
                <iptv-formatted-string id="text" class="layout horizontal center-center style-scope iptv-donate-button" style="margin: 0 3px"><span class="style-scope iptv-formatted-string">DONATE</span></iptv-formatted-string>
                </div>
            </paper-button>
        </iptv-donate-button>`;

    const donateImage = `<img src="${donateIcon}" alt="dollar-sign" style="pointer-events: none; display: block; width: 100%; height: 100%;">`;

    // Insert donateButton next to sponsorButton
    const sponsorButton = '.style-scope.ytg-watch-footer.x-scope.ytg-membership-offer-button-0';

    $(sponsorButton).before(donateButton);
    $(donateButton).ready( function() { $('.style-scope.iptv-donate-button.x-scope.yt-icon-0').html(donateImage); });

    $('.style-scope.ytg-watch-footer.x-scope.iptv-donate-button-0').on('click', () => {
        window.open('https://youtube.streamlabs.com/iceposeidon#/', '_blank');
        $('.style-scope.ytg-watch-footer.x-scope.iptv-donate-button-0 paper-button')[0].blur();
    });

    // Change sponsorButton icon to star
    $(`${sponsorButton} .style-scope.ytg-membership-offer-button.x-scope.yt-icon-0`).html(sponsorImage);
};


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadingEmotesInfo;
/**
 * Show emote loading information.
 */
function loadingEmotesInfo()
{
    const div = document.createElement('div');

    $(div).text('Loading emotes...');

    $(div).css({
        'font-size': '16px',
        'position': 'absolute',
        'right': '25px',
        'bottom': '75px',
        'color': '#fff',
        'text-shadow': '2px 2px 2px rgba(0,0,0,0.75)'
    });

    $(div).addClass('iptv-loading-emotes');

    document.body.appendChild(div);
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTEzZWI3NDljMDU5MzZkOTQ5OGEiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9lbW90ZS5qcyIsIndlYnBhY2s6Ly8vLi91dGlsLmpzIiwid2VicGFjazovLy8uL2Vtb3RlQXV0b0NvbXBsZXRlLmpzIiwid2VicGFjazovLy8uL3BhZ2VDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0T2JzZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbWVudGlvbkhpZ2hsaWdodC5qcyIsIndlYnBhY2s6Ly8vLi9vdmVybGF5L2Fsd2F5c1Njcm9sbERvd24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlLmpzIiwid2VicGFjazovLy8uL292ZXJsYXkvZG9uYXRlQnV0dG9uLmpzIiwid2VicGFjazovLy8uL292ZXJsYXkvbG9hZGluZ0Vtb3Rlc0luZm8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2hFQTtBQUNBO0FBQ0E7QUFDaUI7O0FBRWpCO0FBQ0E7QUFDQSx5Rjs7OztBQUFBO0FBQUE7QUFBQTs7QUFFQTs7QUFFQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQSw4QkFBOEIsc0RBQXNEO0FBQ3BGLENBQUM7O0FBRUQ7O0FBRUE7O0FBRUE7QUFDQSwrRkFBK0YsWUFBWSxhQUFhLG1CQUFtQixvQkFBb0IsRUFBRSwrREFBK0QsMEJBQTBCLEVBQUUsMERBQTBELDBCQUEwQixFQUFFO0FBQ2xWOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUZBQW1GLGlDQUFpQyxvQ0FBb0MsRUFBRTtBQUMxSjs7QUFFQTtBQUNBLHNKQUFzSixpQkFBaUIsMEZBQTBGLGtDQUFrQyxFQUFFLHFIQUFxSCxrQ0FBa0MsRUFBRSw2REFBNkQsY0FBYztBQUN6Z0I7O0FBRUE7QUFDQSxxSEFBcUgsbURBQW1ELDZCQUE2QixFQUFFO0FBQ3ZNOztBQUVBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7QUNsRW9CO0FBQ2U7QUFDcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhOztBQUViLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7O0FBRWIsMkJBQTJCLHdCQUF3Qjs7QUFFbkQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLEtBQUs7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0Isb0JBQW9CO0FBQzVDLHdCQUF3QixvQkFBb0I7QUFDNUMsd0JBQXdCLG9CQUFvQjtBQUM1Qyx3QkFBd0Isb0JBQW9CO0FBQzVDLDJCQUEyQixvQkFBb0I7QUFDL0MsMkJBQTJCLG9CQUFvQjtBQUMvQyxpQ0FBaUMscUJBQXFCO0FBQ3RELDJCQUEyQixxQkFBcUI7QUFDaEQsNkJBQTZCLHFCQUFxQjtBQUNsRCw0QkFBNEIscUJBQXFCO0FBQ2pELHlCQUF5QixvQkFBb0I7QUFDN0MsMkJBQTJCLHFCQUFxQjtBQUNoRCwyQkFBMkIsb0JBQW9CO0FBQy9DLDRCQUE0QixvQkFBb0I7QUFDaEQsMEJBQTBCLHFCQUFxQjtBQUMvQywwQkFBMEIsb0JBQW9CO0FBQzlDLDRCQUE0QixxQkFBcUI7QUFDakQsd0JBQXdCLHFCQUFxQjtBQUM3QywyQkFBMkIsb0JBQW9CO0FBQy9DLDBCQUEwQixxQkFBcUI7QUFDL0MsNEJBQTRCLG9CQUFvQjtBQUNoRCwyQkFBMkIscUJBQXFCO0FBQ2hELDJCQUEyQixxQkFBcUI7QUFDaEQsNEJBQTRCLHFCQUFxQjtBQUNqRCx3QkFBd0Isb0JBQW9CO0FBQzVDLDRCQUE0QixxQkFBcUI7QUFDakQsZ0NBQWdDLHFCQUFxQjtBQUNyRCwwQkFBMEIscUJBQXFCO0FBQy9DLDBCQUEwQixvQkFBb0I7QUFDOUMsNEJBQTRCLHFCQUFxQjtBQUNqRCwwQkFBMEIsb0JBQW9CO0FBQzlDLDBCQUEwQixxQkFBcUI7QUFDL0MsMkJBQTJCLG9CQUFvQjtBQUMvQyw0QkFBNEIsb0JBQW9CO0FBQ2hELDZCQUE2QixvQkFBb0I7QUFDakQsNkJBQTZCLHFCQUFxQjtBQUNsRCwwQkFBMEIscUJBQXFCO0FBQy9DLDBCQUEwQjtBQUMxQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQ3RiQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1FQUFtRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLHVDQUF1Qzs7QUFFdkM7QUFDQSxzRUFBc0U7QUFDdEU7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQyx1QkFBdUIsT0FBTztBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxPQUFPLE9BQU87QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0EsaUVBQWlFO0FBQ2pFLGdGQUFnRjtBQUNoRjtBQUNBLG1EQUFtRDtBQUNuRCw0REFBNEQ7QUFDNUQ7O0FBRUE7O0FBRUEsb0RBQW9EO0FBQ3BELDZFQUE2RTtBQUM3RTs7QUFFQSwwSUFBMEk7QUFDMUk7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUFBO0FBQUEsQzs7Ozs7Ozs7Ozs7OztBQ3BKQTtBQUNrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7O0FDbkVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQ2pEa0I7O0FBRWxCO0FBQ0E7QUFDQSxXQUFXLEtBQUs7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUtBQWdJOztBQUVoSTtBQUNBOztBQUVBLGlJQUFpSTtBQUNqSTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNwQmtEOztBQUVsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0EsMEZBQTBGO0FBQzFGLDRCQUE0QiwwREFBbUI7QUFDL0M7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLEtBQUs7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLEtBQUs7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4Qix3Q0FBd0M7QUFDdEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUNBQXFDLDRDQUE0QztBQUNqRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTs7Ozs7Ozs7QUN2S0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7QUNqQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzQ0FBc0MsWUFBWSx5Q0FBeUMsZ0JBQWdCLGFBQWEsY0FBYzs7QUFFdEk7QUFDQSx5REFBeUQsZ0RBQWdELGFBQWE7QUFDdEg7QUFDQSw2Q0FBNkMsMkJBQTJCLGNBQWM7QUFDdEY7QUFDQSw0Q0FBNEMsY0FBYztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUMsV0FBVyxnREFBZ0QsZ0JBQWdCLGFBQWEsY0FBYzs7QUFFM0k7QUFDQTs7QUFFQTtBQUNBLHVDQUF1QywwRUFBMEUsRUFBRTs7QUFFbkg7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLFNBQVMsY0FBYztBQUN2Qjs7Ozs7Ozs7QUN6Q0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0EiLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNTEzZWI3NDljMDU5MzZkOTQ5OGEiLCJpbXBvcnQgRW1vdGUgZnJvbSAnLi9lbW90ZSc7XG5pbXBvcnQgUGFnZUNoZWNrIGZyb20gJy4vcGFnZUNoZWNrJztcbmltcG9ydCBlbW90ZUF1dG9Db21wbGV0ZSBmcm9tICcuL2Vtb3RlQXV0b0NvbXBsZXRlJztcbmltcG9ydCB7IGlzTm9kZSB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBjb25zdCBESVNBTExPV0VEX0NIQVJTID0gWydcXFxcJywgJzonLCAnLycsICcmJywgXCInXCIsICdcIicsICc/JywgJyEnLCAnIyddLFxuICAgICAgICAgICAgIFNDUk9MTF9FTkFCTEVEX1VSTCA9ICBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnaWNvbnMvc2Nyb2xsLWVuYWJsZWQucG5nJyksXG4gICAgICAgICAgICAgU0NST0xMX0RJU0FCTEVEX1VSTCA9ICBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnaWNvbnMvc2Nyb2xsLWRpc2FibGVkLnBuZycpO1xuXG5leHBvcnQgbGV0IG9wdGlvbnMgPSBudWxsO1xuXG5jb25zdCBvbk5ld1BhZ2VMb2FkID0gZnVuY3Rpb24oKSB7XG5cbiAgICAkKCdbY2xhc3NePVwiaXB0di1cIl0nKS5yZW1vdmUoKTtcblxuXG4gICAgaWYgKG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9uc1sncmVkaXJlY3RUb1lUR2FtaW5nJ10gPT09IHRydWUpIHtcbiAgICAgICAgc2V0VGltZW91dChQYWdlQ2hlY2sueW91dHViZUdhbWluZywgMjUwMCk7XG4gICAgfVxuICAgIGVtb3RlQXV0b0NvbXBsZXRlLmVtb3RlVGFiQ29tcGxldGUoKTtcbiAgICBQYWdlQ2hlY2subGl2ZXN0cmVhbVBhZ2UoKTtcbn07XG5cbihmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQgPiB0aXRsZScpO1xuXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihtdXRhdGlvbnMpIHtcbiAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24obXV0YXRpb24pIHtcbiAgICAgICAgICAgIG9uTmV3UGFnZUxvYWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpZiAoIWlzTm9kZSh0YXJnZXQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwgeyBzdWJ0cmVlOiB0cnVlLCBjaGFyYWN0ZXJEYXRhOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUgfSk7XG59KCkpO1xuXG5jaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSgncmVxdWVzdExvY2Fsc3RvcmFnZScsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cbiAgICBvcHRpb25zID0gcmVzcG9uc2U7XG5cbiAgICBpZiAob3B0aW9uc1snZGlzYWJsZUF2YXRhcnMnXSkge1xuICAgICAgICAkKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+LnN0eWxlLXNjb3BlIC55dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyICNhdXRob3ItcGhvdG8geyB3aWR0aDogMHB4OyBoZWlnaHQ6IDBweDsgbWFyZ2luLXJpZ2h0OiAwcHg7IHZpc2liaWxpdHk6IGhpZGRlbjsgfS5zdHlsZS1zY29wZS55dC1saXZlLWNoYXQtbWVzc2FnZS1pbnB1dC1yZW5kZXJlci5uby10cmFuc2l0aW9ueyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH0uc3R5bGUtc2NvcGUgeXQtbGl2ZS1jaGF0LW1lc3NhZ2UtaW5wdXQtcmVuZGVyZXIgI2F2YXRhciB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfTwvc3R5bGU+JykuYXBwZW5kVG8oJ2hlYWQnKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9uc1snZW5hYmxlQ2hhdENvbG9ycyddKSB7XG4gICAgICAgIGNvbnN0IGEgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnZXh0ZXJuYWwvY2hhdC1jb2xvcnMuY3NzJyk7XG4gICAgICAgICQoJzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiJyArIGEgKyAnXCIgPicpLmFwcGVuZFRvKCdoZWFkJyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnNbJ2VuYWJsZVNwbGl0Q2hhdCddKSB7XG4gICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4uc3R5bGUtc2NvcGUgeXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlciB7IGJvcmRlci10b3A6IDAuNXB4IHNvbGlkICMzMzMzMzM7IGJvcmRlci1ib3R0b206IDAuNXB4IHNvbGlkICMwMDAwMDA7IH08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XG4gICAgfVxuXG4gICAgaWYob3B0aW9uc1snc2hvd0RlbGV0ZWRNZXNzYWdlcyddKSB7XG4gICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4ueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wW2lzLWRlbGV0ZWRdOm5vdChbc2hvdy1vcmlnaW5hbF0pICNtZXNzYWdlLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIge2Rpc3BsYXk6IGlubGluZTt9IC55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLTAgI2RlbGV0ZWQtc3RhdGUueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlciB7IGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjUpOyB9IC55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLTBbaXMtZGVsZXRlZF06bm90KFtzaG93LW9yaWdpbmFsXSkgI21lc3NhZ2UueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlciB7IGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjUpOyB9IC55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLTAgI2RlbGV0ZWQtc3RhdGU6YmVmb3Jle2NvbnRlbnQ6IFwiICBcIn08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XG4gICAgfVxuXG4gICAgaWYob3B0aW9uc1snbWVudGlvbkhpZ2hsaWdodCddKSB7XG4gICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4ueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wIC5tZW50aW9uLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDExNCwgMTUsIDE1LCAwKSAhaW1wb3J0YW50OyBwYWRkaW5nOiAwcHggMHB4ICFpbXBvcnRhbnQ7IH08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XG4gICAgfVxuXG4gICAgb25OZXdQYWdlTG9hZCgpO1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL21haW4uanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgcmVwbGFjZUFsbCB9IGZyb20gJy4vdXRpbCc7XHJcbmltcG9ydCB7IG9wdGlvbnMsIERJU0FMTE9XRURfQ0hBUlMgfSBmcm9tICcuL21haW4nO1xyXG5pbXBvcnQgbG9hZGluZ0Vtb3Rlc0luZm8gZnJvbSAnLi9vdmVybGF5L2xvYWRpbmdFbW90ZXNJbmZvJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtb3RlXHJcbntcclxuICAgIC8qKlxyXG4gICAgICogTG9hZCBhbGwgZW5hYmxlZCBlbW90ZXMuXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxvYWRFbW90ZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGxvYWRpbmdFbW90ZXNJbmZvKCk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCAkbG9hZGluZyA9ICQoJy5pcHR2LWxvYWRpbmctZW1vdGVzJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJGxvYWRpbmdbMF0pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkbG9hZGluZy5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICdjb2xvcic6ICcjYzAzOTJiJyxcclxuICAgICAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICcjMjgyODI4JyxcclxuICAgICAgICAgICAgICAgICAgICAncmlnaHQnOiAnMTlweCdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRsb2FkaW5nLnRleHQoJ0ZhaWxlZCBsb2FkaW5nIHNvbWUgZW1vdGVzIChBUEkgc2VydmVycyBkb3duKScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmlwdHYtbG9hZGluZy1lbW90ZXMnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSwgNy41ICogMTAwMCk7XHJcblxyXG4gICAgICAgIH0sIDEwICogMTAwMCk7XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zWydlbW90ZXNUd2l0Y2gnXSkgRW1vdGUubG9hZFR3aXRjaEVtb3RlcygpO1xyXG4gICAgICAgIGlmIChvcHRpb25zWydlbW90ZXNTdWInXSkgRW1vdGUubG9hZFN1YkVtb3RlcygpO1xyXG4gICAgICAgIGlmIChvcHRpb25zWydlbW90ZXNJY2UnXSkgRW1vdGUubG9hZEljZUVtb3RlcygpO1xyXG5cclxuICAgICAgICBpZiAob3B0aW9uc1snZW1vdGVzQlRUViddKSB7XHJcbiAgICAgICAgICAgIEVtb3RlLmxvYWRCVFRWRW1vdGVzKCk7XHJcbiAgICAgICAgICAgIEVtb3RlLmxvYWRCVFRWQ2hhbm5lbEVtb3RlcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgRW1vdGUud2FpdFRpbGxFbW90ZXNMb2FkZWQoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXRUaW1lb3V0IHRoYXQga2VlcHMgcnVubmluZyB1bnRpbCBhbGwgZW1vdGVzIGFyZSBsb2FkZWQuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB3YWl0VGlsbEVtb3Rlc0xvYWRlZCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKChvcHRpb25zWydlbW90ZXNUd2l0Y2gnXSAhPT0gRW1vdGUuc3RhdGVzWyd0d2l0Y2gnXS5sb2FkZWQpIHx8XHJcbiAgICAgICAgICAgIChvcHRpb25zWydlbW90ZXNTdWInXSAhPT0gRW1vdGUuc3RhdGVzWydzdWInXS5sb2FkZWQpIHx8XHJcbiAgICAgICAgICAgIChvcHRpb25zWydlbW90ZXNCVFRWJ10gIT09IEVtb3RlLnN0YXRlc1snQlRUViddLmxvYWRlZCkgfHxcclxuICAgICAgICAgICAgKG9wdGlvbnNbJ2Vtb3Rlc0JUVFYnXSAhPT0gRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWQpKSB7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KEVtb3RlLndhaXRUaWxsRW1vdGVzTG9hZGVkLCAyNTApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUZW1wIGZpeCB0byBwcmV2ZW50IHJhbSBmcm9tIGZpbGxpbmcgdXAgd2l0aCBtZXNzYWdlcy5cclxuICAgICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIEVtb3RlLm1lc3NhZ2VzID0ge307XHJcbiAgICAgICAgfSwgMTAwMCAqIDYwICogNSk7XHJcblxyXG4gICAgICAgICQoJy5pcHR2LWxvYWRpbmctZW1vdGVzJykucmVtb3ZlKCk7XHJcbiAgICAgICAgRW1vdGUucmVwbGFjZUV4aXN0aW5nRW1vdGVzKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVwbGFjZSBleGlzdGluZyB0ZXh0IHdpdGggZW1vdGVzIGluIGNoYXQsIGhhcHBlbnMgd2hlbiBlbW90ZXMgYXJlIGRvbmUgbG9hZGluZy5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJlcGxhY2VFeGlzdGluZ0Vtb3RlcygpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgY2hhdEVsZW1lbnRzID0gJCgnLnN0eWxlLXNjb3BlLnl0LWxpdmUtY2hhdC1pdGVtLWxpc3QtcmVuZGVyZXIueC1zY29wZS55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLTAnKTtcclxuXHJcbiAgICAgICAgaWYgKGNoYXRFbGVtZW50cy5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoRW1vdGUucmVwbGFjZUV4aXN0aW5nRW1vdGVzLCAyNTApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjaGF0RWxlbWVudHMuZWFjaChmdW5jdGlvbiAoaSwgZWwpIHtcclxuICAgICAgICAgICAgRW1vdGUuZW1vdGVDaGVjayhlbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIGEgbWVzc2FnZSBjb250YWlucyBlbW90ZXMuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge25vZGV9IG5vZGUgLSBNZXNzYWdlIG5vZGVcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGVtb3RlQ2hlY2sobm9kZSlcclxuICAgIHtcclxuICAgICAgICBjb25zdCAkbWVzc2FnZSA9ICQobm9kZSkuZmluZCgnI21lc3NhZ2UnKTtcclxuICAgICAgICBFbW90ZS5rYXBwYUNoZWNrKCRtZXNzYWdlKTtcclxuXHJcbiAgICAgICAgbGV0IG9sZEhUTUwgPSAkbWVzc2FnZS5odG1sKCkudHJpbSgpO1xyXG4gICAgICAgIGxldCBtc2dIVE1MID0gb2xkSFRNTDtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBFbW90ZS5tZXNzYWdlc1ttc2dIVE1MXSA9PSAndW5kZWZpbmVkJykge1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgd29yZHMgPSBtc2dIVE1MLnJlcGxhY2UoJy9cXHhFRlxceEJCXFx4QkYvJywgJycpLnJlcGxhY2UoJ++7vycsICcnKS5zcGxpdCgnICcpO1xyXG4gICAgICAgICAgICBjb25zdCB1bmlxdWVXb3JkcyA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgZW1vdGVDb3VudCA9IDA7XHJcblxyXG4gICAgICAgICAgICAkLmVhY2god29yZHMsIGZ1bmN0aW9uIChpLCBlbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQuaW5BcnJheShlbCwgdW5pcXVlV29yZHMpID09PSAtMSkgdW5pcXVlV29yZHMucHVzaChlbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB1bmlxdWVXb3Jkcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmQgPSB1bmlxdWVXb3Jkc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIEVtb3RlLmVtb3Rlc1t3b3JkXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlbW90ZUNvdW50Kys7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgd29yZCk7XHJcbiAgICAgICAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ2hpbnQtLXRvcCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgICAgICAgICAgaW1nLnNyYyA9IEVtb3RlLmVtb3Rlc1t3b3JkXVsndXJsJ107XHJcbiAgICAgICAgICAgICAgICBpbWcuYWx0ID0gd29yZDtcclxuICAgICAgICAgICAgICAgIGltZy5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XHJcbiAgICAgICAgICAgICAgICBpbWcuc3R5bGUud2lkdGggPSAnYXV0byc7XHJcbiAgICAgICAgICAgICAgICBpbWcuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHJcbiAgICAgICAgICAgICAgICBzcGFuLmFwcGVuZENoaWxkKGltZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbXNnSFRNTCA9IHJlcGxhY2VBbGwobXNnSFRNTCwgd29yZCwgc3Bhbi5vdXRlckhUTUwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZW1vdGVDb3VudCA8IDEpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICRtZXNzYWdlLmh0bWwobXNnSFRNTCk7XHJcbiAgICAgICAgICAgIEVtb3RlLm1lc3NhZ2VzW29sZEhUTUwucmVwbGFjZSgvXFxzL2csJycpXSA9IG1zZ0hUTUw7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRtZXNzYWdlLmh0bWwoRW1vdGUubWVzc2FnZXNbb2xkSFRNTF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJG1lc3NhZ2UucGFyZW50KCkucGFyZW50KCkuYmluZCgnRE9NU3VidHJlZU1vZGlmaWVkJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgJG1lc3NhZ2UgPSAkKHRoaXMpLmZpbmQoJyNtZXNzYWdlJyk7XHJcbiAgICAgICAgICAgIEVtb3RlLmthcHBhQ2hlY2soJG1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGh0bWwgPSAkbWVzc2FnZS5odG1sKCkudHJpbSgpO1xyXG4gICAgICAgICAgICBodG1sID0gaHRtbC5yZXBsYWNlKCcvXFx4RUZcXHhCQlxceEJGLycsICcnKS5yZXBsYWNlKCfvu78nLCAnJykucmVwbGFjZSgvXFxzL2csJycpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBFbW90ZS5tZXNzYWdlc1todG1sXSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaHRtbCA9PSBFbW90ZS5tZXNzYWdlc1todG1sXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkbWVzc2FnZS5odG1sKEVtb3RlLm1lc3NhZ2VzW2h0bWxdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiBhIG1lc3NhZ2UgY29udGFpbnMgYSBrYXBwYSBlbW90ZS5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bm9kZX0gbXNnIC0gTWVzc2FnZSBub2RlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBrYXBwYUNoZWNrKG1zZylcclxuICAgIHtcclxuICAgICAgICAkKCdpbWcnLCBtc2cpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCAkaW1nID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgvXFx1ZDgzY1xcdWRmMWQvZy50ZXN0KCRpbWcuYXR0cignYWx0JykpKSB7XHJcbiAgICAgICAgICAgICAgICAkaW1nLnJlcGxhY2VXaXRoKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdLYXBwYScpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgVHdpdGNoIGVtb3Rlcy5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxvYWRUd2l0Y2hFbW90ZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCAnaHR0cHM6Ly90d2l0Y2hlbW90ZXMuY29tL2FwaV9jYWNoZS92Mi9nbG9iYWwuanNvbicpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgICAgY29uc3QgdXJsVGVtcGxhdGUgPSAnLy9zdGF0aWMtY2RuLmp0dm53Lm5ldC9lbW90aWNvbnMvdjEvJztcclxuXHJcbiAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ3R3aXRjaCddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGVtb3RlRGljID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KVsnZW1vdGVzJ107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVtb3RlIGluIGVtb3RlRGljKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2Vtb3RlXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IHVybFRlbXBsYXRlICsgZW1vdGVEaWNbZW1vdGVdWydpbWFnZV9pZCddICsgJy8nICsgJzEuMCdcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1sndHdpdGNoJ10ubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCBUd2l0Y2ggc3Vic2NyaWJlciBlbW90ZXMuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb2FkU3ViRW1vdGVzKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbignR0VUJywgJ2h0dHBzOi8vdHdpdGNoZW1vdGVzLmNvbS9hcGlfY2FjaGUvdjIvc3Vic2NyaWJlci5qc29uJyk7XHJcbiAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgICAgICBjb25zdCB1cmxUZW1wbGF0ZSA9ICcvL3N0YXRpYy1jZG4uanR2bncubmV0L2Vtb3RpY29ucy92MS8nO1xyXG5cclxuICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snc3ViJ10ubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZW1vdGVEaWMgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpWydjaGFubmVscyddO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCBjaGFubmVsIGluIGVtb3RlRGljKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpIGluIGVtb3RlRGljW2NoYW5uZWxdWydlbW90ZXMnXSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaWN0ID0gZW1vdGVEaWNbY2hhbm5lbF1bJ2Vtb3RlcyddW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvZGUgPSBkaWN0Wydjb2RlJ107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChFbW90ZS5pc1ZhbGlkRW1vdGUoY29kZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2NvZGVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmxUZW1wbGF0ZSArIGRpY3RbJ2ltYWdlX2lkJ10gKyAnLycgKyAnMS4wJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydzdWInXS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIEJUVFYgZW1vdGVzLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbG9hZEJUVFZFbW90ZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCAnaHR0cHM6Ly9hcGkuYmV0dGVydHR2Lm5ldC8yL2Vtb3RlcycpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgICAgY29uc3QgdXJsVGVtcGxhdGUgPSAnLy9jZG4uYmV0dGVydHR2Lm5ldC9lbW90ZS8nO1xyXG5cclxuICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUViddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGVtb3RlTGlzdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dClbJ2Vtb3RlcyddO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCBpIGluIGVtb3RlTGlzdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGRpY3QgPSBlbW90ZUxpc3RbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFFbW90ZS5jb250YWluc0Rpc2FsbG93ZWRDaGFyKGRpY3RbJ2NvZGUnXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBFbW90ZS5lbW90ZXNbZGljdFsnY29kZSddXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmxUZW1wbGF0ZSArIGRpY3RbJ2lkJ10gKyAnLycgKyAnMXgnXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWJ10ubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCBCVFRWIGNoYW5uZWwgZW1vdGVzLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbG9hZEJUVFZDaGFubmVsRW1vdGVzKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBjaGFubmVscyA9IG9wdGlvbnNbJ0JUVFZDaGFubmVscyddO1xyXG4gICAgICAgIGNvbnN0IGNvbW1hQ2hhbm5lbHMgPSBjaGFubmVscy5yZXBsYWNlKC9cXHMrL2csICcnKS5zcGxpdCgnLCcpO1xyXG5cclxuICAgICAgICBjb21tYUNoYW5uZWxzLmZvckVhY2goZnVuY3Rpb24gKGNoYW5uZWwpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB4aHIub3BlbignR0VUJywgJ2h0dHBzOi8vYXBpLmJldHRlcnR0di5uZXQvMi9jaGFubmVscy8nICsgY2hhbm5lbCk7XHJcbiAgICAgICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHVybFRlbXBsYXRlID0gJy8vY2RuLmJldHRlcnR0di5uZXQvZW1vdGUvJztcclxuXHJcbiAgICAgICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50Kys7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkQ291bnQgPj0gY29tbWFDaGFubmVscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZW1vdGVMaXN0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KVsnZW1vdGVzJ107XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpIGluIGVtb3RlTGlzdCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaWN0ID0gZW1vdGVMaXN0W2ldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIUVtb3RlLmNvbnRhaW5zRGlzYWxsb3dlZENoYXIoZGljdFsnY29kZSddKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBFbW90ZS5lbW90ZXNbZGljdFsnY29kZSddXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsVGVtcGxhdGUgKyBkaWN0WydpZCddICsgJy8nICsgJzF4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWw6IGNoYW5uZWwgKyAnIChidHR2KSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWRDb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50ID49IGNvbW1hQ2hhbm5lbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCBJY2UncyBvbGQgc3Vic2NyaWJlciBlbW90ZXMuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb2FkSWNlRW1vdGVzKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCB1cmxUZW1wbGF0ZSA9ICdodHRwczovL3N0YXRpYy1jZG4uanR2bncubmV0L2Vtb3RpY29ucy92MS8nO1xyXG5cclxuICAgICAgICBjb25zdCBpY2VFbW90ZXMgPSB7XHJcbiAgICAgICAgICAgIFwicHVycGxlMVwiOiB7IFwiaW1hZ2VfaWRcIjogOTY4NzMgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGUyXCI6IHsgXCJpbWFnZV9pZFwiOiA5Njg3NCB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZTNcIjogeyBcImltYWdlX2lkXCI6IDk2ODc1IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlNFwiOiB7IFwiaW1hZ2VfaWRcIjogOTY4NzYgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVBcm0xXCI6IHsgXCJpbWFnZV9pZFwiOiA4NDY4NyB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUFybTJcIjogeyBcImltYWdlX2lkXCI6IDg0NTMzIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlQmx1ZXNjcmVlblwiOiB7IFwiaW1hZ2VfaWRcIjogMTU3NDE1IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlQnJ1aFwiOiB7IFwiaW1hZ2VfaWRcIjogMTMyODkzIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlQ2lncmlwXCI6IHsgXCJpbWFnZV9pZFwiOiAxNjE4MjggfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVDcmVlcFwiOiB7IFwiaW1hZ2VfaWRcIjogMTUzNjIwIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlQ3hcIjogeyBcImltYWdlX2lkXCI6IDkxODc2IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlRW56YVwiOiB7IFwiaW1hZ2VfaWRcIjogMTA1NDQ0IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlRmFrZVwiOiB7IFwiaW1hZ2VfaWRcIjogOTE4NzQgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVGcmFua1wiOiB7IFwiaW1hZ2VfaWRcIjogNzY2NDAgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVIdWhcIjogeyBcImltYWdlX2lkXCI6IDEzMzI4NiB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUljZVwiOiB7IFwiaW1hZ2VfaWRcIjogODAyMTUgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVLS29uYVwiOiB7IFwiaW1hZ2VfaWRcIjogMTIxNzcxIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlTVwiOiB7IFwiaW1hZ2VfaWRcIjogMTIxNzcyIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlTm9zZVwiOiB7IFwiaW1hZ2VfaWRcIjogNjUxNTIgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVPbWdcIjogeyBcImltYWdlX2lkXCI6IDE2MDQ2MiB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZVByaWRlXCI6IHsgXCJpbWFnZV9pZFwiOiA2MjU2MCB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZVJvZmxcIjogeyBcImltYWdlX2lkXCI6IDEyMTQ5NSB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZVRhY29cIjogeyBcImltYWdlX2lkXCI6IDEzMjcyNiB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZVRoaW5rXCI6IHsgXCJpbWFnZV9pZFwiOiAxMjE3NzAgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVXXCI6IHsgXCJpbWFnZV9pZFwiOiA3MDgzOCB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUNsYXVzXCI6IHsgXCJpbWFnZV9pZFwiOiAxMzI3MzcgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVDb29sc3RvcnlcIjogeyBcImltYWdlX2lkXCI6IDE1MzYyMSB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZURvZ1wiOiB7IFwiaW1hZ2VfaWRcIjogMTA1MjI4IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlRnJvXCI6IHsgXCJpbWFnZV9pZFwiOiA4NjQ0NCB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUtrb25hXCI6IHsgXCJpbWFnZV9pZFwiOiAxMjE0OTQgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVMZW9cIjogeyBcImltYWdlX2lkXCI6IDczNjMyIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlTFVMXCI6IHsgXCJpbWFnZV9pZFwiOiAxMjY1MTEgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVSZWFsXCI6IHsgXCJpbWFnZV9pZFwiOiA5MTg3MyB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZVRodW1wXCI6IHsgXCJpbWFnZV9pZFwiOiA4NjUwMSB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZVRvbmd1ZVwiOiB7IFwiaW1hZ2VfaWRcIjogNzA4MzggfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVXYWxudXRcIjogeyBcImltYWdlX2lkXCI6IDEwOTA4NCB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZVdhdFwiOiB7IFwiaW1hZ2VfaWRcIjogMTA1MjI5IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlV3V0XCI6IHsgXCJpbWFnZV9pZFwiOiAxMzM4NDQgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZvcihjb25zdCBlbW90ZSBpbiBpY2VFbW90ZXMpIHtcclxuICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2Vtb3RlXSA9IHtcclxuICAgICAgICAgICAgICAgIHVybDogdXJsVGVtcGxhdGUgKyBpY2VFbW90ZXNbZW1vdGVdWydpbWFnZV9pZCddICsgJy8nICsgJzEuMCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGV4dCBpcyBhIHZhbGlkIGVtb3RlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNWYWxpZEVtb3RlKHRleHQpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICEodGV4dFswXS5tYXRjaCgvW0EtWl0vZykgfHxcclxuICAgICAgICAgICAgdGV4dC5tYXRjaCgvXlthLXpdKyQvZykgfHxcclxuICAgICAgICAgICAgdGV4dC5tYXRjaCgvXlxcZCokL2cpXHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGV4dCBjb250YWlucyBkaXNhbGxvd2VkIGNoYXJhY3RlcnMuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gd29yZFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY29udGFpbnNEaXNhbGxvd2VkQ2hhcih3b3JkKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAoY29uc3QgYyBpbiBESVNBTExPV0VEX0NIQVJTKSB7XHJcbiAgICAgICAgICAgIGlmICh3b3JkLmluZGV4T2YoYykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcbn07XHJcblxyXG5FbW90ZS5zdGF0ZXMgPSB7XHJcbiAgICB0d2l0Y2g6IHtcclxuICAgICAgICBsb2FkZWQ6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgc3ViOiB7XHJcbiAgICAgICAgbG9hZGVkOiBmYWxzZVxyXG4gICAgfSxcclxuICAgIEJUVFY6IHtcclxuICAgICAgICBsb2FkZWQ6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgQlRUVkNoYW5uZWxzOiB7XHJcbiAgICAgICAgbG9hZGVkOiBmYWxzZSxcclxuICAgICAgICBsb2FkZWRDb3VudDogMFxyXG4gICAgfVxyXG59O1xyXG5cclxuRW1vdGUuZW1vdGVzID0ge307XHJcbkVtb3RlLm1lc3NhZ2VzID0ge307XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZW1vdGUuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VBbGwoc3RyLCBmaW5kLCByZXBsYWNlKSB7XHJcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChmaW5kLCAnZycpLCByZXBsYWNlKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc05vZGUobykge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICB0eXBlb2YgTm9kZSA9PT0gJ29iamVjdCcgPyBvIGluc3RhbmNlb2YgTm9kZSA6IG8gJiYgdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIHR5cGVvZiBvLm5vZGVUeXBlID09PSAnbnVtYmVyJyAmJiB0eXBlb2Ygby5ub2RlTmFtZSA9PT0gJ3N0cmluZydcclxuICAgICk7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdXRpbC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBlbW90ZUF1dG9Db21wbGV0ZVxyXG57XHJcbiAgICAvKipcclxuICAgICAqIEF1dG9jb21wbGV0ZSBmb3IgZW1vdGVzXHJcbiAgICAgKiAgLVxyXG4gICAgICovXHJcblxyXG5cclxuICAgIHN0YXRpYyBnZXRDYXJldFBvc2l0aW9uKGVkaXRhYmxlRGl2KSB7XHJcbiAgICAgIHZhciBjYXJldFBvcyA9IDAsXHJcbiAgICAgICAgc2VsLCByYW5nZTtcclxuICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcclxuICAgICAgICBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgaWYgKHNlbC5yYW5nZUNvdW50KSB7XHJcbiAgICAgICAgICByYW5nZSA9IHNlbC5nZXRSYW5nZUF0KDApO1xyXG4gICAgICAgICAgaWYgKHJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyLnBhcmVudE5vZGUgPT0gZWRpdGFibGVEaXYpIHtcclxuICAgICAgICAgICAgY2FyZXRQb3MgPSByYW5nZS5lbmRPZmZzZXQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnNlbGVjdGlvbiAmJiBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UpIHtcclxuICAgICAgICByYW5nZSA9IGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xyXG4gICAgICAgIGlmIChyYW5nZS5wYXJlbnRFbGVtZW50KCkgPT0gZWRpdGFibGVEaXYpIHtcclxuICAgICAgICAgIHZhciB0ZW1wRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICAgIGVkaXRhYmxlRGl2Lmluc2VydEJlZm9yZSh0ZW1wRWwsIGVkaXRhYmxlRGl2LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgICAgdmFyIHRlbXBSYW5nZSA9IHJhbmdlLmR1cGxpY2F0ZSgpO1xyXG4gICAgICAgICAgdGVtcFJhbmdlLm1vdmVUb0VsZW1lbnRUZXh0KHRlbXBFbCk7XHJcbiAgICAgICAgICB0ZW1wUmFuZ2Uuc2V0RW5kUG9pbnQoXCJFbmRUb0VuZFwiLCByYW5nZSk7XHJcbiAgICAgICAgICBjYXJldFBvcyA9IHRlbXBSYW5nZS50ZXh0Lmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGNhcmV0UG9zO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBwbGFjZUNhcmV0QXRFbmQoZWwpIHtcclxuICAgICAgICBlbC5mb2N1cygpO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93LmdldFNlbGVjdGlvbiAhPSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVSYW5nZSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHZhciByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XHJcbiAgICAgICAgICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhlbCk7XHJcbiAgICAgICAgICAgIHJhbmdlLmNvbGxhcHNlKGZhbHNlKTtcclxuICAgICAgICAgICAgdmFyIHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xyXG4gICAgICAgICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50LmJvZHkuY3JlYXRlVGV4dFJhbmdlICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdmFyIHRleHRSYW5nZSA9IGRvY3VtZW50LmJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XHJcbiAgICAgICAgICAgIHRleHRSYW5nZS5tb3ZlVG9FbGVtZW50VGV4dChlbCk7XHJcbiAgICAgICAgICAgIHRleHRSYW5nZS5jb2xsYXBzZShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRleHRSYW5nZS5zZWxlY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldFdvcmQoKSB7XHJcbiAgICAgICAgdmFyIHNlbCwgd29yZCA9IFwiXCI7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24gJiYgKHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKSkubW9kaWZ5KSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZFJhbmdlID0gc2VsLmdldFJhbmdlQXQoMCk7XHJcbiAgICAgICAgICAgIHNlbC5jb2xsYXBzZVRvU3RhcnQoKTtcclxuICAgICAgICAgICAgc2VsLm1vZGlmeShcIm1vdmVcIiwgXCJiYWNrd2FyZFwiLCBcIndvcmRcIik7XHJcbiAgICAgICAgICAgIHNlbC5tb2RpZnkoXCJleHRlbmRcIiwgXCJmb3J3YXJkXCIsIFwid29yZFwiKTtcclxuICAgICAgICAgICAgd29yZCA9IHNlbC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcbiAgICAgICAgICAgIHNlbC5hZGRSYW5nZShzZWxlY3RlZFJhbmdlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCAoc2VsID0gZG9jdW1lbnQuc2VsZWN0aW9uKSAmJiBzZWwudHlwZSAhPSBcIkNvbnRyb2xcIikge1xyXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZWwuY3JlYXRlUmFuZ2UoKTtcclxuICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJhbmdlLmV4cGFuZChcIndvcmRcIik7XHJcbiAgICAgICAgICAgIHdvcmQgPSByYW5nZS50ZXh0O1xyXG4gICAgICAgICAgICBpbmRleCA9IHN0YXJ0T2ZmU2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gd29yZDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZW1vdGVUYWJDb21wbGV0ZSgpIHtcclxuXHJcbiAgICAgICAgdmFyIGZvdW5kRW1vdGVzID0gW107XHJcbiAgICAgICAgdmFyIHN0YXRlID0gLTE7XHJcbiAgICAgICAgdmFyIHNhdmVQb3MgPSAwO1xyXG4gICAgICAgIHZhciBzdGFydFN0cjtcclxuICAgICAgICB2YXIgZW5kU3RyO1xyXG5cclxuICAgICAgICBjb25zdCBlbW90ZUFycmF5ID0gWyc0SGVhZCcsICdBTVBUcm9wUHVuY2gnLCAnQU5FTEUnLCAnQXJnaWVCOCcsICdBcmlnYXRvTmFzJywgJ0Fyc29uTm9TZXh5JywgJ0FzaWFuR2xvdycsICdCYWJ5UmFnZScsICdCYXRDaGVzdCcsICdCQ1dhcnJpb3InLCAnQmVnV2FuJywgJ0JpYmxlVGh1bXAnLCAnQmlnQnJvdGhlcicsICdCaWdQaGlzaCcsICdCbGFyZ05hdXQnLCAnYmxlZWRQdXJwbGUnLCBcclxuICAgICAgICAnQmxlc3NSTkcnLCAnQmxvb2RUcmFpbCcsICdCcmFpblNsdWcnLCAnQnJva2VCYWNrJywgJ0J1ZGRoYUJhcicsICdCdWRTdGFyJywgJ0NhcmxTbWlsZScsICdDaGVmRnJhbmsnLCAnY21vbkJydWgnLCAnQ29vbENhdCcsICdDb29sU3RvcnlCb2InLCAnY29weVRoaXMnLCAnQ29yZ2lEZXJwJywgJ0NycmVhbUF3aycsICdDdXJzZUxpdCcsICdEQUVTdXBweScsICdEYW5zR2FtZScsICdEYXRTaGVmZnknLCBcclxuICAgICAgICAnREJzdHlsZScsICdEZW5kaUZhY2UnLCAnRG9nRmFjZScsICdEb3JpdG9zQ2hpcCcsICdkdUR1ZHUnLCAnRHhDYXQnLCAnRWFnbGVFeWUnLCAnRWxlR2lnZ2xlJywgJ0ZhaWxGaXNoJywgJ0ZyYW5rZXJaJywgJ0ZyZWFraW5TdGlua2luJywgJ0ZVTmdpbmVlcicsICdGdW5SdW4nLCAnRnV0dXJlTWFuJywgJ0dpbmdlclBvd2VyJywgJ0dpdmVQTFonLCAnR09XU2t1bGwnLCAnR3JhbW1hcktpbmcnLCBcclxuICAgICAgICAnSGFzc2FhbkNob3AnLCAnSGFzc2FuQ2hvcCcsICdIZXlHdXlzJywgJ0hvdFBva2tldCcsICdIdW1ibGVMaWZlJywgJ2ltR2xpdGNoJywgJ0ludXlvRmFjZScsICdJdHNCb3NoeVRpbWUnLCAnSmViYWl0ZWQnLCAnSkthblN0eWxlJywgJ0pvbkNhcm5hZ2UnLCAnS0FQT1cnLCAnS2FwcGEnLCAnS2FwcGFDbGF1cycsICdLYXBwYVByaWRlJywgJ0thcHBhUm9zcycsICdLYXBwYVdlYWx0aCcsICdLYXBwdScsIFxyXG4gICAgICAgICdLZWVwbycsICdLZXZpblR1cnRsZScsICdLaXBwYScsICdLb25DaGEnLCAnS3JleWdhc20nLCAnTWF1NScsICdtY2FUJywgJ01pa2VIb2d1JywgJ01pbmdMZWUnLCAnTW9ycGhpblRpbWUnLCAnTXJEZXN0cnVjdG9pZCcsICdNVkdhbWUnLCAnTmluamFHcnVtcHknLCAnTm9tTm9tJywgJ05vdEFUSycsICdOb3RMaWtlVGhpcycsICdPaE15RG9nJywgJ09uZUhhbmQnLCAnT3BpZU9QJywgJ09wdGltaXplUHJpbWUnLCBcclxuICAgICAgICAnT1NibG9iJywgJ09TZnJvZycsICdPU2tvbW9kbycsICdPU3Nsb3RoJywgJ3BhbmljQmFza2V0JywgJ1BhbmljVmlzJywgJ1BhcnR5VGltZScsICdwYXN0YVRoYXQnLCAnUGVvcGxlc0NoYW1wJywgJ1Blcm1hU211ZycsICdQaWNvTWF1c2UnLCAnUGlwZUh5cGUnLCAnUEpTYWx0JywgJ1BKU3VnYXInLCAnUE1TVHdpbicsICdQb2dDaGFtcCcsICdQb29vb3VuZCcsICdQcmFpc2VJdCcsICdQUkNoYXNlJywgXHJcbiAgICAgICAgJ1ByaW1lTWUnLCAnUHVuY2hUcmVlcycsICdQdW5Pa28nLCAnUmFjY0F0dGFjaycsICdSYWxwaGVyWicsICdSZWRDb2F0JywgJ1Jlc2lkZW50U2xlZXBlcicsICdyaVBlcHBlcm9uaXMnLCAnUml0ek1pdHonLCAnUmx5VGhvJywgJ1J1bGVGaXZlJywgJ1NhYmFQaW5nJywgJ1NlZW1zR29vZCcsICdTaGFkeUx1bHUnLCAnU2hhekJvdHN0aXgnLCAnU21vb2NoZXJaJywgJ1NNT3JjJywgJ1NvQmF5ZWQnLCBcclxuICAgICAgICAnU29vbmVyTGF0ZXInLCAnU1BLRmFjZScsICdTUEtXYXZlJywgJ1NxdWlkMScsICdTcXVpZDInLCAnU3F1aWQzJywgJ1NxdWlkNCcsICdTU1Nzc3MnLCAnU3Rpbmt5Q2hlZXNlJywgJ1N0b25lTGlnaHRuaW5nJywgJ1N0cmF3QmVhcnknLCAnU3VwZXJWaW5saW4nLCAnU3dpZnRSYWdlJywgJ1Rha2VOUkcnLCAnVEJBbmdlbCcsICdUQkNoZWVzZVB1bGwnLCAnVEJUYWNvTGVmdCcsICdUQlRhY29SaWdodCcsIFxyXG4gICAgICAgICdUZWFyR2xvdmUnLCAnVGVoZVBlbG8nLCAnVEYySm9obicsICdUaGFua0VnZycsICdUaGVJbGx1bWluYXRpJywgJ1RoZVJpbmdlcicsICdUaGVUYXJGdScsICdUaGVUaGluZycsICdUaHVuQmVhc3QnLCAnVGlueUZhY2UnLCAnVG9vU3BpY3knLCAnVHJpSGFyZCcsICdUVG91cnMnLCAnVHdpdGNoTGl0JywgJ3R3aXRjaFJhaWQnLCAnVHdpdGNoUlBHJywgJ1VuY2xlTm94JywgJ1VuU2FuZScsICdVV290JywgXHJcbiAgICAgICAgJ1ZvSGlZbycsICdWb3RlTmF5JywgJ1ZvdGVZZWEnLCAnV2hvbGVXaGVhdCcsICdXVFJ1Y2snLCAnV3V0RmFjZScsICdZb3VEb250U2F5JywgJ1lvdVdIWScsICdPaE15R29vZG5lc3MnLCAnUGFuY2FrZU1peCcsICdQZWRvQmVhcicsICdQb2tlckZhY2UnLCAnUmFnZUZhY2UnLCAnUmViZWNjYUJsYWNrJywgJzp0ZjonLCAnYVBsaVMnLCAnQ2lHcmlwJywgJ0NIQWNjZXB0ZWQnLCAnRnVja1llYScsIFxyXG4gICAgICAgICdEYXRTYXVjZScsICdGb3JldmVyQWxvbmUnLCAnR2FiZU4nLCAnSGFpbEhlbGl4JywgJ0hlcmJQZXJ2ZScsICdpRG9nJywgJ3JTdHJpa2UnLCAnU2hvb3BEYVdob29wJywgJ1N3ZWRTd2FnJywgJ00mTWpjJywgJ2J0dHZOaWNlJywgJ1RvcEhhbScsICdUd2FUJywgJ1doYXRBWW9saycsICdXYXRDaHVTYXknLCAnU2F2YWdlSmVya3knLCAnSEh5ZHJvJywgJ1RheGlCcm8nLCAnQnJvQmFsdCcsIFxyXG4gICAgICAgICdCdXR0ZXJTYXVjZScsICdCYWNvbkVmZmVjdCcsICdTdWNoRnJhdWQnLCAnQ2FuZGlhblJhZ2UnLCBcIlNoZSdsbEJlUmlnaHRcIiwgJ09oaGhLZWUnLCAnRDonLCAnU2V4UGFuZGEnLCAnKHBvb2xwYXJ0eSknLCBcIjonKFwiLCBcIihwdWtlKVwiLCAnYnR0dldpbmsnLCAnYnR0dkFuZ3J5JywgJ2J0dHZDb25mdXNlZCcsICdidHR2Q29vbCcsICdidHR2SGFwcHknLCAnYnR0dlNhZCcsICdidHR2U2xlZXAnLFxyXG4gICAgICAgICdidHR2U3VycHJpc2VkJywgJ2J0dHZUb25ndWUnLCAnYnR0dlVuc3VyZScsICdidHR2R3JpbicsICdidHR2SGVhcnQnLCAnYnR0dlR3aW5rJywgJ1Zpc0xhdWQnLCAnS2FSYXBwYScsICdZZXRpWicsICdtaW5pSnVsaWEnLCAnc29zR2FtZScsICdDcnVXJywgJ1JhcmVQZXBlJywgJ2lhbXNvY2FsJywgJ2hhSEFBJywgJ0ZlZWxzQmlydGhkYXlNYW4nLCAnUm9uU211ZycsICdLYXBwYUNvb2wnLCBcclxuICAgICAgICAnWmFwcGEnLCAnU3FTaHknLCAnQmFzZWRHb2QnLCAnYlVyc2VsZicsICdDb25jZXJuRG9nZScsICdGYXBGYXBGYXAnLCAnRmVlbHNCYWRNYW4nLCAnRmVlbHNHb29kTWFuJywgJ0ZpcmVTcGVlZCcsICdGaXNoTW9sZXknLCAnSGhoZWhlaGUnLCAnS0tvbmEnLCAnTmFNJywgJ09oR29kJywgJ1BvbGVEb2dlJywgJ3RlaFBvbGVDYXQnLCAnQW5nZWxUaHVtcCcsICdTb3VyUGxzJywgJ0xVTCcsIFxyXG4gICAgICAgICdTYWx0eUNvcm4nLCAnRkNyZWVwJywgJ1ZhcGVOYXRpb24nLCAnYXJpVycsICdub3RzcXVpc2hZJywgJ0ZlZWxzQW1hemluZ01hbicsICdEdWNrZXJaJywgJ1dvd2VlJ107XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCBcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZih0eXBlb2YgJCgnI2lucHV0JykuYXR0cignZm9jdXNlZCcpICE9ICd1bmRlZmluZWQnKSB7IC8vIFJlc2V0cyB0YWIgY2xpY2tzIHdoZW4gbW91c2UgbG9jYXRpb24gaXMgY2hhbmdlZFxyXG4gICAgICAgICAgICAgICAgZm91bmRFbW90ZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHN0YXRlID0gLTE7XHJcbiAgICAgICAgICAgICAgICBzYXZlUG9zID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5rZXlkb3duKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09IDkgJiYgdHlwZW9mICQoJyNpbnB1dCcpLmF0dHIoJ2ZvY3VzZWQnKSAhPSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gUHJldmVudHMgVEFCIHRvIHNlbGVjdCBvYmplY3RzXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGZ1bGxNZXNzYWdlID0gJCgnI2lucHV0ICNpbnB1dCcpLnRleHQoKSAvLyBGdWxsIG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIHZhciBzZWxlY3RlZFdvcmQgPSBlbW90ZUF1dG9Db21wbGV0ZS5nZXRXb3JkKCkudHJpbSgpOyAvLyBUaGUgd29yZCB5b3VyIGNhcmV0IGlzIG9uXHJcbiAgICAgICAgICAgICAgICB2YXIgY3Vyc29yUG9zID0gZW1vdGVBdXRvQ29tcGxldGUuZ2V0Q2FyZXRQb3NpdGlvbigkKCcjaW5wdXQgI2lucHV0JylbMF0pIC8vIENhcmV0IGluZGV4XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoc2VsZWN0ZWRXb3JkID09IFwiXCIgfHwgZnVsbE1lc3NhZ2VbY3Vyc29yUG9zLTFdID09IFwiwqBcIikgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHN0YXRlID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm91bmRFbW90ZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVtb3RlQXJyYXkubGVuZ3RoOyBpKyspIHsgLy8gQ2hlY2tzIGFycmF5IGZvciBtYXRjaGVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVtb3RlQXJyYXlbaV0uaW5kZXhPZihzZWxlY3RlZFdvcmQpID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kRW1vdGVzLnB1c2goZW1vdGVBcnJheVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IGN1cnNvclBvcy0xOyBpID4gMDsgaS0tKSB7IC8vIENoZWNrcyBjYXJldCBsb2NhdGlvbiBjb21wYXJlZCB0byB0aGUgd29yZCB0byBmaW5kIHRoZSBzdGFydGluZyBwb2ludFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihmdWxsTWVzc2FnZVtpXSA9PSBcIiBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZVBvcyA9IGN1cnNvclBvcy0oY3Vyc29yUG9zLWkpKzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZVBvcyA9IDA7IC8vIFNldCBwb3MgMCBpZiBmaXJzdCB3b3JkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRTdHIgPSBmdWxsTWVzc2FnZS5zdWJzdHJpbmcoMCwgc2F2ZVBvcyk7IC8vIFN0YXJ0aW5nIHBhcnRcclxuICAgICAgICAgICAgICAgICAgICBlbmRTdHIgPSBmdWxsTWVzc2FnZS5zdWJzdHJpbmcoc2F2ZVBvcytzZWxlY3RlZFdvcmQubGVuZ3RoKTsgLy8gRW5kaW5nIHBhcnRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGZvdW5kRW1vdGVzLmxlbmd0aCA9PSAwKSByZXR1cm47IC8vIE5vIG1hdGNoaW5nIGVtb3RlcyBmb3VuZFxyXG4gICAgICAgICAgICAgICAgaWYoc3RhdGUgPiBmb3VuZEVtb3Rlcy5sZW5ndGgtMikgc3RhdGUgPSAtMTsgLy8gTG9vcCBpZiBhdCB0aGUgZW5kIG9mIHRoZSBhcnJheVxyXG4gICAgICAgICAgICAgICAgc3RhdGUrK1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBuZXdNZXNzYWdlID0gc3RhcnRTdHIgKyBmb3VuZEVtb3Rlc1tzdGF0ZV0gKyBlbmRTdHI7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnI2lucHV0ICNpbnB1dCcpLnRleHQobmV3TWVzc2FnZSk7IC8vIFNldHMgdGhlIG5ldyBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICBlbW90ZUF1dG9Db21wbGV0ZS5wbGFjZUNhcmV0QXRFbmQoJCgnI2lucHV0ICNpbnB1dCcpLmdldCgwKSk7IC8vIFBsYWNlcyBjdXJzb3IgYXQgdGhlIGVuZFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoKGV2ZW50LmtleUNvZGUgPT0gMzIgfHwgZXZlbnQua2V5Q29kZSA9PSA4IHx8IGV2ZW50LmtleUNvZGUgPT0gMTcpICYmIHR5cGVvZiAkKCcjaW5wdXQnKS5hdHRyKCdmb2N1c2VkJykgIT0gJ3VuZGVmaW5lZCcpIHsgLy8gUmVzZXRzIHRhYiBjbGlja3Mgd2hlbiBzcGFjZSwgYmFja3NwYWNlIGV0YyBwcmVzc2VkLlxyXG4gICAgICAgICAgICAgICAgZm91bmRFbW90ZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHN0YXRlID0gLTE7XHJcbiAgICAgICAgICAgICAgICBzYXZlUG9zID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZW1vdGVBdXRvQ29tcGxldGUuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEVtb3RlIGZyb20gJy4vZW1vdGUnO1xyXG5pbXBvcnQgeyBvcHRpb25zIH0gZnJvbSAnLi9tYWluJztcclxuaW1wb3J0IENoYXRPYnNlcnZlciBmcm9tICcuL2NoYXRPYnNlcnZlcic7XHJcbmltcG9ydCBkb25hdGVCdXR0b24gZnJvbSAnLi9vdmVybGF5L2RvbmF0ZUJ1dHRvbic7XHJcbmltcG9ydCBjaGVja0lmV2F0Y2hpbmdMaXZlIGZyb20gJy4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlJztcclxuaW1wb3J0IEFsd2F5c1Njcm9sbERvd24gZnJvbSAnLi9vdmVybGF5L2Fsd2F5c1Njcm9sbERvd24nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnZUNoZWNrXHJcbntcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHVzZXIgaXMgd2F0Y2hpbmcgZnJvbSB3cm9uZyBsaXZlc3RyZWFtIHBhZ2UgYW5kIHdhcm5zIHRoZW0uXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB5b3V0dWJlR2FtaW5nKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBpZnJhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGl2ZS1jaGF0LWlmcmFtZScpO1xyXG5cclxuICAgICAgICBjb25zdCAkdGV4dFdyYXBwZXIgPSAkKCcueXQtdXNlci1pbmZvJyk7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9ICR0ZXh0V3JhcHBlci5maW5kKCdhJykudGV4dCgpO1xyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xyXG5cclxuICAgICAgICBpZiAodGV4dCA9PSAnSWNlIFBvc2VpZG9uJyAmJiAhdXJsLmluY2x1ZGVzKCdnYW1pbmcueW91dHViZScpICYmIGlmcmFtZSkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVkaXJlY3RDb25maXJtID0gY29uZmlybSgnW0ljZSBQb3NlaWRvblRWXSBHbyB0byB0aGUgb2ZmaWNpYWwgSWNlIFBvc2VpZG9uIGxpdmVzdHJlYW0gcGFnZT8nKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZWRpcmVjdENvbmZpcm0gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICdodHRwczovL2dhbWluZy55b3V0dWJlLmNvbS9pY2VfcG9zZWlkb24vbGl2ZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHVzZXIgaXMgd2F0Y2hpbmcgYSBsaXZlc3RyZWFtIG9uIFlvdXR1YmUgZ2FtaW5nLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbGl2ZXN0cmVhbVBhZ2UoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvd25lcicpO1xyXG4gICAgICAgIGNvbnN0IGNoYXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhdCcpO1xyXG4gICAgICAgIGNvbnN0IHRleHQgPSAkKHRhcmdldCkuZmluZCgnc3BhbicpLnRleHQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcclxuXHJcbiAgICAgICAgaWYgKCghdGFyZ2V0IHx8ICFjaGF0KSAmJiAoIXVybC5pbmNsdWRlcygnbGl2ZV9jaGF0JykgJiYgIXVybC5pbmNsdWRlcygnaXNfcG9wb3V0PTEnKSkpIHtcclxuXHJcbiAgICAgICAgICAgIFBhZ2VDaGVjay5zdHJlYW1wYWdlQ2hlY2tzKys7XHJcblxyXG4gICAgICAgICAgICBpZiAoUGFnZUNoZWNrLnN0cmVhbXBhZ2VDaGVja3MgPCAyNSkge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChQYWdlQ2hlY2subGl2ZXN0cmVhbVBhZ2UsIDI1MCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zWydlbW90ZXNUd2l0Y2gnXSA9PT0gdHJ1ZSB8fCBvcHRpb25zWydlbW90ZXNTdWInXSA9PT0gdHJ1ZSB8fCBvcHRpb25zWydlbW90ZXNCVFRWJ10gPT09IHRydWUgfHwgb3B0aW9uc1snZW1vdGVzSWNlJ10gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgQ2hhdE9ic2VydmVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0ZXh0ID09ICdJY2UgUG9zZWlkb24nKSBkb25hdGVCdXR0b24oKTtcclxuXHJcbiAgICAgICAgRW1vdGUubG9hZEVtb3RlcygpO1xyXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uaW5pdCgpO1xyXG4gICAgICAgIGNoZWNrSWZXYXRjaGluZ0xpdmUoKTtcclxuICAgIH07XHJcbn07XHJcblxyXG5QYWdlQ2hlY2suc3RyZWFtcGFnZUNoZWNrcyA9IDA7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcGFnZUNoZWNrLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBFbW90ZSBmcm9tICcuL2Vtb3RlJztcclxuaW1wb3J0IE1lbnRpb25IaWdobGlnaHQgZnJvbSAnLi9tZW50aW9uSGlnaGxpZ2h0JztcclxuXHJcbi8qKlxyXG4gKiBCaW5kcyBjaGF0IG11dGF0aW9uIG9ic2VydmVyIGFuZCBsaXN0ZW4gZm9yIG5ldyBjaGF0IG1lc3NhZ2VzLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hhdE9ic2VydmVyKClcclxue1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0eWxlLXNjb3BlIC55dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyJyk7XHJcbiAgICBjb25zdCBhdXRob3JuYW1lID0gJCgnI2F1dGhvciAjYXV0aG9yLW5hbWUnKS50ZXh0KCkudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoY2hhdE9ic2VydmVyLCAyNTApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcclxuXHJcbiAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuZXdOb2RlcyA9IG11dGF0aW9uLmFkZGVkTm9kZXM7XHJcblxyXG4gICAgICAgICAgICBpZiAobmV3Tm9kZXMgIT09IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCAkbm9kZXMgPSAkKG5ld05vZGVzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkbm9kZXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRub2RlID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEkbm9kZS5oYXNDbGFzcygneXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlcicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE1lbnRpb25IaWdobGlnaHQoJG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLmVtb3RlQ2hlY2soJG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgY2hhcmFjdGVyRGF0YTogZmFsc2UsXHJcbiAgICAgICAgYXR0cmlidXRlczogZmFsc2UsXHJcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgIHN1YnRyZWU6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIG9wdGlvbnMpO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NoYXRPYnNlcnZlci5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBvcHRpb25zIH0gZnJvbSAnLi9tYWluJztcclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgYSBtZXNzYWdlIGNvbnRhaW5zIG1lbnRpb24gYW5kIGNoYW5nZXMgYmFja2dyb3VuZCB0byBCVFRWIHN0eWxlIGJhY2tncm91bmQuXHJcbiAqIEBwYXJhbSB7bm9kZX0gbm9kZSAtIE1lc3NhZ2Ugbm9kZVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWVudGlvbkhpZ2hsaWdodChub2RlKVxyXG57XHJcbiAgICBjb25zdCBhdXRob3JuYW1lID0gJCgnI2F1dGhvciAjYXV0aG9yLW5hbWUnKS50ZXh0KCkudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICBpZiAob3B0aW9uc1snbWVudGlvbkhpZ2hsaWdodCddICYmIGF1dGhvcm5hbWUubGVuZ3RoID4gMiAmJiAhbm9kZS5oYXNDbGFzcygneXQtbGl2ZS1jaGF0LWxlZ2FjeS1wYWlkLW1lc3NhZ2UtcmVuZGVyZXItMCcpKSB7IC8vIENoZWNrIGl0J3Mgbm90IHNwb25zb3IgLyBzdXBlcmNoYXQsIGFsc28gbWVudGlvbkhpZ2hsaWdodCBlbmFibGVkXHJcblxyXG4gICAgICAgIGNvbnN0IHVuaXF1ZWlkID0gbm9kZS5nZXQoMCkuZ2V0QXR0cmlidXRlKCdpZCcpIC8vIENvcHkgdW5pcXVlIG1lc3NhZ2UgaWRcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gKFwiIFwiICsgbm9kZS5maW5kKCcjbWVzc2FnZScpLnRleHQoKS50b0xvd2VyQ2FzZSgpICsgXCIgXCIpLnJlcGxhY2UoL1tcXHUyMDBCLVxcdTIwMERcXHVGRUZGXS9nLCAnJyk7XHJcblxyXG4gICAgICAgIGlmICh1bmlxdWVpZC5sZW5ndGggPiAzMCAmJiAobWVzc2FnZS5pbmRleE9mKCcgJythdXRob3JuYW1lKycgJykgIT09IC0xIHx8IG1lc3NhZ2UuaW5kZXhPZignQCcrYXV0aG9ybmFtZSsnICcpICE9PSAtMSkpIHsgLy8gSWYgeW91ciBuYW1lIGlzIGluIHRoZSBtZXNzYWdlLCBhbmQgaXQncyBub3QgeW91ciBtZXNzYWdlXHJcbiAgICAgICAgICAgIG5vZGUuZ2V0KDApLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgyNTUsMCwwLDAuNDApXCI7XHJcbiAgICAgICAgICAgIG5vZGUuZmluZCgnI2F1dGhvci1uYW1lJykuZ2V0KDApLnN0eWxlLmNvbG9yID0gXCIjZmZmZmZmXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL21lbnRpb25IaWdobGlnaHQuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgU0NST0xMX0VOQUJMRURfVVJMLCBTQ1JPTExfRElTQUJMRURfVVJMIH0gZnJvbSAnLi8uLi9tYWluJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsd2F5c1Njcm9sbERvd25cclxue1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzICdBbHdheXMgc2Nyb2xsIGRvd24nIG92ZXJsYXkgYW5kIGJpbmRzIHRoZSBuZWNlc3NhcnkgbGlzdGVuZXJzLlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpbml0KClcclxuICAgIHtcclxuICAgICAgICBpZiAoJCgnLmlwdHYtc2Nyb2xsZG93bi13cmFwcGVyJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICQoJy5pcHR2LXNjcm9sbGRvd24td3JhcHBlcicpLnJlbW92ZSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHNjcm9sbFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgICAgc2Nyb2xsV3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnQWx3YXlzIHNjcm9sbCBkb3duIChFbmFibGVkKScpO1xyXG4gICAgICAgIHNjcm9sbFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaGludC0tdG9wJywgJ2lwdHYtc2Nyb2xsZG93bi13cmFwcGVyJyk7XHJcblxyXG4gICAgICAgICQoc2Nyb2xsV3JhcHBlcikuY3NzKHtcclxuICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgJ3JpZ2h0JzogJzExM3B4JyxcclxuICAgICAgICAgICAgJ2JvdHRvbSc6ICcxOHB4J1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKHNjcm9sbFdyYXBwZXIpLmh0bWwoYFxyXG4gICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJpcHR2LXNjcm9sbGRvd24tdG9nZ2xlXCIgc3R5bGU9XCJvdXRsaW5lOiAwO1wiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke1NDUk9MTF9FTkFCTEVEX1VSTH1cIiBhbHQ9XCJBbHdheXMgc2Nyb2xsIGRvd25cIiBoZWlnaHQ9XCIxMVwiIHdpZHRoPVwiMTFcIiBjbGFzcz1cImlwdHYtc2Nyb2xsZG93bi10b2dnbGUtaWNvblwiPlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgYCk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsV3JhcHBlcik7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuaXB0di1zY3JvbGxkb3duLXRvZ2dsZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnRvZ2dsZVNjcm9sbERvd24oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjaXRlbS1zY3JvbGxlcicpLnNjcm9sbFRvcCg5OTk5OTk5OTkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5oaWRlU2Nyb2xsT25DaW5lbWEoc2Nyb2xsV3JhcHBlcik7XHJcbiAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5oaWRlU2Nyb2xsT25TcG9uc29yTWVudShzY3JvbGxXcmFwcGVyKTtcclxuICAgICAgICBBbHdheXNTY3JvbGxEb3duLmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xyXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uYmluZFNjcm9sbERvd25MaXN0ZW5lcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZGVzIHRoZSAnQWx3YXlzIHNjcm9sbCBkb3duJyBvdmVybGF5IHdoZW4gY2luZW1hIG1vZGUgaXMgb3BlblxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtub2RlfSBzY3JvbGxXcmFwcGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBoaWRlU2Nyb2xsT25DaW5lbWEoc2Nyb2xsV3JhcHBlcilcclxuICAgIHtcclxuICAgICAgICBjb25zdCB3YXRjaFBhZ2UgPSAneXRnLXdhdGNoLXBhZ2UnO1xyXG5cclxuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG11dGF0aW9ucykge1xyXG4gICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaCgobSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJChtLnRhcmdldCkuaXMoJ1tzaWRlYmFyLWNvbGxhcHNlZF0nKSA/ICQoc2Nyb2xsV3JhcHBlcikuaGlkZSgpIDogJChzY3JvbGxXcmFwcGVyKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBvYnNlcnZlck9wdHMgPSB7XHJcbiAgICAgICAgICAgIGNoaWxkTGlzdDogZmFsc2UsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXHJcbiAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWJ0cmVlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbJ3NpZGViYXItY29sbGFwc2VkJ11cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGFkZE9ic2VydmVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoJCh3YXRjaFBhZ2UpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSgkKHdhdGNoUGFnZSlbMF0sIG9ic2VydmVyT3B0cyk7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGFkZE9ic2VydmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDI1MCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGlkZXMgdGhlICdBbHdheXMgc2Nyb2xsIGRvd24nIG92ZXJsYXkgd2hlbiBzcG9uc29yIG1lbnUgaXMgb3Blbi5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bm9kZX0gc2Nyb2xsV3JhcHBlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaGlkZVNjcm9sbE9uU3BvbnNvck1lbnUoc2Nyb2xsV3JhcHBlcilcclxuICAgIHtcclxuICAgICAgICBjb25zdCBjaGF0SW5wdXRSZW5kZXJlciA9ICd5dC1saXZlLWNoYXQtbWVzc2FnZS1pbnB1dC1yZW5kZXJlcic7XHJcblxyXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xyXG4gICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaCgobSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJChtLnRhcmdldCkuYXR0cignY3JlYXRvci1vcGVuJykgPyAkKHNjcm9sbFdyYXBwZXIpLmhpZGUoKSA6ICQoc2Nyb2xsV3JhcHBlcikuc2hvdygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJPcHRzID0ge1xyXG4gICAgICAgICAgICBjaGlsZExpc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZSxcclxuICAgICAgICAgICAgc3VidHJlZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydjcmVhdG9yLW9wZW4nXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc3BvbnNvckNsaWNrID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoJChjaGF0SW5wdXRSZW5kZXJlcikubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKCQoY2hhdElucHV0UmVuZGVyZXIpWzBdLCBvYnNlcnZlck9wdHMpO1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChzcG9uc29yQ2xpY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMjUwKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNhYmxlcyAnQWx3YXlzIHNjcm9sbCBkb3duJyBmdW5jdGlvbmFsaXR5IHdoZW4gc2Nyb2xsaW5nIG1hbnVhbGx5LlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYmluZFNjcm9sbExpc3RlbmVyKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaXRlbS1zY3JvbGxlcicpO1xyXG5cclxuICAgICAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgQWx3YXlzU2Nyb2xsRG93bi5iaW5kU2Nyb2xsTGlzdGVuZXIoKSB9LCAyNTApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcjaXRlbS1zY3JvbGxlcicpLmJpbmQoJ21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi50b2dnbGVTY3JvbGxEb3duKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbmFibGVzICdBbHdheXMgc2Nyb2xsIGRvd24nIGZ1bmN0aW9uYWxpdHkgd2hlbiBibHVlIGp1bXAgZG93biBidXR0b24gaXMgY2xpY2tlZC5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGJpbmRTY3JvbGxEb3duTGlzdGVuZXIoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93LW1vcmUnKTtcclxuXHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4geyBBbHdheXNTY3JvbGxEb3duLmJpbmRTY3JvbGxEb3duTGlzdGVuZXIoKSB9LCAyNTApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0YXJnZXQub25tb3VzZWRvd24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24udG9nZ2xlU2Nyb2xsRG93bih0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUb2dnbGUgc2Nyb2xsRG93biBzdGF0ZSBhbmQgYWRqdXN0IG92ZXJsYXkgYWNjb3JkaW5nbHkuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB0b2dnbGVTY3JvbGxEb3duKHN0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHN0YXRlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPSAhQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA9IHN0YXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgnLmlwdHYtc2Nyb2xsZG93bi13cmFwcGVyJykuYXR0cignYXJpYS1sYWJlbCcsIEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA/ICdBbHdheXMgc2Nyb2xsIGRvd24gKEVuYWJsZWQpJyA6ICdBbHdheXMgc2Nyb2xsIGRvd24gKERpc2FibGVkKScpO1xyXG4gICAgICAgICQoJy5pcHR2LXNjcm9sbGRvd24tdG9nZ2xlLWljb24nKS5hdHRyKCdzcmMnLCBBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPyBTQ1JPTExfRU5BQkxFRF9VUkwgOiBTQ1JPTExfRElTQUJMRURfVVJMKTtcclxuICAgIH07XHJcbn07XHJcblxyXG5BbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPSB0cnVlO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL292ZXJsYXkvYWx3YXlzU2Nyb2xsRG93bi5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcclxuICogQ2hlY2tzIGlmIHVzZXIgaXMgYmVoaW5kIGluIGxpdmVzdHJlYW0gYW5kIHdhcm5zIHRoZW0uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjaGVja0lmV2F0Y2hpbmdMaXZlKCkge1xyXG5cclxuICAgIGxldCBsaXZlQ2hlY2tJbnRlcnZhbCA9IG51bGw7XHJcblxyXG4gICAgbGl2ZUNoZWNrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgY29uc3QgJGxpdmVCdXR0b24gPSAkKCcueXRwLWxpdmUtYmFkZ2UueXRwLWJ1dHRvbicpO1xyXG5cclxuICAgICAgICBpZiAoJGxpdmVCdXR0b24uaXMoJzplbmFibGVkJykgJiYgJGxpdmVCdXR0b24uaXMoJzp2aXNpYmxlJykpIHtcclxuICAgICAgICAgICAgJCgnI3BsYXllci1jb250YWluZXInKS5hcHBlbmQoYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtbGl2ZS13YXJuaW5nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtbGl2ZS13YXJuaW5nLXRleHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgWW91XFwncmUgd2F0Y2hpbmcgb2xkIGZvb3RhZ2UsIGNsaWNrIHRoZSBMSVZFIGJ1dHRvbiBpbiB0aGUgYm90dG9tIGxlZnQgY29ybmVyIHRvIHdhdGNoIGxpdmUuXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtbGl2ZS13YXJuaW5nLWRpc21pc3NcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwiaXB0di1saXZlLXdhcm5pbmctY2xvc2VcIj7inJU8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgMTUgKiAxMDAwKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmlwdHYtbGl2ZS13YXJuaW5nLWNsb3NlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmlwdHYtbGl2ZS13YXJuaW5nJykucmVtb3ZlKCk7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChsaXZlQ2hlY2tJbnRlcnZhbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignbW91c2Vkb3duJywgJy55dHAtbGl2ZS1iYWRnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5pcHR2LWxpdmUtd2FybmluZycpLnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxyXG4gKiBBZGRzIGRvbmF0ZSBidXR0b24gdG8gbGl2ZXN0cmVhbSBwYWdlLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZG9uYXRlQnV0dG9uKClcclxue1xyXG4gICAgJCgnLmlwdHYtZG9uYXRlLWJ1dHRvbi0wJykucmVtb3ZlKCk7XHJcblxyXG4gICAgY29uc3QgZG9uYXRlSWNvbiA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvaWNvbnMvZG9uYXRlLWljb24ucG5nJyk7XHJcbiAgICBjb25zdCBzcG9uc29ySWNvbiA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvaWNvbnMvc3BvbnNvci1pY29uLnBuZycpO1xyXG5cclxuICAgIGNvbnN0IHNwb25zb3JJbWFnZSA9IGA8aW1nIHNyYz1cIiR7c3BvbnNvckljb259XCIgYWx0PVwic3RhclwiIHN0eWxlPVwicG9pbnRlci1ldmVudHM6IG5vbmU7IGRpc3BsYXk6IGJsb2NrOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiPmA7XHJcblxyXG4gICAgY29uc3QgZG9uYXRlQnV0dG9uID0gYFxyXG4gICAgICAgIDxpcHR2LWRvbmF0ZS1idXR0b24gc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCIgcmFpc2VkPVwiXCIgc3VwcG9ydGVkLWNvbGQtbG9hZC1hY3Rpb25zPVwiWyZxdW90O3Nwb25zb3ImcXVvdDtdXCIgd2FpdC1mb3Itc2lnbmFsPVwid2F0Y2gtcGFnZS1pbml0aWFsaXplZFwiIGNsYXNzPVwic3R5bGUtc2NvcGUgeXRnLXdhdGNoLWZvb3RlciB4LXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvbi0wXCI+XHJcbiAgICAgICAgICAgIDxpcm9uLXNpZ25hbHMgY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b25cIj48L2lyb24tc2lnbmFscz5cclxuICAgICAgICAgICAgPHBhcGVyLWJ1dHRvbiBzdHlsZT1cImNvbG9yOiAjZmZmOyBiYWNrZ3JvdW5kLWNvbG9yOiAjMGY5ZDU4OyBtaW4td2lkdGg6IDA7XCIgY2xhc3M9XCJlbmFibGVkIHN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvbiB4LXNjb3BlIHBhcGVyLWJ1dHRvbi0wXCIgcm9sZT1cImJ1dHRvblwiIHRhYmluZGV4PVwiMFwiIGFuaW1hdGVkPVwiXCIgYXJpYS1kaXNhYmxlZD1cImZhbHNlXCIgZWxldmF0aW9uPVwiMVwiIHJhaXNlZD1cIlwiIGFyaWEtbGFiZWw9XCJEb25hdGUgdG8gSWNlX1Bvc2VpZG9uXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGF5b3V0IGhvcml6b250YWwgY2VudGVyLWp1c3RpZmllZCBzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDI0cHg7IGhlaWdodDogMjRweDtcIiBjbGFzcz1cImljb24tY29udGFpbmVyIGxheW91dCBob3Jpem9udGFsIGNlbnRlci1jZW50ZXIgc3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx5dC1pY29uIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uIHgtc2NvcGUgeXQtaWNvbi0wXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwveXQtaWNvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxpcHR2LWZvcm1hdHRlZC1zdHJpbmcgaWQ9XCJ0ZXh0XCIgY2xhc3M9XCJsYXlvdXQgaG9yaXpvbnRhbCBjZW50ZXItY2VudGVyIHN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvblwiIHN0eWxlPVwibWFyZ2luOiAwIDNweFwiPjxzcGFuIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1mb3JtYXR0ZWQtc3RyaW5nXCI+RE9OQVRFPC9zcGFuPjwvaXB0di1mb3JtYXR0ZWQtc3RyaW5nPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvcGFwZXItYnV0dG9uPlxyXG4gICAgICAgIDwvaXB0di1kb25hdGUtYnV0dG9uPmA7XHJcblxyXG4gICAgY29uc3QgZG9uYXRlSW1hZ2UgPSBgPGltZyBzcmM9XCIke2RvbmF0ZUljb259XCIgYWx0PVwiZG9sbGFyLXNpZ25cIiBzdHlsZT1cInBvaW50ZXItZXZlbnRzOiBub25lOyBkaXNwbGF5OiBibG9jazsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTtcIj5gO1xyXG5cclxuICAgIC8vIEluc2VydCBkb25hdGVCdXR0b24gbmV4dCB0byBzcG9uc29yQnV0dG9uXHJcbiAgICBjb25zdCBzcG9uc29yQnV0dG9uID0gJy5zdHlsZS1zY29wZS55dGctd2F0Y2gtZm9vdGVyLngtc2NvcGUueXRnLW1lbWJlcnNoaXAtb2ZmZXItYnV0dG9uLTAnO1xyXG5cclxuICAgICQoc3BvbnNvckJ1dHRvbikuYmVmb3JlKGRvbmF0ZUJ1dHRvbik7XHJcbiAgICAkKGRvbmF0ZUJ1dHRvbikucmVhZHkoIGZ1bmN0aW9uKCkgeyAkKCcuc3R5bGUtc2NvcGUuaXB0di1kb25hdGUtYnV0dG9uLngtc2NvcGUueXQtaWNvbi0wJykuaHRtbChkb25hdGVJbWFnZSk7IH0pO1xyXG5cclxuICAgICQoJy5zdHlsZS1zY29wZS55dGctd2F0Y2gtZm9vdGVyLngtc2NvcGUuaXB0di1kb25hdGUtYnV0dG9uLTAnKS5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgd2luZG93Lm9wZW4oJ2h0dHBzOi8veW91dHViZS5zdHJlYW1sYWJzLmNvbS9pY2Vwb3NlaWRvbiMvJywgJ19ibGFuaycpO1xyXG4gICAgICAgICQoJy5zdHlsZS1zY29wZS55dGctd2F0Y2gtZm9vdGVyLngtc2NvcGUuaXB0di1kb25hdGUtYnV0dG9uLTAgcGFwZXItYnV0dG9uJylbMF0uYmx1cigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ2hhbmdlIHNwb25zb3JCdXR0b24gaWNvbiB0byBzdGFyXHJcbiAgICAkKGAke3Nwb25zb3JCdXR0b259IC5zdHlsZS1zY29wZS55dGctbWVtYmVyc2hpcC1vZmZlci1idXR0b24ueC1zY29wZS55dC1pY29uLTBgKS5odG1sKHNwb25zb3JJbWFnZSk7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vb3ZlcmxheS9kb25hdGVCdXR0b24uanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiAqIFNob3cgZW1vdGUgbG9hZGluZyBpbmZvcm1hdGlvbi5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRpbmdFbW90ZXNJbmZvKClcclxue1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgJChkaXYpLnRleHQoJ0xvYWRpbmcgZW1vdGVzLi4uJyk7XHJcblxyXG4gICAgJChkaXYpLmNzcyh7XHJcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxNnB4JyxcclxuICAgICAgICAncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICdyaWdodCc6ICcyNXB4JyxcclxuICAgICAgICAnYm90dG9tJzogJzc1cHgnLFxyXG4gICAgICAgICdjb2xvcic6ICcjZmZmJyxcclxuICAgICAgICAndGV4dC1zaGFkb3cnOiAnMnB4IDJweCAycHggcmdiYSgwLDAsMCwwLjc1KSdcclxuICAgIH0pO1xyXG5cclxuICAgICQoZGl2KS5hZGRDbGFzcygnaXB0di1sb2FkaW5nLWVtb3RlcycpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L2xvYWRpbmdFbW90ZXNJbmZvLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9