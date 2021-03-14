<template>
    <div>
        <p id="menu">Menu:</p>
        <ul>
            <li v-for="selected in itemsSelected" :key="selected[0]">
                <p>{{selected[0]}} x {{selected[1]}}</p>
            </li>
        </ul>
        <button id="calcButton" v-on:click="findTotal" v-on:click.prevent="sendOrder">Add Order</button>
        <h3 v-if="show">Subtotal: ${{computed}}</h3>
        <h3 v-if="show">Grand Total: ${{watch}}</h3>
    </div>

</template>

<script>
import database from '../firebase.js'
export default {
    props: ['itemsSelected'],
    data() {
        return{
            computed: 0,
            watch: 0,
            show: false,
        }
    },
    methods: {
        findTotal: function () {
            var subtotal = 0;
            for (let i = 0; i < this.itemsSelected.length; i++) {
                var price = this.itemsSelected[i][1] * this.itemsSelected[i][2]
                subtotal += price;
            }
            this.computed = subtotal;
            this.watch = Math.round(subtotal * 1.07 * 100)/100;
            this.show = true;
        },
        sendOrder: function() {
            var dishes = {
                "Prawn omelette": 0,
                "Dry Beef Hor Fun": 0,
                "Sambal KangKung":0,
                "Pork Fried Rice": 0,
                "Mapo Tofu":0,
                "Cereal Prawn":0
            };
            this.itemsSelected.forEach(element => {
                dishes[element[0]] = element[1]
            })
            database.collection("orders").add(dishes).then(()=>{location.reload()})
        }
    }
}
</script>

<style scoped>
#menu {
    font-size: 30px;
}
#calcButton {
    font-size:25px;
    height: 40px;
    width: 200px;
    background-color:pink;
}
</style>