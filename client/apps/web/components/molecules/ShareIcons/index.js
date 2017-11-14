var React = require('react');

require('./index.css');

module.exports = React.createClass({

	displayName: "ShareIcons",

	showPopUpHandler: function(url){

		var self = this;

		return function(e){

			e.preventDefault();

			self.popupCenter(url, '', 600, 400)
		}
	},

	popupCenter: function(url, title, w, h) {
        // Fixes dual-screen position                         Most browsers      Firefox
        var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 3) - (h / 3)) + dualScreenTop;

        var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

        // Puts focus on the newWindow
        if (window.focus) {
            newWindow.focus();
        }
    },
	
	render: function () {

		if (!process.env.BROWSER) return <span/>

		var url = window.location.protocol + '//' + window.location.host + window.location.pathname;

		var href_facebook = "https://www.facebook.com/sharer/sharer.php?u="+url+"&appId=";
		var href_twitter = "https://twitter.com/share?&url="+url;//+"&amp;text=&amp;via=XXX_YOUR_TWITTER_HANDLE"
		var href_google = "https://plus.google.com/share?url="+url;
		var href_linkedin = "https://www.linkedin.com/shareArticle?mini=true&url="+url;//+"&amp;title=&amp;source="

		

		/*

				<!-- Twitter Button -->
				<li className="ShareIcons__twitter">
					<a onclick="javascript:popupCenter('https://twitter.com/share?&amp;url=<?php the_permalink(); ?>&amp;text=<?php the_title(); ?>&amp;','Tweet', '540', '400');return false;" href="https://twitter.com/share?&amp;url=<?php the_permalink(); ?>&amp;text=<?php the_title(); ?>&amp;via=XXX_YOUR_TWITTER_HANDLE" target="blank"> <i class="icon icon-twitter fa fa-twitter" title="Tweet"></i> </a><!--via=XXX_YOUR_TWITTER_HANDLE-->
				</li>
				<!-- Google + Button-->
				<li className="ShareIcons__google">
					<a onclick="javascript:popupCenter('https://plus.google.com/share?url=<?php the_permalink(); ?>','Share on Google+', '600', '600');return false;" href="https://plus.google.com/share?url=<?php the_permalink(); ?>" target="blank"> <i class="icon icon-google-plus fa fa-google-plus" title="Share"></i> </a><span class="share-count"><?php echo ds_post_plusone_count( $post_id ); ?></span>
				</li>

				<!-- LinkedIn Button -->
				<li className="ShareIcons__linkedin">
					<a onclick="javascript:popupCenter('http://www.linkedin.com/shareArticle?mini=true&amp;url=<?php the_permalink(); ?>&amp;title=<?php the_title(); ?>&amp;source=<?php site_url(); ?>','Share on LinkedIn', '520', '570');return false;" href="http://www.linkedin.com/shareArticle?mini=true&amp;url=<?php the_permalink(); ?>&amp;title=<?php the_title(); ?>&amp;source=<?php site_url(); ?>" target="blank"> <i class="icon icon-linkedin fa fa-linkedin" title="Share"></i>  </a><span class="share-count"><?php echo ds_post_linkedin_count( $post_id ); ?></span>
				</li>


		*/

		return (

			<div className="ShareIcons bordered">
				
				<li className="ShareIcons__facebook">
					<a onClick={this.showPopUpHandler(href_facebook)} href={href_facebook} target="blank"> 
						<i className="fa fa-facebook" title="Share"></i> 
					</a>
					{/*<span className="ShareIcons__count">0</span>*/}
				</li>

				<li className="ShareIcons__twitter">
					<a onClick={this.showPopUpHandler(href_twitter)} href={href_twitter} target="blank"> 
						<i className="fa fa-twitter" title="Share"></i> 
					</a>
					
				</li>

				<li className="ShareIcons__google">
					<a onClick={this.showPopUpHandler(href_google)} href={href_google} target="blank"> 
						<i className="fa fa-google" title="Share"></i> 
					</a>
					{/*<span className="ShareIcons__count">0</span>*/}
				</li>

				<li className="ShareIcons__linkedin">
					<a onClick={this.showPopUpHandler(href_linkedin)} href={href_linkedin} target="blank"> 
						<i className="fa fa-linkedin" title="Share"></i> 
					</a>
					{/*<span className="ShareIcons__count">0</span>*/}
				</li>

			</div>
		)
	}
});