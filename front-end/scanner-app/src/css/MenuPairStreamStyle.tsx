import React from 'react';

export function pairStyle (color: string): React.CSSProperties {
    const style: React.CSSProperties = {
        color,
        fontWeight: 'bold',
        whiteSpace: "nowrap"
    }

    return style
}