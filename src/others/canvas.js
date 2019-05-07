export default (function () {
	function Ani(canvasId, option) {
		this.option = option;
		this.canvas = document.getElementById(canvasId);
		this.ctx = this.canvas.getContext('2d');
		this.diamonds = [];
		this.amount = option.amount;
		this.size = 15;
		this.v = option.to - option.from > 0 ? 3 : -3;
		this.padding = 30;
		this.color = {
			r: option.r,
			g: option.g,
			b: option.b
		};
		this.start();
	}

	Ani.prototype = {
		start: function () {
			var self = this;

			for (var i = 0; i < this.amount; i++) {
				var scale = parseFloat(Math.random().toFixed(2)),
					newSize = parseInt(this.size * scale),
					opacity = Math.random().toFixed(2),
					strokeOpacity = Math.random().toFixed(2),
					x = this.canvas.width * Math.random() < this.padding ? this.padding : this.canvas.width *
					Math.random(),
					y = this.canvas.height * Math.random(),
					v = parseFloat((Math.random().toFixed(2) + 1) / 2) * this.v;

				if (x > this.canvas.width - this.padding) {
					x = this.canvas.width - this.padding;
				}

				if (v > -0.5 && v < 0) {
					v = (1 + v) * -1;
				}
				if (v < 0.5 && v >= 0) {
					v = 1 - v;
				}

				var diaObj = {
					size: newSize,
					opacity: opacity,
					strokeOpacity: strokeOpacity,
					x: x,
					y: y,
					v: v,
					color: {
						r: self.color.r,
						g: self.color.g,
						b: self.color.b
					},
					lineColor: {
						r: self.color.r,
						g: self.color.g,
						b: self.color.b
					},
					maxDis: Math.random().toFixed(2) * this.canvas.height
				};

				this.diamonds.push(diaObj);
				var newDiamond = new Diamond(diaObj, this.canvas);
			}

			var moveTimer = setInterval(function () {
				self.move();
			}, self.option.moveDur);

			var createTimer = setInterval(function () {
				self.createNew();
			}, self.option.newDur)
		},
		move: function () {
			var self = this;

			self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
			for (var i = 0; i < self.diamonds.length; i++) {
				self.diamonds[i].y = self.diamonds[i].y + self.diamonds[i].v;
				if (self.v > 0 && self.diamonds[i].y > self.diamonds[i].maxDis) {
					self.diamonds.splice(i, 1);
				}
				if (self.v < 0 && self.diamonds[i].y < self.canvas.height - self.diamonds[i].maxDis) {
					self.diamonds.splice(i, 1);
				}
			}
			for (i = 0; i < self.diamonds.length; i++) {
				var newOpa = self.diamonds[i].opacity - 0.001 < 0 ? 1 : self.diamonds[i].strokeOpacity - 0.001,
					newStrokeOpa = self.diamonds[i].strokeOpacity - 0.001 < 0 ? 1 : self.diamonds[i].strokeOpacity;

				self.diamonds[i].opacity = newOpa;
				self.diamonds[i].strokeOpacity = newStrokeOpa;

				var item = self.diamonds[i];

				self.ctx.fillStyle = 'rgba(' + item.color.r + ',' + item.color.g + ',' + item.color.b + ',' +
					item.opacity +
					')';
				self.ctx.beginPath();
				self.ctx.moveTo(item.x, item.y);
				self.ctx.strokeStyle = 'rgba(' + item.lineColor.r + ',' + item.lineColor.g + ',' + item.lineColor
					.b +
					',' +
					item.strokeOpacity +
					')';
				self.ctx.fillRect(item.x, item.y, item.size, item.size);
				self.ctx.strokeRect(item.x, item.y, item.size, item.size);
			}
		},
		createNew: function () {
			var scale = parseFloat(Math.random().toFixed(2)),
				newSize = parseInt(this.size * scale),
				opacity = Math.random().toFixed(2),
				strokeOpacity = Math.random().toFixed(2),
				x = this.canvas.width * Math.random() < 20 ? 20 : this.canvas.width * Math.random(),
				y = this.option.from,
				v = parseFloat((Math.random().toFixed(2) + 1) / 2) * this.v;

			if (x > this.canvas.width - 20) {
				x = this.canvas.width - 20;
			}

			if (v > -0.5 && v < 0) {
				v = -1 * (1 + v);
			}

			if (v < 0.5 && v >= 0) {
				v = 1 - v;
			}

			// if(this.canvas.id == 'bottom-canvas') {
			//   console.log(v);
			// }

			var diaObj = {
				size: newSize,
				opacity: opacity,
				strokeOpacity: strokeOpacity,
				x: x,
				y: y,
				v: v,
				color: {
					r: this.color.r,
					g: this.color.g,
					b: this.color.b
				},
				lineColor: {
					r: this.color.r,
					g: this.color.g,
					b: this.color.b
				},
				maxDis: Math.random().toFixed(2) * this.canvas.height
			};

			this.diamonds.push(diaObj);
			var newDiamond = new Diamond(diaObj, this.canvas);
		}
	}

	function Diamond(obj, canvas) {
		this.create(obj, canvas);
	}

	Diamond.prototype = {
		create: function (obj, canvas) {
			var ctx = canvas.getContext('2d');

			ctx.fillStyle = 'rgba(' + obj.color.r + ',' + obj.color.g + ',' + obj.color.b + ',' + obj.opacity +
				')';
			ctx.beginPath();
			ctx.moveTo(obj.x, obj.y);
			ctx.strokeStyle = 'rgba(' + obj.lineColor.r + ',' + obj.lineColor.g + ',' + obj.lineColor.b + ',' +
				obj.strokeOpacity +
				')';
			ctx.fillRect(obj.x, obj.y, obj.size, obj.size);
			ctx.strokeRect(obj.x, obj.y, obj.size, obj.size);
		}
	}

	return {
		init: function (canvasId, option) {
			var newAni = new Ani(canvasId, option);
		}
	}
})()