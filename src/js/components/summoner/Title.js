import React from "react";

export default class Title extends React.Component {
    constructor(props){
        super()
        console.log(props)
    }
    
    render(){
        const {summonerId, summonerName, splashImg, tier, entries} = this.props
        if(tier !== "CHALLENGER" || tier !== "MASTER"){
            const entry = entries.filter((entry)=>{
                return entry.playerOrTeamId === summonerId.toString()
            })     
            debugger
            const tierImg = `../../../images/tier_icons/${tier}_${entry[0].division}.png`.toLowerCase()
        } else {
            const tierImg = `../../../images/base_icons/${tier}.png`.toLowerCase()
        }

        return (
            <div>
               <img src={splashImg.splash} class="background" />
               <img src={require(tierImg)} class="tier" />
               <p>{summonerName}</p>
            </div>        
        )
    }
}
