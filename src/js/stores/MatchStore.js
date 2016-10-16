import {EventEmitter} from 'events'
import dispatcher from "../dispatcher"
import axios from "axios"
import key from "../api-key"

const urlMatches = 'https://na.api.pvp.net/observer-mode/rest/featured?api_key='
const imageURL = 'http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/'

const urlChampions = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?dataById=true&champData=image&api_key='



class MatchStore extends EventEmitter {
    constructor() {
        super()
        this.matches  = this.getMatches()
        this.champions = this.getChampionsImages()
    }

    getMatches(){
      axios.get(urlMatches + key.key)
      .then((response) =>{
        console.log(response.data)
        return response.data
      })
    }

    getChampionsImages(){
      axios.get(urlChampions + key.key)
      .then((response) =>{
        console.log(response.data)
        return response.data
      })
    }

    reloadMatches() {
      this.matches = getMatches()
      this.emit("change", this.matches)
    }

    handleActions(action){
      switch(action.type){
        case "RELOAD": {
          thi.reloadMatches()
          break
        }
      }
    }
}

const matchStore = new MatchStore
dispatcher.register(matchStore.handleActions.bind(matchStore))
export default matchStore
