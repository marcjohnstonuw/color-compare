import React from 'react';
import './ColorContainer.css';

export default function render(props) {
    const {h, s, l} = props.color;
    console.log(props);
    console.log(`hsl(${h}, ${s}%, ${l}%)`);
    return (
        <div className="color-container">
            <div 
                className="color-view"
                style={{ backgroundColor: `hsl(${h}, ${s}%, ${l}%)`}}
            />
            <div className="controls">
                <div>
                    Hue: 
                    <input value={h} onChange={props.onUpdate} />
                </div>
                <input 
                    name="h"
                    type="range"
                    min="0"
                    max="360"
                    value={h}
                    onChange={props.onUpdate}
                />
                
                <div>
                    Sat: 
                    <input value={s} onChange={props.onUpdate} />
                </div>
                <input 
                    name="s"
                    type="range"
                    min="0"
                    max="100"
                    value={s}
                    onChange={props.onUpdate}
                />
                
                <div>
                    Light: 
                    <input value={l} onChange={props.onUpdate} />
                </div>
                <input 
                    name="l"
                    type="range"
                    min="0"
                    max="100"
                    value={l}
                    onChange={props.onUpdate}
                />
            </div>
        </div>
    );
}