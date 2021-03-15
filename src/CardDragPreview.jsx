import { memo } from "react";
import CardContents from "./CardContents";


export default memo(function CardDragPreview({content, type, flipped}) {
    return <div className="dragPreview">
        <CardContents content={content} type={type} flipped={flipped} />
    </div>
})