import { useEffect } from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";


const AccountsStatisticsGraph = ({ data }) => {
    const [diagrammData, setDiagrammData] = useState({ datasets: [] });

    useEffect(() => {
        const colors = ["#000000", "#ff0000", "#00ff00", "#0000ff", "#ffaa00", "#777777", "#00aaff", "#aa33aa", "#7777ff", "#ff7777", "#33ff77", "#ff00ff"];

        const minDate = getMinCompared(data).minTransaction.date;
        const maxDate = getMinCompared(data, (date1, date2) => { date1 > date2 }).minTransaction.date;

        const times = getTimes(minDate, maxDate);
        setDiagrammData({
            labels: data?.headers ?? [],
            datasets: data.map((dat, i) => {
                return {
                    visible: true,
                    data: extendDataOnAllDays(addZeroTransaction(dat.transactionList, dat.account), times),
                    label: dat.account.number,
                    borderColor: colors[i],
                    backgroundColor: colors[i],
                    fill: true,
                    lineTension: 0.5
                };
            })
        });
    }, [data]);

    const changeVisibleActionCreator = (i) => {
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
        <div style={{ display: 'grid', gridTemplateColumns: '30% 30% 1fr' }}>
            {diagrammData.datasets?.map((ds, i) =>
                <span style={{ display: 'inline-block' }}>
                    <label>{ds.label}</label>
                    <input type="checkbox" checked={ds.visible} onClick={changeVisibleActionCreator(i)} />
                </span>)}
        </div>
    </>
}

const getMinCompared = (dat, compare = (date1, date2) => { date1 < date2 }) => dat.reduce((modelAccum, modelVal) => {
    var modelAccumReduce = modelAccum?.minTransaction ?? transactionList.reduce((acc, val) => compare(acc.date, val.date) ? acc : val);
    var modelValReduce = modelVal.transactionList.reduce((acc, val) => compare(acc.date, val.date) ? acc : val);
    let resModel;
    if (compare(modelAccumReduce.date, modelValReduce.date)) {
        resModel = modelAccum;
        resModel.minTransaction = modelAccumReduce;
    } else {
        resModel = modelVal;
        resModel.minTransaction = modelValReduce;
    }
    return resModel;
});

const addZeroTransaction = (transactions, account, minDate) => {
    return [{
        date: minDate,
        debet: account.debet,
        credit: account.credit
    }, ...transactions];
}

const getTimes = (minDate = new Date(), maxDate = new Date(), intervals = 365) => {
    const minTime = minDate.getTime();
    const maxTime = maxDate.getTime();
    const delta = (minTime - maxTime) / intervals;
    return Array(intervals).fill((_, i) => minTime + i * delta);
}

const extendDataOnAllDays = (transactions, times = []) => {

    let curIndex = 0;

    return times.map(time => {
        while (transactions[curIndex]?.date?.getTime() <= time && curIndex < transactions.length - 1) {
            curIndex++;
        }
        return transactions[curIndex]?.debet - transactions[curIndex]?.credit;
    })
}

export default AccountsStatisticsGraph;
