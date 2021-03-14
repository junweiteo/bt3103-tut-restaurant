import {Line} from 'vue-chartjs'
import axios from 'axios'

export default {
    extends:Line,
    data: function() {
        return {
            datacollection: {
                labels:[],
                datasets: [
                    {
                        label: 'west',
                        borderColor: '#A93226',
                        data: [],
                        fill: false,
                    },
                    {
                        label: 'national',
                        borderColor: '#A569BD',
                        data:[],
                        fill: false,
                    }, 
                    {
                        label: 'east',
                        borderColor: '#5DADE2',
                        data:[],
                        fill: false,
                    }, 
                    {
                        label: 'central',
                        borderColor: '#1ABC9C',
                        data:[],
                        fill: false,
                    }, 
                    {
                        label: 'south',
                        borderColor: '#F4D03F',
                        data:[],
                        fill: false,
                    }, 
                    {
                        name: 'north',
                        borderColor: '#E67E22',
                        data:[],
                        fill: false,
                    }
            ]
            },
            options: {
                legend: { display: true },
                title: {
                    display: true,
                    text: 'PSI Twenty Four Hourly (By Region'
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        fetchItems: function() {
            axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
            .then(response=>{
                for (let i = 0; i < response.data.items.length; i++) {
                    var item = response.data.items[i];
                    this.datacollection.labels.push(item.timestamp)
                    this.datacollection.datasets[0].data
                    .push(item.readings.psi_twenty_four_hourly.west)
                    this.datacollection.datasets[1].data
                    .push(item.readings.psi_twenty_four_hourly.national)
                    this.datacollection.datasets[2].data
                    .push(item.readings.psi_twenty_four_hourly.east)
                    this.datacollection.datasets[3].data
                    .push(item.readings.psi_twenty_four_hourly.central)
                    this.datacollection.datasets[4].data
                    .push(item.readings.psi_twenty_four_hourly.south)
                    this.datacollection.datasets[5].data
                    .push(item.readings.psi_twenty_four_hourly.north)
                }
                this.renderChart(this.datacollection, this.options)
            })
        }
    },
    created() {
        this.fetchItems()
    }
}