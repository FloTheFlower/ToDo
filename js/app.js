'use strict';

const KEY_ENTER = 13

document.addEventListener("DOMContentLoaded", () => {

	// hier holt er sich alle Ausgangsklassen die er braucht, um sie manipulieren zu koennen.
	const newTodoElement = document.querySelector(".new-todo")
	const todoListElement = document.querySelector(".todo-list")
	const footerElement = document.querySelector(".footer")
	const todoCountElement = document.querySelector(".todo-count strong")
	const clearCompletedElement = document.querySelector(".clear-completed")

	//refreshFooter zeigt an wie viele Aufgaben noch zu erledigen sind 
	const refreshFooter = () => {   
		if (todoListElement.children.length === 0) {
			footerElement.style.display = "none"
		} else {
			footerElement.style.display = ""
		}
		
		let todoCounter = todoListElement.querySelectorAll("li:not(.completed)").length 
		//li:not(.classname) --> das heisst li hat NICHT die Klasse completed 
		todoCountElement.innerText = todoCounter

		// hier zeahlt es, wie viele Aufgaben noch zu tun sind. 
		let completedCounter = todoListElement.querySelectorAll("li.completed").length
		if (completedCounter === 0) {
			clearCompletedElement.style.display = "none"
		} else {
			clearCompletedElement.style.display = ""
		}
	}
	refreshFooter()

	const addCallbacksForLi = (liElement) => {
		const checkboxElement = liElement.querySelector(".toggle")
		const destroyButtonElement = liElement.querySelector(".destroy")

		checkboxElement.addEventListener("change", () => {
			if (checkboxElement.checked) {
				liElement.classList.add("completed")
			} else {
				liElement.classList.remove("completed") // das ist nur dazu da den KLASSENNAMEN completed zu loeschen
			}

			refreshFooter()
		})

		destroyButtonElement.addEventListener("click", () => {
			liElement.remove()

			refreshFooter()
		})
	}

	newTodoElement.addEventListener("keypress", (event) => {
		if (event.which === KEY_ENTER && newTodoElement.value !== "") {

			const newButtonElement = document.createElement("button") // auch wenn man innerhalb einer Funktion/Eventlistener ein neues Element definiert, muss man dann diesem einen Variablen-Namen wie const oder let geben. 
			newButtonElement.classList.add("destroy")                // ich muss das Element zuerst im Document createn, dann schwebt es im freien Raum. Ich mach es aber fertig und haeng noch alle Elemente dran, die es braucht. 
			
			const newLabelElement = document.createElement("label")
			newLabelElement.appendChild(
				document.createTextNode(newTodoElement.value)   // der Textnode wird direkt im Label erstellt, weil textnode kein element ist was extra erstellt wird sondern eben nur ein Textnode
			)

			const newInputCheckbox = document.createElement("input")
			newInputCheckbox.type = "checkbox"
			newInputCheckbox.classList.add("toggle")

			const newDivElement = document.createElement("div")  // erst wenn ich alle Elemente erstellt habe
			newDivElement.classList.add("view") 				// die ins Div gehoren, fuege ich die alle ins Div ein. 
			newDivElement.appendChild(newInputCheckbox)
			newDivElement.appendChild(newLabelElement)
			newDivElement.appendChild(newButtonElement)

			const newLiElement = document.createElement("li")
			newLiElement.appendChild(newDivElement)

			addCallbacksForLi(newLiElement)

			todoListElement.prepend(newLiElement)

			newTodoElement.value = ""  // hier wird das Eingabefeld einfach wieder leer gemacht

			refreshFooter()
		}
	})

	// clearCompleted ist dazu zu loeschen, was nicht mehr gebraucht wird. 
	clearCompletedElement.addEventListener("click", (event) => {
		const completedLiElements = todoListElement.querySelectorAll("li.completed") // Vorsicht das ist eine Liste
		for(const completedLiElement of completedLiElements) {  //daher braucht man eine fucking Schleife um auf jedes einzelne Element zugreifen zu koennen
			completedLiElement.remove()
		}

		refreshFooter()
	})
});
