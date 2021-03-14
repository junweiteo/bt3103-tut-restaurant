<template>
<div>
<button v-on:click="minus">-</button> 
<span id="counter">  {{counter}}  </span>
<button v-on:click="add">+</button>
</div>
</template>

<script>
export default {
    props:['item'],
    data() {
        return{
            counter: 0,
        }
    },
    methods: {
        add: function() {
            if (this.counter == 10) {
                alert("You cannot buy more than 10 items.");
            } else {
                this.counter+=1;
                this.$emit('counter', this.item, this.counter);
            }
        },
            
        minus: function() {
            if (this.counter != 0) {
                this.counter-=1;
                this.$emit('counter', this.item, this.counter);
            }
        }
    },
} 
</script>

<style scoped> 
button {
    font-size:25px;
    height: 30px;
    width: 30px;
    background-color:pink;
}
#counter {
    font-size: 25px;
    padding: 10px;
}
</style>