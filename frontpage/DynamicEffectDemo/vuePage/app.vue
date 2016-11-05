<template>
	<div>
		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="#">功能测试</a>
				</div>
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li>
							<a v-link="{path:'yinguang'}">荧光效果</a>
						</li>
						<li>
							<a v-link="{path:'juhua'}">页面加载菊花转效果</a>
						</li>
						<li>
							<a v-link="{path:'wave'}" id="wave1">背景图片波浪效果</a>
						</li>
						<li>
							<a v-link="{path:'inandout'}">逐层进入的菜单栏</a>
						</li>
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
								嵌套路由测试
								<span class="caret"></span>
							</a>
							<ul class="dropdown-menu">
								<li>
									<a v-link="{path:'erji-router'}">嵌套路由测试首页</a>
								</li>
								<li role="separator" class="divider"></li>
								<li>
									<a v-link="{path:'/erji-router/child-1'}">二级路由子页面一</a>
								</li>
								<li role="separator" class="divider"></li>
								<li>
									<a v-link="{path:'/erji-router/child-2'}">二级路由子页面二</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<router-view transition="fade" transition-mode="out-in"></router-view>
	</div>
</template>
<style type="text/css"></style>