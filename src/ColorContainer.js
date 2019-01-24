import React from 'react';
import './ColorContainer.css';

export default function render(props) {
    const { name, h, s, l } = props.color;
    return (
        <div
            className="color-container"
            onDragStart={(e) => props.onDragStart(e)}
            onDragEnter={(e) => props.onDragEnter(e)}
            onDragEnd={(e) => props.onDragEnd(e)}
        >
            <div className="name-container">

                <input
                    value={name}
                    name="name"

                    onChange={props.onUpdate}
                />
                <button onClick={() => props.onRemoveColor()}>&times;</button>
            </div>
            <div
                draggable
                className="color-view"
                style={{ backgroundColor: `hsl(${h}, ${s}%, ${l}%)` }}
            />
            <div className="controls">
                <div className="control-group">
                    <div>
                        Hue:
                    <input
                            tabIndex="1"
                            value={h}
                            type="number"
                            name="h"
                            onChange={props.onUpdate} />
                    </div>
                    <input
                        name="h"
                        type="range"
                        tabIndex="2"
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
                            tabIndex="3"
                            type="number"
                            onChange={props.onUpdate}
                            name="s"
                        />
                    </div>
                    <input
                        name="s"
                        type="range"
                        tabIndex="4"
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
                            tabIndex="5"
                            type="number"
                            onChange={props.onUpdate}
                            name="l"
                        />
                    </div>
                    <input
                        name="l"
                        type="range"
                        tabIndex="6"
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