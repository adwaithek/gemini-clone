import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

function Main() {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)

    // Function to handle card click
    const onCardClick = (text) => {
        setInput(text); // Set the card's text to the input field
        onSent(); // Trigger the result
    };

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult ?
                    <>
                        <div className="greet">
                            <p><span>Hello, Dev.</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card" onClick={() => onCardClick("Suggest beautiful place to see on an upcoming road trip")}>
                                <p>Suggest beautiful place to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => onCardClick("Suggest a unique theme for a birthday party")}>
                                <p>Suggest a unique theme for a birthday party</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => onCardClick("What are some productivity tips?")}>
                                <p>What are some productivity tips?</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => onCardClick("Explain the concept of closure in JavaScript")}>
                                <p>Explain the concept of closure in JavaScript</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                    :
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ?
                                <div className='loader'><hr /><hr /><hr /></div> :
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder='Enter a prompt here'
                        />
                        <div className="">
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display incorrect info so please forgive him, thank you
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main;
