import { memo, useMemo, useState } from "react";
import { useDrop } from "react-dnd";
import "./Board.css";
import Card from "./Card";
import update from "immutability-helper";

const Board = memo(function Board({children}) {
    const [cardsInPlay, setCardsInPlay] = useState({})

    const [, drop] = useDrop(() => ({
        accept: 'card',
        drop({verb, ...item}, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset();
            const left = Math.round(item.left + delta.x);
            const top = Math.round(item.top + delta.y);
            if (verb === 'create') {
                console.log("adding card", {...item, left, top})
                setCardsInPlay(update(cardsInPlay, {
                    $merge: {
                        [item.id]: {...item, left, top}
                    }
                }));
            } else {
                setCardsInPlay(update(cardsInPlay, {
                    [item.id]: 
                    { $merge: {left, top}}
                }));
            }
            return undefined;
        }
    }), [cardsInPlay]);

    const cardComponents = useMemo(() => Object.keys(cardsInPlay).map(key => {
        const {id, left, top, content, type, flipped} = cardsInPlay[key];
        return <Card key={id} id={id} left={left} top={top} content={content} type={type} flipped={flipped} />;
    }), [cardsInPlay])

    return (
        <div ref={drop} className="board">
            {cardComponents}
            {children}
        </div>
    );
});

export default Board;