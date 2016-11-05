$(function(){
	var aPage = $(".indexBanner .indexPage a");
	var aImg = $(".indexBanner .indexBox a");
	var iSize = aImg.size();
	var index = 0;

	aPage.click(function () {
		index = $(this).index();
		change(index);
	});
    
    function change(index){
        aPage.removeClass('active');
        aPage.eq(index).addClass('active');
        aImg.eq(index).siblings().hide();
        aImg.eq(index).show();
    }


	function autoshow() {
		index=index+1;
		if(index<=iSize-1){
		   change(index);
		}else{
			index=0;
			change(index);
		}
			
	}
	int=setInterval(autoshow,3000);
	function clearInt() {
		$('.indexPage a').mouseover(function() {
			clearInterval(int);
		})
	
	}
	function setInt() {
		$('.indexPage a').mouseout(function() {
			int=setInterval(autoshow,3000);
		})
	}
	clearInt();
	setInt();
});

$(document).ready(function(){
	$('.aboutTitle ul li').each(function(i,e){
			$(this).click(function(){
				$(this).siblings().removeClass('aboutTitleon');
				$(this).addClass('aboutTitleon');
				$('.aboutCon').eq(i).siblings().removeClass('show');
				$('.aboutCon').eq(i).addClass('show');
			});
		});		
})