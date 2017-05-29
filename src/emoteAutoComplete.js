export default class emoteAutoComplete
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
};