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
        queue = this.formatText(queue)
        tier = this.formatText(tier)
        return (
            <div>
                <ul>
                    <li>{entries[0].playerOrTeamName}</li>
                    <li>Queue: {queue}</li>
                    <li>Tier: {tier} {entries[0].division}</li>
                    <li>League Points: {entires[0].leaguePoints}</li>
                    <li>Wins: {entries[0].wins}</li>
                    <li>Losses: {entries[0].losses}</li>
                </ul>
            </div>        
        )
    }
}
