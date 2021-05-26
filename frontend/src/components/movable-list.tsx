import React from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvidedDragHandleProps,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { TypeUtil } from '@/utils/type-helper';

// 縦移動に限定刺せるためのラッパー
function getStyle(style: any) {
  if (style.transform) {
    const axisLockY = 'translate(0px' + style.transform.slice(style.transform.indexOf(','), style.transform.length);
    return {
      ...style,
      transform: axisLockY,
    };
  }
  return style;
}

export const MovableList = (props: {
  children: Array<{ key: string; node: (draggableProps: DraggableProvidedDragHandleProps) => React.ReactNode }>;
  onMove: (oldIndex: number, newIndex: number) => void;
}) => {
  const onDragEnd = (result: DropResult /* , provided: ResponderProvided */) => {
    props.onMove(result.source.index, TypeUtil.toNonNullable(result.destination).index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="organizations">
        {(provided) => (
          <div className="organizations" {...provided.droppableProps} ref={provided.innerRef}>
            {props.children.map((item, index) => (
              <Draggable key={item.key} draggableId={item.key} index={index}>
                {(provided) => {
                  // console.log(provided.dragHandleProps);
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={getStyle(provided.draggableProps.style)}
                    >
                      {item.node(
                        Object.assign({}, provided.dragHandleProps, {
                          onMouseOver: (e: any) => e.stopPropagation(),
                          onMouseDown: (e: any) => e.stopPropagation(),
                          onMouseEnter: (e: any) => e.stopPropagation(),
                          onMouseUp: (e: any) => e.stopPropagation(),
                          onClick: (e: any) => e.stopPropagation(),
                          onMouseMove: (e: any) => e.stopPropagation(),
                          onTouchStart: (e: any) => e.stopPropagation(),
                          style: { cursor: 'hand' },
                        }),
                      )}
                    </div>
                  );
                }}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
