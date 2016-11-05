<template>
    <div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" style="background-image:url('/static/img/eastBuy/b1.jpg')"></div>
                <div class="swiper-slide" style="background-image:url('/static/img/eastBuy/b2.jpg')"></div>
                <div class="swiper-slide" style="background-image:url('/static/img/eastBuy/b3.jpg')"></div>
                <div class="swiper-slide" style="background-image:url('/static/img/eastBuy/b4.jpg')"></div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
        </div>
        <div class="tips">
            <div class="tip1">
                <p class="p1"><span v-text="ownCountry"></span></p>
                <p class="p2">￥ <span v-text="eastbuyprice"></span></p>
            </div>
            <div class="tip2">
                <ul>
                    <li v-text="detail"></li>
                    <li>无限流量</li>
                    <li>3卡合一</li>
                </ul>
                <p> 快递：<span>5.00元</span></p>
            </div>
        </div>
        <div class="line"></div>
        <div class="selectArea" v-if="isB">
            <div class="selectWrapper">
                <p class="p1 east-buy-roate"><a v-link="{name: 'area-confirm'}" title="" style="color: red">选择地区套餐入口</a></p>
                <p class="p2"><a v-link="{name: 'area-confirm'}"><img src="/static/img/next.png" alt=""></a></p>
                </a>
            </div>
        </div>
        <div class="eastBuy-choice" v-if="!isB">
            <p class="text-left" style="color: red;margin-left:10px;">点击下面套餐进行购买</p>
            <ul id="east-buy-combo" class="clearfix">
            </ul>
        </div>

        <div class="cpIntro">
            <p class="intro">使用说明</p>
            <ol>
            </ol>
        </div>
        <div style="height:20px;"></div>
    </div> 
</template>
<script>
    
    export default{
        data(){
            return{
                eastbuyprice: 0,
                ownCountry: '',
                isB: false,
                allInfo: {},
                detail: '',
            }
        },
        components: {
            'myheader': require('../component/header.vue')
        },
        ready: function (argument) {
            //顶部轮播
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                // effect: 'cube',
                loop: true,
                autoplay: 2500,
                grabCursor: true,
                cube: {
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94
                }
            });
            var that = this;
            $.ajax({
                type: 'GET',
                url: 'http://www.itourbag.com/newtb/package/list',
                success: function(data) {
                    that.allInfo = data;
                    if(that.$route.params.country != 'world') {
                        that.isB = false;
                        //遍历国家
                        for(let i=0; i<that.allInfo['data'].length; i++) {
                            if(parseInt(that.allInfo.data[i].country) == 
                                    that.$route.params.country) {
                                that.ownCountry = combo[that.allInfo.data[i].country].name;
                                that.eastbuyprice = (parseInt(that.allInfo.data[i].price)/100).toFixed(2);
                                that.detail = combo[that.allInfo.data[i].country].detail;
                                //遍历套餐
                                if(that.allInfo.data[i].days >= 1) {
                                    //添加套餐
                                    $('#east-buy-combo').append("<li><a href=\"#!/order-confirm/" + that.allInfo.data[i].country + "/" + that.allInfo.data[i].days + "/" + that.eastbuyprice + "\">" + combo[that.allInfo.data[i].country].name + that.allInfo.data[i].days +"天套餐</a></li>" ); 
                                    //给套餐添加介绍
                                    $('.cpIntro ol').append("<li>" + that.allInfo.data[i].detail + "</li>");
                                }
                                //添加自主套餐
                                // if(that.allInfo.data[i].teltime == -1) {
                                //     $('#east-buy-combo').append("<li><a href=\"#!/detination/" + that.allInfo.data[i].id.toString()+ "\">" + combo[that.allInfo.data[i].country].name + "自主选择天套餐</a></li>" );
                                //     $('.cpIntro ol').append("<li>" + that.allInfo.data[i].detail + "</li>"); 
                                // }

                            }
                        }
                    } else {
                       that.isB = true;
                       that.eastbuyprice = '10-500',
                       that.ownCountry = '途宝飞鲸卡';
                       that.detail = '全球通用';
                    }
                }
            })
            // if(this.$route.params.country != 'world') {
            //     this.isB = false;
            //     //遍历国家
            //     for(let i=0; i<this.allInfo['data'].length; i++) {
            //         if (this.allInfo.data[i].country == this.$route.params.country) {
            //             this.eastbuyprice = (parsetInt(this.allInfo.data[i].price)/100).toFixed(2);
            //             //遍历套餐
            //             if(this.allInfo.data[i].teltime != -1) {
            //                 $('#east-buy-combo').append("<li><a href=\"#!/order-confirm/mlgb/" + this.allInfo.data[i].days + "/" + this.eastbuyprice + "\">mlgb" + this.allInfo.data[i].days +"天套餐</a></li>" ); 
            //             }
            //         }
            //     }
            // } else{
            //     this.isB = true;
            //     this.eastbuyprice = '10-500';
            //     this.country = '途宝飞鲸软卡';
            // }
        },
    }
</script>

<style>
    .swiper-container {
        width: 100%;
        height: 275px;

    }
    .swiper-slide {
        background-position:center;
        background-size: cover;
    }
    .tips{
        clear: both;
        width: 100%;
        height: 50px;
        border-top: 1px solid #e1e1e1;
    }
    .tips .tip1{
        margin:0px 10px;
        /*margin-bottom: 0px;*/
        height: 30px;
    }
    .tips .tip2{
        margin: 0px 10px;
        height: 20px;
    }
    .tips .tip1 p.p1{
        float: left;
        font-size: 20px;
        line-height: 30px;
    }
    .tips .tip1 p.p2{
        float: right;
        font-size: 20px;
        color: #ff0000;
        line-height: 30px;
    }
    .tips .tip2 ul{
        width: 79%;
        padding-left: 0px;
        float: left;
    }
    .tips .tip2 ul li{
        list-style: none;
        float: left;
        width: 20%;
        padding-top: 2px;
        padding-bottom: 2px;
        font-size: 12px;
        color: #1fd291;
        border:1px solid #1fd291;
        margin-right: 5px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
    }
    @media screen 
      and (min-device-width: 320px) 
      and (max-device-width: 374px){
        .swiper-container {
            height: 215px;
        }
        .tips .tip2 ul{
            width: 76%;
        }
        .tips .tip2 ul li{
            width: 24%;
        }
      }
    .tips .tip2 p{
        margin-top: 0px;
        font-size: 12px;
        color: #8b8b8b;
        padding-top: 0px;
        float: right;
    }
    .line{
        width: 100%;
        height: 10px;
        background: #e1e1e1;
        clear: both;
    }
    .selectArea{
        width: 100%;
        height: 40px;
        padding-bottom: 16px;       
    }
    .selectArea .selectWrapper{
        margin:0px 10px;
        height: 40px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e1e1e1;
    }
    .selectArea .selectWrapper p.p1{
        height: 40px;
        font-size: 16px;
        line-height: 40px;
        color: #ff0000;
    }
    .selectArea .selectWrapper p.p2 a{
        font-size: 20px;
        line-height: 34px;
        text-decoration: none;
        color: #000;
    }
    .eastBuy-choice{
        width: 100%;
        border-bottom: 1px solid #e1e1e1;
    }
    .eastBuy-choice ul{
        width: 100%;
        padding-left: 15px!important;
    }
    .eastBuy-choice ul li{        
        list-style: none;
        float: left;
        margin-top: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .eastBuy-choice ul li a{
        padding: 5px;
        color: #ffffff;
        border:1px solid #47d8a3;
        border-radius: 5px;
        background: #1fd291;
    }
    .eastBuy-choice ul li a:focus{
        color: #ffffff;
        background: #1fd291;
    }
    .cpIntro{
        clear: both;
        text-align: left; 
        width: 90%;
        margin:0 auto;
        margin-top: 20px;
        color: #5c5b5b;
        border: 1px solid #c8c8c8;
        -webkit-border-radius:5px;
        -moz-border-radius:5px;
        border-radius: 5px;
    }
    .cpIntro p{
        font-size: 12px;
        line-height: 20px;
        padding-left: 5px;
    }
    .cpIntro p.intro{
        font-size: 18px;
        line-height: 24px;
        clear: both;
    }
</style>
