import React from 'react';
import { useDraggable } from '../hooks';

/**
 * Wrapper for making any DOM element draggable
 */
export function DraggableWrapper({ children, initial = { x: 0, y: 0 } }) {
    const { position, handlers } = useDraggable(initial);

    return (
        <div
            {...handlers}
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                cursor: 'move',
            }}
        >
            {children}
        </div>
    );
}

/**
 * Wrapper for making SVG <g> elements draggable
 */
export function DraggableSvgGroup({ children, initial = { x: 0, y: 0 } }) {
    const { position, handlers } = useDraggable(initial);

    return (
        <g
            transform={`translate(${position.x},${position.y})`}
            {...handlers}
            style={{ cursor: 'move' }}
        >
            {children}
        </g>
    );
}
