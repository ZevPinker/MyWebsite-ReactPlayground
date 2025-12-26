import React, { useEffect, useRef, useState } from 'react';

const GAME_CONFIG = {
    width: 800,
    height: 400,
    radius: 20,
    gravity: 0.5,
    jumpStrength: -12,
    moveSpeed: 5,
    bounceFactor: 0.2
};

const PLATFORMS = [
    { x: 100, y: 300, width: 200, height: 10 },
    { x: 400, y: 200, width: 150, height: 10 },
    { x: 600, y: 330, width: 120, height: 10 }
];

export default function GravityGame() {
    const { width, height, radius, gravity, jumpStrength, moveSpeed, bounceFactor } = GAME_CONFIG;

    const positionRef = useRef({ x: 100, y: 100 });
    const velocityRef = useRef({ x: 0, y: 0 });
    const keysRef = useRef({});
    const inAirRef = useRef(false);
    const animationRef = useRef(null);

    const [displayPosition, setDisplayPosition] = useState({ x: 100, y: 100 });

    const checkIfOnPlatform = (x, y) => {
        return PLATFORMS.some(
            plat =>
                y + radius >= plat.y - 1 &&
                y + radius <= plat.y + 1 &&
                x + radius > plat.x &&
                x - radius < plat.x + plat.width
        );
    };

    useEffect(() => {
        const handleKeyDown = (e) => { keysRef.current[e.key] = true; };
        const handleKeyUp = (e) => { keysRef.current[e.key] = false; };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const update = () => {
            let { x, y } = positionRef.current;
            let vy = velocityRef.current.y;

            // Horizontal movement
            if (keysRef.current['ArrowLeft']) x -= moveSpeed;
            if (keysRef.current['ArrowRight']) x += moveSpeed;

            // Ground/platform check
            const onGround = y >= height - radius || checkIfOnPlatform(x, y);

            if (onGround) {
                inAirRef.current = false;
            }

            // Jump
            if (keysRef.current['ArrowUp'] && onGround && !inAirRef.current) {
                vy = jumpStrength;
                inAirRef.current = true;
            }

            // Apply gravity
            vy += gravity;
            y += vy;

            // Floor collision
            if (y >= height - radius) {
                y = height - radius;
                vy = -vy * bounceFactor;
            }

            // Platform collisions
            for (const plat of PLATFORMS) {
                if (
                    vy > 0 &&
                    y + radius >= plat.y &&
                    y + radius <= plat.y + vy + 1 &&
                    x + radius > plat.x &&
                    x - radius < plat.x + plat.width
                ) {
                    y = plat.y - radius;
                    vy = -vy * bounceFactor;
                }
            }

            // Wall boundaries
            if (x < radius) x = radius;
            if (x > width - radius) x = width - radius;

            // Update refs
            positionRef.current = { x, y };
            velocityRef.current.y = vy;

            // Update display state
            setDisplayPosition({ x, y });

            animationRef.current = requestAnimationFrame(update);
        };

        animationRef.current = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <svg width={width} height={height} style={{ background: '#d9f7ff', display: 'block' }}>
            <circle cx={displayPosition.x} cy={displayPosition.y} r={radius} fill="crimson" />
            {PLATFORMS.map((plat, idx) => (
                <rect
                    key={idx}
                    x={plat.x}
                    y={plat.y}
                    width={plat.width}
                    height={plat.height}
                    fill="#444"
                    rx="4"
                    ry="4"
                />
            ))}
        </svg>
    );
}
