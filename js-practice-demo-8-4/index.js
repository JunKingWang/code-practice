// 一个勇士遇见怪物游戏～ 类 继承
(function () {
	var monsterArray = [];

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

	// class Role 生成角色
	function Role ({img, context, imgPos, rect}) {
		this.img =  img,
		this.context = context,
		this.imgPos = imgPos,
		this.rect = rect;
	}

	Role.prototype = {
		draw: function () {
			this.context.drawImage(
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
			return this
		},

		clear: function () {
			this.context.clearRect(
				this.rect.x,
				this.rect.y,
				this.rect.width,
				this.rect.height
			); 
			return this;
		}
	}

	// class Hero
	function Hero (img, context) {
		var imgPos = {
			x: 0,
			y: 0,
			width: 32,
			height: 32
		};
		var rect = {
			x: 0,
			y: 0,
			width: 40,
			height: 40
		};
		Role.call(this, {
			img: img,
			context: context,
			imgPos: imgPos,
			rect: rect
		})
	}
	Hero.prototype = Object.create(Role.prototype);
	Hero.prototype.moveAttach = function() {
		document.onkeydown = () => {
			var e = event || window.event;
			// up 38  down 40  left 37  right 39
			// 不要碰到怪兽
			var removeFlag = true;
			monsterArray.forEach((item, i) => {
				var itemXMin = item.rect.x - item.rect.width
				var itemXMax = item.rect.x + item.rect.width
				var itemYMin = item.rect.y - item.rect.height
				var itemYMax = item.rect.y + item.rect.height
				if(e.keyCode == 38) {
					if(this.rect.x > itemXMin && this.rect.x < itemXMax && this.rect.y - 20 < itemYMax && this.rect.y - 20 > itemYMin) {
						removeFlag = false
						monsterArray[i].getAttached()
					}
				} else if(e.keyCode == 40) {
					if(this.rect.x > itemXMin && this.rect.x < itemXMax && this.rect.y + 20 < itemYMax && this.rect.y + 20 > itemYMin) {
						removeFlag = false
						monsterArray[i].getAttached()
					}
				} else if(e.keyCode == 37) {
					if(this.rect.y > itemYMin && this.rect.y < itemYMax && this.rect.x - 20 < itemXMax && this.rect.x - 20 > itemXMin) {
						removeFlag = false
						monsterArray[i].getAttached()
					}
				} else if(e.keyCode == 39) {
					if(this.rect.y > itemYMin && this.rect.y < itemYMax && this.rect.x + 20 < itemXMax && this.rect.x + 20 > itemXMin) {
						removeFlag = false
						monsterArray[i].getAttached()
					}
				}
			})
			if(removeFlag) {
				this.clear()
				if(e.keyCode == 38) {
					this.rect.y = this.rect.y - 20 > 0 ? this.rect.y -= 20 : 0;
				} else if(e.keyCode == 40) {
					this.rect.y = this.rect.y + 20 > 260 ? 260 : this.rect.y += 20;
				} else if(e.keyCode == 37) {
					this.rect.x = this.rect.x - 20 > 0 ? this.rect.x -= 20 : 0;
				} else if(e.keyCode == 39) {
					this.rect.x = this.rect.x + 20 > 460 ? 460 : this.rect.x += 20;
				}
				this.draw();
			}
		}
	}

	// class Monster
	function Monster (img, context, rect, name) {
		this.blood = 100;
		this.name = name;
		var imgPos = {
			x: 858,
			y: 529,
			width: 32,
			height: 32
		};
		var rect = {
			x: rect.x,
			y: rect.y,
			width: 40,
			height: 40
		};
		Role.call(this, {
			img: img,
			context: context,
			imgPos: imgPos,
			rect: rect
		})
	}
	Monster.prototype = Object.create(Role.prototype)

	Monster.prototype.getAttached = function(i) {
		this.blood -= 10;
		if(this.blood <= 0) {
			this.clear();
			this.blood = 0;
			monsterArray.splice(i, 1)
		}
		document.getElementsByClassName(this.name)[0].innerText = this.blood;
	}

	Monster.prototype.addBloodBoard = function(i) {
		var divHtml = document.createElement('div')
		var nameHtml = document.createElement('span')
		nameHtml.append(`${this.name} ${i} Blood: `)
		var bloodHtml = document.createElement('span')
		bloodHtml.append(`${this.blood}`)
		bloodHtml.setAttribute('class', this.name)
		divHtml.append(nameHtml)
		divHtml.append(bloodHtml)
		document.getElementById('bloodBoard').append(divHtml);
	}

	function drawRole (context, heroImg, allSpriteImg) {
		var monsterPositonArray = [{
			name: 'monster1',
			rect: {
				x: 60, y: 60
			}
		}, {
			name: 'monster2',
			rect: {
				x: 100, y: 100
			}
		}, {
			name: 'monster3',
			rect: {
				x: 140, y: 140
			}
		}]
		monsterPositonArray.forEach((item, i) => {
			var monster = new Monster(allSpriteImg, context, item.rect, item.name);
			monster.draw().addBloodBoard(i);
			monsterArray.push(monster);
		})
		var hero = new Hero(heroImg, context);
		hero.draw().moveAttach();
	}

	var resourceManager = prepare();
	resourceManager.getResource(function (context, heroImg, allSpriteImg) {
		drawRole(context, heroImg, allSpriteImg);
	});
})()