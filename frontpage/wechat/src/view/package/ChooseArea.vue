<template>
	<div class="choosearea">
		<!-- <div class="title">地区选择</div> -->
		<title title="选择地区" backlink="systempackage"></title>
		<div class="wrapper">
			<div class="choosearea-top">
				<!-- <div class="choosearea-input-content">
					<div class="choosearea-input-box" @click="beginInput">
						<img src="/static/images/icon/search.png">
						<input autofocus placeholder="请输入目的地">
					</div>
				</div> -->
				<div class="systempackage-input" v-link="{name: 'areasearch'}">
				    <div class="systempackage-input-box">
					    <img src="/static/images/icon/search-1.png" alt="">
					    <p>请输入目的地</p>
				    </div>
			    </div>
				<div class="choosearea-navi-outer">
					<div class="choosearea-navi">
						<a href="javascript:;;" @click="setIdx(0)" v-bind:class="{ 'choosearea-navi-selected' : idx==0 }">亚洲</a>
						<a href="javascript:;;" @click="setIdx(1)" v-bind:class="{ 'choosearea-navi-selected' : idx==1 }">大洋洲</a>
						<a href="javascript:;;" @click="setIdx(2)" v-bind:class="{ 'choosearea-navi-selected' : idx==2 }">欧洲</a>
						<a href="javascript:;;" @click="setIdx(3)" v-bind:class="{ 'choosearea-navi-selected' : idx==3 }">美洲</a>
						<a href="javascript:;;" @click="setIdx(4)" v-bind:class="{ 'choosearea-navi-selected' : idx==4 }">非洲</a>
					</div>
					<div class="choosearea-navi-bottom"></div>
				</div>
				<div v-if="idx==0" class="choosearea-areas animated fadeIn">
					<a class="choosearea-area" v-for="info in list_0"
						v-link="{name:'packagedetail',params:{packageid:info.id}}">
						<img v-bind:src="info.src"><br/>
						<span class="choosearea-area-zh">{{info.name}}</span>
						
					</a>
				</div>
				<div v-if="idx==1" class="choosearea-areas animated fadeIn">
					<a class="choosearea-area" v-for="info in list_1"
						v-link="{name:'packagedetail',params:{packageid:info.id}}">
						<img v-bind:src="info.src"><br/>
						<span class="choosearea-area-zh">{{info.name}}</span>
						
					</a>
				</div>
				<div v-if="idx==2" class="choosearea-areas animated fadeIn">
					<a class="choosearea-area" v-for="info in list_2"
						v-link="{name:'packagedetail',params:{packageid:info.id}}">
						<img v-bind:src="info.src"><br/>
						<span class="choosearea-area-zh">{{info.name}}</span>
						
					</a>
				</div>
				<div v-if="idx==3" class="choosearea-areas animated fadeIn">
					<a class="choosearea-area" v-for="info in list_3"
						v-link="{name:'packagedetail',params:{packageid:info.id}}">
						<img v-bind:src="info.src"><br/>
						<span class="choosearea-area-zh">{{info.name}}</span>
						
					</a>
				</div>
				<div v-if="idx==4" class="choosearea-areas animated fadeIn">
					<a class="choosearea-area" v-for="info in list_4"
						v-link="{name:'packagedetail',params:{packageid:info.id}}">
						<img v-bind:src="info.src"><br/>
						<span class="choosearea-area-zh">{{info.name}}</span>
						
					</a>
				</div>
			</div>
		</div>
		<toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
	</div>
</template>
<script>
import Utils from '../../common/utils.js'
import Config from '../../common/config.js'
import toastDialog from '../../components/dialog/toastDialog.vue'
export default {
	data :function() {
		return {
			idx:  0,
			list:[],
			toastdialogtitle: '', 
			toastdialogcontent: ''
		}
	},
	components: {
		toastDialog
	},
	route: {
		data() {
			sessionStorage.clear();
		}
	},
	ready:function(){
		var theIdx = this.$route.params.idx;
		sessionStorage.clear();
		this.idx = theIdx;
		var self = this;
		$.post(Config.getApiURL()+"/countries/list",{},
        function(result){
        	if (result.status == 0) {
        		self.list = result.data;
        		self.list.forEach( (value, index, array) => {
        			value.src = Config.getMediaURL()+value.flagImageSrc;
        		});
            }else{
            	self.toastdialogtitle = "反馈提示";
				self.toastdialogcontent = result.tip;
				$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
					$('#dialog2').off('click').hide();
				});
            }
        })

		$(".choosearea-input").blur(function() {
			if(!$(this).val())
				$(".choosearea-input-hint").show();
		});
		(function () {
			var idx = parseInt(self.$route.params.idx);
			$('.choosearea-navi-bottom').animate({"marginLeft":idx*19.5+2+"%"},300);
		})();
		$(".choosearea-navi a").click(function() {
			var idx = parseInt($(this).index());
			$('.choosearea-navi-bottom').animate({"marginLeft":idx*19.5+2+"%"},300);
			
		});
	},
	methods: {
		beginInput:function() {
			$(".choosearea-input-hint").hide();
			$(".choosearea-input").focus();
		},
		setIdx:function(idx) {
			this.idx=idx;
		}
	},
	computed: {
		list_0:function(){
			var array = new Array();
			for (var i = this.list.length - 1; i >= 0; i--) {
				var info = this.list[i];
				if (info.continent == '亚洲') {
					array.push(info);
				};
			};
			return array;
		},
		list_1:function(){
			var array = new Array();
			for (var i = this.list.length - 1; i >= 0; i--) {
				var info = this.list[i];
				if (info.continent == '大洋洲') {
					array.push(info);
				};
			};
			return array;
		},
		list_2:function(){
			var array = new Array();
			for (var i = this.list.length - 1; i >= 0; i--) {
				var info = this.list[i];
				if (info.continent == '欧洲') {
					array.push(info);
				};
			};
			return array;
		},
		list_3:function(){
			var array = new Array();
			for (var i = this.list.length - 1; i >= 0; i--) {
				var info = this.list[i];
				if (info.continent == '美洲') {
					array.push(info);
				};
			};
			return array;
		},
		list_4:function(){
			var array = new Array();
			for (var i = this.list.length - 1; i >= 0; i--) {
				var info = this.list[i];
				if (info.continent == '非洲') {
					array.push(info);
				};
			};
			return array;
		}
	}
}
</script>
<style>
.choosearea-area{
	text-align: center;
	width:33.3%;
	display: block;
	margin-top: 5px;
	float: left;
	z-index: 9999;
}
.choosearea-area img{
	width: 50px;
	height: 50px;
	border-radius: 25px;
	border: solid 1px rgba(0,0,0,0.2);
}
.choosearea-area-zh{
	font-size: 13px;
	color: black;
	width: 100%;
	display: block;
	margin-top: 3px;
	letter-spacing: 1px;
}
.choosearea-area-en{
	font-size: 12px;
	opacity: 0.6;
	font-weight: bold;
}

.choosearea-navi-bottom {
	width:16%;
	margin-left:1.6%;
	height:3px;
	background-color: #528ce0;
}
.choosearea-navi-outer{
	width:100%;
	height:35px;
	margin-top:8px;
}
.choosearea-navi {
	height:30px;
}
.choosearea-navi a{
	display:inline-block;
	float:left;
	width:19.7%;
	border-left:1px solid #727272;
}
.choosearea-navi a:hover,.choosearea-navi a:active,.choosearea-navi > a.choosearea-navi-selected{
	color:#528ce0;
}
.choosearea-navi a:first-child{
	border:none;
}
.choosearea {
	color:#727272;
}
.choosearea a{
	color:#727272;
}
.choosearea-input-hint{
	position:absolute;
	top: 60px;
	left:0;
	line-height:30px;
	height:30px;
	width:100%;
	text-align:center;
}
.choosearea-input-hint img{
	height:20px;
	width:20px;
	vertical-align: middle;
}
.choosearea-top{
	background-color:white;
	text-align:center;
}
/*.choosearea-input-outer{
	text-align:center;
	background-color:white;
	border:1px solid #AAA;
	border-radius:3px;
	width:100%;
	height:30px;
	line-height:20px;
}*/
	.choosearea-input-content {
		width: 90%;
		height: 30px;
		text-align: center;
		border: 1px solid #b2b2b2;
		border-radius: 10px;
		margin: 10px auto;
		display: inline-block;
	}
	.choosearea-input-box {
		display: inline-block;
	}
	.choosearea-input-box img {
		width: 15px;
		height: 15px;
		display: inline-block;
		float: left;
		margin-left: 10px;
		margin-top: 7px;
	}
	.choosearea-input-box input{
		float: left;
		width: 100px;
		height: 20px;
		line-height: 20px;
		margin-left: 5px;
		border: none;
		outline: medium;
		margin-top: 5px;
		background: transparent;
	}
.choosearea-input{
	width:100%;
	height:100%;
	margin:0;
	padding:0;
	border-radius: 8px;
	border:none;
	display:block;
	font-size:1.5em;
	text-align:center;
	color:#727272;
}

.choosearea-areas{
	width: 100%;
}
</style>
