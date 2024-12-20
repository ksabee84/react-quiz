import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Quiz from "./Quiz";

const categories = [
    {id: 1, text: "Bulvár", value: "Bulvár", checked: false},
    {id: 2, text: "Élővilág", value: "Élővilág", checked: false},
    {id: 3, text: "Film és TV", value: "Film és TV", checked: false},
    {id: 4, text: "Földrajz", value: "Földrajz", checked: false},
    {id: 5, text: "Irodalom és kultúra", value: "Irodalom és kultúra", checked: false},
    {id: 6, text: "Matematika", value: "Matematika", checked: false},
    {id: 7, text: "Sport", value: "Sport", checked: false},
    {id: 8, text: "Történelem", value: "Történelem", checked: false},
    {id: 9, text: "Tudomány és technika", value: "Tudomány és technika", checked: false},
    {id: 10, text: "Zene", value: "Zene", checked: false}
];

const levels = [
    {id: 1, text: "Nagyon könnyű", value: "1", checked: false},
    {id: 2, text: "Könnyű", value: "2", checked: false},
    {id: 3, text: "Közepes", value: "3", checked: false},
    {id: 4, text: "Nehéz", value: "4", checked: false},
    {id: 5, text: "Nagyon nehéz", value: "5", checked: false}
];

function StartQuiz() {
    const [questionCategories, setQuestionCategories] = useState(categories);
    const [questionLevels, setQuestionLevels] = useState(levels);
    const [showGame, setShowGame] = useState(false);
    
    const toggleCategories = (id) => {
        setQuestionCategories((prevCategories) =>
            prevCategories.map((item) =>
                item.id === id ? {...item, checked: !item.checked} : item
        ));
    }

    const toggleLevels = (id) => {
        setQuestionLevels((prevLevels) =>
            prevLevels.map((item) => 
                item.id === id ? {...item, checked: !item.checked} : item
        ));
    }
    
    const selectAllCategories = () => {
        setQuestionCategories((prevCategories) => prevCategories.map((item) => ({...item, checked: true})));
    };

    const selectNoCategories = () => {
        setQuestionCategories((prevCategories) => prevCategories.map((item) => ({...item, checked: false})));
    }

    const selectedCategories = questionCategories.filter((item) => item.checked).map((item) => item.text);
    const selectedLevels = questionLevels.filter((item) => item.checked).map((item) => item.text);

    const handleStartQuiz = () => {
        if (selectedCategories.length === 0 || selectedLevels.length === 0) {
            alert("Kérlek, válassz legalább egy kategóriát és egy szintet!");
            return;
        }
        setShowGame(true);
    };

    return(
        <div className="container text-center my-4">
            {showGame ? (
                <Quiz selectedCategories={selectedCategories} selectedLevels={selectedLevels}/>
            ) : (
                <>
                    <div className="row justify-content-center mb-4">
                        <div className="col-12 col-md-3 mb-4 mb-md-0 fs-5">
                            <h4 className="text-warning border border-warning py-2">
                                Válassz témát!
                            </h4>
                            <div className="d-flex flex-column gap-1" role="group" aria-label="Category selection">
                                {questionCategories.map((item) => {
                                    console.log(item)

                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            className={`btn ${
                                                item.checked ? "btn-warning" : "btn-outline-warning"
                                            }`}
                                            onClick={() => toggleCategories(item.id)}
                                            >
                                            {item.text}
                                        </button>
                                    )
                                })}
                            </div>

                            <div className="btn-group mt-2 col-12" role="group" aria-label="Toggle categories">
                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="btnradio"
                                    id="checkAll"
                                    autoComplete="off"
                                    onClick={selectAllCategories}
                                />
                                <label className="btn btn-outline-warning" htmlFor="checkAll">Mindegyiket</label>

                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="btnradio"
                                    id="checkNone"
                                    autoComplete="off"
                                    onClick={selectNoCategories}
                                />
                                <label className="btn btn-outline-warning" htmlFor="checkNone">Egyiket sem</label>
                            </div>
                        </div>
                    
                        <div id="questionLevelsDiv" className="col-12 col-md-3">
                            <h4
                                className="text-warning border border-warning py-2"
                                questionlevels={questionLevels}
                                >
                                    Válassz nehézségi szintet!
                            </h4>
                            <div className="d-flex flex-column gap-1" role="group" aria-label="Level selection">
                                {questionLevels.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        className={`btn ${
                                            item.checked ? "btn-warning" : "btn-outline-warning"
                                        }`}
                                        onClick={() => toggleLevels(item.id)}
                                        >
                                        {item.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div id="startQuizButtonDiv" className="row justify-content-center">
                        <div className="col-12 col-md-6">
                            <Button
                                id="startQuizBtn"
                                type="submit"
                                className="btn btn-primary btn-lg py-5 px-5 fs-3"
                                onClick={handleStartQuiz}
                                disabled={selectedCategories.length === 0 || selectedLevels.length === 0}
                            >
                                Kérem az első kérdést!
                            </Button>
                        </div>
                    </div>
                </>
            )}
            </div>
    );
}

export default StartQuiz;