<template>
	<div class="systemcard">
	    <div class="systemcard-show">
	    	<img width="100%" src="/static/images/temp/card-buy.png">
	    </div>
	    <div class="systemcard-info">
	    	<div class="systemcard-info-left">
	    		{{softcard.syscardname}}<br/>
	    		<span>{{softcard.countrycodename}}</span><span>途宝狂欢季</span>
	    	</div>
	    	<div class="systemcard-info-right">
	    		￥<span>{{softcard.price/100}}</span>
	    	</div>
	    </div>
	    <div class="swiper-container" 
			style="position: relative;margin-top:185px;height:60px;background-color:white;">
	        <div class="swiper-wrapper">
	        	<div class="swiper-slide" v-for="actualcard in actualcardlist">
	            	<a href="#">
	            		<div style="float:right;color:black;margin-right:10px;width:65%;text-align:center;">
	        				<li style="margin-top:5px;">{{actualcard.syscardname}}</li>
	        				<li style="font-size:14px;color:red;margin-top:5px;">
	        					{{actualcard.description}}
	        				</li>
	        			</div>
	        			<img style="float:right" 
	            			height="50px" src="/static/images/temp/card-adv-1.png" />
	            	</a>
	            </div>
	            <div class="swiper-slide"></div>
	            <div class="swiper-slide"></div>
	            <div class="swiper-slide"></div>
	        </div>
	        <div class="swiper-pagination" style="top:40px;positon:absolute;"></div>
	    </div>
		
	    <div class="systemcard-detail">
	    	<div class="systemcard-detail-title">使用说明</div>
	    	<p>
	    		{{softcard.description}}
	    	</p>
	    </div>
	    <div class="systemcard-bottom-btn-area">
	    	立即购买
	    </div>
        <toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
	</div>
</template>
<script>
    import Utils from '../../common/utils.js'
    import Config from '../../common/config.js'
    import toastDialog from '../../components/dialog/toastDialog.vue'
    export default {
        data: function() {
            return {
                list: [],
                toastdialogtitle: '', 
                toastdialogcontent: ''
            }
        },
        components: {
            toastDialog
        },
        ready: function() {
            var self = this;
            $.ajax({
                beforeSend: function () {
                    $('.weui_loading_toast').css('display', 'block');
                },
                complete: function () {
                    $('.weui_loading_toast').css('display', 'none');
                },
                type: 'post',
                url: Config.getApiURL() + "/sys/card/list",
                success: function(result) {
                    if (result.status == 0) {
                        self.list = result.data;
                    } else {
                        self.toastdialogtitle = "反馈提示";
                        self.toastdialogcontent = result.tip;
                        $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
                            $('#dialog2').off('click').hide();
                        });
                    }
                },
                error: function (err) {
                    self.toastdialogtitle = "反馈提示";
                    self.toastdialogcontent = "网络错误";
                    $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
                        $('#dialog2').off('click').hide();
                    });
                }
            });
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                spaceBetween: 5,
                centeredSlides: true,
                autoplay: 3500,
                autoplayDisableOnInteraction: false,
                loop: false
            });
        },
        computed: {
            softcard: function() {
                for (var i = this.list.length - 1; i >= 0; i--) {
                    var temp = this.list[i];
                    if (temp.type == 1) {
                        return temp;
                    };
                };
            },
            actualcardlist: function() {
                var array = new Array();
                for (var i = this.list.length - 1; i >= 0; i--) {
                    var temp = this.list[i];
                    if (temp.type == 2) {
                        array.push(temp);
                    };
                };
                return array;
            }
        }
    }
</script>
<style type="text/css">
    .systemcard-show {
        position: absolute;
        left: 0;
    }
    
    .systemcard-info {
        position: relative;
        top: 180px;
        height: 60px;
        background-color: white;
        font-size: 14px;
        line-height: 30px;
    }
    
    .systemcard-info-left {
        float: left;
        margin-left: 5px;
        font-weight: bold;
    }
    
    .systemcard-info-left span {
        font-size: 12px;
        background-color: red;
        color: white;
        border-radius: 3px;
        display: block;
        padding-left: 5px;
        padding-right: 5px;
        text-align: center;
        height: 16px;
        line-height: 16px;
        margin-top: 5px;
        float: left;
        margin-right: 5px;
    }
    
    .systemcard-info-right {
        float: right;
        font-size: 19px;
        margin-right: 5px;
        line-height: 60px;
        font-weight: bold;
        color: red;
    }
    
    .systemcard-info-right span {
        font-size: 28px;
        margin-left: 5px;
    }
    
    .systemcard-detail {
        margin-top: 5px;
        background-color: white;
        width: 100%;
        height: 300px;
    }
    
    .systemcard-detail-title {
        color: #0066aa;
        font-weight: bold;
        letter-spacing: 2px;
        font-size: 13px;
        padding-left: 5px;
        height: 25px;
        line-height: 25px;
    }
    
    .systemcard-detail p {
        margin-left: 5px;
        margin-right: 5px;
        font-size: 15px;
        color: #888888;
        font-weight: bold;
    }
    
    .systemcard-bottom-btn-area {
        position: fixed;
        bottom: 0;
        height: 40px;
        background-color: red;
        width: 100%;
        left: 0;
        border-top: solid 1px #888888;
        line-height: 40px;
        text-align: center;
        letter-spacing: 1px;
        color: white;
        font-weight: bold;
    }
</style>