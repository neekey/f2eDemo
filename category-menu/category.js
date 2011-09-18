/**
 * @description
 *	美妆市场首页-分类展开逻辑
 * @author: 倪云建 <niyunjian.pt@taobao.com>
 */
!function( context ){
	
	Vertical.add( 'category', function( V ){
		V.namespace('category');
		V.category.init = function(){
			KISSY.use( 'switchable', function( K ){
				K.ready( function( S ){
					var Event = S.Event, DOM = S.DOM,
					ActiveClass = 'category-item-active',
					categoryPavilion = S.one('#J_detail-pavilion'),
					preMouseEnter,
					preDetail;
					
					
					var mouseOut = function(){
						DOM.removeClass( preMouseEnter, ActiveClass ); 
						// 还原top值
						if( preDetail ) preDetail.css('top', '-2px');
						preMouseEnter = null;
						preDetail = null;
					},
					mouseIn = function(){
						DOM.addClass( this, ActiveClass ); 	
						if( preMouseEnter && preMouseEnter !== this ){
							DOM.removeClass( preMouseEnter, ActiveClass ); 
							preMouseEnter = null;
						}
						if( preDetail ) preDetail.css('top', '-2px');
						preMouseEnter = this;

						/* 获得菜单当前的屏幕offset */
						var detail = S.one( this ).children('.category-item-detail');
						detail[ 0 ].appendChild(categoryPavilion.getDOMNode());

						var detailH = detail.height(),
						domScroll = DOM.scrollTop(),
						offsetTop = detail.offset().top,
						offset = offsetTop - domScroll + detailH,
						viewHeight = DOM.viewportHeight(),
						oldTop = parseInt( detail.css('top'), 0 ),
						newTop = oldTop,
						heightDis = offset - viewHeight,
						topChange = 0;

						preDetail = detail;
						
						// 若菜单超过窗口的可视区域，调整位置
						if( heightDis > 0 ){
							if( ( offsetTop - heightDis ) < domScroll ){
								topChange = offsetTop - domScroll;
							}
							else {
								topChange = heightDis; 
							}
							newTop = oldTop - topChange;
							detail.css('top', newTop + 'px' );
						}
					};
					Event.on('.category-list-item', 'mouseenter', mouseIn );
					Event.on('.category-list-item', 'mouseover', function(){
						if( !preMouseEnter ){
							mouseIn.apply( this, arguments );
						}
					});
					Event.on('.category-list-item', 'mouseleave', mouseOut );
					Event.on('.category-item-detail', 'mouseleave', mouseOut );

					
				});
			});
			
		};
	});
	
	Vertical.category.init();
		
}( window );
