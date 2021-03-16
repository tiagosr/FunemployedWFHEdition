import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import CardContents from './CardContents';

export default function Card({left, top, content, type, id, flipped: _flipped}) {

    const [flipped, setFlipped] = useState(_flipped);

    const [{isDragging}, drag, preview] = useDrag(() => {
        console.log("flipped", flipped)
        return ({
        type: 'card',
        item: { id, left, top, content, type, flipped, verb: "move" },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })}, [id, left, top, content, type, flipped]);

    useEffect(() => {
        preview(getEmptyImage(), {captureDraggingState: false});
    }, [preview]);
    
    const getStyle = ({left, top}) => ({
        position: "absolute",
        transform: `translate3d(${left}px, ${top}px, 0)`,
        WebkitTransform: `translate3d(${left}px, ${top}px, 0)`
    });

    const flipCard = e => {
        setFlipped(!flipped);
        e.preventDefault();
    };
    
    if (isDragging) return null;

    return (
        <div
            ref={drag}
            style={getStyle({left, top})}>
            <CardContents type={type} content={content} flipped={flipped} onClick={flipCard} />
        </div>
    )
};