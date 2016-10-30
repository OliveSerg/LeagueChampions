import React from 'react';
import MatchStore from '../stores/MatchStore'
import * as MatchActions from '../actions/MatchActions'
import Title from '../components/summoner/Title'

export default class Summoner extends React.Component {
    constructor(props) {
        super()
        this.getSummoner = this.getSummoner.bind(this)
        this.state = {
          summonerName: props.params.id,
          region: props.location.query.region,
          summoner: null,
          loading: true
        }
    }

    componentDidMount(){
      MatchStore.on("change", this.getSummoner)
      MatchActions.getSummoner(this.state.summonerName, this.state.region)
    }

    componentWillUnmount(){
      MatchStore.removeListener("change", this.getSummoner)
    }

    getSummoner(){
      this.setState({
        summoner: MatchStore.getSummoner(),
        loading: false
      })
    }

    render() {
      const {summoner, loading, summonerName} = this.state

        if (loading) {
          return (
            <div>
              Loading
            </div>
          )
        } else {
            console.log(summoner)
          const randNum = Math.floor(Math.random()*summoner.championsStat.length)
          const randomChampionImg = summoner.championsStat[randNum].imageURL
          return(
            <div>
                <Title summonerName={summonerName} summonerId={summoner.summonerId} splashImg={randomChampionImg} {...summoner.rankInfo[0]}></Title> 
            </div>
          )
        }
    }
}
