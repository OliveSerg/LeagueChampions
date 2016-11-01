import React from "react";

export default class ChampionStats extends React.Component {
    constructor(props){
        super()
    }

    render(){
        let {name, stats, title} = this.props
        if (!name) name = "Total for All Champions"
        if (!title) title = "Stats for all matches in Twisted tree and Summoner's Rift"
        return(
            <div>
                <h2>{name}</h2>
                <h3>{title}</h3>
                <ul>
                  <li>Wins: {stats.totalSessionsWon}</li>
                  <li>Losses: {stats.totalSessionsLost}</li>
                  <li>Kills: {stats.totalChampionKills}</li>
                  <li>Deaths: {stats.totalDeathsPerSession}</li>
                  <li>Assists: {stats.totalAssists}</li>
                  <li>Damage Taken: {stats.totalDamageTaken}</li>
                  <li>Damage Dealt: {stats.totalDamageDealt}</li>
                  <li>AP Dealt: {stats.totalMagicDamageDealt}</li>
                  <li>AD Dealt: {stats.totalPhysicalDamageDealt}</li>
                </ul>
            </div>
        )
    }
}
