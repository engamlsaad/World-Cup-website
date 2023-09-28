let stand = document.getElementById("standings");
let matchs = document.getElementById("matches");
let token = "5f033f1ec2ef4cd088a727e6fb881e0c";
let baseUrl = "https://api.football-data.org/v4/competitions/2001";
function getStandings() {
    let url = `${baseUrl}/standings`;
    axios.get(url, {
        headers: {
            "X-Auth-Token": token
        }
    }).then((response) => {
        let standings = response.data.standings;
        console.log(response.data)
        stand.innerHTML = "";
        for(let standing of standings) {
            let tableContent = "";
            for(let row of standing.table) {
                tableContent += `
                <li class="list-group-item">
                            <div class="row m-0 w-100">
                                <div class="col-sm-4 d-flex align-items-center justify-content-center">
                                    <span class="flag">
                                    <img src="${row.team.crest}" alt="flag"/>
                                    </span>
                                    <span class="name fw-bold fs-4 ms-1">${row.team.tla}</span>
                                </div>
                                <div class="col-sm-2 text-center">
                                    ${row.won}
                                </div>
                                <div class="col-sm-2 text-center">
                                    ${row.lost}
                                </div>
                                <div class="col-sm-2 text-center">
                                ${row.draw}
                                </div>
                                <div class="col-sm-2 text-center">
                                    ${row.points}
                                </div>
                            </div>
                          </li>
                `
                
            }
            let content = `
            <div class="col-sm-6">
                    <div class="card shadow border-none">
                        <div class="card-header text-center fw-bold">
                            ${standing.group}
                        </div>
                        <div class="row card-head w-100 m-0">
                            <div class="col-sm-4 text-center">
                                team
                            </div>
                            <div class="col-sm-2 text-center">
                                W
                            </div>
                            <div class="col-sm-2 text-center">
                                L
                            </div>
                            <div class="col-sm-2 text-center">
                                D
                            </div>
                            <div class="col-sm-2 text-center">
                                Pts
                            </div>
                        </div>
                        <ul class="list-group list-group-flush">
                        ${tableContent}
                        </ul>
                      </div>
                </div>
            `
            
            stand.innerHTML += content
        }
    })
}
getStandings();

function getMatches() {
    let url = `${baseUrl}/matches`;
    axios.get(url, {
        headers: {
            "X-Auth-Token": token
        }
    }).then((response) => {
        let matches = response.data.matches
        console.log(matches);
        matchs.innerHTML = "";
        for(let match of matches) {
            let utcDate = match.utcDate;
            let matchTime = new Date(utcDate);
            let matchYear = `${matchTime.getUTCFullYear()} / ${matchTime.getUTCMonth() + 1} / ${matchTime.getUTCDate()} ${matchTime.getUTCHours()}:${matchTime.getUTCMinutes()}:${matchTime.getUTCSeconds()}`;
            if(match.group == null) {
                continue
            }
            let content = `
            <div class="col-sm-12">
                   <div class="card shadow rounded-pill" style="overflow: hidden;">
                    <div class="card-body p-0">
                        <div class="row" style="height: 120px;">
                            <div class="col-sm-3 left d-flex justify-content-center align-items-center flex-column">
                                <span class="flag">
                                <img src="${match.homeTeam.crest}" alt="flag"/>
                                </span>
                                <span class="name fw-bold fs-4 text-light">${match.homeTeam.tla}</span>
                            </div>
                            <div class="col-sm-6 text-center mid">
                            <div class="row">
                            <div class="col-sm-4" style="margin: auto 0;">
                                <h3>${match.score.fullTime.home ?? "-"}</h3>
                            </div>
                            <div class="col-sm-4 d-flex flex-column" style="margin: auto 0;">
                                <span>${match.group}</span>
                                <span class="fs-1">X</span>
                                <span>${matchYear}</span>
                            </div>
                            <div class="col-sm-4" style="margin: auto 0;">
                            <h3>${match.score.fullTime.away ?? "-"}</h3>
                            </div>
                        </div>
                            </div>
                            <div class="col-sm-3 right d-flex justify-content-center align-items-center flex-column">
                                <span class="flag">
                                <img src="${match.awayTeam.crest}" alt="flag"/>
                                </span>
                                <span class="name fw-bold fs-4 text-light">${match.awayTeam.tla}</span>
                            </div>
                        </div>
                    </div>
                   </div> 
                </div>
            `
            matchs.innerHTML += content;
        }
    })
}
getMatches()

