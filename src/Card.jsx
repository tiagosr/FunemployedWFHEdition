import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

const Card = memo(function Card ({left: _left, top: _top, content, type}) {
    const ref = useRef(null);
    const [top, setTop] = useState(_top);
    const [left, setLeft] = useState(_left);

    const moveTo = (_top, _left) => {
        setTop(_top);
        setLeft(_left);
    }

    useImperativeHandle(ref, () => ({
        moveTo
    }));
    
    const [flipped, setFlipped] = useState(false);

    const [{isDragging}, drag, preview] = useDrag(() => ({
        type: 'card',
        item: { ref, left, top },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [ref, left, top]);

    const flipCard = e => {
        setFlipped(!flipped);
        e.preventDefault();
    };

    /*
    useEffect(() => {
        preview(getEmptyImage(), {captureDraggingState: true});
    }, [preview]);
    //*/
    const getStyle = ({left, top, isDragging}) => ({
        left, top,
        transform: `rotateZ(${isDragging?-15:0}deg)`
    });

    return (
        <div
            ref={isDragging?preview:drag}
            className={`card ${type} ${flipped?"flipped":""}`}
            onClick={flipCard}
            style={getStyle({left, top, isDragging})}>
            <div className="inner">
                <div className="front">
                    <div className="content">{content}</div>
                </div>
                <div className="back"></div>
            </div>
        </div>
    )
}, {});

export default Card;