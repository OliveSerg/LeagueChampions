import React from "react";

export default class RankSummary extends React.Component {
    constructor(props) {
        super()
    }

    formatText(string){
        string = string.replace(/_/g, " ")
        string = string.toLowerCase().replace(/\b\w/g, (i)=> i.toUpperCase())
        return string
    }

    render() {
        let {tier, entries, queue} = this.props
        const {playerOrTeamName, division, leaguePoints, wins, losses} = entries[0]
        queue = this.formatText(queue)
        tier = this.formatText(tier)
        return (
            <div>
              <h2>{playerOrTeamName}</h2>
              <p>Queue: {queue}</p>
              <p>Tier: {tier} {division}</p>
              <p>LeaguePoints: {leaguePoints}</p>
              <p>Wins: {wins}</p>
              <p>Losses: {losses}</p>
            </div>
        )
    }
}
