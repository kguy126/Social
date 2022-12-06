import React from 'react';
import { useParams } from "react-router-dom";
const  Order =(Component)=>{

    return (props) => {
        const params = useParams();

        return <Component params={params} {...props} />
    }
}

export default  Order;