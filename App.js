import React, { useState } from 'react';
import Axios from 'axios';
import './App.css';
import { isSetIterator } from 'util/types';

const App = () =>{

  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const [matchData, setMatchData] = useState({});
  const [infoData, setInfoData] = useState({});
  const [rankData, setRankData] = useState({});
  const [masteryData, setMasteryData] = useState({});
  const riotKey = 'RGAPI-2baee207-ae9b-45be-af85-c07dec9606de';


  const searchForPlayer = (event) =>{
    // set up the correct API Call
    var APICallString = "https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + searchText + "?api_key=" + riotKey;
  Axios.get(APICallString).then(function (response){
    // Success
    setPlayerData(response.data);
  }).catch(function (error){
    // Error
    console.log(error);
  })

}

const puuid = playerData.puuid;
const summonerId = playerData.id;


const champMastery = (event) => {
  var apiMasteryCallString = "/lol/champion-mastery/v4/champion-masteries/by-summoner/" + summonerId + "?api_key=" + riotKey;
  Axios.get(apiMasteryCallString).then(function(response) {
    setMasteryData(response.data);
  }).catch(function(error){
    console.log(error);
  })
}



const leagueRank = (event) => {
var apiRankCallString = "https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + summonerId + "?api_key=" + riotKey;
Axios.get(apiRankCallString).then(function(response){
  setRankData(response.data);
}).catch(function(error){
  console.log(error);
})

}




const matchHistory = (event) =>{
  var APIMatchCallString = "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?api_key=" + riotKey;
  Axios.get(APIMatchCallString).then(function (response){
    setMatchData(response.data);
  })
  .catch(function (error){
    // Error
    console.log(error);
  })
}


const matchid = matchData.count;
var APIInfoCallString = "https://europe.api.riotgames.com/lol/match/v5/matches/EUN1_3053391928" +  + "/?api_key=" + riotKey;



Promise.all([matchData]).then(function(values){
  console.log(values);
})

let requests = matchid.map(id => {
  return new Promise((resolve, reject) => {
     request({
     uri: 'https://europe.api.riotgames.com/lol/match/v5/matches/'+ values + '/?api_key=' + riotKey,
     method: 'GET',
     })
     console.log(requests);
  })
})





const matchInfo = (event) =>{
    Axios.get(APIInfoCallString).then(function (response){
      setInfoData(response.data);
    }).catch(function (error){
      console.log(error)
    })

}




console.log(playerData);
console.log(rankData);
 console.log(infoData);
console.log(champMastery);

  /*  const listMatches = () => {
  matchData.forEach(function(matchid){console.log(matchid)})
}
*/
  return(
    <div className="app">
      <div className="container">
        <h1>Summoner Searcher</h1>
        <input id="inpp" type="text" onChange={e => setSearchText(e.target.value)}></input>
        <button id="butt" onClick={e  => { searchForPlayer(e);  matchHistory(e); matchInfo(e); leagueRank(e); champMastery(e);}}>Search</button>
      </div>

      {JSON.stringify(playerData) !== '{}' ? 
      <div>
         <p>{playerData.name}</p>
         <img alt={playerData.profileIconId} width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/12.3.1/img/profileicon/" + playerData.profileIconId + ".png"}></img>
         <p>Summoner Level: {playerData.summonerLevel}</p>
         </div>   
          : 
          <div><p>No player data</p></div>
    }

    {JSON.stringify(matchData) !== '{}' ? 
    <div>
      <p>Matches  {/*listMatches() */ }  </p> 

      <ol>

      {matchData.map(matchid   => {
        return<li>{matchid}</li>
      })}
   }
    </ol>
    </div>
      :
      <div><p>No match data</p></div>
  }

  
  {JSON.stringify(infoData) !== '{}' ?
  <div>
  <p>Game Duration: {infoData.info.gameDuration / 60} minutes</p>
  <p>K/D/A: {infoData.info.participants[7].kills}/{infoData.info.participants[7].deaths}/{infoData.info.participants[7].assists} </p>
  </div>
    :
    <div><p>No info about matches</p></div>


}


    </div>
    );
}



export default App;





//  input.addEventListener("keyup", function(event){ if(event.keyCode === 13) event.preventDefault(); document.getElementById('butt').click();})}



/* 
 
      <ul>

      {matchData.map(matchid   => {
        return<li>{matchid[]}</li>
      })}
    
    </ul> 
      */