let allpeople = [];
let Allteams = [];
let randomPeople;
let randomTeams;
let previousName;
let previousTeam;
let pickedPeople = new Set();
let pickedTeams = new Set();

// add people

function peopleDuplicate () {
    for (let i = 0; i < allpeople.length; i++) {
        if (allpeople[i] == document.getElementById('peopleInput').value) {
            alert('This person is already in the list, please add another person!');
            return true;
        }
    }
    return false;
}

document.getElementById('addPeople').addEventListener('click', function() {

    let addPeople = document.getElementById('peopleInput');

    if(addPeople.value != '' && peopleDuplicate() == false){
        allpeople.push(addPeople.value);

        document.getElementById('peopleList').innerHTML = '';

        addPeople.value = '';

        for(let i = 0; i < allpeople.length; i++){

            document.getElementById('peopleList').innerHTML += '<li>' + allpeople[i] + '</li>';

        }

    }

});

// add teams

function teamDuplicate(){
    for (let i = 0; i < Allteams.length; i++) {
        if (Allteams[i] == document.getElementById('teamsInput').value) {
            alert('This team is already in the list, please add another team!');
            return true;
        }
    }
    return false;
}

document.getElementById('addTeams').addEventListener('click', function() {

    let addTeams = document.getElementById('teamsInput');

    if(addTeams.value != '' && teamDuplicate() == false){

        Allteams.push(addTeams.value);

        document.getElementById('teamsList').innerHTML = '';

        addTeams.value = '';

        for(let i = 0; i < Allteams.length; i++){

            document.getElementById('teamsList').innerHTML += '<li>' + Allteams[i] + '</li>';

        }

    }

});

// randomize name and team

function preventDuplicate() {
    if (allpeople.length == 0 || Allteams.length == 0) {
        alert('Please add people and teams to the list!');
    } 

    do {
        randomPeople = allpeople[Math.floor(Math.random() * allpeople.length)];
        randomTeams = Allteams[Math.floor(Math.random() * Allteams.length)];
    } while (randomPeople === previousName && randomTeams === previousTeam || pickedPeople.has(randomPeople) && pickedTeams.has(randomTeams))

    pickedPeople.add(randomPeople);
    pickedTeams.add(randomTeams);
    previousName = randomPeople;
    previousTeam = randomTeams;

    document.getElementById('currentName').innerHTML = randomPeople;
    document.getElementById('currentTeam').innerHTML = randomTeams;

    if(pickedPeople.size === allpeople.length && pickedTeams.size === Allteams.length) {
        console.log("All Combinations are Made!");
        // reset process here
        pickedPeople.clear();
        pickedTeams.clear();
        previousName = null;
        previousTeam = null;
    }
};

document.getElementById('randomize').addEventListener('click', preventDuplicate);