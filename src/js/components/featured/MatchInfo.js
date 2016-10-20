import React from "react";
import matchMakingQueues from '../../data/matchmaking_queues'

export default class MatchInfo extends React.Component {
  constructor(props){
    super()
  }

  render(){
    const {gameQueueConfigId, gameStartTime} = this.props
    return (
      <div class="row col s4 valign-wrapper">
        <p class="center-align">{matchMakingQueues[gameQueueConfigId]}</p>
        <img src=""/>
        <p class="center-align">{gameStartTime}</p>
      </div>
    )
  }
}
