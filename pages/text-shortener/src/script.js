const input = document.getElementById("text_input");
const output = document.getElementById("text_output");
const caseSensitive = document.getElementById("case_sensitive");
const textSize = document.getElementById("text_size");

const charactersShortened = document.getElementById("characters_shortened");
const charactersNotModified = document.getElementById("characters_not_modified");
const startingLength = document.getElementById("starting_length");
const finalLength = document.getElementById("final_length");

const charactersMap = {
    // https://stackoverflow.com/questions/49079499/unicode-letters-with-more-than-1-alphabetic-latin-character
    "IJ": "Ĳ",
    "ij": "ĳ",
    "LJ": "Ǉ",
    "Lj": "ǈ",
    "lj": "ǉ",
    "NJ": "Ǌ",
    "Nj": "ǋ",
    "nj": "ǌ",
    "DZ": "Ǳ",
    "Dz": "ǲ",
    "dz": "ǳ",
    "Rs": "₨",
    "II": "Ⅱ",
    "III": "Ⅲ",
    "IV": "Ⅳ",
    "VI": "Ⅵ",
    "VII": "Ⅶ",
    "VIII": "Ⅷ",
    "IX": "Ⅸ",
    "XI": "Ⅺ",
    "XII": "Ⅻ",
    "ii": "ⅱ",
    "iii": "ⅲ",
    "iv": "ⅳ",
    "vi": "ⅵ",
    "vii": "ⅶ",
    "viii": "ⅷ",
    "ix": "ⅸ",
    "xi": "ⅺ",
    "xii": "ⅻ",
    "PTE": "㉐",
    "Hg": "㋌",
    "erg": "㋍",
    "eV": "㋎",
    "LTD": "㋏",
    "hPa": "㍱",
    "da": "㍲",
    "AU": "㍳",
    "bar": "㍴",
    "oV": "㍵",
    "pc": "㍶",
    "dm": "㍷",
    "IU": "㍺",
    "pA": "㎀",
    "nA": "㎁",
    "mA": "㎃",
    "kA": "㎄",
    "KB": "㎅",
    "MB": "㎆",
    "GB": "㎇",
    "cal": "㎈",
    "kcal": "㎉",
    "pF": "㎊",
    "nF": "㎋",
    "mg": "㎎",
    "kg": "㎏",
    "Hz": "Hz",
    "kHz": "㎑",
    "MHz": "㎒",
    "GHz": "㎓",
    "THz": "㎔",
    "Ml": "㎖",
    "dl": "㎗",
    "kl": "㎘",
    "fm": "㎙",
    "nm": "㎚",
    "mm": "㎜",
    "cm": "㎝",
    "km": "㎞",
    "Pa": "㎩",
    "kPa": "㎪",
    "MPa": "㎫",
    "GPa": "㎬",
    "rad": "㎭",
    "ps": "㎰",
    "ns": "㎱",
    "ms": "㎳",
    "pV": "㎴",
    "nV": "㎵",
    "mV": "㎷",
    "kV": "㎸",
    "MV": "㎹",
    "pW": "㎺",
    "nW": "㎻",
    "mW": "㎽",
    "kW": "㎾",
    "MW": "㎿",
    "Bq": "㏃",
    "cc": "㏄",
    "cd": "㏅",
    "dB": "㏈",
    "Gy": "㏉",
    "ha": "㏊",
    "HP": "㏋",
    "in": "㏌",
    "KK": "㏍",
    "KM": "㏎",
    "kt": "㏏",
    "lm": "㏐",
    "ln": "㏑",
    "log": "㏒",
    "lx": "㏓",
    "mb": "㏔",
    "mil": "㏕",
    "mol": "㏖",
    "pH": "㏗",
    "PPM": "㏙",
    "PR": "㏚",
    "sr": "㏛",
    "Sv": "㏜",
    "Wb": "㏝",
    "gal": "㏿",
    "ff": "ﬀ",
    "fi": "ﬁ",
    "fl": "ﬂ",
    "ffi": "ﬃ",
    "ffl": "ﬄ",
    "st": "ﬆ",
    "DJ": "🆐",

    // https://en.wikipedia.org/wiki/Ligature_(writing)#Latin_alphabet
    "AA": "Ꜳ",
    "aa": "ꜳ",
    "AE": "Æ",
    "ae": "æ",
    "AO": "Ꜵ",
    "ao": "ꜵ",
    "AJ": "Ꜷ", // It's actually AU, but we already declared that, and it looks like AJ
    "au": "ꜷ",
    "AV": "Ꜹ",
    "AY": "Ꜽ",
    "ay": "ꜽ",
    "IL": "Ỻ",
    "OE": "Œ",
    "oe": "œ",
    "OO": "Ꝏ",
    "oo": "ꝏ",
    "ɔe": "ꭢ",
    "uo": "ꭣ",

    "əø": "ꭁ",
    "db": "ȸ",
    "dʑ": "ʥ",
    "dʒ": "ʤ",
    "fŋ": "ʩ",
    "ls": "ʪ",
    "lz": "ʫ",
    "lʒ": "ɮ",
    "tɕ": "ʨ",
    "ts": "ʦ",
    "ʧ": "ʧ",

    // Other
    "Pts": "₧",
    "lt": "₶",
    "Dp": "₯",
    "Cr": "₢",

    "1/7": "⅐",
    "1/9": "⅑",
    "1/10": "⅒",
    "1/3": "⅓",
    "2/3": "⅔",
    "1/5": "⅕",
    "2/5": "⅖",
    "3/5": "⅗",
    "4/5": "⅘",
    "1/6": "⅙",
    "5/6": "⅚",
    "1/8": "⅛",
    "3/8": "⅜",
    "5/8": "⅝",
    "7/8": "⅞",

    "a/c": "℀",
    "a/s": "℁",
    "c/o": "℅",
    "c/u": "℆",
    "No": "№",
    "SM": "℠",
    "TEL": "℡",
    "TM": "™",
    "FAX": "℻",
    "A/S": "⅍",
    "000": "⅏",

    "mm^2": "㎟",
    "cm^2": "㎠",
    "m^2": "㎡",
    "km^2": "㎢",
    "mm^3": "㎣",
    "cm^3": "㎤",
    "m^3": "㎥",
    "km^3": "㎦",
    "m/s": "㎧",
    "m/s^2": "㎨",
    "rad/s": "㎮",
    "rad/s^2": "㎯",
    "μV": "㎶",
    "μW": "㎼",
    "kΩ": "㏀",
    "MΩ": "㏁",
    "a.m.": "㏂",
    "am": "㏂",
    "C/kg": "㏆",
    "Co.": "㏇",
    "p.m.": "㏘",
    "pm": "㏘",
    "V/m": "㏞",
    "A/m": "㏟",
    "dm^2": "㍸",
    "dm^3": "㍹",
    "μg": "㎍",
    "μF": "㎌",
    "μA": "㎂",
    "μl": "㎕",
    "μm": "㎜",
};

function getLongestKey(map) {
    // Get the keys of the map
    const keys = Object.keys(map);
    // Declare a variable that holds the longest key
    let longest = null;

    for (let i = 0; i < keys.length; i++) {
        if (longest === null || keys[i].length > longest.length) {
            longest = keys[i];
        }
    }

    return longest;
}

function getShortenedCharacter(text) {
    const shortened = charactersMap[text];

    if (caseSensitive.checked) {
        return shortened;
    } else {
        // Return `shortened` if there is a case-sensitive match, or else check for a case-insensitive match
        if (shortened !== undefined) {
            return shortened
        }

        const keys = Object.keys(charactersMap);
        for (let i = 0; i < keys.length; i++) {
            // If there is a case-insensitive match
            if (keys[i].toLowerCase() === text.toLowerCase()) {
                return charactersMap[keys[i]];
            }
        }
    }
}

function shortenText(text) {
    let charactersShortened = 0;
    let finalLength = 0;

    // The shortened version of `text`
    let shortenedText = "";

    // `i` is the starting index
    for (let i = 0; i < text.length;) {
        // The portion of `text` currently being read
        let splice = "";
        // The shortened version of `splice`
        let shortenedSplice = "";
        let shortenedRawLength = 0;

        for (let j = i; j < text.length; j++) {
            // Append `j`th character to `splice`
            splice += text[j];

            // Check if `splice` length is bigger than the length of the longest key
            if (splice.length > getLongestKey(charactersMap).length) {
                break;
            }

            // Determine shortened version of `splice`, if there is one
            const result = getShortenedCharacter(splice);
            if (result !== undefined) {
                shortenedSplice = result;
                shortenedRawLength = splice.length;
            }
        }

        // If there exists a shortened version in `charactersMap`
        if (shortenedSplice !== "") {
            // Increment `i` by `splice`'s length
            i += shortenedRawLength;

            // Miscellaneous information
            charactersShortened += shortenedRawLength;

            // Add `shortenedSplice` to `shortenedText`
            shortenedText += shortenedSplice;
        } else { // If no shortened version exists
            // Increment `i` by 1 to move on to the next character
            i++;
            // Add the first character of `splice` to `shortenedText` if it is not empty
            if (splice !== "") {
                shortenedText += splice[0];
            }
        }

        // Miscellaneous information
        finalLength++;

        // Reset `splice`
        splice = "";
    }

    return {
        text: shortenedText,
        charactersShortened: charactersShortened,
        charactersNotModified: text.length - charactersShortened,
        startingLength: text.length,
        finalLength: finalLength
    };
}

function createOutput() {
    const result = shortenText(input.value);

    // Set output to shortened text
    output.value = result.text;

    // Set information
    charactersShortened.textContent = result.charactersShortened.toString();
    charactersNotModified.textContent = result.charactersNotModified.toString();
    startingLength.textContent = result.startingLength.toString();
    finalLength.textContent = result.finalLength.toString();
}

// Ensure the output is modified every time any input element is modified
window.addEventListener("load", () => {
    const property = textSize.value.toString() + "px";

    input.style.fontSize = property;
    output.style.fontSize = property;

    let inputElements = [];
    inputElements.push(...document.getElementsByTagName("input"));
    inputElements.push(...document.getElementsByTagName("textarea"));

    for (let i = 0; i < inputElements.length; i++) {
        inputElements[i].addEventListener("input", () => createOutput());
    }
})

textSize.addEventListener("input", () => {
    const property = textSize.value.toString() + "px";

    input.style.fontSize = property;
    output.style.fontSize = property;
})