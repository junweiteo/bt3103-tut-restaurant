import {Bar} from 'vue-chartjs'
import database from '/src/firebase.js'

export default {
    extends: Bar,
    data: function() {
        return {
            datacollection: {
                labels: ["Prawn omelette",
                "Dry Beef Hor Fun",
                "Sambal KangKung",
                "Pork Fried Rice",
                "Mapo Tofu",
                "Cereal Prawn"],
                datasets: [{
                    label: "Dishes",
                    backgroundColor: ['#F5B7B1','#D7BDE2','#85C1E9','#A3E4D7', '#F9E79F', '#E59866'],
                    data: [0,0,0,0,0,0]
                }]
            },
            options: {
                legend: {display: false},
                title: {
                    display: true,
                    text: "Total Number of each dish",
                },
                scales: { yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]},
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        fetchItems: function() {
            database.collection('orders').get().then(querySnapShot => {
                querySnapShot.forEach(doc => {
                    for (let i = 0; i < this.datacollection.labels.length; i++) {
                        var dish = this.datacollection.labels[i];
                        this.datacollection.datasets[0].data[i] += doc.data()[dish];
                    }
                })
                this.renderChart(this.datacollection, this.options)
            })
        }
    },
    created() {
        this.fetchItems()
    }
}