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

async function getFile(){
    const URL = "https://bennysando.github.io/masterList.json";
    const request = new Request(URL);
    const response = await fetch(request);
    const file = response.json();
    return file;
}

async function setUp(characterVal){
    let masterFile = await getFile();
    let currCharacter = masterFile["pathOfRadiance"][characterVal];
    document.getElementById("charImage").src = currCharacter.profilePic; 
    document.getElementById("currentClass").innerHTML = currCharacter.baseClass;
    currLevel = currCharacter.baseLevel;
    document.getElementById("currentLevel").innerHTML = "Lv " + currLevel;
    canPromote = currCharacter.canPromote;
    if (currLevel >= 10 && canPromote){
        document.getElementById("promote").hidden = false;
    } else {
        document.getElementById("promote").hidden = true;
    }
    if (canPromote){
        promotion = currCharacter.promotedClass;
    }
    currStats = currCharacter.baseStats;
    for (var i = 0; i < numStats; i++){
        document.getElementById("statVal" + i).innerHTML = currStats[i];
    }
    currGrowths = currCharacter.growthRates;
    promotionBonuses = currCharacter.promotionGains;
    unpromotedCaps = currCharacter.unpromotedCaps;
    promotedCaps = currCharacter.promotedCaps;
    document.getElementById("noMod").checked = true;
    if (currCharacter.knightWard != undefined){
        document.getElementById("wardMod").hidden = false;
        document.getElementById("wardLabel").hidden = false;
    } else {
        document.getElementById("wardMod").hidden = true;
        document.getElementById("wardLabel").hidden = true;
    }
}

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
            }
        }
        if (currLevel == maxLevel && !canPromote){
            document.getElementById("levelUp").hidden = true;
        }
        if (currLevel >= 10){
            document.getElementById("promote").hidden = false;
        }
    } else if (currLevel == maxLevel && canPromote){
        promote();
    }
}

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

