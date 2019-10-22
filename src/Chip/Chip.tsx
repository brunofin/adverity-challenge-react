import React from 'react';
import './Chip.scss';

export default function Chip(props: any): JSX.Element {
    const handleRemoveClick = () => {
        if (props.remover) {
            props.remover();
        }
    }

    return (
        <div className="Chip">
            <span>{props.name}</span>
            <button onClick={handleRemoveClick}>x</button>
        </div>
    );
};
