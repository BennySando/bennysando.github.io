let currLevel;
let canPromote;
let promotion;
let currStats;
let currGrowths;
let promotionBonuses;
let unpromotedCaps;
let promotedCaps;
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
    let numStats = 8;
    for (var i = 0; i < numStats; i++){
        document.getElementById("statVal" + i).innerHTML = currStats[i];
    }
    currGrowths = currCharacter.growthRates;
    promotionBonuses = currCharacter.promotionGains;
    unpromotedCaps = currCharacter.unpromotedCaps;
    promotedCaps = currCharacter.promotedCaps;
    if (currCharacter.knightWard != undefined){
        document.getElementById("wardMod").hidden = false;
        document.getElementById("wardLabel").hidden = false;
    } else {
        document.getElementById("wardMod").hidden = true;
        document.getElementById("wardLabel").hidden = true;
        document.getElementById("noMod").checked = true;
    }
}
