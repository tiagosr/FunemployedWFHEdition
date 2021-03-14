import { useCallback } from "react";
import { useDrop } from "react-dnd";
import "./Board.css";


export default function Board ({children}) {
    const moveCard = useCallback((ref, left, top) => {
        ref.current.moveTo(top, left);
    }, []);
    const [, drop] = useDrop(() => ({
        accept: 'card',
        drop(item, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset();
            const left = Math.round(item.left + delta.x);
            const top = Math.round(item.top + delta.y);
            console.log(item);
            moveCard(item.ref, left, top);
        }
    }), [moveCard]);
    return (
        <div ref={drop} className="board">
        </div>
    );
};