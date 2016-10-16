import dispatcher from "../dispatcher"
import key from "../api-key"

export function reloadMatches(){
   axios.get("https://global.api.pvp.net/observer-mode/rest/featured?api_key=" + key.key).then(function(response){
     dispatcher.dispatch({
       action: "RELOAD",
       response,
     })
   })
}
