import dispatcher from "../dispatcher"
import key from "../api-key"

const urlMatches = 'https://na.api.pvp.net/observer-mode/rest/featured?api_key='

export function reloadMatches(){
   axios.get(urlMatches + key.key).then((response)=>{
     dispatcher.dispatch({
       type: "RELOAD",
       data: response.data
     })
   })
}
