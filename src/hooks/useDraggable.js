import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for making elements draggable
 * @param {Object} initial - Initial position { x, y }
 * @returns {Object} - { position, handlers, isDragging }
 */
export function useDraggable(initial = { x: 0, y: 0 }) {
    const [position, setPosition] = useState(initial);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const onMouseDown = useCallback((e) => {
        setDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
        e.stopPropagation();
    }, [position]);

    useEffect(() => {
        if (!dragging) return;

        const onMouseMove = (e) => {
            setPosition({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y
            });
        };

        const onMouseUp = () => setDragging(false);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [dragging, offset]);

    return {
        position,
        isDragging: dragging,
        handlers: { onMouseDown }
    };
}
