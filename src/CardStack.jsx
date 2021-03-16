import { useEffect, useMemo, useReducer } from "react"
import { useDrag } from "react-dnd";
import { getEmptyImage } from 'react-dnd-html5-backend';
import CardContents from "./CardContents";

export default function CardStack ({cards: _cards, type, flipped, top, left, topLocked = true}) {
    const cardsReducer = (cards, {type, content}) => {
        switch (type) {
            case 'pop':
                return cards.slice(0, -1);
            case 'stack':
                return [...cards, content];
            case 'shuffle':
                const shuffled = cards;
                for (let i = shuffled.length - 1; i >= 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                return shuffled;
            default:
                return cards;
        }
    }

    const [cards, dispatchCards] = useReducer(cardsReducer, _cards);

    const topCard = useMemo(() => {
        if (cards.length === 0) return null;
        return (cards[cards.length-1]);
    }, [cards]);

    const topCardId = useMemo(() => `${type}-${cards.length-1}`, [cards, type]);
    const secondTopCardId = useMemo(() => `${type}-${cards.length-2}`, [cards, type]);

    const [{isDragging}, drag, preview] = useDrag(() => {
        return {
            type: 'card',
            item: { id: topCardId, left, top, content: topCard, type, flipped, verb: 'create' },
            collect: (monitor) => {
                
                const item = monitor.getItem();
                if (item) {
                    const {type: currentType, content: currentContent, verb} = item;
                    if (monitor.didDrop() && verb === 'create' && type === currentType && topCard === currentContent) {
                        //console.log(`popping card! ${cards.length}`)
                        dispatchCards({type: 'pop'});
                    }
                }
                return {
                    isDragging: monitor.isDragging()
                }
            }
        }
    }, [cards, type, flipped, top, left, topCard, topCardId])

    useEffect(() => {
        preview(getEmptyImage(), {captureDraggingState: false});
    }, [preview]);

    if (topCard === null) return null;

    return <div ref={drag} className="cardStack" style={{ position:'absolute', top, left }}>
        <CardContents key={secondTopCardId} flipped={false} type={type} locked={true} />
        {isDragging?null:<CardContents key={topCardId} content={topCard} type={type} flipped={flipped} locked={topLocked} />}
    </div>
};