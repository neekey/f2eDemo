/**
 * @description
 *	��ױ�г���ҳ-����չ���߼�
 * @author: ���ƽ� <niyunjian.pt@taobao.com>
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
						// ��ԭtopֵ
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

						/* ��ò˵���ǰ����Ļoffset */
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
						
						// ���˵��������ڵĿ������򣬵���λ��
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
