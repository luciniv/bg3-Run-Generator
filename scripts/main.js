var ran1 = true, ran2 = true, ran3 = true, 
    ran4 = true, ran5 = true, ran6 = true,
    multiclass = false;

var prev_tav = {index: -1}, prev_gm = {index: -1}, prev_goal = {index: -1}, 
    prev_class = {index: -1}, prev_challenge = {index: -1}, prev_flavor = {index: -1};

const lock1 = document.getElementById("lock1");
const lock2 = document.getElementById("lock2");
const lock3 = document.getElementById("lock3");
const lock4 = document.getElementById("lock4");
const lock5 = document.getElementById("lock5");
const lock6 = document.getElementById("lock6");

const cat1 = document.getElementById("cat1");
const cat2 = document.getElementById("cat2");
const cat3 = document.getElementById("cat3");
const cat4 = document.getElementById("cat4");
const cat5 = document.getElementById("cat5");
const cat6 = document.getElementById("cat6");

const super_title1 = document.getElementById("super_title1");
const super_title2 = document.getElementById("super_title2");
const super_title3 = document.getElementById("super_title3");
const super_title4 = document.getElementById("super_title4");
const super_title5 = document.getElementById("super_title5");
const super_title6 = document.getElementById("super_title6");

const rand = document.getElementById("randomize");
const hint = document.getElementById("hint");

const colors = [
    '#D6B5DC',
    '#D2AEDC',
    '#C8A5D6',
    '#B29ED1',
    '#93A3DC',
    '#7DA0E1',
    '#869AE6',
    '#8C93EC',
    '#9C95E6',
    '#AB97DF',
    '#9B87CC',
    '#b7a3eb',
    '#A29FE9',
    '#8D9DEB'
];

const tav = [
    "Durge",
    "Durge",
    "High Elf",
    "Wood Elf",
    "Asmodeus Tiefling", 
    "Mephistopheles Tiefling",
    "Zariel Tiefling",
    "Lolth-Sworn Drow",
    "Seldarine Drow",
    "Human",
    "Human",
    "Githyanki",
    "Githyanki",
    "Hill Dwarf",
    "Mountain Dwarf",
    "Duergar",
    "High Half-Elf",
    "Wood Half-Elf",
    "Drow Half-Elf",
    "Lightfoot Halfling",
    "Strongheart Halfling",
    "Rock Gnome",
    "Forest Gnome",
    "Deep Gnome",
    "Metallic Dragonborn",
    "Chromatic Dragonborn",
    "Half-Orc",
    "Half-Orc"
];

const game_modes = [
    "Explorer",
    "Balanced",
    "Tactician",
    "Honor",
    "Custom - Single Save",
    "Custom - Enemy Aggression: Tactician",
    "Custom - Enemy Loadouts: Tactician",
    "Custom - Character Power: Tactician",
    "Custom - Camp Cost Multiplier: 0.5",
    "Custom - Camp Cost Multiplier: 2",
    "Custom - Camp Cost Multiplier: 3",
    "Custom - Trader Price Modifier: 1",
    "Custom - Short Rest Full Heal",
    "Custom - Hide Check Difficulty Class",
    "Custom - Randomized"
];

const goal = [
    "Friendly With All Companions",
    "Hated By All Companions",
    "Explore Everything",
    "Speedrun",
    "Good Endings",
    "Bad Endings",
    "Maximize Your Build",
    "Maximize Casting Stat",
    "Multiclass 3 Times",
    "Multiclass 4 Times",
    "Betray The Bad Guy",
    "Betray The Good Guy",
    "Hunt Down Evil",
    "Find Unique Loot",
    "Complete All Quests",
    "Kill The Fewest Enemies",
    "Talk To Avoid Combat",
    "Become Immortal",
    "Maximize Summons"
];

const classes = [
    "Barbarian",
    "Bard",
    "Cleric",
    "Druid",
    "Fighter",
    "Monk",
    "Paladin",
    "Ranger",
    "Rogue",
    "Sorcerer",
    "Warlock",
    "Wizard"
];

const challenge = [
    "Minimize Longrests",
    "No Deception / Persuasion",
    "Solo Run",
    "No Stealing",
    "Always Speak Rudely",
    "Always Speak Kindly",
    "Become Illithid",
    "No Tadpoles",
    "Only Ranged Attacks",
    "One Class Only Party",
    "Steal Everything You Can",
    "No Respeccing",
    "No Revivify",
    "No Lockpicking",
    "No Inspirations",
    "Kill All Beasts",
    "Pick Dialogue Randomly",
    "Always Pick Option 1",
    "Always Pick The Last Option",
    "No Savescumming"
];

const flavor = [
    "Your memory is foggy, how did you get here?",
    "Hunting feyish magic...",
    "Someone wants you dead...",
    "Searching for a long lost loved one...",
    "Searching for treasure and glory...",
    "Underdark merchant with a darker past...",
    "Bound by mercy...",
    "Bound by a divine contract...",
    "Become one with the storm...",
    "Become one with the flame...",
    "Become one with the mind...",
    "Your god guides you...",
    "Your god has forsaken you...",
    "You are attuned to the cold...",
    "You are attuned to the dead...",
    "Reckless and impulsive...",
    "Cautious and quiet...",
    "Deserter of an unjust war...",
    "A guard without their post...",
    "Searching for new stories...",
    "You enjoy the little things...",
    "Here for a short time, but a good time...",
    "Crippling alcoholism...",
    "Finders keepers...",
    "You see it? You eat it...",
    "Becoming something different...",
    "Your mother wouldn't recognize you...",
    "Foolish and gullible...",
    "You fight dirty..."
];

function toggle(toggleLock) {
    toggleLock.classList.toggle("dim");
}

// FIXME needs implemented
function mixClass(cat, options) {
    var index1 = Math.floor(Math.random() * options.length);
    var index2 = Math.floor(Math.random() * options.length);
    if (index1 == index2) {
        if (index1 == (options.length - 1)) {
            index1 = 0;
        }
        else {
            index1 += 1;
        }
    }
    var level1 = (Math.floor(Math.random() * 12)) + 1;
    var level2 = 12 - level1;
    cat.textContent = options[index1] + " " + level1 + ", " + options[index2] + " " + level2;
}

function choose(cat, options, super_title, prev_index) {
    var index = Math.floor(Math.random() * options.length);
    var color_index = Math.floor(Math.random() * colors.length);
    if (cat.classList.contains("title")) {
        cat.classList.remove("title");
        cat.classList.add("options");
    }
    if (super_title.classList.contains("hide")) {
        super_title.classList.toggle("appear");
        super_title.classList.remove("hide");
    }
    if (hint.classList.contains("hide")) {
        hint.classList.toggle("appear");
        hint.classList.remove("hide");
    }
    cat.style.color = colors[color_index];

    if (index == prev_index.index) {
        if (index == (options.length - 1)) {
            index = 0;
        }
        else {
            index += 1;
        }
    }
    prev_index.index = index;
    cat.textContent = options[index];
}

super_title4.onclick = () => {
    if (multiclass) {
        super_title4.textContent = "CLASS";
        multiclass = false;
    }
    else {
        super_title4.textContent = "MULTICLASS";
        multiclass = true;
    }
}

rand.onclick = () => {
    if (ran1) {
        choose(cat1, tav, super_title1, prev_tav);
    }
    if (ran2) {
        choose(cat2, game_modes, super_title2, prev_gm);
    }
    if (ran3) {
        choose(cat3, goal, super_title3, prev_goal);
    }
    if (ran4) {
        if (multiclass) {
            mixClass(cat4, classes);
        }
        else {
            choose(cat4, classes, super_title4, prev_class);
        }
    }
    if (ran5) {
        choose(cat5, challenge, super_title5, prev_challenge);
    }
    if (ran6) {
        choose(cat6, flavor, super_title6, prev_flavor);
    }
};

cat1.onclick = () => {
    if (ran1) {
        choose(cat1, tav, super_title1, prev_tav);
    }
};

cat2.onclick = () => {
    if (ran2) {
        choose(cat2, game_modes, super_title2, prev_gm);
    }
};

cat3.onclick = () => {
    if (ran3) {
        choose(cat3, goal, super_title3, prev_goal);
    }
};

cat4.onclick = () => {
    if (ran4) {
        if (multiclass) {
            mixClass(cat4, classes);
        }
        else {
            choose(cat4, classes, super_title4, prev_class);
        }
    }
};

cat5.onclick = () => {
    if (ran5) {
        choose(cat5, challenge, super_title5, prev_challenge);
    }
};

cat6.onclick = () => {
    if (ran6) {
        choose(cat6, flavor, super_title6, prev_flavor);
    }
};

lock1.onclick = () => {
    toggle(lock1);
    if (ran1) {
        ran1 = false;
    }
    else {
        ran1 = true;
    }
};

lock2.onclick = () => {
    toggle(lock2);
    if (ran2) {
        ran2 = false;
    }
    else {
        ran2 = true;
    }
};

lock3.onclick = () => {
    toggle(lock3);
    if (ran3) {
        ran3 = false;
    }
    else {
        ran3 = true;
    }
};

lock4.onclick = () => {
    toggle(lock4);
    if (ran4) {
        ran4 = false;
    }
    else {
        ran4 = true;
    }
};

lock5.onclick = () => {
    toggle(lock5);
    if (ran5) {
        ran5 = false;
    }
    else {
        ran5 = true;
    }
};

lock6.onclick = () => {
    toggle(lock6);
    if (ran6) {
        ran6 = false;
    }
    else {
        ran6 = true;
    }
};
