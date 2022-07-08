import React from "react";
import getDates from "../api-calls/getDates";

const TestComponent = () => {
    let testArray = [];
    for (let i = 0; i < 10; i++){
        testArray.push(Math.random());
    }

    
    return <>  
        <div style={{
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        }}>

            {testArray}        
        </div> 
    </>
}

export default TestComponent;