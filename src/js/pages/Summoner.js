import React from 'react';
import _ from 'lodash'
import Slider from 'react-slick'
import MatchStore from '../stores/MatchStore'
import * as MatchActions from '../actions/MatchActions'
import Title from '../components/summoner/Title'
import RankSummary from '../components/summoner/RankSummary'

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
          const RankSummaryComponents = summoner.rankInfo.map((entry, index)=> {
               return <RankSummary key={index} {...entry}></RankSummary>
          })
          const settings = {
             dots: true,
             infinite: true,
             speed: 500, 
             slidesToShow: 5,
             slidesToScroll: 2
          }
          return(
            <div>
                <Title summonerName={summonerName} summonerId={summoner.summonerId} splashImg={randomChampionImg} {...summoner.rankInfo[0]}></Title>
                <div>
                    {RankSummaryComponents}
                </div>
                <Slider {...settings}>
                    {summoner.championsStat.map((champion, index)=>{
                        if(champion.id !== 0){
                            return <img key={index+champion.id} src={champion.imageURL.small}/>
                        }
                    })}
                </Slider>
            </div>
          )
        }
    }
}
