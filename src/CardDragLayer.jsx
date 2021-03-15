import { useDragLayer } from 'react-dnd';
import CardDragPreview from './CardDragPreview';

const layerStyles = {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    heigth: '100%'
};
const getItemStyles = (initialOffset, currentOffset) => {
    if (!initialOffset || !currentOffset) return { display: 'none' };
    const transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;
    return { transform, WebkitTransform: transform };
}

export default function CardDragLayer() {
    const { itemType, isDragging, item, initialOffset, currentOffset } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    }));

    const renderItem = () => {
        switch (itemType) {
            case 'card':
                return <CardDragPreview type={item.type} content={item.content} flipped={item.flipped} />;
            default:
                return null;
        }
    }

    if (!isDragging) return null;

    return <div style={layerStyles}>
        <div style={getItemStyles(initialOffset, currentOffset)}>
            {renderItem()}
        </div>
    </div>
}