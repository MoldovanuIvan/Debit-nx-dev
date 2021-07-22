import React, {PureComponent} from 'react';
import {PieChart, Pie, Cell} from 'recharts';
import state, {ID} from "../../api/mockturtle";

const sum = (sender) => {
    let summ = 0
    let newState=state.filter(obj=>obj["Sender ID"] === sender)
    newState.forEach(obj=>{
        summ=summ+obj["Credit amount"]
    })
    return summ
}

const data = [
    {value: Math.round(sum(ID[0]))},
    {value: Math.round(sum(ID[1]))},
    {value: Math.round(sum(ID[2]))},
    {value: Math.round(sum(ID[3]))},
    {value: Math.round(sum(ID[4]))},
    {value: Math.round(sum(ID[5]))},
    {value: Math.round(sum(ID[6]))},
    {value: Math.round(sum(ID[7]))},
    {value: Math.round(sum(ID[8]))},
    {value: Math.round(sum(ID[9]))}
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#990099", "#ff0000", "#990000", "#ccccff", "#ff0099", "#00ff00"];

export default class Example extends PureComponent {

    render() {
        return (
                <PieChart width={800} height={300} onMouseEnter={this.onPieEnter}>
                    <Pie
                        data={data}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={0}
                        dataKey="value"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))}
                    </Pie>
                </PieChart>
        );
    }
}