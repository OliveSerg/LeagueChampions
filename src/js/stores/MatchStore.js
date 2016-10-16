import {EventEmitter} from 'events'
import dispatcher from "../dispatcher"
import axios from "axios"
import _ from "lodash"
import key from "../api-key"

const urlMatches = 'https://na.api.pvp.net/observer-mode/rest/featured?api_key='
const imageURL = 'http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/'

const urlChampions = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?dataById=true&champData=image&api_key='



class MatchStore extends EventEmitter {
    constructor() {
        super()
        this.matches  = this.getMatches()
        this.champions = this.getChampions()
    }

    getMatches(){
      axios.get(urlMatches + key.key)
      .then((response) =>{
        return response.data
      })
    }

    applyImageURL(){
      this.matches.gameList.forEach((game)=>{
        if (game.bannedChampions.length > 0) {
          game.bannedChampions.forEach((champBanned)=>{
            champBanned.imageURL = this.getChampionImgURL(champBanned.id)
            console.log(playerChamp);
          })
        }
        game.participants.forEach((playerChamp)=>{
          playerChamp.imageURL = this.getChampionImgURL(playerChamp.id)
          console.log(playerChamp);
        })
      })
    }

    getChampionImgURL(championId){
      let championPNGString = this.champions[championId].image.full
      return (imageURL + championPNGString)
    }

    getChampions(){
      axios.get(urlChampions + key.key)
      .then((response) =>{
        return response.data
      })
    }

    reloadMatches(data) {
      this.matches = data
      this.applyImageURL()
      this.emit("change", this.matches)
    }

    handleActions(action){
      switch(action.type){
        case "RELOAD": {
          this.reloadMatches(action.data)
          break
        }
      }
    }
}

const matchStore = new MatchStore
dispatcher.register(matchStore.handleActions.bind(matchStore))
export default matchStore
