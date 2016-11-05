<template>     
	<div>      
	    <div class="eastFlight-head-bg">
	    	<img src="/static/img/eastFlight/head-bg.jpg" alt="" width="100%">
	    </div>
	    <div class="eastFlight-body-bg">
	    	<div class="eastFlight-card1" style="width:100%; text-align:left;">
	    		<img src="/static/img/eastFlight/card1.png" alt="">
	    		<div class="eastFlight-card1-intro">
	    			<h3 style="color: #1fd291;">途宝飞鲸软卡</h3>
	    			<ul>
	    				<li>全球通用</li>
	    				<li>无限流量</li>
	    				<li>3卡合一</li>
	    			</ul>	
	    		</div>
	    		<p>每一次出国选择通讯，你都有顾虑，途宝卡贴一次购买终身使用，支持全球使用，只需4步即可贴上卡贴，简单设置，再也不用出国通话烦</p>
	    		<div class="eastFlight-card1-buyPrice">
	    			<p>途宝狂欢价: <span style="font-size:18px;">￥10-500元</span></p>
	    			<h3><a v-link="{name: 'east-buy', params: {country: 'world'}}">立即购买</a></h3>
	    		</div>
	    	</div>
	    	<div class="eastFlight-blank"></div>
	    	<div class="eastFlight-card1" style="width:100%; text-align:left;">
	    		<img src="/static/img/eastFlight/card2.png" alt="">
	    		<div class="eastFlight-card1-intro">
	    			<h3 style="color: #1fd291;">途宝日本卡</h3>
	    			<ul>
	    				<li>3卡合一</li>
	    				<li>无限流量</li>
	    				<li>超值30天</li>
	    			</ul>	
	    		</div>
	    		<p>每一次出国选择通讯，你都有顾虑，途宝卡贴一次购买终身使用，支持全球使用，只需4步即可贴上卡贴，简单设置，再也不用出国通话烦</p>
	    		<div class="eastFlight-card1-buyPrice">
	    			<p>途宝狂欢价: <span style="font-size:18px;">￥10-500元</span></p>
	    			<h3><a v-link="{name: 'east-buy', params:{country: 440}}">立即购买</a></h3>
	    		</div>
	    	</div>
	    	<div class="eastFlight-blank"></div>
	    	<div class="eastFlight-card1" style="width:100%; text-align:left;">
	    		<img src="/static/img/eastFlight/card3.png" alt="">
	    		<div class="eastFlight-card1-intro">
	    			<h3 style="color: #1fd291;">途宝港澳卡</h3>
	    			<ul>
	    				<li>3卡合一</li>
	    				<li>无限流量</li>
	    				<li>重复使用</li>
	    			</ul>	
	    		</div>
	    		<p>每一次出国选择通讯，你都有顾虑，途宝卡贴一次购买终身使用，支持全球使用，只需4步即可贴上卡贴，简单设置，再也不用出国通话烦</p>
	    		<div class="eastFlight-card1-buyPrice">
	    			<p>途宝狂欢价: <span style="font-size:18px;">￥19-27元</span></p>
	    			<h3><a v-link="{name: 'east-buy', params: {country: 454}}">立即购买</a></h3>
	    		</div>
	    	</div>
            <div class="eastFlight-blank"></div>
	    	<div class="eastFlight-card1" style="width:100%; text-align:left;">
	    		<img src="/static/img/eastFlight/card2.png" alt="">
	    		<div class="eastFlight-card1-intro">
	    			<h3 style="color: #1fd291;">途宝泰国卡</h3>
	    			<ul>
	    				<li>3卡合一</li>
	    				<li>无限流量</li>
	    				<li>资费便宜</li>
	    			</ul>	
	    		</div>
	    		<p>每一次出国选择通讯，你都有顾虑，途宝卡贴一次购买终身使用，支持全球使用，只需4步即可贴上卡贴，简单设置，再也不用出国通话烦</p>
	    		<div class="eastFlight-card1-buyPrice">
	    			<p>途宝狂欢价: <span style="font-size:18px;">￥35.5元</span></p>
	    			<h3><a v-link="{name: 'east-buy', params: {country: 520}}">立即购买</a></h3>
	    		</div>
	    	</div>
	    	<div class="banner" style="">
	    		<img src="/static/img/eastFlight/banner.png" alt="" width="100%">
	    	</div>
	    </div>
	</div> 
</template> 
<style type="text/css">
    .eastFlight-head-bg{
    	position: relative;
    }
	.eastFlight-body-bg{
		width: 100%;
		height: 100%;
		background: url('/static/img/eastFlight/body-bg.png') repeat-y;
		background-size: 100%;
	}
	.eastFlight-card1 .eastFlight-card1-intro{
		display: inline-block;
		width: 60%;
		float: right;

	}
	.eastFlight-card1 img{
        margin-left: 5px;
		margin-top: 3%;
	}
	.eastFlight-card1 .eastFlight-card1-intro ul{
		padding-left: 0px;
        list-style: none;
        text-align: center;
        display: block;
        font-size: 12px;

	}
	.eastFlight-card1 .eastFlight-card1-intro ul li{
		float: left;
		color: #1fd291;
		border:1px solid #1fd291;
		border-radius: 5px;
		width: 30%;
		margin-right: 5px;
	}
	@media screen 
      and (min-device-width: 320px) 
      and (max-device-width: 374px){
      	.eastFlight-card1 .eastFlight-card1-intro{
			width: 55%;
		}
      }
	.eastFlight-card1 p{
		width: 90%;
		margin: 0 auto;
        font-size:12px;
        color:#949494;
        display: block;
        line-height: 16px;
	}
	.eastFlight-card1 .eastFlight-card1-buyPrice{
		width: 100%;
		height: 50px;
		margin: 0 auto;
		text-align: center;
	}
	.eastFlight-card1 .eastFlight-card1-buyPrice p{
        font-size: 14px;
        color: red;
        display: inline;
        margin: 0 10px;

        line-height: 14px;
	}
	.eastFlight-card1 .eastFlight-card1-buyPrice h3{
		margin-top: 0px;
		text-align: center;
		display: inline-block;
		width: 110px;
		height: 31px;
		color: #ffffff;
		font-size: 20px;
		background: url('/static/img/eastFlight/btn-bg.png') no-repeat;
	}
	h3 a {
		color: #fff;
		line-height: 30px;
	}
	.eastFlight-blank{
		width: 90%;
		height: 2px;
		background: #1fd291;
		margin: 0 auto;
	}
</style>
<script type="text/javascript">
	
</script>