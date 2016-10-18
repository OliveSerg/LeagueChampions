import React from 'react';
import _ from "lodash"
import Champion from "./Champions"

export default class FeaturedMatches extends React.Component {
    constructor(props) {
      super()
    }


    render() {
      const blueTeam = {
        bannedChampions: _.filter(this.props.bannedChampions, {teamId: 100}),
        participants: _.filter(this.props.participants, {teamId: 100})
      }
      const redTeam = {
        bannedChampions: _.filter(this.props.bannedChampions, {teamId: 200}),
        participants: _.filter(this.props.participants, {teamId: 200})
      }
      const BlueTeamChampions = blueTeam.participants.map((champion)=>{
        <Champion key={champion.championId + champion.teamId} {...champion}/>
      })
      const RedTeamChampions = redTeam.participants.map((champion)=>{
        <Champion key={champion.championId + champion.teamId} {...champion}/>
      })
      return(
          <div>
            <div>
              {BlueTeamChampions}
            </div>
            <div>
              {RedTeamChampions}
            </div>
          </div>
      )
    }
}
