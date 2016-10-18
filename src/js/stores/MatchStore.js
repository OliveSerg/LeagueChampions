import {EventEmitter} from 'events'
import dispatcher from "../dispatcher"
import axios from "axios"
import key from "../api-key"
import Promise from "promise"

class MatchStore extends EventEmitter {
    constructor() {
        super()
    }

    applyImageURL(){
      this.matches.gameList.forEach((game)=>{
        if (game.bannedChampions.length > 0) {
          game.bannedChampions.forEach((champBanned)=>{
            champBanned.imageURL = this.getChampionImgURL(champBanned.championId)
          })
        }
        game.participants.forEach((playerChamp)=>{
          playerChamp.imageURL = this.getChampionImgURL(playerChamp.championId)
        })
      })
    }

    getChampionImgURL(championId){
      let championPNGString = this.champions.data[championId].image.full
      let imageURL =`http://ddragon.leagueoflegends.com/cdn/${this.champions.version}/img/champion/`
      return {
        large: `${imageURL}loading/${championPNGString}`,
        small: imageURL + championPNGString
      }
    }

    getMatches(){
      return this.matches
    }

    reloadMatches(data) {
      this.matches = data
      this.applyImageURL()
      this.emit("change")
    }

    receiveMatches(response) {
      this.matches = response[0].data
      this.champions = response[1].data
      this.applyImageURL()
      this.emit("change")
    }

    handleActions(action){
      switch(action.type){
        case 'RECEIVE':{
          this.receiveMatches(action.data)
          break;
        }
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
