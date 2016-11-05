<template>
    <div>
        <div>
            <ul class="inandout list-group">
                <li class="inandout-one list-group-item">first</li>
                <li class="inandout-two list-group-item">second</li>
                <li class="inandout-three list-group-item">three</li>
                <li class="inandout-four list-group-item">four</li>
            </ul>
        </div>
    </div>
</template>
<style>
    .inandout-one, .inandout-two, .inandout-three, .inandout-four{
        opacity: 0;
        border-right: none;
        border-left: none;
        border-bottom: none;
        font-size: 2rem;
    }
    .inandout-one{
        border-top: none;
        animation: oin 1s ease-in-out 0s forwards;
    }
    .inandout-two{
        animation: oin 1s ease-in-out 1s forwards;
    }
    .inandout-three{
        animation: oin 1s ease-in-out 2s forwards;
    }
    .inandout-four{
        animation: oin 1s ease-in-out 3s forwards;
    }
    @keyframes oin {
        0% {
            opacity: 0.0;
        }
        25%{
            opacity: 0.25;
        }
        50% {
            opacity: 0.5;
        }
        75% {
            opacity: 0.75;
        }
        100% {
            opacity: 1;
        }
    }
</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue bar'
            }
        },
    }
</script>
