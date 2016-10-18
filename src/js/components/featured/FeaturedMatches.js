import React from 'react';
import _ from "lodash"
import Champion from "./Champions"

export default class FeaturedMatches extends React.Component {
    constructor(props) {
      super()
    }

    filterTeams(){
      let filteredTeams = []
      filteredTeams.push({
        bannedChampions: _.filter(this.props.bannedChampions, {teamId: 100}),
        participants: _.filter(this.props.participants, {teamId: 100})
      })
      filteredTeams.push({
        bannedChampions: _.filter(this.props.bannedChampions, {teamId: 200}),
        participants: _.filter(this.props.participants, {teamId: 200})
      })
      return filteredTeams
    }

    getChampionDiv(championsArray){
      if (championsArray) {
        return championsArray.map((champion)=>{
          <Champion key={champion.championId + champion.teamId} {...champion}/>
        })
      }
    }

    render() {
      const teams = this.filterTeams()
      const blueTeam = teams[0]
      const redTeam = teams[1]
      console.log(teams);

      const BlueTeamChampions = this.getChampionDiv(blueTeam.participants)
      const BlueTeamBanChamps = this.getChampionDiv(blueTeam.bannedChampions)

      const RedTeamChampions = this.getChampionDiv(redTeam.participants)
      const RedTeamBanChamps = this.getChampionDiv(redTeam.bannedChampions)

      if (this.props.bannedChampions) {
        return(
          <div>
            <div>
              {BlueTeamChampions}
            </div>
            <div>
              {BlueTeamBanChamps}
            </div>

            <div>
              {RedTeamBanChamps}
            </div>
            <div>
              {RedTeamChampions}
            </div>
          </div>
        )
      } else {
        return(
          <div>
            <div>
              {BlueTeamChampions}
            </div>
            <div>

            </div>
            <div>
              {RedTeamChampions}
            </div>
          </div>
        )
      }
    }
}
