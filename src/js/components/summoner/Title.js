import React from "react";

export default class Title extends React.Component {
    constructor(props){
        super()
    }

    render(){
        const {summonerId, summonerName, splashImg, tier, entries} = this.props
        const style = {position: "relative"}
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
            <div style={style}>
               <img src={splashImg.splash} class=" responsive-img background" />
               <img class="responsive-img" src={tierImg} class="responsive-img tier" />
               <h1 class="name">{summonerName}</h1>
            </div>
        )
    }
}
