import React, { useState } from "react";
//import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import GameFramework from "./GameFramework";

function Opener () {
  const [showGameInterface, setShowGameInterface] = useState(false);
  
  const startGameInterface = () => {
    setShowGameInterface(!showGameInterface);
  }

    return (
        <div className="App">
          {showGameInterface ? (
            <GameFramework/>
          ) : (
          <div id="openingDiv" className="container row col-12 mx-auto py-4 mt-2 rounded shadow-lg" >
            <div className="col-9 mx-auto py-2 mb-2 mt-5 rounded shadow-lg">
              <h1 className="pt-5 pb-1 text-uppercase text-center text-warning fs-1">A nagy kvízjáték</h1>
              <h5 className="text-center text-warning fs-2">v1.0</h5>
              <h5 className="text-center text-warning fs-5">© Károly Szabolcs, 2024</h5>
            </div>
            <div className="col-9 mx-auto pt-4 my-3 rounded shadow-lg">
              <p className="text-uppercase text-center text-warning fs-3">Több száz kérdés, rengeteg téma!</p>
              <p className="text-uppercase text-center text-warning fs-3">Készen állsz?</p>
            </div>
              <Button
                id="startBtn"
                className="col-4 btn btn-primary btn-lg mx-auto mb-5 mt-3 py-4 fs-2 text-center text-warning text-uppercase text-decoration-none rounded shadow"
                onClick={startGameInterface}
                >
                  Kezdjük!
                  {/*<Link to='/GameFramework' className="text-warning text-uppercase text-decoration-none fs-2">Kezdjük!</Link>*/}
              </Button>
          </div>
          )}
        </div>
    );
}

export default Opener;