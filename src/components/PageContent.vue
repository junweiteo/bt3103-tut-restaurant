<template>
    <div>
        <nav>
        <ul id="itemsList">
        <li><router-link to="/" exact>Home</router-link></li>
        <li><router-link to="/Orders" exact>Orders</router-link></li>
        <li><router-link to="/Dashboard" exact>Dashboard</router-link></li>
        </ul>
        </nav>
        <ul id="itemsList">
            <li v-for="item in items" v-bind:key="item.id">
                <h1 id="itemName">{{item.name}}</h1>
                <img :src=item.imageURL>
                <p id="price">${{item.price}}</p>
                <QuantityCounter v-bind:item="item" v-on:counter="onCounter"></QuantityCounter>
            </li>
        </ul>
        <Basket id="shoppingBasket" v-bind:itemsSelected="itemsSelected"></Basket>
    </div>
</template>
]
<script>
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import database from '../firebase.js'
export default {
    data() {
        return{
            itemsSelected: [],
            items: [],
        }
    },
    components: { 
        QuantityCounter,
        Basket 
    },
    methods: {
        onCounter: function (item, count) {
            if (this.itemsSelected.length === 0 && count > 0) {
                //If there is nothing in items selected, push the ORDER in
                this.itemsSelected.push([item.name, count, item.price]);
            } else {
                var contain=false;
                // Loop through everything to check what is not in the basket
                for (let i = 0; i < this.itemsSelected.length; i++) {
                    
                    const curr_item = this.itemsSelected[i];
                    const item_name = curr_item[0];

                    if (item_name == item.name && count > 0) {
                        contain=true;
                        // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                        this.$set(this.itemsSelected[i],1, count);
                        break;
                    } else if (item_name == item.name && count == 0) {
                        contain=true;
                        // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                        this.$delete(this.itemsSelected, i);
                        break;
                    } else {
                        continue;
                    }
                }
                if (contain==false) {
                   // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
                    this.itemsSelected.push([item.name, count, item.price]);
                }
            }
        },
        fetchItems: function() {
            database.collection('menu').get().then((querySnapShot)=>{
                let item={}
                querySnapShot.docs.forEach(doc=>{
                    item=doc.data()
                    item.show=false
                    this.items.push(item);
                })
            })
        }
    },
    created() {
        this.fetchItems();
    }
}
</script>

<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}

</style>