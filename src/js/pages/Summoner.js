import React from 'react';
import _ from 'lodash'
import MatchStore from '../stores/MatchStore'
import * as MatchActions from '../actions/MatchActions'
import Title from '../components/summoner/Title'
import RankSummary from '../components/summoner/RankSummary'
import ChampionStats from '../components/summoner/ChampionStats'
import Slider from 'react-slick'

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
      let summoner = MatchStore.getSummoner()
      const totalStats = _.remove(summoner.championsStat, (champion)=>{
        return champion.id === 0
      })
      const randNum = Math.floor(Math.random()*summoner.championsStat.length)
      const randomChampionImg = summoner.championsStat[randNum].imageURL
      this.setState({
        summoner,
        randomChampionImg,
        totalStats,
        currentChampion: summoner.championsStat[0],
        loading: false
      })
    }

    updateChampion(ev){
      const champion = ev.target.id
      this.setState({
        currentChampion: this.state.summoner.championsStat[champion]
      })
    }

    render() {
      const {summoner, loading, summonerName, currentChampion, randomChampionImg, totalStats} = this.state

        if (loading) {
          return (
            <div>
              Loading
            </div>
          )
        } else {
          const RankSummaryComponents = summoner.rankInfo.map((entry, index)=> {
               return <RankSummary key={index} {...entry}></RankSummary>
          })

          const settings = {
            focusOnSelect: true,
            className: 'center',
            centerMode: true,
            lazylaod: true,
            infinite: true,
            centerPadding: '60px',
            arrows: false,
            slidesToShow: 5,
            speed: 500
          }

          return(
            <div class="container">
                <Title summonerName={summonerName} summonerId={summoner.summonerId} splashImg={randomChampionImg} {...summoner.rankInfo[0]}/>
                <div>
                    {RankSummaryComponents}
                </div>
                <ChampionStats {...totalStats[0]}/>
                <Slider ref='slider' {...settings}>
                    {summoner.championsStat.map((champion, index) => {
                        if(champion.id !== 0){
                            return <div><img id={index} onClick={this.updateChampion.bind(this)} class="responsive-img" key={champion.id} src={champion.imageURL.small}/></div>
                        }
                    })}
                </Slider>
                <ChampionStats {...currentChampion}/>
            </div>
          )
        }
    }
}
