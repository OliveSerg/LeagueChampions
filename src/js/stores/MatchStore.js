import {EventEmitter} from 'events'
import dispatcher from "../dispatcher"

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
      let championJPGString = championPNGString.replace(/.png$/,'_0.jpg')
      let imageURL =`http://ddragon.leagueoflegends.com/cdn/${this.champions.version}/img/champion/`
      return {
        large: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championJPGString}`,
        small: imageURL + championPNGString
      }
    }

    getMatches(){
      return this.matches
    }

    getSummoner(){
      return this.summoner
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

    receiveSummoner(responses) {
      const summoner = {
        summonerId: responses[0].data.summonerId,
        championsStat: responses[0].data.champions,
        rankInfo: responses[1].data[responses[0].data.summonerId]
      }
      this.summoner = summoner
      this.emit('change')
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
        case "SUMMONER": {
          this.receiveSummoner(action.data)
          break
        }
      }
    }
}

const matchStore = new MatchStore
dispatcher.register(matchStore.handleActions.bind(matchStore))
export default matchStore
