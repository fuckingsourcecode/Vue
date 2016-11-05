<template>
	<div>
		<myheader>
			<div slot="my-header-title">地区选择</div>
		</myheader>
		<div style="height: 4rem"></div>
		<div class="ara-confirm" style="border-top: 5px solid #00aaef;">
			<div style="margin-top:1rem;">
				<input type="text" class="form-control" placeholder="请输入目的地" name="">
			</div>
			<div>
				<!-- Nav tabs -->	
				<ul class="nav nav-tabs ara-confirm-navbar" role="tablist" style="text-align:center;">
					<li role="presentation" class="active">
						<a href="#area-confirm-aisa" aria-controls="area-confirm-aisa" role="tab" data-toggle="tab">亚&nbsp;&nbsp; 洲</a>
					</li>
					<li role="presentation" style="padding-top: 6px;">|</li>
					<li role="presentation">
						<a href="#area-confirm-ocania" aria-controls="area-confirm-ocania" role="tab" data-toggle="tab">大洋洲</a>
					</li>
					<li role="presentation" style="padding-top: 6px;">|</li>
					<li role="presentation">
						<a href="#area-confirm-europe" aria-controls="area-confirm-europe" role="tab" data-toggle="tab">欧&nbsp;&nbsp; 洲</a>
					</li>
					<li role="presentation" style="padding-top: 6px;">|</li>
					<li role="presentation">
						<a href="#area-confirm-america" aria-controls="area-confirm-america" role="tab" data-toggle="tab">美&nbsp;&nbsp; 洲</a>
					</li>
					<li role="presentation" style="padding-top: 6px;">|</li>
					<li role="presentation">
						<a href="#area-confirm-africa" aria-controls="area-confirm-africa" role="tab" data-toggle="tab">非&nbsp;&nbsp; 洲</a>
					</li>
				</ul>

				<!-- Tab panes -->	
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane active in" id="area-confirm-aisa">
						<div class="internation-combo-nav-content clearfix">
							<div class="row">
								<div class="col-xs-3 col-sm-3 col-md-3">
									<a  v-link="{name: 'destination', params: {id: 27} }">
										<div>
											<img src="../static/img/area/smt.png"  class="img-responsive  internation-combo-nav-content-tour-img" alt=""></div>
										<p>新马泰</p>
									</a>
								</div>
								<div class="col-xs-3 col-sm-3 col-md-3">
									<a  v-link="{name: 'destination', params: {id: 14} }">
										<div>
											<img src="../static/img/area/japan.png"  class="img-responsive  internation-combo-nav-content-tour-img" alt=""></div>
										<p>日本</p>
									</a>
								</div>
								<div class="col-xs-3 col-sm-3 col-md-3">
									<a  v-link="{name: 'destination', params: {id: 22} }">
										<div>
											<img src="../static/img/area/korea.png"  class="img-responsive  internation-combo-nav-content-tour-img" alt=""></div>
										<p>韩国</p>
									</a>
								</div>
								<div class="col-xs-3 col-sm-3 col-md-3">
									<a  v-link="{name: 'destination', params: {id: 26} }">
										<div>
											<img src="../static/img/area/japankorea.png"  class="img-responsive  internation-combo-nav-content-tour-img" alt=""></div>
										<p>日韩</p>
									</a>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-3 col-sm-3 col-md-3">
									<a  v-link="{name: 'destination', params: {id: 25} }">
										<div>
											<img src="../static/img/area/indonesia.png"  class="img-responsive  internation-combo-nav-content-tour-img" alt=""></div>
										<p>印尼</p>
									</a>
								</div>
								<div class="col-xs-3 col-sm-3 col-md-3">
									<a  v-link="{name: 'destination', params: {id: 30} }">
										<div>
											<img src="../static/img/area/southeastAisa.png"  class="img-responsive  internation-combo-nav-content-tour-img" alt=""></div>
										<p>东南亚</p>
									</a>
								</div>
								<div class="col-xs-3 col-sm-3 col-md-3">
									<a  v-link="{name: 'destination', params: {id: 24} }">
										<div>
											<img src="../static/img/area/singapore.png"  class="img-responsive  internation-combo-nav-content-tour-img" alt=""></div>
										<p>新加坡</p>
									</a>
								</div>
								<div class="col-xs-3 col-sm-3 col-md-3">
									<a  v-link="{name: 'destination', params: {id: 21} }">
										<div>
											<img src="../static/img/area/taiwan.png"  class="img-responsive  internation-combo-nav-content-tour-img" alt=""></div>
										<p>台湾</p>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div role="tabpanel" class="tab-pane fade" id="area-confirm-ocania">
						<div class="internation-combo-nav-content">
							<div class="row">
								<div class="col-xs-3 col-sm-3 col-md-3">
									<a  v-link="{name: 'destination', params: {id: 33} }">
										<div>
											<img src="../static/img/area/australia.png"  class="img-responsive  internation-combo-nav-content-tour-img" alt=""></div>
										<p>澳大利亚</p>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div role="tabpanel" class="tab-pane fade" id="area-confirm-europe">
						<div class="internation-combo-nav-content">
							<div class="row">
								<div class="col-xs-3 col-sm-3 col-md-3">
									<a  v-link="{name: 'destination', params: {id: 16} }">
										<div>
											<img src="../static/img/area/europe.png"  class="img-responsive  internation-combo-nav-content-tour-img" alt=""></div>
										<p>欧洲</p>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div role="tabpanel" class="tab-pane fade" id="area-confirm-america">
						<div class="internation-combo-nav-content"></div>
					</div>
					<div role="tabpanel" class="tab-pane fade" id="area-confirm-africa">
						<div class="internation-combo-nav-content"></div>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>
<style type="text/css">
.ara-confirm {
	padding-left: 0.2rem;
    padding-right: 0.2rem;
}
.ara-confirm a{
	color: #6b6b6b;
}
.ara-confirm-navbar {
	display: flex;
	justify-content: space-around;
}
.ara-confirm-navbar li a{
	margin-right: 0;
}
.ara-confirm-navbar, .ara-confirm-navbar li a{
	border: none!important;
	padding-left: 5px!important;	
	padding-right: 5px!important;
	font-size: 14px;
}
.ara-confirm-navbar li {
	font-weight: bolder;
}
.ara-confirm-navbar li.active {
	border-bottom: 0.3rem solid #1fd291;
}
.internation-combo-nav-content>div {
	margin: 0 auto;
	width: 100%;
}

.ara-confirm-navbar li.active a{
	color: #1fd291!important;
}
.internation-combo-nav-content {
	width: 100%;
	margin-top: 10px;
	margin-right: 10px;
}
.internation-combo-nav-content>div>a {
	display: block;
}
.internation-combo-nav-content-tour-img {
	width: 5rem;
	height: 5rem;
	margin-left: 1rem;
	border-radius: 5rem;
}
.internation-combo-nav-content p {
	width: 7rem;
	font-size: 14px;
	text-align: center;
}
.col-xs-3, .col-sm-3, .col-md-3 {
	padding-right: 0;
	margin-left: -2%;
}
</style>
<script>
    
    export default{
        data(){
            return{
                           
            }
        },
        components: {
            'myheader': require('../component/header.vue')
        }
    }
</script>