KISSY.add('brix/gallery/charts/js/pub/utils/global',function(S){
	
	var Global  = {

		N05    : 0.5,
		N00001 : 0.00001,

		/**
		 * 数字千分位加','号
		 * @param  {[Number]} $n [数字]
		 * @param  {[type]} $s [千分位上的符号]
		 * @return {[String]}    [根据$s提供的值 对千分位进行分隔 并且小数点上自动加上'.'号  组合成字符串]
		 */
		numAddSymbol:function($n,$s){
			var s = String($n)
			var symbol = $s ? $s : ','
			if(isNaN($n)){
				return s
			}
			var n_arr = s.split('.')
			s = n_arr[0]
			var l = s.length
			var d = l / 3
			var arr = []
			if(d > 1){
				for(var a = 1;a<d;a++){
					arr.unshift(s.substr(-3,3))
					s = s.substr(0,s.length - 3)
				}
			}
			arr.unshift(s)
			n_arr.shift()
			arr.concat(n_arr)
			s = arr.join($s)
			if(n_arr.length == 1){
				s = s + '.' + n_arr[0]
			}
			return s
		},

		/**
		 * 将二维数组转换成一维数组
		 * @param  {[Array]} $arr [二维数组]
		 * @return {[Array]}      [一维数组]
		 */
		getChildsArr:function($arr){
			var arr = []
			for (var i = 0, l = $arr.length; i < l; i++){
				var tmp = $arr[i]
				arr = arr.concat(tmp);
			}
			return arr;
		},

		/**
		 * 从一个二维数组中获取子数组最长的长度值
		 * @param  {[type]} $arr:Array [description]
		 * @return {[type]}            [description]
		 */
		getMaxChildArrLength:function($arr) {
			var n = 0
			var arr = $arr
			for (var i = 0, l = arr.length; i < l; i++ ) {
				n = n > arr[i].length ? n : arr[i].length
			}
			return n
		},

		//根据$start和$end 从一个数组中合并数据
		getArrMergerNumber:function($arr,$start,$end){
			var n = 0
			for(var i = 0,l = $arr.length;i<l;i++){
				if(i >= $start){
					n = n + $arr[i]
					if(i == $end){
						break;
					}
				}
			}
			return n
		},

		//在一个数组中 返回比对$arr中的值离$n最近的值的索引
		disMinATArr:function($n, $arr) {
			var index = 0
			var n = Math.abs($n - $arr[0])
			for (var a = 1, al = $arr.length ; a < al; a++ ) {
				if (n > Math.abs($n - $arr[a])) {
					n = Math.abs($n - $arr[a])
					index = a
				}
			}
			return index
		},

		/**
		 * 从一个数组中删除$length参数指定的长度 但需要保留子数组最后一位 返回新的数组
		 * @param  {[Array]} $arr    [数组]
		 * @param  {[Number]} $length [删除的长度]
		 * @return {[Array]}         [删除之后的数组]
		 */
		delArrUnPop:function($arr, $length) {
			var tmp = S.clone($arr);
			if (tmp.length >= $length + 1){
				var pop = tmp[tmp.length - 1];
				tmp.length = tmp.length - $length - 1;
				tmp.push(pop);
			}
			return tmp;
		},

		//根据$index指定的索引 将$arr中的$index处的数据 放到最前面 $index之后的数据自动提前一位
		unshiftIndexArray:function ($arr, $index) {
			var tmp = $arr[$index]
			$arr.splice($index,1)
			$arr.unshift(tmp)
		},

		//从一个数组从计算总值
		getTotalForArray:function($arr){
			var n = 0
			for (var a = 0, al = $arr.length; a < al; a++ ) {
				if ($arr[a]) {
					n += Number($arr[a])
				}
			}
			return n
		},

		ceil:function ($n){
			return Math.ceil($n)
		},

		//等比例缩放数值 p1=缩放后最大w,h  p2=需要缩放的w,h
		fit:function(p1,p2){
			var p = {}
			var disW = p1.w / p2.w, disH = p1.h / p2.h
			
			if (disW >= disH) {
				p.scale = disH
				p.w = p2.w * disH , p.h = p1.h
			} else {
				p.scale = disW
				p.w = p1.w, p.h = p2.h * disW;
			}
			return p
		},

		//根据文字的length获取文字的宽
		getTextWidth:function($length){
			return 11 + 7 * ($length-1)
		}
	};

	return Global;

	}
);