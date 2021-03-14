<template>
    <div>
        <ul>
            <p v-for="(count, name, index) in datapacket" v-bind:key="name">
                {{name + ": " + count}}<br><br>
                <input v-bind:id="index" placeholder="0" type="number" min="0"/>
            </p>
            <button v-on:click="updateOrder">Update Order</button>
            <p id="test"></p>
        </ul>
    </div>
</template>

<script>
import database from '../firebase.js'
export default {
    data() {
        return{
            datapacket: [],
        }
    },
    props: {
        doc_id: {type: String},
    },
    methods: {
        fetchItems: function() {
            database.collection('orders')
            .doc(this.doc_id).get().then((doc)=>{
                    this.datapacket = doc.data()
            });
        },updateOrder: function() {
            var copied = {
                "Prawn omelette": 0,
                "Dry Beef Hor Fun": 0,
                "Sambal KangKung":0,
                "Pork Fried Rice": 0,
                "Mapo Tofu":0,
                "Cereal Prawn":0
            };
            //creating a copy of this.datapacket
            for (var key in this.datapacket) {
                copied[key] = this.datapacket[key];
            }
            //updating copied object with updated orders
            var i = 0;
            for (var dish in copied) {
                    var num = +document.getElementById(i).value;
                    if (num != 0) {
                    copied[dish] = num;
                    i += 1;
                }
            }
            //replacing the old order with new order
            database.collection('orders').doc(this.doc_id)
            .set(copied)
            .then(()=>{
                this.$router.push({path:'/orders'})
            });
        }
    },
    created() {
        this.fetchItems();
    }
}
</script>

<style scoped>
button {
  width: 150px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>