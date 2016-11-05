<template>
	<div class="helpinfochild">
		<title title="帮助" backlink="helpinfo" showbtn="false"></title>
		<div class="wrapper helpinfochild-wrapper">
			<article>
				<h3 class="helpinfochild-title" v-text=""></h3>
				<section class="helpinfochild-section">
					<dl>
						<dt v-text="info.title"></dt>
						<dd>
							<p v-text="info.content"></p>
							<div v-for="item in info.images">
								<div v-text="item.title"></div>	
								<img v-bind:src="item.url" alt="">
							</div>
						</dd>
					</dl>
				</section>
			</article>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data: function () {
			return {
				title:'',
				info: {}
			}
		},
		route:{
			data(){
				var self = this;
				var xhr = new XMLHttpRequest();
				xhr.open('GET', '../../../../static/json/help.json', true);
				xhr.setRequestHeader('If-Modified-Since', 0);
				xhr.send(null);
				xhr.onreadystatechange = function () {
					if ((xhr.status == 200) && xhr.readyState == 4) {
						var data = JSON.parse(xhr.responseText).data;
							data.forEach(function (value, index, array) {
							if (parseInt(self.$route.params.id) == value.id) {
								self.title = document.createTextNode(value.title);
								self.info = value.content[self.$route.params.index];
								return ;
							}
						return ;
						});	
					}
				};
			}
		},
		ready: function () {
		},
		destroyed: function () {
			this.info = null;
			this.title = '';
		}
	}
</script>
<style type="text/css">
	.helpinfochild-title {
		text-align: center;
		font-size: 1.1em;
	}
	.helpinfochild-section {
		font-size: 1em;
		line-height: 1.5em;
	}
	.helpinfochild-section dl {
		color: #888;
		margin-left: 5px;
		margin-right: 5px;
	}
	.helpinfochild-section dl dt {
		font-weight: bold;
	}
	.helpinfochild-section dl dd {
		text-indent: 2em;
	}
	.helpinfochild-section dl dd div {
		text-align: center;
	}
	.helpinfochild-section dl dd img {
		width: 100%;
	}
</style>