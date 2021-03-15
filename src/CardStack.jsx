import { useState, useEffect, useCallback, useMemo, memo } from "react"
import { useDrag } from "react-dnd";
import { CardContents } from "./CardContents";
import { getEmptyImage } from 'react-dnd-html5-backend';

export const CardStack = memo(({cards: _cards, type, flipped, top, left}) => {
    const [cards, setCards] = useState(_cards);

    const topCard = useMemo(() => {
        if (cards.length === 0) return null;
        return (cards[cards.length-1]);
    }, [cards]);

    const removeTopCard = useCallback(() => {
        console.log(`popping card! ${cards.length}`)
        let poppedCards = cards;
        poppedCards.pop();
        setCards(poppedCards);
    }, [cards]);

    const [ , drag, preview] = useDrag(() => {
        return {
            type: 'card',
            item: { id: `${type}-${cards.length-1}`, left, top, content: topCard, type, flipped, verb: 'create' },
            collect: (monitor) => {
                const item = monitor.getItem();
                if (item) {
                    const {type: currentType, content: currentContent, verb} = item;
                    if (monitor.didDrop() && verb === 'create' && type === currentType && topCard === currentContent) {
                        removeTopCard();
                    }
                }
                return { }
            }
        }
    }, [cards, type, flipped, top, left, removeTopCard, topCard])

    useEffect(() => {
        preview(getEmptyImage(), {captureDraggingState: false});
    }, [preview]);

    if (topCard === null) return null;

    return <div ref={drag} style={{ position:'absolute', top, left }}>
        <CardContents content={topCard} type={type} flipped={flipped} />
    </div>
});