<template>
    <div>
        <a class="more-info">按钮<a>
    </div>
</template>
<style>
    a.more-info {
    color: #ffffff;
    text-shadow: 1px 1px 0 rgba(0,0,0,0.2);
    border: 1px solid #68a605;
    -webkit-box-shadow: 1px 1px 0 #b9d73b inset, 2px 2px 2px rgba(0,0,0,0.5);
    -moz-box-shadow: 1px 1px 0 #b9d73b inset, 2px 2px 2px rgba(0,0,0,0.5);
    box-shadow: 1px 1px 0 #b9d73b inset, 2px 2px 2px rgba(0,0,0,0.5);
    background: rgb(112,188,21);
    background: -moz-linear-gradient(top, rgba(185,215,59,1) 0%, rgba(104,166,5,1) 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(185,215,59,1)), color-stop(100%, rgba(104, 166, 51)));
    background: -webkit-linear-gradient(top, rgba(185,215,59,1) 0%, rgba(104, 166, 51) 100%);
    background: -o-linear-gradient(top, rgba(185,215,59,1) 0%, rgba(104, 166, 51) 100%);
    background: -ms-linear-gradient(top, rgba(185,215,59,1) 0%, rgba(104, 166, 51) 100%);
    background: linear-gradient(to bottom, rgba(185,215,59,1) 0%, rgba(104, 166, 51) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#b9d73b', endColorstr='#68a605', GradientType=0 );
    background: linear-gradient(to bottom, #b9d73b 0%, #68a605 100%) repeat scroll 0 0 transparent;
}
a.more-info {
    border-radius: 10px 10px 10px 10px;
    display: inline-block;
    font-size: 24px;
    font-weight: 300;
    padding: 10px 36px;
    text-decoration: none;
    margin:10px 0;
    font-family: "Hiragino Sans GB", "WenQuanYi Micro Hei", "微软雅黑";
}
 @-webkit-keyframes buttonLight  {
     from {
       background: rgba(96, 203, 27,0.5);
       -webkit-box-shadow: 0 0 5px rgba(255, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 200, 0.5);
       color: red;
     }
     25% {
       background: rgba(196, 203, 27,0.8);
       -webkit-box-shadow: 0 0 10px rgba(255, 155, 255, 0.5) inset, 0 0 8px rgba(120, 120, 200, 0.8);
       color: blue;
    }
    50% {
      background: rgba(196, 203, 127,1);
      -webkit-box-shadow: 0 0 5px rgba(155, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 100, 1);
      color: orange;
    }
    75% {
      background: rgba(196, 203, 27,0.8);
      -webkit-box-shadow: 0 0 10px rgba(255, 155, 255, 0.5) inset, 0 0 8px rgba(120, 120, 200, 0.8); 
      color: black;
    }
   to {
     background: rgba(96, 203, 27,0.5);
     -webkit-box-shadow: 0 0 5px rgba(255, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 200, 0.5);
     color: green;
    }
  }
</style>
<script>
    export default {
        data: function() {

        },
        ready: function() {
            $('.more-info').on('mousedown',function() {             
                $(this).css('transform', 'scale(.8)');
            });
            $('.more-info').on('mouseup',function() {
              $(this).css('transform', 'scale(1)');
            });
        }
    }
</script>
