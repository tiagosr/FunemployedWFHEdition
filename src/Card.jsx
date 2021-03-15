import React, { memo, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { CardContents } from './CardContents';

const Card = memo(({left, top, content, type, id, flipped = false}) => {

    const [{isDragging}, drag, preview] = useDrag(() => ({
        type: 'card',
        item: { id, left, top, content, type, flipped, verb: "move" },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [id, left, top]);

    //*
    useEffect(() => {
        preview(getEmptyImage(), {captureDraggingState: false});
    }, [preview]);
    //*/
    const getStyle = ({left, top, isDragging}) => ({
        position: "absolute",
        transform: `translate3d(${left}px, ${top}px, 0)`,
        WebkitTransform: `translate3d(${left}px, ${top}px, 0)`
    });

    if (isDragging) return null;

    return (
        <div
            ref={drag}
            style={getStyle({left, top, isDragging})}>
            <CardContents type={type} content={content} flipped={flipped} />
        </div>
    )
});

export default Card;