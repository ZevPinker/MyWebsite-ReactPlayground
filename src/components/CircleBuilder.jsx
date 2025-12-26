import React, { useState, useEffect } from 'react';
import { DraggableWrapper, DraggableSvgGroup } from './Draggable';

function CircleCanvas({ circles }) {
    return (
        <svg width={1500} height={1000}>
            {circles.map(c => (
                <DraggableSvgGroup key={c.id} initial={{ x: c.cx, y: c.cy }}>
                    <circle cx={0} cy={0} r={c.r} fill={c.fill} />
                </DraggableSvgGroup>
            ))}
        </svg>
    );
}

function StopButton({ onClick }) {
    return (
        <DraggableWrapper initial={{ x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 - 100 }}>
            <button className="octagon" onClick={onClick}>
                STOP
            </button>
        </DraggableWrapper>
    );
}

export default function CircleBuilder() {
    const [circles, setCircles] = useState([]);
    const [circleCount, setCircleCount] = useState(0);

    const addCircle = (color = "black") => {
        setCircles(prev => [
            ...prev,
            { id: Date.now(), cx: 100, cy: 100, r: 40, fill: color }
        ]);
        setCircleCount(prev => prev + 1);
    };

    useEffect(() => {
        if (circleCount > 5) {
            window.location.assign('/build.html');
        }
    }, [circleCount]);

    return (
        <div>
            <StopButton onClick={() => addCircle()} />
            <CircleCanvas circles={circles} />
        </div>
    );
}
