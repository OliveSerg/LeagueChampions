import {EventEmitter} from 'events'
import dispatcher from "../dispatcher"
import axios from "axios"
import key from "../api-key"
import Promise from "promise"

const urlMatches = 'https://na.api.pvp.net/observer-mode/rest/featured?api_key='
const imageURL = 'http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/'
const urlChampions = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?dataById=true&champData=image&api_key='



class MatchStore extends EventEmitter {
    constructor() {
        super()
        var requests = [
          axios.get(urlMatches + key.key), axios.get(urlChampions + key.key)
        ];
        Promise.all(requests).then((responses)=> {
          this.matches = responses[0].data
          this.champions = responses[1].data.data
          this.applyImageURL()
          console.log(this);
        }).catch((err)=>{
          console.log(err);
        });
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
      let championPNGString = this.champions[championId].image.full
      return (imageURL + championPNGString)
    }

    reloadMatches(data) {
      this.matches = data
      this.applyImageURL()
      this.emit("change")
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
