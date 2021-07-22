import React from "react";
import Chart1 from "./pieChart1";
import Chart2 from "./pieChart2";
import s from './twoCharts.module.css'
import {Trans, useTranslation} from "react-i18next";


const Charts = () => {
    const {i18n} = useTranslation()
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#990099", "#ff0000", "#990000", "#ccccff", "#ff0099", "#00ff00"];
    const ID = ["147.103.206.234","221.105.194.115","113.45.106.6","140.141.189.11","127.166.154.14","61.142.173.158","228.36.183.253","210.161.27.222","52.239.177.3","149.65.122.187"]

    return <>
        <p><h2 className={s.title}><Trans i18nKey="description.part2">Charts</Trans></h2></p>
        <div className={s.wrapper}>
            <div className={s.wrapper}>
                <div>
                    <Trans i18nKey="description.part3">Debit per sender</Trans>
                    <ul>
                        {ID.map((el,index,mas)=>{
                            return <li style={{background:`${COLORS[index]}`,listStyleType:'none'}}>{mas[index]}</li>
                        }
                        )}
                    </ul>
                </div>
                <Chart1/>
            </div>
            <div className={s.wrapper}>
                <div>
                    <Trans i18nKey="description.part4">Credit per sender</Trans>
                    <ul>
                        {ID.map((el,index,mas)=>{
                                return <li style={{background:`${COLORS[index]}`,listStyleType:'none'}}>{mas[index]}</li>
                            }
                        )}
                    </ul>
                </div>
                <Chart2/>
            </div>
        </div>
        </>
}

export default Charts