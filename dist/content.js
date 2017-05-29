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
                if(savePos == 0 && endStr != "") return; // Prevent doubletabs
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjg5ZmQ2YzU1NTVlNDNlYTFmNTgiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9lbW90ZS5qcyIsIndlYnBhY2s6Ly8vLi91dGlsLmpzIiwid2VicGFjazovLy8uL2Vtb3RlQXV0b0NvbXBsZXRlLmpzIiwid2VicGFjazovLy8uL3BhZ2VDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0T2JzZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbWVudGlvbkhpZ2hsaWdodC5qcyIsIndlYnBhY2s6Ly8vLi9vdmVybGF5L2Fsd2F5c1Njcm9sbERvd24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlLmpzIiwid2VicGFjazovLy8uL292ZXJsYXkvZG9uYXRlQnV0dG9uLmpzIiwid2VicGFjazovLy8uL292ZXJsYXkvbG9hZGluZ0Vtb3Rlc0luZm8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2hFQTtBQUNBO0FBQ0E7QUFDaUI7O0FBRWpCO0FBQ0E7QUFDQSx5Rjs7OztBQUFBO0FBQUE7QUFBQTs7QUFFQTs7QUFFQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQSw4QkFBOEIsc0RBQXNEO0FBQ3BGLENBQUM7O0FBRUQ7O0FBRUE7O0FBRUE7QUFDQSwrRkFBK0YsWUFBWSxhQUFhLG1CQUFtQixvQkFBb0IsRUFBRSwrREFBK0QsMEJBQTBCLEVBQUUsMERBQTBELDBCQUEwQixFQUFFO0FBQ2xWOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUZBQW1GLGlDQUFpQyxvQ0FBb0MsRUFBRTtBQUMxSjs7QUFFQTtBQUNBLHNKQUFzSixpQkFBaUIsMEZBQTBGLGtDQUFrQyxFQUFFLHFIQUFxSCxrQ0FBa0MsRUFBRSw2REFBNkQsY0FBYztBQUN6Z0I7O0FBRUE7QUFDQSxxSEFBcUgsbURBQW1ELDZCQUE2QixFQUFFO0FBQ3ZNOztBQUVBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7QUNsRW9CO0FBQ2U7QUFDcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhOztBQUViLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7O0FBRWIsMkJBQTJCLHdCQUF3Qjs7QUFFbkQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLEtBQUs7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0Isb0JBQW9CO0FBQzVDLHdCQUF3QixvQkFBb0I7QUFDNUMsd0JBQXdCLG9CQUFvQjtBQUM1Qyx3QkFBd0Isb0JBQW9CO0FBQzVDLDJCQUEyQixvQkFBb0I7QUFDL0MsMkJBQTJCLG9CQUFvQjtBQUMvQyxpQ0FBaUMscUJBQXFCO0FBQ3RELDJCQUEyQixxQkFBcUI7QUFDaEQsNkJBQTZCLHFCQUFxQjtBQUNsRCw0QkFBNEIscUJBQXFCO0FBQ2pELHlCQUF5QixvQkFBb0I7QUFDN0MsMkJBQTJCLHFCQUFxQjtBQUNoRCwyQkFBMkIsb0JBQW9CO0FBQy9DLDRCQUE0QixvQkFBb0I7QUFDaEQsMEJBQTBCLHFCQUFxQjtBQUMvQywwQkFBMEIsb0JBQW9CO0FBQzlDLDRCQUE0QixxQkFBcUI7QUFDakQsd0JBQXdCLHFCQUFxQjtBQUM3QywyQkFBMkIsb0JBQW9CO0FBQy9DLDBCQUEwQixxQkFBcUI7QUFDL0MsNEJBQTRCLG9CQUFvQjtBQUNoRCwyQkFBMkIscUJBQXFCO0FBQ2hELDJCQUEyQixxQkFBcUI7QUFDaEQsNEJBQTRCLHFCQUFxQjtBQUNqRCx3QkFBd0Isb0JBQW9CO0FBQzVDLDRCQUE0QixxQkFBcUI7QUFDakQsZ0NBQWdDLHFCQUFxQjtBQUNyRCwwQkFBMEIscUJBQXFCO0FBQy9DLDBCQUEwQixvQkFBb0I7QUFDOUMsNEJBQTRCLHFCQUFxQjtBQUNqRCwwQkFBMEIsb0JBQW9CO0FBQzlDLDBCQUEwQixxQkFBcUI7QUFDL0MsMkJBQTJCLG9CQUFvQjtBQUMvQyw0QkFBNEIsb0JBQW9CO0FBQ2hELDZCQUE2QixvQkFBb0I7QUFDakQsNkJBQTZCLHFCQUFxQjtBQUNsRCwwQkFBMEIscUJBQXFCO0FBQy9DLDBCQUEwQjtBQUMxQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQ3RiQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1FQUFtRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLHVDQUF1Qzs7QUFFdkM7QUFDQSxzRUFBc0U7QUFDdEU7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQyx1QkFBdUIsT0FBTztBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxPQUFPLE9BQU87QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0EsaUVBQWlFO0FBQ2pFLGdGQUFnRjtBQUNoRjtBQUNBLHdEQUF3RDtBQUN4RCxtREFBbUQ7QUFDbkQsNERBQTREO0FBQzVEOztBQUVBOztBQUVBLG9EQUFvRDtBQUNwRCw2RUFBNkU7QUFDN0U7O0FBRUEsMElBQTBJO0FBQzFJO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFBQTtBQUFBLEM7Ozs7Ozs7Ozs7Ozs7QUNySkE7QUFDa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOztBQUVBOzs7Ozs7Ozs7OztBQ25FQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNqRGtCOztBQUVsQjtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVLQUFnSTs7QUFFaEk7QUFDQTs7QUFFQSxpSUFBaUk7QUFDakk7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDcEJrRDs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBLDBGQUEwRjtBQUMxRiw0QkFBNEIsMERBQW1CO0FBQy9DO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEIsd0NBQXdDO0FBQ3RFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQyw0Q0FBNEM7QUFDakY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7O0FBRUE7Ozs7Ozs7O0FDdktBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7O0FDakNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsc0NBQXNDLFlBQVkseUNBQXlDLGdCQUFnQixhQUFhLGNBQWM7O0FBRXRJO0FBQ0EseURBQXlELGdEQUFnRCxhQUFhO0FBQ3RIO0FBQ0EsNkNBQTZDLDJCQUEyQixjQUFjO0FBQ3RGO0FBQ0EsNENBQTRDLGNBQWM7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDLFdBQVcsZ0RBQWdELGdCQUFnQixhQUFhLGNBQWM7O0FBRTNJO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUMsMEVBQTBFLEVBQUU7O0FBRW5IO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxTQUFTLGNBQWM7QUFDdkI7Ozs7Ozs7O0FDekNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBIiwiZmlsZSI6ImNvbnRlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDI4OWZkNmM1NTU1ZTQzZWExZjU4IiwiaW1wb3J0IEVtb3RlIGZyb20gJy4vZW1vdGUnO1xuaW1wb3J0IFBhZ2VDaGVjayBmcm9tICcuL3BhZ2VDaGVjayc7XG5pbXBvcnQgZW1vdGVBdXRvQ29tcGxldGUgZnJvbSAnLi9lbW90ZUF1dG9Db21wbGV0ZSc7XG5pbXBvcnQgeyBpc05vZGUgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgY29uc3QgRElTQUxMT1dFRF9DSEFSUyA9IFsnXFxcXCcsICc6JywgJy8nLCAnJicsIFwiJ1wiLCAnXCInLCAnPycsICchJywgJyMnXSxcbiAgICAgICAgICAgICBTQ1JPTExfRU5BQkxFRF9VUkwgPSAgY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJ2ljb25zL3Njcm9sbC1lbmFibGVkLnBuZycpLFxuICAgICAgICAgICAgIFNDUk9MTF9ESVNBQkxFRF9VUkwgPSAgY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJ2ljb25zL3Njcm9sbC1kaXNhYmxlZC5wbmcnKTtcblxuZXhwb3J0IGxldCBvcHRpb25zID0gbnVsbDtcblxuY29uc3Qgb25OZXdQYWdlTG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgJCgnW2NsYXNzXj1cImlwdHYtXCJdJykucmVtb3ZlKCk7XG5cblxuICAgIGlmIChvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnNbJ3JlZGlyZWN0VG9ZVEdhbWluZyddID09PSB0cnVlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoUGFnZUNoZWNrLnlvdXR1YmVHYW1pbmcsIDI1MDApO1xuICAgIH1cbiAgICBlbW90ZUF1dG9Db21wbGV0ZS5lbW90ZVRhYkNvbXBsZXRlKCk7XG4gICAgUGFnZUNoZWNrLmxpdmVzdHJlYW1QYWdlKCk7XG59O1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkID4gdGl0bGUnKTtcblxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24obXV0YXRpb25zKSB7XG4gICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG11dGF0aW9uKSB7XG4gICAgICAgICAgICBvbk5ld1BhZ2VMb2FkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaWYgKCFpc05vZGUodGFyZ2V0KSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIHsgc3VidHJlZTogdHJ1ZSwgY2hhcmFjdGVyRGF0YTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlIH0pO1xufSgpKTtcblxuY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoJ3JlcXVlc3RMb2NhbHN0b3JhZ2UnLCBmdW5jdGlvbihyZXNwb25zZSkge1xuXG4gICAgb3B0aW9ucyA9IHJlc3BvbnNlO1xuXG4gICAgaWYgKG9wdGlvbnNbJ2Rpc2FibGVBdmF0YXJzJ10pIHtcbiAgICAgICAgJCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPi5zdHlsZS1zY29wZSAueXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlciAjYXV0aG9yLXBob3RvIHsgd2lkdGg6IDBweDsgaGVpZ2h0OiAwcHg7IG1hcmdpbi1yaWdodDogMHB4OyB2aXNpYmlsaXR5OiBoaWRkZW47IH0uc3R5bGUtc2NvcGUueXQtbGl2ZS1jaGF0LW1lc3NhZ2UtaW5wdXQtcmVuZGVyZXIubm8tdHJhbnNpdGlvbnsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9LnN0eWxlLXNjb3BlIHl0LWxpdmUtY2hhdC1tZXNzYWdlLWlucHV0LXJlbmRlcmVyICNhdmF0YXIgeyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnNbJ2VuYWJsZUNoYXRDb2xvcnMnXSkge1xuICAgICAgICBjb25zdCBhID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJ2V4dGVybmFsL2NoYXQtY29sb3JzLmNzcycpO1xuICAgICAgICAkKCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIicgKyBhICsgJ1wiID4nKS5hcHBlbmRUbygnaGVhZCcpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zWydlbmFibGVTcGxpdENoYXQnXSkge1xuICAgICAgICAkKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+LnN0eWxlLXNjb3BlIHl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBib3JkZXItdG9wOiAwLjVweCBzb2xpZCAjMzMzMzMzOyBib3JkZXItYm90dG9tOiAwLjVweCBzb2xpZCAjMDAwMDAwOyB9PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpO1xuICAgIH1cblxuICAgIGlmKG9wdGlvbnNbJ3Nob3dEZWxldGVkTWVzc2FnZXMnXSkge1xuICAgICAgICAkKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+Lnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMFtpcy1kZWxldGVkXTpub3QoW3Nob3ctb3JpZ2luYWxdKSAjbWVzc2FnZS55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHtkaXNwbGF5OiBpbmxpbmU7fSAueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wICNkZWxldGVkLXN0YXRlLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KTsgfSAueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wW2lzLWRlbGV0ZWRdOm5vdChbc2hvdy1vcmlnaW5hbF0pICNtZXNzYWdlLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KTsgfSAueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wICNkZWxldGVkLXN0YXRlOmJlZm9yZXtjb250ZW50OiBcIiAgXCJ9PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpO1xuICAgIH1cblxuICAgIGlmKG9wdGlvbnNbJ21lbnRpb25IaWdobGlnaHQnXSkge1xuICAgICAgICAkKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+Lnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMCAubWVudGlvbi55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHsgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMTQsIDE1LCAxNSwgMCkgIWltcG9ydGFudDsgcGFkZGluZzogMHB4IDBweCAhaW1wb3J0YW50OyB9PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpO1xuICAgIH1cblxuICAgIG9uTmV3UGFnZUxvYWQoKTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHJlcGxhY2VBbGwgfSBmcm9tICcuL3V0aWwnO1xyXG5pbXBvcnQgeyBvcHRpb25zLCBESVNBTExPV0VEX0NIQVJTIH0gZnJvbSAnLi9tYWluJztcclxuaW1wb3J0IGxvYWRpbmdFbW90ZXNJbmZvIGZyb20gJy4vb3ZlcmxheS9sb2FkaW5nRW1vdGVzSW5mbyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbW90ZVxyXG57XHJcbiAgICAvKipcclxuICAgICAqIExvYWQgYWxsIGVuYWJsZWQgZW1vdGVzLlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb2FkRW1vdGVzKClcclxuICAgIHtcclxuICAgICAgICBsb2FkaW5nRW1vdGVzSW5mbygpO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgJGxvYWRpbmcgPSAkKCcuaXB0di1sb2FkaW5nLWVtb3RlcycpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRsb2FkaW5nWzBdKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJGxvYWRpbmcuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAnY29sb3InOiAnI2MwMzkyYicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAnIzI4MjgyOCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3JpZ2h0JzogJzE5cHgnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkbG9hZGluZy50ZXh0KCdGYWlsZWQgbG9hZGluZyBzb21lIGVtb3RlcyAoQVBJIHNlcnZlcnMgZG93biknKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQoJy5pcHR2LWxvYWRpbmctZW1vdGVzJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0sIDcuNSAqIDEwMDApO1xyXG5cclxuICAgICAgICB9LCAxMCAqIDEwMDApO1xyXG5cclxuICAgICAgICBpZiAob3B0aW9uc1snZW1vdGVzVHdpdGNoJ10pIEVtb3RlLmxvYWRUd2l0Y2hFbW90ZXMoKTtcclxuICAgICAgICBpZiAob3B0aW9uc1snZW1vdGVzU3ViJ10pIEVtb3RlLmxvYWRTdWJFbW90ZXMoKTtcclxuICAgICAgICBpZiAob3B0aW9uc1snZW1vdGVzSWNlJ10pIEVtb3RlLmxvYWRJY2VFbW90ZXMoKTtcclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnNbJ2Vtb3Rlc0JUVFYnXSkge1xyXG4gICAgICAgICAgICBFbW90ZS5sb2FkQlRUVkVtb3RlcygpO1xyXG4gICAgICAgICAgICBFbW90ZS5sb2FkQlRUVkNoYW5uZWxFbW90ZXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEVtb3RlLndhaXRUaWxsRW1vdGVzTG9hZGVkKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0VGltZW91dCB0aGF0IGtlZXBzIHJ1bm5pbmcgdW50aWwgYWxsIGVtb3RlcyBhcmUgbG9hZGVkLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgd2FpdFRpbGxFbW90ZXNMb2FkZWQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICgob3B0aW9uc1snZW1vdGVzVHdpdGNoJ10gIT09IEVtb3RlLnN0YXRlc1sndHdpdGNoJ10ubG9hZGVkKSB8fFxyXG4gICAgICAgICAgICAob3B0aW9uc1snZW1vdGVzU3ViJ10gIT09IEVtb3RlLnN0YXRlc1snc3ViJ10ubG9hZGVkKSB8fFxyXG4gICAgICAgICAgICAob3B0aW9uc1snZW1vdGVzQlRUViddICE9PSBFbW90ZS5zdGF0ZXNbJ0JUVFYnXS5sb2FkZWQpIHx8XHJcbiAgICAgICAgICAgIChvcHRpb25zWydlbW90ZXNCVFRWJ10gIT09IEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkKSkge1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dChFbW90ZS53YWl0VGlsbEVtb3Rlc0xvYWRlZCwgMjUwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGVtcCBmaXggdG8gcHJldmVudCByYW0gZnJvbSBmaWxsaW5nIHVwIHdpdGggbWVzc2FnZXMuXHJcbiAgICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBFbW90ZS5tZXNzYWdlcyA9IHt9O1xyXG4gICAgICAgIH0sIDEwMDAgKiA2MCAqIDUpO1xyXG5cclxuICAgICAgICAkKCcuaXB0di1sb2FkaW5nLWVtb3RlcycpLnJlbW92ZSgpO1xyXG4gICAgICAgIEVtb3RlLnJlcGxhY2VFeGlzdGluZ0Vtb3RlcygpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlcGxhY2UgZXhpc3RpbmcgdGV4dCB3aXRoIGVtb3RlcyBpbiBjaGF0LCBoYXBwZW5zIHdoZW4gZW1vdGVzIGFyZSBkb25lIGxvYWRpbmcuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZXBsYWNlRXhpc3RpbmdFbW90ZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGNoYXRFbGVtZW50cyA9ICQoJy5zdHlsZS1zY29wZS55dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyLngtc2NvcGUueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wJyk7XHJcblxyXG4gICAgICAgIGlmIChjaGF0RWxlbWVudHMubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KEVtb3RlLnJlcGxhY2VFeGlzdGluZ0Vtb3RlcywgMjUwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2hhdEVsZW1lbnRzLmVhY2goZnVuY3Rpb24gKGksIGVsKSB7XHJcbiAgICAgICAgICAgIEVtb3RlLmVtb3RlQ2hlY2soZWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiBhIG1lc3NhZ2UgY29udGFpbnMgZW1vdGVzLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtub2RlfSBub2RlIC0gTWVzc2FnZSBub2RlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBlbW90ZUNoZWNrKG5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgJG1lc3NhZ2UgPSAkKG5vZGUpLmZpbmQoJyNtZXNzYWdlJyk7XHJcbiAgICAgICAgRW1vdGUua2FwcGFDaGVjaygkbWVzc2FnZSk7XHJcblxyXG4gICAgICAgIGxldCBvbGRIVE1MID0gJG1lc3NhZ2UuaHRtbCgpLnRyaW0oKTtcclxuICAgICAgICBsZXQgbXNnSFRNTCA9IG9sZEhUTUw7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgRW1vdGUubWVzc2FnZXNbbXNnSFRNTF0gPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHdvcmRzID0gbXNnSFRNTC5yZXBsYWNlKCcvXFx4RUZcXHhCQlxceEJGLycsICcnKS5yZXBsYWNlKCfvu78nLCAnJykuc3BsaXQoJyAnKTtcclxuICAgICAgICAgICAgY29uc3QgdW5pcXVlV29yZHMgPSBbXTtcclxuICAgICAgICAgICAgbGV0IGVtb3RlQ291bnQgPSAwO1xyXG5cclxuICAgICAgICAgICAgJC5lYWNoKHdvcmRzLCBmdW5jdGlvbiAoaSwgZWwpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkLmluQXJyYXkoZWwsIHVuaXF1ZVdvcmRzKSA9PT0gLTEpIHVuaXF1ZVdvcmRzLnB1c2goZWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdW5pcXVlV29yZHMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB3b3JkID0gdW5pcXVlV29yZHNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBFbW90ZS5lbW90ZXNbd29yZF0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZW1vdGVDb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHdvcmQpO1xyXG4gICAgICAgICAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKCdoaW50LS10b3AnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICAgICAgICAgIGltZy5zcmMgPSBFbW90ZS5lbW90ZXNbd29yZF1bJ3VybCddO1xyXG4gICAgICAgICAgICAgICAgaW1nLmFsdCA9IHdvcmQ7XHJcbiAgICAgICAgICAgICAgICBpbWcuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xyXG4gICAgICAgICAgICAgICAgaW1nLnN0eWxlLndpZHRoID0gJ2F1dG8nO1xyXG4gICAgICAgICAgICAgICAgaW1nLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gICAgICAgICAgICAgICAgc3Bhbi5hcHBlbmRDaGlsZChpbWcpO1xyXG5cclxuICAgICAgICAgICAgICAgIG1zZ0hUTUwgPSByZXBsYWNlQWxsKG1zZ0hUTUwsIHdvcmQsIHNwYW4ub3V0ZXJIVE1MKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGVtb3RlQ291bnQgPCAxKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAkbWVzc2FnZS5odG1sKG1zZ0hUTUwpO1xyXG4gICAgICAgICAgICBFbW90ZS5tZXNzYWdlc1tvbGRIVE1MLnJlcGxhY2UoL1xccy9nLCcnKV0gPSBtc2dIVE1MO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkbWVzc2FnZS5odG1sKEVtb3RlLm1lc3NhZ2VzW29sZEhUTUxdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRtZXNzYWdlLnBhcmVudCgpLnBhcmVudCgpLmJpbmQoJ0RPTVN1YnRyZWVNb2RpZmllZCcsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0ICRtZXNzYWdlID0gJCh0aGlzKS5maW5kKCcjbWVzc2FnZScpO1xyXG4gICAgICAgICAgICBFbW90ZS5rYXBwYUNoZWNrKCRtZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBodG1sID0gJG1lc3NhZ2UuaHRtbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgaHRtbCA9IGh0bWwucmVwbGFjZSgnL1xceEVGXFx4QkJcXHhCRi8nLCAnJykucmVwbGFjZSgn77u/JywgJycpLnJlcGxhY2UoL1xccy9nLCcnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgRW1vdGUubWVzc2FnZXNbaHRtbF0gIT09ICd1bmRlZmluZWQnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGh0bWwgPT0gRW1vdGUubWVzc2FnZXNbaHRtbF0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJG1lc3NhZ2UuaHRtbChFbW90ZS5tZXNzYWdlc1todG1sXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgYSBtZXNzYWdlIGNvbnRhaW5zIGEga2FwcGEgZW1vdGUuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge25vZGV9IG1zZyAtIE1lc3NhZ2Ugbm9kZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMga2FwcGFDaGVjayhtc2cpXHJcbiAgICB7XHJcbiAgICAgICAgJCgnaW1nJywgbXNnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgJGltZyA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoL1xcdWQ4M2NcXHVkZjFkL2cudGVzdCgkaW1nLmF0dHIoJ2FsdCcpKSkge1xyXG4gICAgICAgICAgICAgICAgJGltZy5yZXBsYWNlV2l0aChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnS2FwcGEnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIFR3aXRjaCBlbW90ZXMuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb2FkVHdpdGNoRW1vdGVzKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbignR0VUJywgJ2h0dHBzOi8vdHdpdGNoZW1vdGVzLmNvbS9hcGlfY2FjaGUvdjIvZ2xvYmFsLmpzb24nKTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgICAgIGNvbnN0IHVybFRlbXBsYXRlID0gJy8vc3RhdGljLWNkbi5qdHZudy5uZXQvZW1vdGljb25zL3YxLyc7XHJcblxyXG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWyd0d2l0Y2gnXS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBlbW90ZURpYyA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dClbJ2Vtb3RlcyddO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCBlbW90ZSBpbiBlbW90ZURpYykge1xyXG5cclxuICAgICAgICAgICAgICAgIEVtb3RlLmVtb3Rlc1tlbW90ZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmxUZW1wbGF0ZSArIGVtb3RlRGljW2Vtb3RlXVsnaW1hZ2VfaWQnXSArICcvJyArICcxLjAnXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ3R3aXRjaCddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgVHdpdGNoIHN1YnNjcmliZXIgZW1vdGVzLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbG9hZFN1YkVtb3RlcygpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsICdodHRwczovL3R3aXRjaGVtb3Rlcy5jb20vYXBpX2NhY2hlL3YyL3N1YnNjcmliZXIuanNvbicpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgICAgY29uc3QgdXJsVGVtcGxhdGUgPSAnLy9zdGF0aWMtY2RuLmp0dm53Lm5ldC9lbW90aWNvbnMvdjEvJztcclxuXHJcbiAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ3N1YiddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGVtb3RlRGljID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KVsnY2hhbm5lbHMnXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2hhbm5lbCBpbiBlbW90ZURpYykge1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaSBpbiBlbW90ZURpY1tjaGFubmVsXVsnZW1vdGVzJ10pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGljdCA9IGVtb3RlRGljW2NoYW5uZWxdWydlbW90ZXMnXVtpXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2RlID0gZGljdFsnY29kZSddO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoRW1vdGUuaXNWYWxpZEVtb3RlKGNvZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVtb3RlLmVtb3Rlc1tjb2RlXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsVGVtcGxhdGUgKyBkaWN0WydpbWFnZV9pZCddICsgJy8nICsgJzEuMCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snc3ViJ10ubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCBCVFRWIGVtb3Rlcy5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxvYWRCVFRWRW1vdGVzKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbignR0VUJywgJ2h0dHBzOi8vYXBpLmJldHRlcnR0di5uZXQvMi9lbW90ZXMnKTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgICAgIGNvbnN0IHVybFRlbXBsYXRlID0gJy8vY2RuLmJldHRlcnR0di5uZXQvZW1vdGUvJztcclxuXHJcbiAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFYnXS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBlbW90ZUxpc3QgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpWydlbW90ZXMnXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaSBpbiBlbW90ZUxpc3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaWN0ID0gZW1vdGVMaXN0W2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghRW1vdGUuY29udGFpbnNEaXNhbGxvd2VkQ2hhcihkaWN0Wydjb2RlJ10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2RpY3RbJ2NvZGUnXV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsVGVtcGxhdGUgKyBkaWN0WydpZCddICsgJy8nICsgJzF4J1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUViddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgQlRUViBjaGFubmVsIGVtb3Rlcy5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxvYWRCVFRWQ2hhbm5lbEVtb3RlcygpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgY2hhbm5lbHMgPSBvcHRpb25zWydCVFRWQ2hhbm5lbHMnXTtcclxuICAgICAgICBjb25zdCBjb21tYUNoYW5uZWxzID0gY2hhbm5lbHMucmVwbGFjZSgvXFxzKy9nLCAnJykuc3BsaXQoJywnKTtcclxuXHJcbiAgICAgICAgY29tbWFDaGFubmVscy5mb3JFYWNoKGZ1bmN0aW9uIChjaGFubmVsKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgeGhyLm9wZW4oJ0dFVCcsICdodHRwczovL2FwaS5iZXR0ZXJ0dHYubmV0LzIvY2hhbm5lbHMvJyArIGNoYW5uZWwpO1xyXG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgICAgICAgICBjb25zdCB1cmxUZW1wbGF0ZSA9ICcvL2Nkbi5iZXR0ZXJ0dHYubmV0L2Vtb3RlLyc7XHJcblxyXG4gICAgICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWRDb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50ID49IGNvbW1hQ2hhbm5lbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGVtb3RlTGlzdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dClbJ2Vtb3RlcyddO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaSBpbiBlbW90ZUxpc3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGljdCA9IGVtb3RlTGlzdFtpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFFbW90ZS5jb250YWluc0Rpc2FsbG93ZWRDaGFyKGRpY3RbJ2NvZGUnXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2RpY3RbJ2NvZGUnXV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHVybFRlbXBsYXRlICsgZGljdFsnaWQnXSArICcvJyArICcxeCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsOiBjaGFubmVsICsgJyAoYnR0diknXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkQ291bnQrKztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWRDb3VudCA+PSBjb21tYUNoYW5uZWxzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgSWNlJ3Mgb2xkIHN1YnNjcmliZXIgZW1vdGVzLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbG9hZEljZUVtb3RlcygpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgdXJsVGVtcGxhdGUgPSAnaHR0cHM6Ly9zdGF0aWMtY2RuLmp0dm53Lm5ldC9lbW90aWNvbnMvdjEvJztcclxuXHJcbiAgICAgICAgY29uc3QgaWNlRW1vdGVzID0ge1xyXG4gICAgICAgICAgICBcInB1cnBsZTFcIjogeyBcImltYWdlX2lkXCI6IDk2ODczIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlMlwiOiB7IFwiaW1hZ2VfaWRcIjogOTY4NzQgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGUzXCI6IHsgXCJpbWFnZV9pZFwiOiA5Njg3NSB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZTRcIjogeyBcImltYWdlX2lkXCI6IDk2ODc2IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlQXJtMVwiOiB7IFwiaW1hZ2VfaWRcIjogODQ2ODcgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVBcm0yXCI6IHsgXCJpbWFnZV9pZFwiOiA4NDUzMyB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUJsdWVzY3JlZW5cIjogeyBcImltYWdlX2lkXCI6IDE1NzQxNSB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUJydWhcIjogeyBcImltYWdlX2lkXCI6IDEzMjg5MyB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUNpZ3JpcFwiOiB7IFwiaW1hZ2VfaWRcIjogMTYxODI4IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlQ3JlZXBcIjogeyBcImltYWdlX2lkXCI6IDE1MzYyMCB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUN4XCI6IHsgXCJpbWFnZV9pZFwiOiA5MTg3NiB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUVuemFcIjogeyBcImltYWdlX2lkXCI6IDEwNTQ0NCB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUZha2VcIjogeyBcImltYWdlX2lkXCI6IDkxODc0IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlRnJhbmtcIjogeyBcImltYWdlX2lkXCI6IDc2NjQwIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlSHVoXCI6IHsgXCJpbWFnZV9pZFwiOiAxMzMyODYgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVJY2VcIjogeyBcImltYWdlX2lkXCI6IDgwMjE1IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlS0tvbmFcIjogeyBcImltYWdlX2lkXCI6IDEyMTc3MSB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZU1cIjogeyBcImltYWdlX2lkXCI6IDEyMTc3MiB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZU5vc2VcIjogeyBcImltYWdlX2lkXCI6IDY1MTUyIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlT21nXCI6IHsgXCJpbWFnZV9pZFwiOiAxNjA0NjIgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVQcmlkZVwiOiB7IFwiaW1hZ2VfaWRcIjogNjI1NjAgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVSb2ZsXCI6IHsgXCJpbWFnZV9pZFwiOiAxMjE0OTUgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVUYWNvXCI6IHsgXCJpbWFnZV9pZFwiOiAxMzI3MjYgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVUaGlua1wiOiB7IFwiaW1hZ2VfaWRcIjogMTIxNzcwIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlV1wiOiB7IFwiaW1hZ2VfaWRcIjogNzA4MzggfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVDbGF1c1wiOiB7IFwiaW1hZ2VfaWRcIjogMTMyNzM3IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlQ29vbHN0b3J5XCI6IHsgXCJpbWFnZV9pZFwiOiAxNTM2MjEgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVEb2dcIjogeyBcImltYWdlX2lkXCI6IDEwNTIyOCB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUZyb1wiOiB7IFwiaW1hZ2VfaWRcIjogODY0NDQgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVLa29uYVwiOiB7IFwiaW1hZ2VfaWRcIjogMTIxNDk0IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlTGVvXCI6IHsgXCJpbWFnZV9pZFwiOiA3MzYzMiB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUxVTFwiOiB7IFwiaW1hZ2VfaWRcIjogMTI2NTExIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlUmVhbFwiOiB7IFwiaW1hZ2VfaWRcIjogOTE4NzMgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVUaHVtcFwiOiB7IFwiaW1hZ2VfaWRcIjogODY1MDEgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVUb25ndWVcIjogeyBcImltYWdlX2lkXCI6IDcwODM4IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlV2FsbnV0XCI6IHsgXCJpbWFnZV9pZFwiOiAxMDkwODQgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVXYXRcIjogeyBcImltYWdlX2lkXCI6IDEwNTIyOSB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZVd1dFwiOiB7IFwiaW1hZ2VfaWRcIjogMTMzODQ0IH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmb3IoY29uc3QgZW1vdGUgaW4gaWNlRW1vdGVzKSB7XHJcbiAgICAgICAgICAgIEVtb3RlLmVtb3Rlc1tlbW90ZV0gPSB7XHJcbiAgICAgICAgICAgICAgICB1cmw6IHVybFRlbXBsYXRlICsgaWNlRW1vdGVzW2Vtb3RlXVsnaW1hZ2VfaWQnXSArICcvJyArICcxLjAnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRleHQgaXMgYSB2YWxpZCBlbW90ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzVmFsaWRFbW90ZSh0ZXh0KVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAhKHRleHRbMF0ubWF0Y2goL1tBLVpdL2cpIHx8XHJcbiAgICAgICAgICAgIHRleHQubWF0Y2goL15bYS16XSskL2cpIHx8XHJcbiAgICAgICAgICAgIHRleHQubWF0Y2goL15cXGQqJC9nKVxyXG4gICAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRleHQgY29udGFpbnMgZGlzYWxsb3dlZCBjaGFyYWN0ZXJzLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHdvcmRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNvbnRhaW5zRGlzYWxsb3dlZENoYXIod29yZClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGMgaW4gRElTQUxMT1dFRF9DSEFSUykge1xyXG4gICAgICAgICAgICBpZiAod29yZC5pbmRleE9mKGMpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuRW1vdGUuc3RhdGVzID0ge1xyXG4gICAgdHdpdGNoOiB7XHJcbiAgICAgICAgbG9hZGVkOiBmYWxzZVxyXG4gICAgfSxcclxuICAgIHN1Yjoge1xyXG4gICAgICAgIGxvYWRlZDogZmFsc2VcclxuICAgIH0sXHJcbiAgICBCVFRWOiB7XHJcbiAgICAgICAgbG9hZGVkOiBmYWxzZVxyXG4gICAgfSxcclxuICAgIEJUVFZDaGFubmVsczoge1xyXG4gICAgICAgIGxvYWRlZDogZmFsc2UsXHJcbiAgICAgICAgbG9hZGVkQ291bnQ6IDBcclxuICAgIH1cclxufTtcclxuXHJcbkVtb3RlLmVtb3RlcyA9IHt9O1xyXG5FbW90ZS5tZXNzYWdlcyA9IHt9O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Vtb3RlLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBmdW5jdGlvbiByZXBsYWNlQWxsKHN0ciwgZmluZCwgcmVwbGFjZSkge1xyXG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoZmluZCwgJ2cnKSwgcmVwbGFjZSk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNOb2RlKG8pIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgdHlwZW9mIE5vZGUgPT09ICdvYmplY3QnID8gbyBpbnN0YW5jZW9mIE5vZGUgOiBvICYmIHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygby5ub2RlVHlwZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIG8ubm9kZU5hbWUgPT09ICdzdHJpbmcnXHJcbiAgICApO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3V0aWwuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgZW1vdGVBdXRvQ29tcGxldGVcclxue1xyXG4gICAgLyoqXHJcbiAgICAgKiBBdXRvY29tcGxldGUgZm9yIGVtb3Rlc1xyXG4gICAgICogIC1cclxuICAgICAqL1xyXG5cclxuXHJcbiAgICBzdGF0aWMgZ2V0Q2FyZXRQb3NpdGlvbihlZGl0YWJsZURpdikge1xyXG4gICAgICB2YXIgY2FyZXRQb3MgPSAwLFxyXG4gICAgICAgIHNlbCwgcmFuZ2U7XHJcbiAgICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XHJcbiAgICAgICAgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgIGlmIChzZWwucmFuZ2VDb3VudCkge1xyXG4gICAgICAgICAgcmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcclxuICAgICAgICAgIGlmIChyYW5nZS5jb21tb25BbmNlc3RvckNvbnRhaW5lci5wYXJlbnROb2RlID09IGVkaXRhYmxlRGl2KSB7XHJcbiAgICAgICAgICAgIGNhcmV0UG9zID0gcmFuZ2UuZW5kT2Zmc2V0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5zZWxlY3Rpb24gJiYgZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKSB7XHJcbiAgICAgICAgcmFuZ2UgPSBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcclxuICAgICAgICBpZiAocmFuZ2UucGFyZW50RWxlbWVudCgpID09IGVkaXRhYmxlRGl2KSB7XHJcbiAgICAgICAgICB2YXIgdGVtcEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgICBlZGl0YWJsZURpdi5pbnNlcnRCZWZvcmUodGVtcEVsLCBlZGl0YWJsZURpdi5maXJzdENoaWxkKTtcclxuICAgICAgICAgIHZhciB0ZW1wUmFuZ2UgPSByYW5nZS5kdXBsaWNhdGUoKTtcclxuICAgICAgICAgIHRlbXBSYW5nZS5tb3ZlVG9FbGVtZW50VGV4dCh0ZW1wRWwpO1xyXG4gICAgICAgICAgdGVtcFJhbmdlLnNldEVuZFBvaW50KFwiRW5kVG9FbmRcIiwgcmFuZ2UpO1xyXG4gICAgICAgICAgY2FyZXRQb3MgPSB0ZW1wUmFuZ2UudGV4dC5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjYXJldFBvcztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcGxhY2VDYXJldEF0RW5kKGVsKSB7XHJcbiAgICAgICAgZWwuZm9jdXMoKTtcclxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5nZXRTZWxlY3Rpb24gIT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlUmFuZ2UgIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG4gICAgICAgICAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMoZWwpO1xyXG4gICAgICAgICAgICByYW5nZS5jb2xsYXBzZShmYWxzZSk7XHJcbiAgICAgICAgICAgIHZhciBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcclxuICAgICAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC5ib2R5LmNyZWF0ZVRleHRSYW5nZSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0UmFuZ2UgPSBkb2N1bWVudC5ib2R5LmNyZWF0ZVRleHRSYW5nZSgpO1xyXG4gICAgICAgICAgICB0ZXh0UmFuZ2UubW92ZVRvRWxlbWVudFRleHQoZWwpO1xyXG4gICAgICAgICAgICB0ZXh0UmFuZ2UuY29sbGFwc2UoZmFsc2UpO1xyXG4gICAgICAgICAgICB0ZXh0UmFuZ2Uuc2VsZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRXb3JkKCkge1xyXG4gICAgICAgIHZhciBzZWwsIHdvcmQgPSBcIlwiO1xyXG4gICAgICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uICYmIChzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkpLm1vZGlmeSkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRSYW5nZSA9IHNlbC5nZXRSYW5nZUF0KDApO1xyXG4gICAgICAgICAgICBzZWwuY29sbGFwc2VUb1N0YXJ0KCk7XHJcbiAgICAgICAgICAgIHNlbC5tb2RpZnkoXCJtb3ZlXCIsIFwiYmFja3dhcmRcIiwgXCJ3b3JkXCIpO1xyXG4gICAgICAgICAgICBzZWwubW9kaWZ5KFwiZXh0ZW5kXCIsIFwiZm9yd2FyZFwiLCBcIndvcmRcIik7XHJcbiAgICAgICAgICAgIHdvcmQgPSBzZWwudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xyXG4gICAgICAgICAgICBzZWwuYWRkUmFuZ2Uoc2VsZWN0ZWRSYW5nZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICggKHNlbCA9IGRvY3VtZW50LnNlbGVjdGlvbikgJiYgc2VsLnR5cGUgIT0gXCJDb250cm9sXCIpIHtcclxuICAgICAgICAgICAgdmFyIHJhbmdlID0gc2VsLmNyZWF0ZVJhbmdlKCk7XHJcbiAgICAgICAgICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpO1xyXG4gICAgICAgICAgICByYW5nZS5leHBhbmQoXCJ3b3JkXCIpO1xyXG4gICAgICAgICAgICB3b3JkID0gcmFuZ2UudGV4dDtcclxuICAgICAgICAgICAgaW5kZXggPSBzdGFydE9mZlNldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHdvcmQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGVtb3RlVGFiQ29tcGxldGUoKSB7XHJcblxyXG4gICAgICAgIHZhciBmb3VuZEVtb3RlcyA9IFtdO1xyXG4gICAgICAgIHZhciBzdGF0ZSA9IC0xO1xyXG4gICAgICAgIHZhciBzYXZlUG9zID0gMDtcclxuICAgICAgICB2YXIgc3RhcnRTdHI7XHJcbiAgICAgICAgdmFyIGVuZFN0cjtcclxuXHJcbiAgICAgICAgY29uc3QgZW1vdGVBcnJheSA9IFsnNEhlYWQnLCAnQU1QVHJvcFB1bmNoJywgJ0FORUxFJywgJ0FyZ2llQjgnLCAnQXJpZ2F0b05hcycsICdBcnNvbk5vU2V4eScsICdBc2lhbkdsb3cnLCAnQmFieVJhZ2UnLCAnQmF0Q2hlc3QnLCAnQkNXYXJyaW9yJywgJ0JlZ1dhbicsICdCaWJsZVRodW1wJywgJ0JpZ0Jyb3RoZXInLCAnQmlnUGhpc2gnLCAnQmxhcmdOYXV0JywgJ2JsZWVkUHVycGxlJywgXHJcbiAgICAgICAgJ0JsZXNzUk5HJywgJ0Jsb29kVHJhaWwnLCAnQnJhaW5TbHVnJywgJ0Jyb2tlQmFjaycsICdCdWRkaGFCYXInLCAnQnVkU3RhcicsICdDYXJsU21pbGUnLCAnQ2hlZkZyYW5rJywgJ2Ntb25CcnVoJywgJ0Nvb2xDYXQnLCAnQ29vbFN0b3J5Qm9iJywgJ2NvcHlUaGlzJywgJ0NvcmdpRGVycCcsICdDcnJlYW1Bd2snLCAnQ3Vyc2VMaXQnLCAnREFFU3VwcHknLCAnRGFuc0dhbWUnLCAnRGF0U2hlZmZ5JywgXHJcbiAgICAgICAgJ0RCc3R5bGUnLCAnRGVuZGlGYWNlJywgJ0RvZ0ZhY2UnLCAnRG9yaXRvc0NoaXAnLCAnZHVEdWR1JywgJ0R4Q2F0JywgJ0VhZ2xlRXllJywgJ0VsZUdpZ2dsZScsICdGYWlsRmlzaCcsICdGcmFua2VyWicsICdGcmVha2luU3RpbmtpbicsICdGVU5naW5lZXInLCAnRnVuUnVuJywgJ0Z1dHVyZU1hbicsICdHaW5nZXJQb3dlcicsICdHaXZlUExaJywgJ0dPV1NrdWxsJywgJ0dyYW1tYXJLaW5nJywgXHJcbiAgICAgICAgJ0hhc3NhYW5DaG9wJywgJ0hhc3NhbkNob3AnLCAnSGV5R3V5cycsICdIb3RQb2trZXQnLCAnSHVtYmxlTGlmZScsICdpbUdsaXRjaCcsICdJbnV5b0ZhY2UnLCAnSXRzQm9zaHlUaW1lJywgJ0plYmFpdGVkJywgJ0pLYW5TdHlsZScsICdKb25DYXJuYWdlJywgJ0tBUE9XJywgJ0thcHBhJywgJ0thcHBhQ2xhdXMnLCAnS2FwcGFQcmlkZScsICdLYXBwYVJvc3MnLCAnS2FwcGFXZWFsdGgnLCAnS2FwcHUnLCBcclxuICAgICAgICAnS2VlcG8nLCAnS2V2aW5UdXJ0bGUnLCAnS2lwcGEnLCAnS29uQ2hhJywgJ0tyZXlnYXNtJywgJ01hdTUnLCAnbWNhVCcsICdNaWtlSG9ndScsICdNaW5nTGVlJywgJ01vcnBoaW5UaW1lJywgJ01yRGVzdHJ1Y3RvaWQnLCAnTVZHYW1lJywgJ05pbmphR3J1bXB5JywgJ05vbU5vbScsICdOb3RBVEsnLCAnTm90TGlrZVRoaXMnLCAnT2hNeURvZycsICdPbmVIYW5kJywgJ09waWVPUCcsICdPcHRpbWl6ZVByaW1lJywgXHJcbiAgICAgICAgJ09TYmxvYicsICdPU2Zyb2cnLCAnT1Nrb21vZG8nLCAnT1NzbG90aCcsICdwYW5pY0Jhc2tldCcsICdQYW5pY1ZpcycsICdQYXJ0eVRpbWUnLCAncGFzdGFUaGF0JywgJ1Blb3BsZXNDaGFtcCcsICdQZXJtYVNtdWcnLCAnUGljb01hdXNlJywgJ1BpcGVIeXBlJywgJ1BKU2FsdCcsICdQSlN1Z2FyJywgJ1BNU1R3aW4nLCAnUG9nQ2hhbXAnLCAnUG9vb291bmQnLCAnUHJhaXNlSXQnLCAnUFJDaGFzZScsIFxyXG4gICAgICAgICdQcmltZU1lJywgJ1B1bmNoVHJlZXMnLCAnUHVuT2tvJywgJ1JhY2NBdHRhY2snLCAnUmFscGhlclonLCAnUmVkQ29hdCcsICdSZXNpZGVudFNsZWVwZXInLCAncmlQZXBwZXJvbmlzJywgJ1JpdHpNaXR6JywgJ1JseVRobycsICdSdWxlRml2ZScsICdTYWJhUGluZycsICdTZWVtc0dvb2QnLCAnU2hhZHlMdWx1JywgJ1NoYXpCb3RzdGl4JywgJ1Ntb29jaGVyWicsICdTTU9yYycsICdTb0JheWVkJywgXHJcbiAgICAgICAgJ1Nvb25lckxhdGVyJywgJ1NQS0ZhY2UnLCAnU1BLV2F2ZScsICdTcXVpZDEnLCAnU3F1aWQyJywgJ1NxdWlkMycsICdTcXVpZDQnLCAnU1NTc3NzJywgJ1N0aW5reUNoZWVzZScsICdTdG9uZUxpZ2h0bmluZycsICdTdHJhd0JlYXJ5JywgJ1N1cGVyVmlubGluJywgJ1N3aWZ0UmFnZScsICdUYWtlTlJHJywgJ1RCQW5nZWwnLCAnVEJDaGVlc2VQdWxsJywgJ1RCVGFjb0xlZnQnLCAnVEJUYWNvUmlnaHQnLCBcclxuICAgICAgICAnVGVhckdsb3ZlJywgJ1RlaGVQZWxvJywgJ1RGMkpvaG4nLCAnVGhhbmtFZ2cnLCAnVGhlSWxsdW1pbmF0aScsICdUaGVSaW5nZXInLCAnVGhlVGFyRnUnLCAnVGhlVGhpbmcnLCAnVGh1bkJlYXN0JywgJ1RpbnlGYWNlJywgJ1Rvb1NwaWN5JywgJ1RyaUhhcmQnLCAnVFRvdXJzJywgJ1R3aXRjaExpdCcsICd0d2l0Y2hSYWlkJywgJ1R3aXRjaFJQRycsICdVbmNsZU5veCcsICdVblNhbmUnLCAnVVdvdCcsIFxyXG4gICAgICAgICdWb0hpWW8nLCAnVm90ZU5heScsICdWb3RlWWVhJywgJ1dob2xlV2hlYXQnLCAnV1RSdWNrJywgJ1d1dEZhY2UnLCAnWW91RG9udFNheScsICdZb3VXSFknLCAnT2hNeUdvb2RuZXNzJywgJ1BhbmNha2VNaXgnLCAnUGVkb0JlYXInLCAnUG9rZXJGYWNlJywgJ1JhZ2VGYWNlJywgJ1JlYmVjY2FCbGFjaycsICc6dGY6JywgJ2FQbGlTJywgJ0NpR3JpcCcsICdDSEFjY2VwdGVkJywgJ0Z1Y2tZZWEnLCBcclxuICAgICAgICAnRGF0U2F1Y2UnLCAnRm9yZXZlckFsb25lJywgJ0dhYmVOJywgJ0hhaWxIZWxpeCcsICdIZXJiUGVydmUnLCAnaURvZycsICdyU3RyaWtlJywgJ1Nob29wRGFXaG9vcCcsICdTd2VkU3dhZycsICdNJk1qYycsICdidHR2TmljZScsICdUb3BIYW0nLCAnVHdhVCcsICdXaGF0QVlvbGsnLCAnV2F0Q2h1U2F5JywgJ1NhdmFnZUplcmt5JywgJ0hIeWRybycsICdUYXhpQnJvJywgJ0Jyb0JhbHQnLCBcclxuICAgICAgICAnQnV0dGVyU2F1Y2UnLCAnQmFjb25FZmZlY3QnLCAnU3VjaEZyYXVkJywgJ0NhbmRpYW5SYWdlJywgXCJTaGUnbGxCZVJpZ2h0XCIsICdPaGhoS2VlJywgJ0Q6JywgJ1NleFBhbmRhJywgJyhwb29scGFydHkpJywgXCI6JyhcIiwgXCIocHVrZSlcIiwgJ2J0dHZXaW5rJywgJ2J0dHZBbmdyeScsICdidHR2Q29uZnVzZWQnLCAnYnR0dkNvb2wnLCAnYnR0dkhhcHB5JywgJ2J0dHZTYWQnLCAnYnR0dlNsZWVwJyxcclxuICAgICAgICAnYnR0dlN1cnByaXNlZCcsICdidHR2VG9uZ3VlJywgJ2J0dHZVbnN1cmUnLCAnYnR0dkdyaW4nLCAnYnR0dkhlYXJ0JywgJ2J0dHZUd2luaycsICdWaXNMYXVkJywgJ0thUmFwcGEnLCAnWWV0aVonLCAnbWluaUp1bGlhJywgJ3Nvc0dhbWUnLCAnQ3J1VycsICdSYXJlUGVwZScsICdpYW1zb2NhbCcsICdoYUhBQScsICdGZWVsc0JpcnRoZGF5TWFuJywgJ1JvblNtdWcnLCAnS2FwcGFDb29sJywgXHJcbiAgICAgICAgJ1phcHBhJywgJ1NxU2h5JywgJ0Jhc2VkR29kJywgJ2JVcnNlbGYnLCAnQ29uY2VybkRvZ2UnLCAnRmFwRmFwRmFwJywgJ0ZlZWxzQmFkTWFuJywgJ0ZlZWxzR29vZE1hbicsICdGaXJlU3BlZWQnLCAnRmlzaE1vbGV5JywgJ0hoaGVoZWhlJywgJ0tLb25hJywgJ05hTScsICdPaEdvZCcsICdQb2xlRG9nZScsICd0ZWhQb2xlQ2F0JywgJ0FuZ2VsVGh1bXAnLCAnU291clBscycsICdMVUwnLCBcclxuICAgICAgICAnU2FsdHlDb3JuJywgJ0ZDcmVlcCcsICdWYXBlTmF0aW9uJywgJ2FyaVcnLCAnbm90c3F1aXNoWScsICdGZWVsc0FtYXppbmdNYW4nLCAnRHVja2VyWicsICdXb3dlZSddO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbiggXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYodHlwZW9mICQoJyNpbnB1dCcpLmF0dHIoJ2ZvY3VzZWQnKSAhPSAndW5kZWZpbmVkJykgeyAvLyBSZXNldHMgdGFiIGNsaWNrcyB3aGVuIG1vdXNlIGxvY2F0aW9uIGlzIGNoYW5nZWRcclxuICAgICAgICAgICAgICAgIGZvdW5kRW1vdGVzID0gW107XHJcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgc2F2ZVBvcyA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkua2V5ZG93bihmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PSA5ICYmIHR5cGVvZiAkKCcjaW5wdXQnKS5hdHRyKCdmb2N1c2VkJykgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIFByZXZlbnRzIFRBQiB0byBzZWxlY3Qgb2JqZWN0c1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBmdWxsTWVzc2FnZSA9ICQoJyNpbnB1dCAjaW5wdXQnKS50ZXh0KCkgLy8gRnVsbCBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0ZWRXb3JkID0gZW1vdGVBdXRvQ29tcGxldGUuZ2V0V29yZCgpLnRyaW0oKTsgLy8gVGhlIHdvcmQgeW91ciBjYXJldCBpcyBvblxyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnNvclBvcyA9IGVtb3RlQXV0b0NvbXBsZXRlLmdldENhcmV0UG9zaXRpb24oJCgnI2lucHV0ICNpbnB1dCcpWzBdKSAvLyBDYXJldCBpbmRleFxyXG5cclxuICAgICAgICAgICAgICAgIGlmKHNlbGVjdGVkV29yZCA9PSBcIlwiIHx8IGZ1bGxNZXNzYWdlW2N1cnNvclBvcy0xXSA9PSBcIsKgXCIpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihzdGF0ZSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kRW1vdGVzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbW90ZUFycmF5Lmxlbmd0aDsgaSsrKSB7IC8vIENoZWNrcyBhcnJheSBmb3IgbWF0Y2hlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihlbW90ZUFycmF5W2ldLmluZGV4T2Yoc2VsZWN0ZWRXb3JkKSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3VuZEVtb3Rlcy5wdXNoKGVtb3RlQXJyYXlbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBjdXJzb3JQb3MtMTsgaSA+IDA7IGktLSkgeyAvLyBDaGVja3MgY2FyZXQgbG9jYXRpb24gY29tcGFyZWQgdG8gdGhlIHdvcmQgdG8gZmluZCB0aGUgc3RhcnRpbmcgcG9pbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZnVsbE1lc3NhZ2VbaV0gPT0gXCIgXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVQb3MgPSBjdXJzb3JQb3MtKGN1cnNvclBvcy1pKSsxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihpID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVQb3MgPSAwOyAvLyBTZXQgcG9zIDAgaWYgZmlyc3Qgd29yZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0U3RyID0gZnVsbE1lc3NhZ2Uuc3Vic3RyaW5nKDAsIHNhdmVQb3MpOyAvLyBTdGFydGluZyBwYXJ0XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kU3RyID0gZnVsbE1lc3NhZ2Uuc3Vic3RyaW5nKHNhdmVQb3Mrc2VsZWN0ZWRXb3JkLmxlbmd0aCk7IC8vIEVuZGluZyBwYXJ0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihzYXZlUG9zID09IDAgJiYgZW5kU3RyICE9IFwiXCIpIHJldHVybjsgLy8gUHJldmVudCBkb3VibGV0YWJzXHJcbiAgICAgICAgICAgICAgICBpZihmb3VuZEVtb3Rlcy5sZW5ndGggPT0gMCkgcmV0dXJuOyAvLyBObyBtYXRjaGluZyBlbW90ZXMgZm91bmRcclxuICAgICAgICAgICAgICAgIGlmKHN0YXRlID4gZm91bmRFbW90ZXMubGVuZ3RoLTIpIHN0YXRlID0gLTE7IC8vIExvb3AgaWYgYXQgdGhlIGVuZCBvZiB0aGUgYXJyYXlcclxuICAgICAgICAgICAgICAgIHN0YXRlKytcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3TWVzc2FnZSA9IHN0YXJ0U3RyICsgZm91bmRFbW90ZXNbc3RhdGVdICsgZW5kU3RyO1xyXG5cclxuICAgICAgICAgICAgICAgICQoJyNpbnB1dCAjaW5wdXQnKS50ZXh0KG5ld01lc3NhZ2UpOyAvLyBTZXRzIHRoZSBuZXcgbWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgZW1vdGVBdXRvQ29tcGxldGUucGxhY2VDYXJldEF0RW5kKCQoJyNpbnB1dCAjaW5wdXQnKS5nZXQoMCkpOyAvLyBQbGFjZXMgY3Vyc29yIGF0IHRoZSBlbmRcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKChldmVudC5rZXlDb2RlID09IDMyIHx8IGV2ZW50LmtleUNvZGUgPT0gOCB8fCBldmVudC5rZXlDb2RlID09IDE3KSAmJiB0eXBlb2YgJCgnI2lucHV0JykuYXR0cignZm9jdXNlZCcpICE9ICd1bmRlZmluZWQnKSB7IC8vIFJlc2V0cyB0YWIgY2xpY2tzIHdoZW4gc3BhY2UsIGJhY2tzcGFjZSBldGMgcHJlc3NlZC5cclxuICAgICAgICAgICAgICAgIGZvdW5kRW1vdGVzID0gW107XHJcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgc2F2ZVBvcyA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfTtcclxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Vtb3RlQXV0b0NvbXBsZXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBFbW90ZSBmcm9tICcuL2Vtb3RlJztcclxuaW1wb3J0IHsgb3B0aW9ucyB9IGZyb20gJy4vbWFpbic7XHJcbmltcG9ydCBDaGF0T2JzZXJ2ZXIgZnJvbSAnLi9jaGF0T2JzZXJ2ZXInO1xyXG5pbXBvcnQgZG9uYXRlQnV0dG9uIGZyb20gJy4vb3ZlcmxheS9kb25hdGVCdXR0b24nO1xyXG5pbXBvcnQgY2hlY2tJZldhdGNoaW5nTGl2ZSBmcm9tICcuL292ZXJsYXkvY2hlY2tJZldhdGNoaW5nTGl2ZSc7XHJcbmltcG9ydCBBbHdheXNTY3JvbGxEb3duIGZyb20gJy4vb3ZlcmxheS9hbHdheXNTY3JvbGxEb3duJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2VDaGVja1xyXG57XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB1c2VyIGlzIHdhdGNoaW5nIGZyb20gd3JvbmcgbGl2ZXN0cmVhbSBwYWdlIGFuZCB3YXJucyB0aGVtLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgeW91dHViZUdhbWluZygpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgaWZyYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpdmUtY2hhdC1pZnJhbWUnKTtcclxuXHJcbiAgICAgICAgY29uc3QgJHRleHRXcmFwcGVyID0gJCgnLnl0LXVzZXItaW5mbycpO1xyXG4gICAgICAgIGNvbnN0IHRleHQgPSAkdGV4dFdyYXBwZXIuZmluZCgnYScpLnRleHQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcclxuXHJcbiAgICAgICAgaWYgKHRleHQgPT0gJ0ljZSBQb3NlaWRvbicgJiYgIXVybC5pbmNsdWRlcygnZ2FtaW5nLnlvdXR1YmUnKSAmJiBpZnJhbWUpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlZGlyZWN0Q29uZmlybSA9IGNvbmZpcm0oJ1tJY2UgUG9zZWlkb25UVl0gR28gdG8gdGhlIG9mZmljaWFsIEljZSBQb3NlaWRvbiBsaXZlc3RyZWFtIHBhZ2U/Jyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVkaXJlY3RDb25maXJtID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnaHR0cHM6Ly9nYW1pbmcueW91dHViZS5jb20vaWNlX3Bvc2VpZG9uL2xpdmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB1c2VyIGlzIHdhdGNoaW5nIGEgbGl2ZXN0cmVhbSBvbiBZb3V0dWJlIGdhbWluZy5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxpdmVzdHJlYW1QYWdlKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3duZXInKTtcclxuICAgICAgICBjb25zdCBjaGF0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXQnKTtcclxuICAgICAgICBjb25zdCB0ZXh0ID0gJCh0YXJnZXQpLmZpbmQoJ3NwYW4nKS50ZXh0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XHJcblxyXG4gICAgICAgIGlmICgoIXRhcmdldCB8fCAhY2hhdCkgJiYgKCF1cmwuaW5jbHVkZXMoJ2xpdmVfY2hhdCcpICYmICF1cmwuaW5jbHVkZXMoJ2lzX3BvcG91dD0xJykpKSB7XHJcblxyXG4gICAgICAgICAgICBQYWdlQ2hlY2suc3RyZWFtcGFnZUNoZWNrcysrO1xyXG5cclxuICAgICAgICAgICAgaWYgKFBhZ2VDaGVjay5zdHJlYW1wYWdlQ2hlY2tzIDwgMjUpIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoUGFnZUNoZWNrLmxpdmVzdHJlYW1QYWdlLCAyNTApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob3B0aW9uc1snZW1vdGVzVHdpdGNoJ10gPT09IHRydWUgfHwgb3B0aW9uc1snZW1vdGVzU3ViJ10gPT09IHRydWUgfHwgb3B0aW9uc1snZW1vdGVzQlRUViddID09PSB0cnVlIHx8IG9wdGlvbnNbJ2Vtb3Rlc0ljZSddID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIENoYXRPYnNlcnZlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGV4dCA9PSAnSWNlIFBvc2VpZG9uJykgZG9uYXRlQnV0dG9uKCk7XHJcblxyXG4gICAgICAgIEVtb3RlLmxvYWRFbW90ZXMoKTtcclxuICAgICAgICBBbHdheXNTY3JvbGxEb3duLmluaXQoKTtcclxuICAgICAgICBjaGVja0lmV2F0Y2hpbmdMaXZlKCk7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuUGFnZUNoZWNrLnN0cmVhbXBhZ2VDaGVja3MgPSAwO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3BhZ2VDaGVjay5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgRW1vdGUgZnJvbSAnLi9lbW90ZSc7XHJcbmltcG9ydCBNZW50aW9uSGlnaGxpZ2h0IGZyb20gJy4vbWVudGlvbkhpZ2hsaWdodCc7XHJcblxyXG4vKipcclxuICogQmluZHMgY2hhdCBtdXRhdGlvbiBvYnNlcnZlciBhbmQgbGlzdGVuIGZvciBuZXcgY2hhdCBtZXNzYWdlcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoYXRPYnNlcnZlcigpXHJcbntcclxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdHlsZS1zY29wZSAueXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlcicpO1xyXG4gICAgY29uc3QgYXV0aG9ybmFtZSA9ICQoJyNhdXRob3IgI2F1dGhvci1uYW1lJykudGV4dCgpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KGNoYXRPYnNlcnZlciwgMjUwKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XHJcblxyXG4gICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChtdXRhdGlvbikge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbmV3Tm9kZXMgPSBtdXRhdGlvbi5hZGRlZE5vZGVzO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5ld05vZGVzICE9PSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgJG5vZGVzID0gJChuZXdOb2Rlcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJG5vZGVzLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCAkbm9kZSA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghJG5vZGUuaGFzQ2xhc3MoJ3l0LWxpdmUtY2hhdC1pdGVtLWxpc3QtcmVuZGVyZXInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBNZW50aW9uSGlnaGxpZ2h0KCRub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBFbW90ZS5lbW90ZUNoZWNrKCRub2RlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgIGNoYXJhY3RlckRhdGE6IGZhbHNlLFxyXG4gICAgICAgIGF0dHJpYnV0ZXM6IGZhbHNlLFxyXG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgICAgICBzdWJ0cmVlOiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCBvcHRpb25zKTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jaGF0T2JzZXJ2ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgb3B0aW9ucyB9IGZyb20gJy4vbWFpbic7XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIGEgbWVzc2FnZSBjb250YWlucyBtZW50aW9uIGFuZCBjaGFuZ2VzIGJhY2tncm91bmQgdG8gQlRUViBzdHlsZSBiYWNrZ3JvdW5kLlxyXG4gKiBAcGFyYW0ge25vZGV9IG5vZGUgLSBNZXNzYWdlIG5vZGVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1lbnRpb25IaWdobGlnaHQobm9kZSlcclxue1xyXG4gICAgY29uc3QgYXV0aG9ybmFtZSA9ICQoJyNhdXRob3IgI2F1dGhvci1uYW1lJykudGV4dCgpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgaWYgKG9wdGlvbnNbJ21lbnRpb25IaWdobGlnaHQnXSAmJiBhdXRob3JuYW1lLmxlbmd0aCA+IDIgJiYgIW5vZGUuaGFzQ2xhc3MoJ3l0LWxpdmUtY2hhdC1sZWdhY3ktcGFpZC1tZXNzYWdlLXJlbmRlcmVyLTAnKSkgeyAvLyBDaGVjayBpdCdzIG5vdCBzcG9uc29yIC8gc3VwZXJjaGF0LCBhbHNvIG1lbnRpb25IaWdobGlnaHQgZW5hYmxlZFxyXG5cclxuICAgICAgICBjb25zdCB1bmlxdWVpZCA9IG5vZGUuZ2V0KDApLmdldEF0dHJpYnV0ZSgnaWQnKSAvLyBDb3B5IHVuaXF1ZSBtZXNzYWdlIGlkXHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IChcIiBcIiArIG5vZGUuZmluZCgnI21lc3NhZ2UnKS50ZXh0KCkudG9Mb3dlckNhc2UoKSArIFwiIFwiKS5yZXBsYWNlKC9bXFx1MjAwQi1cXHUyMDBEXFx1RkVGRl0vZywgJycpO1xyXG5cclxuICAgICAgICBpZiAodW5pcXVlaWQubGVuZ3RoID4gMzAgJiYgKG1lc3NhZ2UuaW5kZXhPZignICcrYXV0aG9ybmFtZSsnICcpICE9PSAtMSB8fCBtZXNzYWdlLmluZGV4T2YoJ0AnK2F1dGhvcm5hbWUrJyAnKSAhPT0gLTEpKSB7IC8vIElmIHlvdXIgbmFtZSBpcyBpbiB0aGUgbWVzc2FnZSwgYW5kIGl0J3Mgbm90IHlvdXIgbWVzc2FnZVxyXG4gICAgICAgICAgICBub2RlLmdldCgwKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMjU1LDAsMCwwLjQwKVwiO1xyXG4gICAgICAgICAgICBub2RlLmZpbmQoJyNhdXRob3ItbmFtZScpLmdldCgwKS5zdHlsZS5jb2xvciA9IFwiI2ZmZmZmZlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9tZW50aW9uSGlnaGxpZ2h0LmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IFNDUk9MTF9FTkFCTEVEX1VSTCwgU0NST0xMX0RJU0FCTEVEX1VSTCB9IGZyb20gJy4vLi4vbWFpbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbHdheXNTY3JvbGxEb3duXHJcbntcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyAnQWx3YXlzIHNjcm9sbCBkb3duJyBvdmVybGF5IGFuZCBiaW5kcyB0aGUgbmVjZXNzYXJ5IGxpc3RlbmVycy5cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCQoJy5pcHR2LXNjcm9sbGRvd24td3JhcHBlcicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkKCcuaXB0di1zY3JvbGxkb3duLXdyYXBwZXInKS5yZW1vdmUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBzY3JvbGxXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgICAgIHNjcm9sbFdyYXBwZXIuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ0Fsd2F5cyBzY3JvbGwgZG93biAoRW5hYmxlZCknKTtcclxuICAgICAgICBzY3JvbGxXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2hpbnQtLXRvcCcsICdpcHR2LXNjcm9sbGRvd24td3JhcHBlcicpO1xyXG5cclxuICAgICAgICAkKHNjcm9sbFdyYXBwZXIpLmNzcyh7XHJcbiAgICAgICAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICdyaWdodCc6ICcxMTNweCcsXHJcbiAgICAgICAgICAgICdib3R0b20nOiAnMThweCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChzY3JvbGxXcmFwcGVyKS5odG1sKGBcclxuICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwiaXB0di1zY3JvbGxkb3duLXRvZ2dsZVwiIHN0eWxlPVwib3V0bGluZTogMDtcIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtTQ1JPTExfRU5BQkxFRF9VUkx9XCIgYWx0PVwiQWx3YXlzIHNjcm9sbCBkb3duXCIgaGVpZ2h0PVwiMTFcIiB3aWR0aD1cIjExXCIgY2xhc3M9XCJpcHR2LXNjcm9sbGRvd24tdG9nZ2xlLWljb25cIj5cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgIGApO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcm9sbFdyYXBwZXIpO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmlwdHYtc2Nyb2xsZG93bi10b2dnbGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi50b2dnbGVTY3JvbGxEb3duKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgJCgnI2l0ZW0tc2Nyb2xsZXInKS5zY3JvbGxUb3AoOTk5OTk5OTk5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uaGlkZVNjcm9sbE9uQ2luZW1hKHNjcm9sbFdyYXBwZXIpO1xyXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uaGlkZVNjcm9sbE9uU3BvbnNvck1lbnUoc2Nyb2xsV3JhcHBlcik7XHJcbiAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcclxuICAgICAgICBBbHdheXNTY3JvbGxEb3duLmJpbmRTY3JvbGxEb3duTGlzdGVuZXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlcyB0aGUgJ0Fsd2F5cyBzY3JvbGwgZG93bicgb3ZlcmxheSB3aGVuIGNpbmVtYSBtb2RlIGlzIG9wZW5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bm9kZX0gc2Nyb2xsV3JhcHBlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaGlkZVNjcm9sbE9uQ2luZW1hKHNjcm9sbFdyYXBwZXIpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgd2F0Y2hQYWdlID0gJ3l0Zy13YXRjaC1wYWdlJztcclxuXHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihtdXRhdGlvbnMpIHtcclxuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goKG0pID0+IHtcclxuICAgICAgICAgICAgICAgICQobS50YXJnZXQpLmlzKCdbc2lkZWJhci1jb2xsYXBzZWRdJykgPyAkKHNjcm9sbFdyYXBwZXIpLmhpZGUoKSA6ICQoc2Nyb2xsV3JhcHBlcikuc2hvdygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJPcHRzID0ge1xyXG4gICAgICAgICAgICBjaGlsZExpc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZSxcclxuICAgICAgICAgICAgc3VidHJlZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydzaWRlYmFyLWNvbGxhcHNlZCddXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBhZGRPYnNlcnZlciA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCQod2F0Y2hQYWdlKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoJCh3YXRjaFBhZ2UpWzBdLCBvYnNlcnZlck9wdHMpO1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChhZGRPYnNlcnZlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAyNTApO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZGVzIHRoZSAnQWx3YXlzIHNjcm9sbCBkb3duJyBvdmVybGF5IHdoZW4gc3BvbnNvciBtZW51IGlzIG9wZW4uXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge25vZGV9IHNjcm9sbFdyYXBwZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGhpZGVTY3JvbGxPblNwb25zb3JNZW51KHNjcm9sbFdyYXBwZXIpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgY2hhdElucHV0UmVuZGVyZXIgPSAneXQtbGl2ZS1jaGF0LW1lc3NhZ2UtaW5wdXQtcmVuZGVyZXInO1xyXG5cclxuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcclxuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goKG0pID0+IHtcclxuICAgICAgICAgICAgICAgICQobS50YXJnZXQpLmF0dHIoJ2NyZWF0b3Itb3BlbicpID8gJChzY3JvbGxXcmFwcGVyKS5oaWRlKCkgOiAkKHNjcm9sbFdyYXBwZXIpLnNob3coKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG9ic2VydmVyT3B0cyA9IHtcclxuICAgICAgICAgICAgY2hpbGRMaXN0OiBmYWxzZSxcclxuICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgICAgICAgICAgY2hhcmFjdGVyRGF0YTogZmFsc2UsXHJcbiAgICAgICAgICAgIHN1YnRyZWU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFsnY3JlYXRvci1vcGVuJ11cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNwb25zb3JDbGljayA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCQoY2hhdElucHV0UmVuZGVyZXIpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSgkKGNoYXRJbnB1dFJlbmRlcmVyKVswXSwgb2JzZXJ2ZXJPcHRzKTtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoc3BvbnNvckNsaWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDI1MCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzYWJsZXMgJ0Fsd2F5cyBzY3JvbGwgZG93bicgZnVuY3Rpb25hbGl0eSB3aGVuIHNjcm9sbGluZyBtYW51YWxseS5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGJpbmRTY3JvbGxMaXN0ZW5lcigpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2l0ZW0tc2Nyb2xsZXInKTtcclxuXHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IEFsd2F5c1Njcm9sbERvd24uYmluZFNjcm9sbExpc3RlbmVyKCkgfSwgMjUwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgnI2l0ZW0tc2Nyb2xsZXInKS5iaW5kKCdtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24udG9nZ2xlU2Nyb2xsRG93bihmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5hYmxlcyAnQWx3YXlzIHNjcm9sbCBkb3duJyBmdW5jdGlvbmFsaXR5IHdoZW4gYmx1ZSBqdW1wIGRvd24gYnV0dG9uIGlzIGNsaWNrZWQuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBiaW5kU2Nyb2xsRG93bkxpc3RlbmVyKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvdy1tb3JlJyk7XHJcblxyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHsgQWx3YXlzU2Nyb2xsRG93bi5iaW5kU2Nyb2xsRG93bkxpc3RlbmVyKCkgfSwgMjUwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGFyZ2V0Lm9ubW91c2Vkb3duID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnRvZ2dsZVNjcm9sbERvd24odHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9nZ2xlIHNjcm9sbERvd24gc3RhdGUgYW5kIGFkanVzdCBvdmVybGF5IGFjY29yZGluZ2x5LlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdG9nZ2xlU2Nyb2xsRG93bihzdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duID0gIUFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93bjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPSBzdGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJy5pcHR2LXNjcm9sbGRvd24td3JhcHBlcicpLmF0dHIoJ2FyaWEtbGFiZWwnLCBBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPyAnQWx3YXlzIHNjcm9sbCBkb3duIChFbmFibGVkKScgOiAnQWx3YXlzIHNjcm9sbCBkb3duIChEaXNhYmxlZCknKTtcclxuICAgICAgICAkKCcuaXB0di1zY3JvbGxkb3duLXRvZ2dsZS1pY29uJykuYXR0cignc3JjJywgQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duID8gU0NST0xMX0VOQUJMRURfVVJMIDogU0NST0xMX0RJU0FCTEVEX1VSTCk7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duID0gdHJ1ZTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L2Fsd2F5c1Njcm9sbERvd24uanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiAqIENoZWNrcyBpZiB1c2VyIGlzIGJlaGluZCBpbiBsaXZlc3RyZWFtIGFuZCB3YXJucyB0aGVtLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hlY2tJZldhdGNoaW5nTGl2ZSgpIHtcclxuXHJcbiAgICBsZXQgbGl2ZUNoZWNrSW50ZXJ2YWwgPSBudWxsO1xyXG5cclxuICAgIGxpdmVDaGVja0ludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGNvbnN0ICRsaXZlQnV0dG9uID0gJCgnLnl0cC1saXZlLWJhZGdlLnl0cC1idXR0b24nKTtcclxuXHJcbiAgICAgICAgaWYgKCRsaXZlQnV0dG9uLmlzKCc6ZW5hYmxlZCcpICYmICRsaXZlQnV0dG9uLmlzKCc6dmlzaWJsZScpKSB7XHJcbiAgICAgICAgICAgICQoJyNwbGF5ZXItY29udGFpbmVyJykuYXBwZW5kKGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpcHR2LWxpdmUtd2FybmluZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpcHR2LWxpdmUtd2FybmluZy10ZXh0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFlvdVxcJ3JlIHdhdGNoaW5nIG9sZCBmb290YWdlLCBjbGljayB0aGUgTElWRSBidXR0b24gaW4gdGhlIGJvdHRvbSBsZWZ0IGNvcm5lciB0byB3YXRjaCBsaXZlLlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpcHR2LWxpdmUtd2FybmluZy1kaXNtaXNzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBjbGFzcz1cImlwdHYtbGl2ZS13YXJuaW5nLWNsb3NlXCI+4pyVPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGApO1xyXG4gICAgICAgIH1cclxuICAgIH0sIDE1ICogMTAwMCk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5pcHR2LWxpdmUtd2FybmluZy1jbG9zZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5pcHR2LWxpdmUtd2FybmluZycpLnJlbW92ZSgpO1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwobGl2ZUNoZWNrSW50ZXJ2YWwpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ21vdXNlZG93bicsICcueXRwLWxpdmUtYmFkZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuaXB0di1saXZlLXdhcm5pbmcnKS5yZW1vdmUoKTtcclxuICAgIH0pO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL292ZXJsYXkvY2hlY2tJZldhdGNoaW5nTGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcclxuICogQWRkcyBkb25hdGUgYnV0dG9uIHRvIGxpdmVzdHJlYW0gcGFnZS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRvbmF0ZUJ1dHRvbigpXHJcbntcclxuICAgICQoJy5pcHR2LWRvbmF0ZS1idXR0b24tMCcpLnJlbW92ZSgpO1xyXG5cclxuICAgIGNvbnN0IGRvbmF0ZUljb24gPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL2ljb25zL2RvbmF0ZS1pY29uLnBuZycpO1xyXG4gICAgY29uc3Qgc3BvbnNvckljb24gPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL2ljb25zL3Nwb25zb3ItaWNvbi5wbmcnKTtcclxuXHJcbiAgICBjb25zdCBzcG9uc29ySW1hZ2UgPSBgPGltZyBzcmM9XCIke3Nwb25zb3JJY29ufVwiIGFsdD1cInN0YXJcIiBzdHlsZT1cInBvaW50ZXItZXZlbnRzOiBub25lOyBkaXNwbGF5OiBibG9jazsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTtcIj5gO1xyXG5cclxuICAgIGNvbnN0IGRvbmF0ZUJ1dHRvbiA9IGBcclxuICAgICAgICA8aXB0di1kb25hdGUtYnV0dG9uIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrO1wiIHJhaXNlZD1cIlwiIHN1cHBvcnRlZC1jb2xkLWxvYWQtYWN0aW9ucz1cIlsmcXVvdDtzcG9uc29yJnF1b3Q7XVwiIHdhaXQtZm9yLXNpZ25hbD1cIndhdGNoLXBhZ2UtaW5pdGlhbGl6ZWRcIiBjbGFzcz1cInN0eWxlLXNjb3BlIHl0Zy13YXRjaC1mb290ZXIgeC1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b24tMFwiPlxyXG4gICAgICAgICAgICA8aXJvbi1zaWduYWxzIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uXCI+PC9pcm9uLXNpZ25hbHM+XHJcbiAgICAgICAgICAgIDxwYXBlci1idXR0b24gc3R5bGU9XCJjb2xvcjogI2ZmZjsgYmFja2dyb3VuZC1jb2xvcjogIzBmOWQ1ODsgbWluLXdpZHRoOiAwO1wiIGNsYXNzPVwiZW5hYmxlZCBzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b24geC1zY29wZSBwYXBlci1idXR0b24tMFwiIHJvbGU9XCJidXR0b25cIiB0YWJpbmRleD1cIjBcIiBhbmltYXRlZD1cIlwiIGFyaWEtZGlzYWJsZWQ9XCJmYWxzZVwiIGVsZXZhdGlvbj1cIjFcIiByYWlzZWQ9XCJcIiBhcmlhLWxhYmVsPVwiRG9uYXRlIHRvIEljZV9Qb3NlaWRvblwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxheW91dCBob3Jpem9udGFsIGNlbnRlci1qdXN0aWZpZWQgc3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAyNHB4OyBoZWlnaHQ6IDI0cHg7XCIgY2xhc3M9XCJpY29uLWNvbnRhaW5lciBsYXlvdXQgaG9yaXpvbnRhbCBjZW50ZXItY2VudGVyIHN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8eXQtaWNvbiBjbGFzcz1cInN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvbiB4LXNjb3BlIHl0LWljb24tMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3l0LWljb24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8aXB0di1mb3JtYXR0ZWQtc3RyaW5nIGlkPVwidGV4dFwiIGNsYXNzPVwibGF5b3V0IGhvcml6b250YWwgY2VudGVyLWNlbnRlciBzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b25cIiBzdHlsZT1cIm1hcmdpbjogMCAzcHhcIj48c3BhbiBjbGFzcz1cInN0eWxlLXNjb3BlIGlwdHYtZm9ybWF0dGVkLXN0cmluZ1wiPkRPTkFURTwvc3Bhbj48L2lwdHYtZm9ybWF0dGVkLXN0cmluZz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L3BhcGVyLWJ1dHRvbj5cclxuICAgICAgICA8L2lwdHYtZG9uYXRlLWJ1dHRvbj5gO1xyXG5cclxuICAgIGNvbnN0IGRvbmF0ZUltYWdlID0gYDxpbWcgc3JjPVwiJHtkb25hdGVJY29ufVwiIGFsdD1cImRvbGxhci1zaWduXCIgc3R5bGU9XCJwb2ludGVyLWV2ZW50czogbm9uZTsgZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7XCI+YDtcclxuXHJcbiAgICAvLyBJbnNlcnQgZG9uYXRlQnV0dG9uIG5leHQgdG8gc3BvbnNvckJ1dHRvblxyXG4gICAgY29uc3Qgc3BvbnNvckJ1dHRvbiA9ICcuc3R5bGUtc2NvcGUueXRnLXdhdGNoLWZvb3Rlci54LXNjb3BlLnl0Zy1tZW1iZXJzaGlwLW9mZmVyLWJ1dHRvbi0wJztcclxuXHJcbiAgICAkKHNwb25zb3JCdXR0b24pLmJlZm9yZShkb25hdGVCdXR0b24pO1xyXG4gICAgJChkb25hdGVCdXR0b24pLnJlYWR5KCBmdW5jdGlvbigpIHsgJCgnLnN0eWxlLXNjb3BlLmlwdHYtZG9uYXRlLWJ1dHRvbi54LXNjb3BlLnl0LWljb24tMCcpLmh0bWwoZG9uYXRlSW1hZ2UpOyB9KTtcclxuXHJcbiAgICAkKCcuc3R5bGUtc2NvcGUueXRnLXdhdGNoLWZvb3Rlci54LXNjb3BlLmlwdHYtZG9uYXRlLWJ1dHRvbi0wJykub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5vcGVuKCdodHRwczovL3lvdXR1YmUuc3RyZWFtbGFicy5jb20vaWNlcG9zZWlkb24jLycsICdfYmxhbmsnKTtcclxuICAgICAgICAkKCcuc3R5bGUtc2NvcGUueXRnLXdhdGNoLWZvb3Rlci54LXNjb3BlLmlwdHYtZG9uYXRlLWJ1dHRvbi0wIHBhcGVyLWJ1dHRvbicpWzBdLmJsdXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENoYW5nZSBzcG9uc29yQnV0dG9uIGljb24gdG8gc3RhclxyXG4gICAgJChgJHtzcG9uc29yQnV0dG9ufSAuc3R5bGUtc2NvcGUueXRnLW1lbWJlcnNoaXAtb2ZmZXItYnV0dG9uLngtc2NvcGUueXQtaWNvbi0wYCkuaHRtbChzcG9uc29ySW1hZ2UpO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL292ZXJsYXkvZG9uYXRlQnV0dG9uLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxyXG4gKiBTaG93IGVtb3RlIGxvYWRpbmcgaW5mb3JtYXRpb24uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkaW5nRW1vdGVzSW5mbygpXHJcbntcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgICQoZGl2KS50ZXh0KCdMb2FkaW5nIGVtb3Rlcy4uLicpO1xyXG5cclxuICAgICQoZGl2KS5jc3Moe1xyXG4gICAgICAgICdmb250LXNpemUnOiAnMTZweCcsXHJcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcclxuICAgICAgICAncmlnaHQnOiAnMjVweCcsXHJcbiAgICAgICAgJ2JvdHRvbSc6ICc3NXB4JyxcclxuICAgICAgICAnY29sb3InOiAnI2ZmZicsXHJcbiAgICAgICAgJ3RleHQtc2hhZG93JzogJzJweCAycHggMnB4IHJnYmEoMCwwLDAsMC43NSknXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRpdikuYWRkQ2xhc3MoJ2lwdHYtbG9hZGluZy1lbW90ZXMnKTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vb3ZlcmxheS9sb2FkaW5nRW1vdGVzSW5mby5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==