// 一个简单的勇士遇见怪物游戏～
(function () {
    // prepare
    function prepare() {
        const imgTask = (img, src) => {
            return new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = src;
            })
        };

        const context = document.getElementById('content').getContext('2d');
        const heroImg = new Image();
        const allSpriteImg = new Image();
        const allResourceTask = Promise.all([
            imgTask(heroImg, './img/hero.png'),
            imgTask(allSpriteImg, './img/all.jpg')
        ]);

        return {
            getResource (callback) {
                allResourceTask.then(() => {
                    callback && callback(context, heroImg, allSpriteImg)
                })
            }
        }
	}

    function drawRole(context, heroImg, allSpriteImg) {
        var draw = function () {
			debugger;
			this.context
				.drawImage(
					this.img,
					this.imgPos.x,
					this.imgPos.y,
					this.imgPos.width,
					this.imgPos.height,
					this.rect.x,
					this.rect.y,
					this.rect.width,
					this.rect.height
				);
			return this;
		}
		
		var clear = function () {
			this.context.clearRect(
				this.rect.x,
				this.rect.y,
				this.rect.width,
				this.rect.height
			); 
			return this;
		}
        
        var hero = {
			img: heroImg,
			context: context,
			imgPos: {
				x: 0,
				y: 0,
				width: 32,
				height: 32
			},

			rect: {
				x: 0,
				y: 0,
				width: 40,
				height: 40
			},

			draw: draw,
			
			clear: clear,
            
            keyUpDown: function() {
				document.onkeydown = () => {
					debugger;
					var e = event || window.event;
					// up 38  down 40  left 37  right 39
					// 不要碰到怪兽
					this.clear()
					if(e.keyCode == 38) {
						if(this.rect.x <= 60 || this.rect.x >= 140 || this.rect.y - 20 >= 140) {
							this.rect.y = this.rect.y - 20 > 0 ? this.rect.y -= 20 : 0;
						}
					} else if(e.keyCode == 40) {
						if(this.rect.x <= 60 || this.rect.x >= 140 || this.rect.y + 20 <= 60 || this.rect.y + 20 >= 100) {
							this.rect.y = this.rect.y + 20 > 260 ? 260 : this.rect.y += 20;
						}
					} else if(e.keyCode == 37) {
						if(this.rect.y <= 60 || this.rect.y >= 140 || this.rect.x - 20 >= 140) {
							this.rect.x = this.rect.x - 20 > 0 ? this.rect.x -= 20 : 0;
						}
					} else if(e.keyCode == 39) {
						if(this.rect.y <= 60 || this.rect.y >= 140 || this.rect.x + 20 <= 60 || this.rect.x + 20 >= 100) {
							this.rect.x = this.rect.x + 20 > 460 ? 460 : this.rect.x += 20;
						}
					}
					this.draw();
				}
            }
		};

		var monster = {
			img: allSpriteImg,
			context: context,
			imgPos: {
				x: 858,
				y: 529,
				width: 32,
				height: 32
			},

			rect: {
				x: 100,
				y: 100,
				width: 40,
				height: 40
			},

			draw: draw
		};

		hero.draw().keyUpDown();
		monster.draw();
    }

    var resourceManager = prepare();
	resourceManager.getResource(function (context, heroImg, allSpriteImg) {
		drawRole(context, heroImg, allSpriteImg);
	});
})()