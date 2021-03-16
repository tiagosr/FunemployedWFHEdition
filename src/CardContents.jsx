export default function CardContents({
    type,
    content,
    flipped,
    onClick = e => { e.preventDefault(); }
}) {
    return <div
                className={`card ${type} ${flipped?"flipped":""}`}
                onClick={onClick}>
                <div className="inner">
                    <div className="front">
                        <div className="content">{content}</div>
                    </div>
                    <div className="back"></div>
                </div>
            </div>
}