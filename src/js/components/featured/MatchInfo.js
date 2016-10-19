import React from "react";
import matchMakingQueues from '../../data/matchmaking_queues'

export default class MatchInfo extends React.Component {
  constructor(props){
    super()
  }

  render(){
    const {gameQueueConfigId, gameStartTime} = this.props
    return (
      <div>
        <p>{matchMakingQueues[gameQueueConfigId]}</p>
        <img src=""/>
        <p>{gameStartTime}</p>
      </div>
    )
  }
}
