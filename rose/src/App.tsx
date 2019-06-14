import * as React from 'react';
import './App.css';

import logo from './logo.svg';

interface AppState {
    d: number,
    n: number
}

class App extends React.Component<{}, AppState> {

    constructor({}) {
        super({});

        this.state = {
            d: 1,
            n: 1
        }
    }

    getCustomLinePath(points: any[][]): string {
        const firstPoint = `M${points[0][0]},${points[0][1]}`;

        function getPoints() {
            let buffer = ``;
            for (let i = 1; i < points.length; i++) {
                buffer += `L${points[i][0]},${points[i][1]}`;
            }
            return buffer;
        }

        return `${firstPoint}${getPoints()}`;
    }

    componentDidMount() {
        setInterval(() => this.setState({n: this.state.n + 0.01}), 30)
    }

    public render() {

        const points = [];

        const k = this.state.n / this.state.d;

        for (let a = 0; a < Math.PI * this.state.d; a += 0.01) {
            const r = 100 * Math.cos(k * a);
            const x = r * Math.cos(a);
            const y = r * Math.sin(a);
            points.push([x, y])
        }

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Mathematical Rose</h1>
                </header>
                <p className="App-intro"><p>r = cos((n* theta)/d)</p>
                    <p>d = {this.state.d}</p>
                    <input type="range" min="1" max="10" value={this.state.d} step="0.1"
                           onChange={(e) => this.setState({d: +e.target.value})}/>
                    <p>n = {this.state.n}</p>
                    <input type="range" min="1" max="2000" value={this.state.n} step="1"
                           onChange={(e) => this.setState({n: +e.target.value})}/></p>

                <svg width={300} height={300}>
                    <g transform={`translate(150,150)`}>
                        <path d={this.getCustomLinePath(points)}
                              fill='none'
                              stroke={'black'}
                              strokeWidth={1}
                        />
                    </g>
                </svg>
            </div>
        );
    }
}

export default App;
