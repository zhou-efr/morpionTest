import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props)
{
    return (
        <button
            className="square"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

function win(squares)
{
    const combination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [2, 4, 6],
        [0, 4, 8],
    ];

    for(let [a, b, c] of combination)
    {
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        {
            return squares[a];
        }
    }

    return null;
}

class Board extends React.Component
{

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {

        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: false,
        };
    }

    jumpTo(move)
    {
        this.setState({
            stepNumber: move,
            xIsNext: (move%2)!=0,
        });
    }

    handleClick(i)
    {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if(win(squares) || squares[i])
        {
            return ;
        }

        squares[i] = this.state.xIsNext ? 'O' : 'X';

        this.setState({
            history: history.concat([{squares: squares,}]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext});
    }

    render() {
        const squares = this.state.history[this.state.stepNumber].squares.slice();

        const status = (win(squares))?((this.state.xIsNext ? 'X' : 'O') + ' win 🎆'):
            ('Next player: ' + (this.state.xIsNext ? 'O' : 'X'));

        const moves = this.state.history.map((step, move) => {
           const description = move?"turn n*" + move:"the beginning";
           return (
               <li key={move}>
                   <button onClick={() => this.jumpTo(move)}>{description}</button>
               </li>
           );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>Come back to </div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
