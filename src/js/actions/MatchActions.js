import dispatcher from "../dispatcher"
import axios from "axios"
import key from "../data/api-key"
import Promise from "promise"

const urlMatches = 'https://na.api.pvp.net/observer-mode/rest/featured?api_key='
const urlChampions = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?dataById=true&champData=image&api_key='

export function loadMatches(){
  var requests = [
    axios.get(urlMatches + key.key), axios.get(urlChampions + key.key)
  ];
  Promise.all(requests).then((responses)=> {
    dispatcher.dispatch({
      type: "RECEIVE",
      data: responses
    })
  })
}

export function getChampions(){
    axios.get(urlChampions + key.key).then((response)=>{
        dispatcher.dispatch({
            type: "CHAMPIONS",
            data: response.data
        })
    })
}

export function reloadMatches(){
  axios.get(urlMatches + key.key).then((response)=>{
   dispatcher.dispatch({
     type: "RELOAD",
     data: response.data
   })
  })
}

export function getSummoner(name, region){
  if (name.match(/^[a-zA-Z\\0-9\\p{L} _\\.]+$/)) {
    const urlSummonerByName = `https://${region}.api.pvp.net/api/lol/${region}/v1.4/summoner/by-name/${name}?api_key=`
    axios.get(urlSummonerByName + key.key).then((response)=>{
      const {id} = response.data[name.toLowerCase()]
      const urlSummonerSummary = `https://${region}.api.pvp.net/api/lol/${region}/v1.3/stats/by-summoner/${id}/ranked?&api_key=`
      const urlSummonerRank = `https://${region}.api.pvp.net/api/lol/${region}/v2.5/league/by-summoner/${id}/entry?&api_key=`

      var requests = [axios.get(urlSummonerSummary + key.key), axios.get(urlSummonerRank + key.key)]
      Promise.all(requests).then((responses)=>{
        dispatcher.dispatch({
          type: 'SUMMONER',
          data: responses
        })
      })
    })
  }
}
