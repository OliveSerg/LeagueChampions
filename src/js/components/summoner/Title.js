import React from "react";

export default class Title extends React.Component {
    constructor(props){
        super()
    }
    
    render(){
        const {summonerId, summonerName, splashImg, tier, entries} = this.props
        let tierImg = ""
        if(tier !== "CHALLENGER" && tier !== "MASTER"){
            const entry = entries.filter((entry)=>{
                return entry.playerOrTeamId === summonerId.toString()
            })     
            tierImg = `../../../images/tier_icons/${tier}_${entry[0].division}.png`.toLowerCase()
        } else {
            tierImg = `../../../images/base_icons/${tier}.png`.toLowerCase()
        }
        return (
            <div>
               <img src={splashImg.splash} class="background" />
               <img src={tierImg} class="tier" />
               <p class="name">{summonerName}</p>
            </div>        
        )
    }
}
