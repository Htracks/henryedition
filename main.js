const global = {
	navbar: document.getElementById("navbar"),
	container: document.getElementById("container"),
	btn: 0
}

function createBtn(id, title, url) {
	if(url) {
		// SETTINGS LOGIC
		return;
	}

	const btn = document.createElement("button");
	btn.textContent = title;
	btn.className = "navbar-button";
	btn.onclick = () => {
		global.container.innerHTML = null;
		global.btn = id;
		switch(id) {
			case 0:
				loadWDBG();
				break;
			case 1:
				loadGN();
				break;
			case 2:
				loadCMG();
				break;
		}
 	}
	global.navbar.appendChild(btn);
}

function createBox(imgSrc, title, url) {
	const box = document.createElement("div");
	box.className = "box";

	const img = document.createElement("img");
	img.src = imgSrc;
	img.onerror = () => {
		img.src = "temp/error.png";
	}
	box.appendChild(img);
	
	const a = document.createElement("a");
	a.textContent = title;
	a.href = url;
	box.appendChild(a);
	
	global.container.appendChild(box);
}

function load() {
	createBtn(0, "WDBG");
	createBtn(1, "GN");
	createBtn(2, "CMG");
	loadWDBG();
}

async function loadWDBG() {
	fetch("json/wdbg.json")
		.then(response => response.json())
		.then(data => {
			data.forEach(box => {
				createBox(`temp/${box.id}.png`, box.title, `embed.html?t=0&id=${box.id}`);
			});
		})
		.catch(error => console.error(error));
}

async function loadGN() {
	try {
		const response = await fetch("https://cdn.jsdelivr.net/gh/gn-math/assets/zones.json");
		const zones = await response.json();
		zones.forEach(zone => {
			const imgSrc = zone.cover.replace("{COVER_URL}", "https://cdn.jsdelivr.net/gh/gn-math/covers@main");
			createBox(imgSrc, zone.name, `embed.html?t=1&id=${zone.id}`)
		});
	} catch (error) {
		console.error(error);
	}
}

async function loadCMG() {
	try {
		const response = await fetch("json/cmatgame_games_with_levels.json");
		const data = await response.json();
		
		let ids = [
			...data.trendy,
			...data.top9,
		]
		ids = [...new Set(ids)];
		
		const games = ids.map((id) => data.game.find((game) => game.id == id))
			
		games.forEach(game => {
			createBox(`https://www.coolmathgames.com/${game.si}`, game.title, `embed.html?t=2&id=${game.id}`);
		});
	} catch (error) {
		console.error(error);
	}
}

load();
