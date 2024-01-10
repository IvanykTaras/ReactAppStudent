import { FC } from "react";
import { Spinner } from "react-bootstrap";
import "../../css/Loadding.css"


export const Loadding: FC = ()=>{
    return <>
        <div className="load-block">
            <Spinner className="spinner" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <span className="load-text">Loadding...</span>
        </div>
    </>
}