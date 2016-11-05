<template>
    <div class="buy-btn">
        <a v-bind:style="{backgroundColor: mybackcolor}">
            {{buyBtnContent}}
        </a>
    </div>
</template>
<style>
.buy-btn {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
}
.buy-btn a {
    font-size: 2rem;
    line-height: 4rem;
    color: #fff;
    display: block;
}
</style>
<script>
    
    export default{
        props:['buyBtnContent', 'mybackcolor'],
        data(){
            return{
                
            }
        },
        ready: function (argument) {
            
        }        
    }
</script>
