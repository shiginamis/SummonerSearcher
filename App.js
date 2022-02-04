import React, { useState } from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom';
import './App.css';

const App = () =>{

  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const [matchData, setMatchData] = useState({});
  const [infoData, setInfoData] = useState({});
  const riotKey = 'RGAPI-e762752b-04d3-4b5d-9f87-5a6a7d41ff9d';


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




const matchHistory = (event) =>{
  var APIMatchCallString = "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?api_key=" + riotKey;
  Axios.get(APIMatchCallString).then(function (response){
    setMatchData(response.data);
  }).catch(function (error){
    // Error
    console.log(error);
  })
}

const matchid = matchData.startTime;


const matchInfo = (event) =>{
  var APIInfoCallString = "https://europe.api.riotgames.com/lol/match/v5/matches" + matchid + "/?api_key=" + riotKey;
    Axios.get(APIInfoCallString).then(function (response){
      setInfoData(response.data);
    }).catch(function (error){
      console.log(error)
    })

}



console.log(playerData);
 console.log(matchData);
 console.log(infoData);




const searchOnClick = (event) => {

  var inpps = document.getElementById('inpp');
  inpps.addEventListener("keyup", function(event) {
    if(event.keyCode === 13){
      event.preventDefault();
      document.getElementById('inpp').click();
    }

  })
}


  return(
    <div className="app">
      <div className="container">
        <h1>Summoner Searcher</h1>
        <input id="inpp" type="text" onChange={e => setSearchText(e.target.value)}></input>
        <button id="butt" onClick={e  => { searchForPlayer(e);  matchHistory(e); matchInfo(e); searchOnClick()}}>Search</button>
      </div>

      {JSON.stringify(playerData) != '{}' ? 
      <>
         <p>{playerData.name}</p>
         <img width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/12.3.1/img/profileicon/" + playerData.profileIconId + ".png"}></img>
         <p>Summoner Level: {playerData.summonerLevel}</p>
         </>   
          : 
          <><p>No player data</p></>
    }

    {JSON.stringify(matchData) != '{}' ? 
    <>
      <p>Matches{matchData.startTime}</p>
    </>
      :
      <><p>No match data</p></>
  }

  
  {JSON.stringify(matchInfo) != '{}' ?
  <>
  <p>{infoData.gameDuration}</p>
  </>
    :
    <><p>No info about matches</p></>


}


    </div>
    );
}



export default App;


