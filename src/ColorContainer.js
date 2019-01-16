import React from 'react';
import './ColorContainer.css';

export default function render(props) {
    const { h, s, l } = props.color;
    console.log(props);
    console.log(`hsl(${h}, ${s}%, ${l}%)`);
    return (
        <div className="color-container">
            <div
                className="color-view"
                style={{ backgroundColor: `hsl(${h}, ${s}%, ${l}%)` }}
            />
            <div className="controls">
                <div className="control-group">
                    <div>
                        Hue:
                    <input
                            tabindex="1"
                            value={h}
                            style={{ width: '3rem' }}
                            type="number"
                            name="h"
                            onChange={props.onUpdate} />
                    </div>
                    <input
                        name="h"
                        type="range"
                        tabindex="2"
                        min="0"
                        max="360"
                        value={h}
                        onChange={props.onUpdate}
                    />

                </div>
                <div className="control-group">
                    <div>
                        Sat:
                    <input
                            value={s}
                            tabindex="3"
                            style={{ width: '3rem' }}
                            type="number"
                            onChange={props.onUpdate}
                            name="s"
                        />
                    </div>
                    <input
                        name="s"
                        type="range"
                        tabindex="4"
                        min="0"
                        max="100"
                        value={s}
                        onChange={props.onUpdate}
                    />

                </div>
                <div className="control-group">

                    <div>
                        Light:
                    <input
                            value={l}
                            tabindex="5"
                            style={{ width: '3rem' }}
                            type="number"
                            onChange={props.onUpdate}
                            name="l"
                        />
                    </div>
                    <input
                        name="l"
                        type="range"
                        tabindex="6"
                        min="0"
                        max="100"
                        value={l}
                        onChange={props.onUpdate}
                    />
                </div>
            </div>
        </div>
    );
}