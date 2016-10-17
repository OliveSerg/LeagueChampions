import dispatcher from "../dispatcher"
import axios from "axios"
import key from "../api-key"


export function reloadMatches(){
   dispatcher.dispatch({
     type: "RELOAD",
   })
}
