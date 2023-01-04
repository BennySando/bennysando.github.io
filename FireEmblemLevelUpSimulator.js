let currLevel;
let canPromote;
let promotion;
let currStats;
let currGrowths;
let promotionBonuses;
let unpromotedCaps;
let promotedCaps;
let noMod = [0, 0, 0, 0, 0, 0, 0, 0]
let soldierMod = [5, 0, 0, 0, 0, 0, 5, 0]
let archerMod = [0, 0, 0, 5, 5, 0, 0, 0]
let mageMod = [0, 0, 10, 0, 0, 0, 0, 0]
let fighterMod = [5, 5, 0, 0, 0, 0, 0, 0]
let knightMod = [0, 5, 0, 0, 0, 0, 5, 0]
let paladinMod = [5, 0, 0, 0, 5, 0, 0, 0]
let pegasusMod = [0, 0, 0, 0, 0, 5, 0, 5]
let wyvernMod = [0, 5, 0, 0, 0, 0, 5, 0]
let thiefMod = [0, 0, 0, 5, 5, 0, 0, 0]
let priestMod = [0, 0, 0, 0, 0, 5, 0, 5]
let swordMod = [0, 0, 0, 5, 0, 5, 0, 0]
let wardMod = [0, 0, 0, 0, 30, 0, 0, 0]
let modList = [noMod, soldierMod, archerMod, mageMod, fighterMod, knightMod, paladinMod, pegasusMod, wyvernMod, thiefMod, priestMod, swordMod, wardMod]
const maxLevel = 20;
const numStats = 8;

// Fetches the masterList, which stores all the data for very character
async function getFile(){
    const URL = "https://bennysando.github.io/masterList.json";
    const request = new Request(URL);
    const response = await fetch(request);
    const file = response.json();
    return file;
}

// Sets the screen to its default state and populates all necessary fields with data from character
// represented by the character value passed in
async function setUp(characterVal){
    let masterFile = await getFile();
    let currCharacter = masterFile["pathOfRadiance"][characterVal];
    document.getElementById("charImage").src = currCharacter.profilePic; 
    document.getElementById("currentClass").innerHTML = currCharacter.baseClass;
    currLevel = currCharacter.baseLevel;
    document.getElementById("currentLevel").innerHTML = "Lv " + currLevel;
    canPromote = currCharacter.canPromote;
    promotion = currCharacter.promotedClass;
    promotionBonuses = currCharacter.promotionGains;
    currStats = currCharacter.baseStats;
    for (var i = 0; i < numStats; i++){
        document.getElementById("statVal" + i).innerHTML = currStats[i];
    }
    currGrowths = currCharacter.growthRates;
    unpromotedCaps = currCharacter.unpromotedCaps;
    promotedCaps = currCharacter.promotedCaps;
    if (currLevel == maxLevel && !canPromote){
        document.getElementById("levelUp").hidden = true;
    } else {
        document.getElementById("levelUp").hidden = false;
    }
    if (currLevel >= 10 && canPromote){
        document.getElementById("promote").hidden = false;
    } else {
        document.getElementById("promote").hidden = true;
    }
    document.getElementById("noMod").checked = true;

    //TODO: try and find a better solution to this problem, if one exists
    if (currCharacter.knightWard != undefined){
        document.getElementById("wardMod").hidden = false;
        document.getElementById("wardLabel").hidden = false;
    } else {
        document.getElementById("wardMod").hidden = true;
        document.getElementById("wardLabel").hidden = true;
    }
}

// Goes through each of a character's stats and determines whether that stat would increase upon level-up
// bsed on random number generation. Also updates any necessary data and handles other edge cases such as whether
// a unit can now promote
function levelUp(){
    if (currLevel < maxLevel){
        currLevel++;
        document.getElementById("currentLevel").innerHTML = "Lv " + currLevel;
        let mods = document.getElementsByName("growthMod")
        let val = 0;
        for (var i = 0; i < mods.length; i++){
            if (mods[i].checked){
                val = mods[i].value;
                break;
            }
        }
        let currMod = modList[val];
        let currCaps;
        if (canPromote){
            currCaps = unpromotedCaps;
        } else {
            currCaps = promotedCaps;
        }

        //TODO: check if there's a better way to do this. As of now, I'm assuming that all p elements store strings
        for (var i = 0; i < numStats; i++){
            if (currStats[i] < currCaps[i]){
                let growth = currGrowths[i] + currMod[i];
                let changeVal = 0;
                if (growth > 100){
                    changeVal++;
                    growth -= 100;
                }
                let chance = (Math.random() * 100) + 1;
                if (chance <= growth){
                    changeVal++;
                }
                if (changeVal > 0){
                    currStats[i] += changeVal;
                    document.getElementById("statVal" + i).innerHTML = (currStats[i] + " + " + changeVal);
                } else {
                    document.getElementById("statVal" + i).innerHTML = (currStats[i]);
                }
            } else {
                document.getElementById("statVal" + i).innerHTML = (currStats[i]);
            }
        }
        if (currLevel == maxLevel && !canPromote){
            document.getElementById("levelUp").hidden = true;
        }
        if (currLevel >= 10 && canPromote){
            document.getElementById("promote").hidden = false;
        }
    } else if (currLevel == maxLevel && canPromote){
        promote();
    }
}

//Advances a character to their promoted class, changing their class, resetting their level, and applying stat
// bonuses
function promote() {
    currLevel = 1;
    document.getElementById("currentLevel").innerHTML = "Lv " + currLevel;
    document.getElementById("currentClass").innerHTML = promotion;
    for (var i = 0; i < numStats; i++){
        currStats[i] += promotionBonuses[i];
        document.getElementById("statVal" + i).innerHTML = (currStats[i] + " + " + promotionBonuses[i]);
    }
    canPromote = false;
    document.getElementById("promote").hidden = true;
}

