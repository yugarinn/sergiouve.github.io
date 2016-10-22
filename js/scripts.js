$(document).ready(function() {

    String.prototype.replaceAt = function(index, character) {
        return this.substr(0, index) + character + this.substr(index + character.length);
    }

    var $main = $('main');
    var $nameElement = $main.find('.js-name-box');
    var spiceInterval = null;
    var commands_list_path = '/lib/commands.json';

    var initClock = function() {
        var $date = $main.find('.js-clock');

        setInterval(function() {
            var date = getCurrentDate();
            var time = getCurrentTime();

            $date.html(date + ' - ' + time);
        }, 1000);
    }

    var getCurrentDate = function() {
        var date = new Date();
        var current_date = date.toLocaleDateString();

        return current_date;
    }

    var getCurrentTime = function() {
        var time = new Date();
        var current_hour = time.getHours();
        var current_minute = time.getMinutes();
        var current_second = time.getSeconds();

        current_hour = formatTimeValue(current_hour);
        current_minute = formatTimeValue(current_minute);
        current_second = formatTimeValue(current_second);

        var formatted_time = current_hour + ':' + current_minute + ':' + current_second;

        return formatted_time;
    }

    var formatTimeValue = function(value) {
        return value > 9 ? value : '0' + value;
    }

    var getRandomHexColor = function() {
        var letters = '0123456789ABCDEF';
        var color = '#';

        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    var surrondCharsWithSpan = function($element) {
        var elementChars = $element.text();

        for (var i = 0, length = elementChars.length; i < length; i++) {
            elementChars[i] = elementChars.replaceAt(i, '<span>' + elementChars[i] + '</span>');
        }
        return elementChars;
    }

    var getRangedRandomNumber = function(min, max) {
        return Math.random() * (max - min) + min;
    }

    var spiceNameUp = function() {
        $nameElement.css('color', getRandomHexColor());
        // $nameElement.css('font-size', getRangedRandomNumber(10, 12));
    }

    var toggleSpiceNameUp = function() {
        $nameElement.html(surrondCharsWithSpan($nameElement));
        $nameElement.toggleClass('js-spice-active');

        if ($nameElement.hasClass('js-spice-active')) {
            spiceInterval = setInterval(function() {
                spiceNameUp();
            }, 50);
        } else {
            clearInterval(spiceInterval);
        }
    }

    var focusTerminal = function() {
        var $terminal = $main.find('.terminal-input:last-child');
        $terminal.focus();
    }

    var initTerminalListener = function() {
        var $terminal = $main.find('.terminal-input:last-child');

        $terminal.on('keyup', function(e) {
            var pressed_key = e.keyCode || e.which;
            terminalHandleInput($terminal.val(), pressed_key);
        });
    }

    var terminalHandleInput = function(input, pressed_key) {
        if (pressed_key == '13') {
            checkCommand(input, executeTerminalCommand);
            generateNewTerminalLine();
            updateCommandHistory(input);
            return;
        } else {
            // TODO
            return;
        }
    }

    var executeTerminalCommand = function(input, commandsList) {
        var is_a_yodo_command = askYodo();

        if (is_a_yodo_command) {
            return;
        }

        console.log(commandsList);

        return 1;
    }

    function checkCommand(input, callback) {
        $.getJSON(commands_list_path, function(data) {
            var commandsList = $.parseJSON(data);
            callback(input, commandsList);
        });
    }

    var generateNewTerminalLine = function() {
        var $terminalBox = $main.find('.js-terminal-box:last-child');
        var $terminalInput = $terminalBox.find('input');

        $terminalBox.clone().insertAfter($terminalBox);
        $terminalInput.prop('disabled', true);

        var $terminalBox = $main.find('.js-terminal-box:last-child');
        var $terminalInput = $terminalBox.find('input');

        initTerminalListener();
        $terminalInput.val('');
        $terminalInput.focus();

        return 1;
    }

    var updateCommandHistory = function(input) {
        return 1;
    }

    var askYodo = function() {
        return 0;
    }

    $nameElement.on('click', function() {
        toggleSpiceNameUp();
    });

    initClock();
    initTerminalListener();
    focusTerminal();

});
