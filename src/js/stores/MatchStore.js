import {EventEmitter} from 'events'
import dispatcher from "../dispatcher"
import axios from "axios"
import key from "../api-key"

const key = key.key
const urlMatches = 'https://na.api.pvp.net/observer-mode/rest/featured?api_key='
const imageURL = 'http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/'

function urlChampion(id){
  return `https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/${id}?champData=image&api_key=`
}


class MatchStore extends EventEmitter {
    constructor() {
        super()
        axios.get(urlMatches + key)
        .then((response) =>{
          response.data.gameList.forEach((gameObj)=>{
            gameObj
          })
          this.matches = response.data
          console.log(response.data);
        })
    }

    getChampionImage(id){
      axios.get(urlChampion(id) + key)
      .then((response) =>{
        console.log(response);
        return imageURL + response.data.image.full
      }
    }

    reloadMatches() {
        this.emit("change")
    }

    handleActions(action){

    }
}

const matchStore = new MatchStore
dispatcher.register(matchStore.handleActions.bind(matchStore))
export default matchStore
