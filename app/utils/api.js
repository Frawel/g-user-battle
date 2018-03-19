let axios = require('axios');


let id = "YOUR_CLIENT_ID";
let sec = "YOUR_SECRET_ID";
let params = "?client_id" + id + "&client_secret=" + sec;

function getPropfile(username) {
    return axios.get('https://api.github.com/users/' + username + params)
        .then(function (user) {
            return user.data;
        })
}

function getRepos(username) {
    return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')
}

function getStartCount(repos) {
    return repos.data.reduce(function (count, repo) {
        return count = repo.startgazers_count;
    }, 0)
}

function calculateScore(profile, repos) {
    let followers = profile.followers;
    let totalStart = getStartCount(repos);

    return (followers * 3) + totalStart;
}

function getUserData(player) {
    return axios.all([
        getPropfile(player),
        getRepos(player)])
        .then((function (data) {
            let profile = data[0];
            let repos = data[1];

            return {
                profile: profile,
                score: calculateScore(profile, repos)
            }
        }))

}

function handleError(error) {
    console.warn(error);

    return null;
}


function sortPlayers(players) {
    return players.sort(function (a, b) {
        return b.score - a.score;
    })
}

module.exports = {
    battle: function (players) {
        return axios.all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError)
    },
    fetchPopularRepos: (language) => {
        let encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');
        return axios.get(encodedURI)
            .then(response => response.data.items);
    }
}