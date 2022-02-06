import React, { useState } from 'react';
import Axios from 'axios';
import {Button, TextField, Avatar} from '@material-ui/core';
import './App.css';

const App = () =>{

  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const [matchData, setMatchData] = useState({});
  const [infoData, setInfoData] = useState({});
  const [rankData, setRankData] = useState({});
  //const [masteryData, setMasteryData] = useState({});
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




/*const champMastery = (event) => {
  var apiMasteryCallString = "/lol/champion-mastery/v4/champion-masteries/by-summoner/" + summonerId + "?api_key=" + riotKey;
  Axios.get(apiMasteryCallString).then(function(response) {
    setMasteryData(response.data);
  }).catch(function(error){
    console.log(error);
  })
}
*/






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





const matchInfo = (event) =>{
  var APIInfoCallString = "https://europe.api.riotgames.com/lol/match/v5/matches/"  + matchData[0] +  "/?api_key=" + riotKey;
    Axios.get(APIInfoCallString).then(function (response){
      setInfoData(response.data);
    }).catch(function (error){
      console.log(error)
    })

}




console.log(playerData);
console.log(rankData);
console.log(infoData);

  /*  const listMatches = () => {
  matchData.forEach(function(matchid){console.log(matchid)})
}
*/


  return(
    <div className="app">
      <div className="container">
        <h1>Summoner Searcher</h1>
        <TextField  id="inpp" type="text" onChange={e => setSearchText(e.target.value)}></TextField>
        <Button variant='text' color='success' size='large'    id="butt" onClick={e  => { searchForPlayer(e);  matchHistory(e); matchInfo(e); leagueRank(e);}}>Search</Button>
      </div>

      {JSON.stringify(playerData) !== '{}' ? 
      <div className="playerData">
         <p>{playerData.name}</p>
         <Avatar sx={{ width: 100, height: 100}} alt={playerData.profileIconId} width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/12.3.1/img/profileicon/" + playerData.profileIconId + ".png"}></Avatar>
         <p>{playerData.summonerLevel}</p>
         </div>   
          : 
          <div><p>No player data</p></div>
    }

    {JSON.stringify(matchData) !== '{}' ? 
    <div>
      <p> {/*listMatches() */ }  </p> 
    </div>
      :
      <div><p>No match data</p></div>
  }

  
  {JSON.stringify(infoData) !== '{}' ?
  <div className="participants"> 
  {infoData.info.participants.map(({participants, kills, deaths, assists , summonerName}) => 
  
  (<p key={participants}><table align="center">
    <tr>
      <th style={{}}>Name</th>
      <th>Kills</th>
      <th>Deaths</th>
      <th>Assists</th>
    </tr>
    <tr>
      <td>{summonerName}</td>
      <td>{kills}</td>
      <td>{deaths}</td>
      <td>{assists}</td>
    </tr>
      </table></p>))}


  
  </div>
    :
    <div><p>No info about matches</p></div>


}








{JSON.stringify(rankData) !== '{}' ? 
      <div>
         <p>Rank: {rankData[0].tier} {rankData[0].rank}</p>
         <p>winrate {(rankData[0].wins / (rankData[0].wins + rankData[0].losses)) * 100}</p>
         <p>number of solo q games: {rankData[0].wins + rankData[0].losses}</p>
         </div>   
          : 
          <div><p>No rank data</p></div>
    }



    {/*JSON.stringify(masteryData) !== '{}' ? 
    <div>
       <p>{masteryData[masteryData[0]].championId}         {masteryData[0].chamionLevel}</p>
       <p>{masteryData[0].championPoints}</p>
       </div>   
        : 
        <div><p>No mastery data</p></div>
  */}




    </div>
    );
}



export default App;



/* 
 
      <ul>

      {matchData.map(matchid   => {
        return<li>{matchid[]}</li>
      })}
    
    </ul> 
      */