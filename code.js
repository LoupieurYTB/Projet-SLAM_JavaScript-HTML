// Définir les listes des moyennes
	let classes = []
	let prenoms = []
	let noms = []
	let nomsClass = [] // Avec aucun doublon
	let nomEntier_nomsClass = "" // Pour ajouter dans la liste chaque nom en entier et pas chaque caractère de chaque nom
	let nomsClassIndice = 4 // Pour prendre en compte du nom de la deuxième class (après la class nom du HTML)
	let moyennes = []

	for (let compteur = 1 ; compteur <= document.getElementsByClassName("moyenne").length ; compteur++) { // Répéter (nombre de moyennes présents dans la liste du HTML) fois
		classes.push(document.getElementById("classe_eleve" + compteur).innerHTML)
		prenoms.push(document.getElementById("prenom_eleve" + compteur).innerHTML)
		noms.push(document.getElementById("nom_eleve" + compteur).innerHTML)

		nomEntier_nomsClass = ""
		nomsClassIndice = 4
		for (let compteur2 = 1 ; compteur2 <= (document.getElementById("nom_eleve" + compteur).className.length -4) ; compteur2++) { // Pour ajouter chaque nom par rapport aux class de nom lettre par lettre
			nomEntier_nomsClass += document.getElementById("nom_eleve" + compteur).className[nomsClassIndice]
			nomsClassIndice++
		}
		nomsClass.push(nomEntier_nomsClass) // Liste des noms (nom de class) sans doublon

		moyennes.push(parseFloat(document.getElementById("moyenne" + compteur).innerHTML))
	}

// Calculer la moyenne générale des élèves
	function calculMoyenneGenerale(moyennes) {
		let somme = 0
		for (let compteur in moyennes) {
			somme += moyennes[compteur] // Calculer la somme des moyennes
		}
		return (somme / moyennes.length).toFixed(2)
	}
	let moyenneGenerale = calculMoyenneGenerale(moyennes)

	// Afficher la moyenne générale des élèves
		document.body.innerHTML += `
		<div id="moyenneGeneraleEleves">
			<p class="texteMoyenneGenerale">
				Moyenne générale des élèves : 
			</p>
				<span class="moyenneGenerale">${moyenneGenerale}</span>
		</div>
		`

// Calcule les moyennes les plus basses et les plus hautes
	let minMoyenne = Math.min(...moyennes);
	let maxMoyenne = Math.max(...moyennes);

// Afficher les moyennes les plus hautes et les plus basses
	for (let compteur in moyennes) {
		if (moyennes[compteur] == minMoyenne) {
			document.getElementById("moyenne" + (parseInt(compteur) + 1)).classList.add("moyenneLaPlusBasse") // Mettre en rouge les moyennes les plus basses
			//document.getElementById("moyenne" + (parseInt(compteur) + 1)).classList.remove("moyenne") // Supprimer sa class "moyenne" pour la remplacer par "moyenneLaPlusBasse"
		} else if (moyennes[compteur] == maxMoyenne) {
			document.getElementById("moyenne" + (parseInt(compteur) + 1)).classList.add("moyenneLaPlusHaute") // Mettre en vert les moyennes les plus hautes
			//document.getElementById("moyenne" + (parseInt(compteur) + 1)).classList.remove("moyenne") // Supprimer sa class "moyenne" pour la remplacer par "moyenneLaPlusHaute"
		}
	}

// Créer deux tableaux
	document.body.innerHTML += `
		<div id="tableaux_classes">
			<div id="tableau_1">
				<h2 class="classe1">B1SIO1</h2>
				<table id="tableau_B1SIO1">
					<tr class="nom_colonne">		<td>Prénom</td>		<td>Nom</td>	<td>Moyenne</td></tr>
				</table>
			</div>

			<div id="tableau_2">
				<h2 class="classe2">B1SIO2</h2>
				<table id="tableau_B1SIO2">
					<tr class="nom_colonne">		<td>Prénom</td>		<td>Nom</td>	<td>Moyenne</td></tr>
				</table>
			</div>
		</div>
	`

	let moyenne1_id = 1
	let moyenne2_id = 1

	let classMoyenne = ``
	for (let compteur in classes) {
		if (moyennes[compteur] == maxMoyenne) {
			classMoyenne = ` moyenneLaPlusHaute`
		} else if (moyennes[compteur] == minMoyenne) {
			classMoyenne = ` moyenneLaPlusBasse`
		} else {
			classMoyenne = ``
		}

		if (classes[compteur] == "B1SIO1") {
			document.querySelector("#tableau_B1SIO1").innerHTML += `
				<tr class="valeur_de_colonne">		<td class="prenom1">${prenoms[compteur]}</td>		<td class="nom1 ${nomsClass[compteur]}">${noms[compteur]}</td>		<td id="moyenne1_${moyenne1_id}" class="moyenne1${classMoyenne}">${moyennes[compteur]}</td></tr>
			`
		} else {
			document.querySelector("#tableau_B1SIO2").innerHTML += `
				<tr class="valeur_de_colonne">		<td class="prenom2">${prenoms[compteur]}</td>		<td class="nom2 ${nomsClass[compteur]}">${noms[compteur]}</td>		<td id="moyenne2_${moyenne2_id}" class="moyenne2${classMoyenne}">${moyennes[compteur]}</td></tr>
			`
		}
		
		if (classes[compteur] == "B1SIO1") {
			moyenne1_id++
		} else {
			moyenne2_id++
		}
	}

	// Définir les listes de moyennes de chaque classe
		let moyennes1 = [] // Moyennes des B1SIO1
		let moyennes2 = [] // Moyennes des B1SIO2

		for (let compteur = 1 ; compteur <= document.getElementsByClassName("moyenne1").length ; compteur++) { // Répéter (nombre de moyennes présents du tableau des B1SIO1 du HTML crée par JS juste avant) fois
			moyennes1.push(parseFloat(document.getElementById("moyenne1_" + compteur).innerHTML))
		}
		for (let compteur = 1 ; compteur <= document.getElementsByClassName("moyenne2").length ; compteur++) { // Répéter (nombre de moyennes présents du tableau des B1SIO2 du HTML crée par JS juste avant) fois
			moyennes2.push(parseFloat(document.getElementById("moyenne2_" + compteur).innerHTML))
		}

	// Calculer la moyenne générale des B1SIO1
		let somme1 = 0
		for (let compteur in moyennes1) {
			somme1 += moyennes1[compteur] // Calculer la somme des moyennes des B1SIO1
		}
		let moyenneGenerale1 = (somme1 / moyennes1.length).toFixed(2)

	// Calculer la moyenne générale des B1SIO2
		let somme2 = 0
		for (let compteur in moyennes2) {
			somme2 += moyennes2[compteur] // Calculer la somme des moyennes des B1SIO2
		}
		let moyenneGenerale2 = (somme2 / moyennes2.length).toFixed(2)

	// Afficher la moyenne générale des B1SIO1
		document.querySelector("#tableau_1").innerHTML += `
			<div id="moyenneGeneraleB1SIO1">
				<p class="texteMoyenneGenerale">
					Moyenne générale des B1SIO1 : 
				</p>
					<span class="moyenneGenerale">${moyenneGenerale1}</span>
			</div>
			`

	// Afficher la moyenne générale des B1SIO2
		document.querySelector("#tableau_2").innerHTML += `
			<div id="moyenneGeneraleB1SIO2">
				<p class="texteMoyenneGenerale">
					Moyenne générale des B1SIO2 : 
				</p>
					<span class="moyenneGenerale">${moyenneGenerale2}</span>
			</div>
		`

// Photos
	// Créer le div
		document.body.innerHTML += `
			<div id="photo_affichage">
			</div>
		`	

	// Afficher un image en survolant un nom
		for (let compteur in nomsClass) {
			document.querySelector(`.${nomsClass[compteur]}`).addEventListener('mouseover', () => {
				if (!document.getElementById("photo")) {
					let photo = document.createElement("img")
					
					photo.id = "photo";
					photo.src = `images/${nomsClass[compteur]}.jpeg`
					photo.alt = nomsClass[compteur];
					photo.title = nomsClass[compteur];
					document.getElementById("photo_affichage").appendChild(photo); // Afficher la photo dans le div
				}
			})

	// Enlever l'image à la fin du survol du nom
			document.querySelector(`.${nomsClass[compteur]}`).addEventListener('mouseout', () => {
				if (document.getElementById("photo")) {
					document.getElementById("photo").remove();
				}
			})
		}