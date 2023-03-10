import { useEffect } from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const AccountsStatisticsGraph = ({ data }) => {
    const [diagrammData, setDiagrammData] = useState({ datasets: [] });

    useEffect(() => {
        const colors = ["#000000", "#ff0000", "#00ff00", "#0000ff", "#ffaa00", "#777777", "#00aaff", "#aa33aa", "#7777ff", "#ff7777", "#33ff77", "#ff00ff"];

        const minDate = getMinCompared(data).minTransaction?.date;
        const maxDate = getMinCompared(data, (date1, date2) => ( date1 > date2 )).minTransaction?.date;

        const times = getTimes(minDate, maxDate);
        
        setDiagrammData({
            labels: times.map(t => (new Date(t))?.toDateString()) ?? [],
            datasets: data.map((dat, i) => {
                return {
                    visible: true,
                    data: extendDataOnAllDays(addZeroTransaction(dat.transactionList, dat.account, minDate), times),
                    label: dat.account.code,
                    borderColor: colors[i],
                    backgroundColor: colors[i],
                    fill: true,
                    lineTension: 0.5
                };
            })
        });
    }, [data]);

    const changeVisibleActionCreator = (i) => () => {
        const newDiagrammData = { ...diagrammData };
        newDiagrammData.datasets[i].visible = !newDiagrammData.datasets[i].visible;
        setDiagrammData(newDiagrammData);
    }

    return <>
        <Line
            type="line"
            width={130}
            height={70}
            options={{
                title: {
                    display: true,
                    text: 'Разность дебета и кредита на счетах',
                    fontSize: 15
                },
                legend: {
                    display: true, //Is the legend shown?
                    position: "top" //Position of the legend.
                }
            }}
            data={diagrammData}
        />
    </>
}

const getMinCompared = (dat, compare = (date1, date2) => ( date1 < date2 )) => dat?.reduce((modelAccum, modelVal) => {
    var modelAccumReduce = modelAccum?.minTransaction ?? modelAccum?.transactionList.reduce((acc, val) => compare(acc.date, val.date) ? acc : val);
    var modelValReduce = modelVal.transactionList.reduce((acc, val) => compare(acc.date, val.date) ? acc : val, {date: new Date()});
    let resModel;
    if (compare(modelAccumReduce.date, modelValReduce.date)) {
        resModel = modelAccum;
        resModel.minTransaction = modelAccumReduce;
    } else {
        resModel = modelVal;
        resModel.minTransaction = modelValReduce;
    }
    return resModel;
}, {minTransaction: {date: new Date()}});

const addZeroTransaction = (transactions, account, minDate) => {
    const res = [{
        date: minDate,
        debet: account.debet,
        credit: account.credit
    }];
    transactions.slice().reverse().map(tr => res.push(tr));
    return res;
}

const getTimes = (minDate = new Date(), maxDate = new Date(), intervals = 30) => {
    const minTime = (new Date(minDate)).getTime();
    const maxTime = (new Date(maxDate)).getTime();
    const delta = (maxTime - minTime) / intervals;
    return Array(intervals+1).fill(0).map((el, i) => {
        const res = (minTime + i * delta);
        return res;
    });
}

const extendDataOnAllDays = (transactions, times = []) => {
    console.log('Tra', transactions);
    let curIndex = 0;

    return times.map(time => {
        console.log(transactions[curIndex], new Date(time));
        while (curIndex < transactions.length - 1 && (new Date(transactions[curIndex+1]?.date)).getTime() <= time) {
            
            curIndex++;
        }
        return transactions[curIndex]?.debet + transactions[curIndex]?.credit;
    })
}

export default AccountsStatisticsGraph;
