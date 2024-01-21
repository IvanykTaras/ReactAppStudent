import { useState } from "react";
import { tapeTypes } from "../model/tapeTypes";
import { tapeItem } from "../model/tapeItem";

interface ITape {
    history: Array<{type: tapeTypes, item: tapeItem}>
}


export function useTape(): [Array<{type: tapeTypes, item: tapeItem}>, (item: {type: tapeTypes, item: tapeItem}) => void] {

 
    const [tape,setTape] = useState<ITape>({
       history: [] 
    });

    function addTapeItemToHistory( item: {type: tapeTypes, item: tapeItem}){
        tape.history.push(item);
        setTape({...tape});
    }

    return [tape.history, addTapeItemToHistory]
}