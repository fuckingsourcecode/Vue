<template>
	<div class="component-title" v-bind:style="{backgroundColor: bgcolor||'#23c083', color: fcolor||'#fff'}">

	    <a class="component-title-back">
	    	<img src="/static/images/icon/logo.png" v-if="showlogo">
            <img src="/static/images/icon/back.png">
	    </a>
	    <a class="component-title-link" v-link="{name:backlink}">
	    	<p v-bind:style="{color: fcolor||'#fff'}">{{title}}</p>
	    </a>
		<a v-if="showbtn"class="component-title-btn" v-link="{name:btnlink}" v-bind:style="{color: fcolor||'#fff'}">
			{{btnname}}
			<!-- <img class="usercenter-top-msg" v-show="messagenums==0" 

				src="/static/images/icon/icon-8.png"> -->
			<!-- <img class="usercenter-top-msg" v-show="messagenums > 0"  
				src="/static/images/icon/icon-9.png"> -->
		</a>

	</div>
</template>
<script>
import Utils from "../../common/utils.js"
export default {
	props:['title','btnname','showbtn','btnlink','backlink', 'bgcolor', 'fcolor','showlogo'],
	ready: function () {
		var self = this;
		if (self.$route.name == "index") {
			$(".component-title-back").css("display", "none");
			$(".component-title-link p").css("margin-left", "1rem");
		}
		$(".component-title-back").click(function () {
			console.log(self);
			if(Utils.getCookie("TBUID") && self.$route.name == "usercenter") {
				self.$router.go('/index');
			}else {
            	window.history.back();
            }
        });
	}
}
</script>
<style>
.component-title {
	height:40px;
	width:100%;
	text-align: center;
	background-color:#1fd291;
	/*position: absolute;
	left: 0;
	right: 0;
	z-index: 1001; */
}
.component-title p{
	text-align:center;
	line-height:40px;
	display:block;
	float:left;
	color:white;
}
.component-title-back {
	display: block;
	width: 40px;
	height: 40px;
	line-height: 40px;
	float:left;
	/*position:absolute;*/
}
.component-title-back img{
	height:20px;
	width:20px;
	margin-top:10px;
}
.component-title-btn{
	display: block;
	width: 110px;
	height: 40px;
	line-height:40px;
	/* color:white !important; */
	text-align:right;
	padding-right:20px;
	float:right;
}
.component-title-link {
	text-decoration:none;
	color:white;
}
</style>