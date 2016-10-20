import React from 'react';
import _ from "lodash"
import Champion from "./Champions"
import MatchInfo from "./MatchInfo"

export default class FeaturedMatches extends React.Component {
    constructor(props) {
      super()
      this.state = {
        teams: this.filterTeams(props)
      }
    }

    filterTeams(props){
      let filteredTeams = []
      filteredTeams.push({
        bannedChampions: _.filter(props.bannedChampions, {teamId: 100}),
        participants: _.filter(props.participants, {teamId: 100})
      })
      filteredTeams.push({
        bannedChampions: _.filter(props.bannedChampions, {teamId: 200}),
        participants: _.filter(props.participants, {teamId: 200})
      })
      return filteredTeams
    }

    getChampionDiv(championsArray){
      if (championsArray) {
        return championsArray.map((champion)=>{
          return <Champion key={champion.championId + champion.teamId} {...champion}/>
        })
      }
    }

    render() {
      const {teams} = this.state
      const {bannedChampions, active} = this.props
      let classes = "row"
      if (active) {
        console.log(this);
        classes += " active-slide"
      }
      const blueTeam = teams[0]
      const redTeam = teams[1]

      const BlueTeamChampions = this.getChampionDiv(blueTeam.participants)
      const BlueTeamBanChamps = this.getChampionDiv(blueTeam.bannedChampions)

      const RedTeamChampions = this.getChampionDiv(redTeam.participants)
      const RedTeamBanChamps = this.getChampionDiv(redTeam.bannedChampions)

      if (bannedChampions) {
        return(
          <div class={classes}>
            <div class="row col s12">
              {BlueTeamChampions}
            </div>
            <div class="row col s10">
              <div class="row col s4">
                {BlueTeamBanChamps}
              </div>
              <MatchInfo key={this.props.gameId} {...this.props}/>
              <div class="row col s4">
                {RedTeamBanChamps}
              </div>
            </div>
            <div class="row col s12">
              {RedTeamChampions}
            </div>
          </div>
        )
      } else {
        return(
          <div class={classes}>
            <div class="row col s12">
              {BlueTeamChampions}
            </div>
            <MatchInfo key={this.props.gameId} {...this.props}/>
            <div class="row col s12">
              {RedTeamChampions}
            </div>
          </div>
        )
      }
    }
}
