import React from 'react'
import * as bs from 'react-bootstrap'

const NAMES = [
    'Sally',
    'Vijay',
    'Barry',
    'Tommeigh'
]

export default function Sec2(props) {
    return (
        <div>
            {NAMES.map(name => {
                return (
                    <bs.Button variant = 'outline-success' size='lg'>
                        
                    </bs.Button>
                )
            })}
        </div>
    );
}