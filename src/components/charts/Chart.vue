<template>
    <div class="chart">
        <h1>Bar Chart</h1>
        <BarChart></BarChart>
        <h1>Line Chart</h1>
        <LineChart></LineChart>
    </div>
</template>

<script>
import BarChart from './BarChart.js'
import LineChart from './LineChart.js'
export default {
    components: {
        BarChart,
        LineChart
    }
}
</script>

<style scoped>
h1 {
    text-align: center;
    background-color: #5DADE2;
    color: white
}
</style>