import { memo, useState } from "react";

export default memo(function CardContents({type, content, flipped: _flipped = false, locked = false}) {
    const [flipped, setFlipped] = useState(_flipped);
    
    const flipCard = e => {
        if (!locked) setFlipped(!flipped);
        e.preventDefault();
    };
    
    return <div
                className={`card ${type} ${flipped?"flipped":""}`}
                onClick={flipCard}>
                <div className="inner">
                    <div className="front">
                        <div className="content">{content}</div>
                    </div>
                    <div className="back"></div>
                </div>
            </div>
})