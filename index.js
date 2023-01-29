let allpeople = [];
let Allteams = [];
let randomPeople;
let randomTeams;
let history = [];

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
        localStorage.setItem("allpeople", JSON.stringify(allpeople));
    
        document.getElementById('peopleList').innerHTML = '';
    
        addPeople.value = '';
    
        for(let i = 0; i < allpeople.length; i++){
    
            document.getElementById('peopleList').innerHTML += '<li>' + allpeople[i] + '</li>';
    
        }
    
    }

});

document.getElementById('peopleList').addEventListener('click', function(e) {
    if (e.target && e.target.nodeName == 'LI') {
      let index = allpeople.indexOf(e.target.innerHTML);
      if (index > -1) {
        allpeople.splice(index, 1);
      }
      e.target.remove();
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
        localStorage.setItem("Allteams", JSON.stringify(Allteams));
    
        document.getElementById('teamsList').innerHTML = '';
    
        addTeams.value = '';
    
        for(let i = 0; i < Allteams.length; i++){
    
            document.getElementById('teamsList').innerHTML += '<li>' + Allteams[i] + '</li>';
    
        }
    
    }
    

});

document.getElementById('teamsList').addEventListener('click', function(e) {
    if (e.target && e.target.nodeName == 'LI') {
      let index = Allteams.indexOf(e.target.innerHTML);
      if (index > -1) {
        Allteams.splice(index, 1);
      }
      e.target.remove();
    }
  });
  

// randomize name and team

document.getElementById('randomize').addEventListener('click', function randomize() {
    if (allpeople.length < 2 || Allteams.length === 0) {
    alert('Please add atleast 2 people and teams first!');
    return;
    }
    
    let randomPeople1 = allpeople[Math.floor(Math.random() * allpeople.length)];
    let randomPeople2 = allpeople[Math.floor(Math.random() * allpeople.length)];
    
    while (randomPeople1 === randomPeople2) {
    randomPeople2 = allpeople[Math.floor(Math.random() * allpeople.length)];
    }
    
    randomTeams = Allteams[Math.floor(Math.random() * Allteams.length)];
    
    document.getElementById('result').innerHTML =
    'Team: ' +
    randomTeams +
    '<br>' +
    'People: ' +
    randomPeople1 +
    ' and ' +
    randomPeople2;
    
    localStorage.setItem(
    'Random People and Team',
    JSON.stringify({
    people: [randomPeople1, randomPeople2],
    team: randomTeams
})
);

    history.push('Team: ' + randomTeams + ' People: ' + randomPeople1 + ' and ' + randomPeople2 + '<br>');

    document.getElementById('history').innerHTML = history;

    localStorage.setItem(
        'history',
        JSON.stringify({
        people: [randomPeople1, randomPeople2],
        team: randomTeams
    })
    );
    
    });

    window.onload = function() {
        if (localStorage.getItem('allpeople') && localStorage.getItem('Allteams')) {
            allpeople = JSON.parse(localStorage.getItem('allpeople'));
            Allteams = JSON.parse(localStorage.getItem('Allteams'));
            document.getElementById('peopleList').innerHTML = '';
            for(let i = 0; i < allpeople.length; i++){
                document.getElementById('peopleList').innerHTML += '<li>' + allpeople[i] + '</li>';
            }
    
            document.getElementById('teamsList').innerHTML = '';
            for(let i = 0; i < Allteams.length; i++){
                document.getElementById('teamsList').innerHTML += '<li>' + Allteams[i] + '</li>';
            }
        }

        if (localStorage.getItem('Random People and Team')) {
            const randomPeopleAndTeam = JSON.parse(
            localStorage.getItem('Random People and Team') || '{}'
            );
            document.getElementById('result').innerHTML =
            'Team: ' +
            randomPeopleAndTeam.team +
            '<br>' +
            'People: ' +
            randomPeopleAndTeam.people[0] +
            ' and ' +
            randomPeopleAndTeam.people[1];
            
        }

        if (localStorage.getItem('history')) {
            const history = JSON.parse(
            localStorage.getItem('history') || '{}'
            );
            document.getElementById('history').innerHTML =
            'Team: ' +
            history.team +
            '<br>' +
            'People: ' +
            history.people[0] +
            ' and ' +
            history.people[1];
            
        }
    };
    
document.getElementById('reset').addEventListener('click', function() {
    localStorage.clear();
    location.reload();
});
