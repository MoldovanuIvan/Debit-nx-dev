import React from "react";
import Chart1 from "./pieChart1";
import Chart2 from "./pieChart2";
import s from './twoCharts.module.css'
import {Trans, useTranslation} from "react-i18next";
import {ID} from '../../api/mockturtle'

const Charts = () => {
    const {i18n} = useTranslation()
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#990099", "#ff0000", "#990000", "#ccccff", "#ff0099", "#00ff00"];

    return <>
        <p><h2 className={s.title}><Trans i18nKey="description.part2">Charts</Trans></h2></p>
        <div className={s.wrapper}>
            <div className={s.wrapper}>
                <div>
                    <Trans i18nKey="description.part3">Debit per sender</Trans>
                    <ul>
                        {ID.map((el,index,mas)=><li style={{background:`${COLORS[index]}`,listStyleType:'none'}}>{mas[index]}</li>)}
                    </ul>
                </div>
                <Chart1/>
            </div>
            <div className={s.wrapper}>
                <div>
                    <Trans i18nKey="description.part4">Credit per sender</Trans>
                  <ul>
                    {ID.map((el,index,mas)=><li style={{background:`${COLORS[index]}`,listStyleType:'none'}}>{mas[index]}</li>)}
                  </ul>
                </div>
                <Chart2/>
            </div>
        </div>
        </>
}

export default Charts
