import React from 'react';
// import _ from 'lodash'
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
      const summoner = MatchStore.getSummoner()
      this.setState({
        summoner,
        currentChampion: summoner.championsStat[0],
        loading: false
      })
    }

    render() {
      const {summoner, loading, summonerName, currentChampion} = this.state

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
          const RankSummaryComponents = summoner.rankInfo.map((entry, index)=> {
               return <RankSummary key={index} {...entry}></RankSummary>
          })
          const settings = {
            focusOnSelect: true,
            className: 'center',
            centerMode: true,
            infinite: true,
            centerPadding: '60px',
            slidesToShow: 5,
            speed: 500
          }
          return(
            <div class="container">
                <Title summonerName={summonerName} summonerId={summoner.summonerId} splashImg={randomChampionImg} {...summoner.rankInfo[0]}/>
                <div>
                    {RankSummaryComponents}
                </div>
                <Slider {...settings}>
                    {summoner.championsStat.map((champion, index) => {
                        if(champion.id !== 0){
                            return <div><img class="responsive-img" key={champion.id} src={champion.imageURL.small}/></div>
                        }
                    })}
                </Slider>
                <ChampionStats {...currentChampion}/>
            </div>
          )
        }
    }
}
