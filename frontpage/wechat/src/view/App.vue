<template>
    <div id="wrapper">
        <router-view v-show="true" transition="my" transition-mode="in-out"></router-view>
        <div class="bd spacing"><loading-toast></loading-toast></div>
        <div class="bd spacing"><line-toast :linetoast="linetoast"></line-toast></div>
        <!-- <toast></toast> -->
    </div>
</template>
<script>
    import Vue from 'vue'
    import loadingToast from '../components/dialog/loadingToast.vue'
    // import toast from '../components/toast/index.vue'
    import lineToast from '../components/toast/lineToast.vue'
    export default {
        components: {
            loadingToast: loadingToast,
            lineToast
        }
    }
  Vue.transition('my', {

    beforeEnter: function (el) {
      var height = document.documentElement.clientHeight;
      
      var bgcolor = $(el).css('background-color');
      
      if(bgcolor=='transparent' || bgcolor=="" || bgcolor==null || bgcolor == 'undefined') {
        
        $(el).css({'background-color':'#FFF'});
      }
      $(el).css({'display':'block','top':0,'z-index':100,'position':'absolute','min-height':height});
      $(el).addClass('my-in-animated');
      
    },
    enter: function (el,done) {
      $(el).addClass('myBounceInRight');
      done();
      
    },
    afterEnter: function (el) {
      $(el).css({'position':'relative'});

    },
    enterCancelled: function (el) {
      // handle cancellation
    },

    beforeLeave: function (el) {
      var height = document.documentElement.clientHeight;
      $(el).addClass('my-out-animated');
      $(el).css({'z-index':1,'position':'absolute','height':height,'overflow':'hidden'});
    },
    leave: function (el) {
      $(el).addClass('myBounceOutLeft');
      

    },
    afterLeave: function (el) {
      $(el).css({'display':'none'});
    },
    leaveCancelled: function (el) {
      // handle cancellation
    }
  });
  //startsWith兼容所有浏览器
if(typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (prefix){
         return this.slice(0, prefix.length) === prefix;
    };   
}
   
</script>

<style>

.my-in-animated {
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
.my-out-animated {
  -webkit-animation-duration: 1.5s;
  animation-duration: 1.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.expand-transition {
    transition: all 0.5s ;/*//cubic-bezier(0.68, 0, 0.58, 1);*/
    display: block;
    transform:translate(20%,0);
    
}
.expand-enter, .expand-leave {
    /* opacity: 0.3; */
}
.expand-leave {
    transform: translate(-100%,0);
    /*display:none;*/
}
.expand-enter {
     transform: translate(100%,0); 
}
.swiper-slide img {
  width:100%;
  height:100%;
}

@-webkit-keyframes myBounceInRight {


  0% {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }


  to {
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes myBounceInRight {


  0% {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  

  to {
    -webkit-transform: none;
    transform: none;
  }
}

.myBounceInRight {
  -webkit-animation-name: myBounceInRight;
  animation-name: myBounceInRight;
}





@-webkit-keyframes myBounceOutLeft {
 

  0% {
    -webkit-transform: none;
    transform: none;
  }


  to {
    
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes myBounceOutLeft {
 

  0% {
   -webkit-transform: none;
    transform: none;
  }

  

  to {
     -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    
  }
}

.myBounceOutLeft {
  -webkit-animation-name: myBounceOutLeft;
  animation-name: myBounceOutLeft;
}
</style>