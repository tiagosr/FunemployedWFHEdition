import { memo } from "react";
import { CardContents } from "./CardContents";


export const CardDragPreview = memo(({content, type, flipped}) => {
    return <div className="dragPreview">
        <CardContents content={content} type={type} flipped={flipped} />
    </div>
})