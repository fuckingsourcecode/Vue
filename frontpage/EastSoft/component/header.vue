<template>
    <div class="nav-top-title">
        <div class="head-title">
            <slot name="my-header-title"></slot>
        </div>
    </div>
</template>
<style>
.nav-top-title {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    max-height: 10px;
    vertical-align: middle;
    z-index: 1001;
}
.head-title {
    margin: 0 auto;
    margin-top: 1rem;
    margin-left: -2rem;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
}
</style>
<script>
    
    export default{
        props: ['backurl'],
        data(){
            return{
                countryUrl: this.$route.params.id,
            }
        },
        ready: function() {
            if(!(parseInt(this.$route.params.id))) {
                this.countryUrl = 'world';
            }
        }
    }
</script>
