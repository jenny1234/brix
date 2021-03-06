KISSY.add('brix/gallery/charts/js/pub/views/infos/info',function(S,Base,node,Global,SVGElement,SVGGraphics){
	
	function Info(){
		
		var self = this

		Info.superclass.constructor.apply(self,arguments);

		// self.init.apply(self,arguments);
	}

	Info.ATTRS = {
		w:{
			value:80
		},
		h:{
			value:24
		},
		/*
		 * 二维数组中 一个数组代表一行
		 * o = 
		 *    content(文字内容)[]:展现次数, size(文字大小)[12]:12, bold(是否粗体 1 = 是 | 0 = 否)[0]:1, fill(文字颜色)[0x000000]:0xFF0000, font(字体)[Arial]:Arial
		 *    ver_align(同一列对齐方式 1 = 左对齐 | 2 = 居中对齐 | 3 = 右对齐)[1]:2
		 *    hor_align(同一行对齐方式 1 = 上对齐 | 2 = 居中对齐 | 3 = 下对齐)[1]:2
		*/
		data:{
			value:[]                     //文字描述二维数据集合[[{o},{}],[]]
		},
		element:{
			value:null
		},
		base_fill:{
			value:'#000000'
		},

		_lay:{
			value:{}                     //根据此对象设置集合文字坐标、对齐方式等 {maxHorH(每一行最大的高集合):[24,24,24], maxVerW(对应列最大的宽集合):[100,100]}      
		},
		_fontsArr:{
			value:[]                     //存放所有文字的二维数组  存入结构类似this.data  
		},
		_font_family:{
			value:'Arial'
		},
		_disX:{ 
			value:10                     //文字集合到左、右的距离         
		},
		_disY:{ 
			value:5                      //文字集合到上、下的距离     
		},

		_g:{
			value:null
		},
		_fonts:{ 
			value:null  
		},
		_back:{ 
			value:null  
		}
	}

	S.extend(Info,Base,{
		init:function(){
			var self = this
			Info.superclass.constructor.apply(self,arguments);
			
			self.set('element', new SVGElement('g')), self.get('element').set('class','info')
			self.get('parent').appendChild(self.get('element').element)

			self._widget()
			self._layout()

			// self.set('_circle', SVGGraphics.circle({'r':5,'fill':'#ffffff','stroke':'#000000','stroke_width':2}))
			// self.get('element').appendChild(self.get('_circle').element)
		},

		setShadow:function($id){
			var self = this
			self.get('_back').attr({'class':'back','filter':'url(#' + $id + ')'})
		},

		_widget:function(){
			var self = this
			self.set('_g', new SVGElement('g')), self.get('_g').set('class','g')
			self.get('element').appendChild(self.get('_g').element)

			self.set('_back', new SVGElement('rect'))//, self.get('_back').attr({'id':'J_back','filter':'url(#' + self.get('shadow_id') + ')'})
			self.get('_g').appendChild(self.get('_back').element)

			self.set('_fonts', new SVGElement('g')), self.get('_fonts').set('class','fonts')
			self.get('_g').appendChild(self.get('_fonts').element)
		},

		_layout:function(){
			var self = this
			self.get('_lay').maxHorH = [], self.get('_lay').maxVerW = []

			for(var a = 0, al = self.get('data').length; a < al; a++){
				//一行中最高的值
				var maxHorH = 0      
				for(var b = 0, bl = self.get('data')[a].length; b < bl ; b++){
					var o = self.get('data')[a][b]
					var bold = o.bold || Number(o.bold) == 0 ? Number(o.bold) : 1
					var fill = o.fill ? o.fill : self.get('base_fill')
					var family = o.family ? o.family : self.get('_font_family')
					var font = SVGGraphics.text({'content':Global.numAddSymbol(o.content),'size':o.size,'fill':fill,'bold':bold,'family':family})
					self.get('_fonts').element.appendChild(font.element)

					maxHorH = maxHorH < font.getHeight() ? font.getHeight() : maxHorH
					
					if(!self.get('_lay').maxVerW[b]){
						self.get('_lay').maxVerW[b] = 0
					}
					if(self.get('_lay').maxVerW[b] < font.getWidth()){
						self.get('_lay').maxVerW[b] = font.getWidth()
					}
					if(self.get('_fontsArr')[a]) {self.get('_fontsArr')[a].push(font)}else{self.get('_fontsArr')[a] = [],self.get('_fontsArr')[a].push(font)}
				}
				self.get('_lay').maxHorH.push(maxHorH)	
			}
			for (var c = 0, cl = self.get('data').length; c < cl; c++ ) {
				for (var d = 0, dl = self.get('data')[c].length; d < dl; d++ ) {
					var o = self.get('data')[c][d]
					var font = self.get('_fontsArr')[c][d]
					
					//同一行前一个
					var preFont = self.get('_fontsArr')[c][d-1] ?  self.get('_fontsArr')[c][d-1] : ''
					var upFont = self.get('_fontsArr')[c-1] && self.get('_fontsArr')[c-1][d] ? self.get('_fontsArr')[c-1][d] : ''

					var x = preFont ? Global.getArrMergerNumber(self.get('_lay').maxVerW, 0, d - 1) : 0 
					var y = (upFont || c>0) ? Global.getArrMergerNumber(self.get('_lay').maxHorH, 0, c - 1) : 0
					var ver_align = o.ver_align ? o.ver_align : 2
					var hor_align = o.hor_align ? o.hor_align : 2
					if (ver_align == 2) {
						x = x + (self.get('_lay').maxVerW[d] - font.getWidth())/2
					}else if (ver_align == 3) {
						x = x + self.get('_lay').maxVerW[d] - font.getWidth()
					}
					if (hor_align == 2) {
						y = y + (self.get('_lay').maxHorH[c] - font.getHeight())/2
					}else if (hor_align == 3) {
						y = y + self.get('_lay').maxHorH[c] - font.getHeight()
					}
					y = y + font.getHeight() * 0.75
					x = Global.ceil(x), y = Global.ceil(y)
					font.transformXY(x,y)
				}
			}

			self.get('_fonts').transformXY(self.get('_disX'),self.get('_disY'))

			var w = Global.getArrMergerNumber(self.get('_lay').maxVerW,0,self.get('_lay').maxVerW.length) + self.get('_disX') * 2
			var h = Global.getArrMergerNumber(self.get('_lay').maxHorH,0,self.get('_lay').maxHorH.length) + self.get('_disY') * 2

			self.get('_back').attr({'_w':w,'_h':h,'width':w,'height':h,'fill':'#ffffff','opacity':1,'rx':4,'rx':4,'stroke':self.get('base_fill') ? self.get('base_fill') : '#000000','stroke-width':2})

			self.set('w', w), self.set('h', h)

			var x = -Global.ceil(w/2) - 1,y = -Global.ceil(h/2)
			self.get('_g').transformXY(x,y)
			// this._fonts.transformXY(x,y)
		}
	});

	return Info;

	}, {
	    requires:['base','node','../../utils/global','../../utils/svgelement','../svggraphics']
	}
);