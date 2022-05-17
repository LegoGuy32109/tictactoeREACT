import React from 'react'

export default function Square(props){
    let playercolor = props.isTurn ? 'lightcyan' : '#F0CFCF'
    return (
        <div className='square' style={{ '--playercolor': playercolor}} onClick={() => props.select(props.square.id)}>
            <p>{props.square.text}</p>
        </div>
    )
}