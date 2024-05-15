'use client'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);



const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
    const data = {
        datasets: [{
            label: 'Banks',
            data: [1256, 2789, 3456],
            backgroundColor: ["#0747B7", "#2265D8", "#2F91FA"]
        }],
        labels: ["bank 1", "bank 2", "bank 3"]
    }

    return (
        <Doughnut data={data} options={{
            cutout : '69%',
            plugins : {
                legend : {
                    display : false
                }
            }
        }} />
    )
}

export default DoughnutChart