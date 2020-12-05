// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}

const recomendText = {
  yes: "Considero que este profesor es una buena opción para tomar sus clases gracias a como las da.",
  no: "Creo que este profe tiene muchas cosas que mejorar dentro de su clase, hay varios aspectos en los que en mi opinión no es bueno"
}

const fortalezasText = [
  "Busca superarse a sí mismo y adquirir nuevas herramientas para la clase",
  "Tiene una actitud positiva y ama su trabajo",
  "Sabe escucha a sus estudiantes y se adapta a sus necesidades",
  "Confía en sus estudiantes"
]

const mejorasText = {
  yes: [
    "Considero que debe mejorar mucho la forma en la que presenta los temas de su clase para que sean mejores",
    "No hay mucho que mejorar, simplemente que trate de hacer más amena la clase",
    "La actitud que tiene dentro del aula"
  ],
  no: [
    "Nada que mejorar, muy buen profesor",
    "Creo que debe pulir un poco mejor los temas que dará, sin embargo todo lo demás está bien"
  ]
}

const comments = [
  "Nada que comentar"
]


// Selecciona cada uno de los radio buttons con una calificacion aleatoria, se debe definir un rango 
Cypress.Commands.add('UADYRadioSelect', (minScore, maxScore) => {
  cy.get('.form-group').find('div[ng-switch-when="RadioButton"]')
  .each(($el) => {
    if($el.is(':visible')){
      let randomScore =  Math.floor(Math.random() * (maxScore - minScore + 1)) + minScore;

      cy.wrap($el).children().children('').contains(randomScore).click()
    }
  })
})

Cypress.Commands.add('UADYNextQuestionary', () => {
  cy.get('.next').each(($el) => {
    if($el.is(':visible')){
      if($el.text() === "Siguiente"){
        cy.wrap($el).click()
      }
    }
  })
})

Cypress.Commands.add('UADYAdjectives', (min, max) => {
  cy.get('.form-group').find('tr').each($calif => {
    let randomScore =  Math.floor(Math.random() * (max - min + 1)) + min;
    cy.wrap($calif).children(`.calif-${randomScore}`).children('label').click()
  })
})

Cypress.Commands.add('UADYRadioSelectYesOrNo', Option => {
  cy.get('.form-group').find('div[ng-switch-when="RadioButton"]')
    .each(($el) => {
      if($el.is(':visible')){
        //let randomScore =  Math.floor(Math.random() * (maxScore - minScore + 1)) + minScore;

        cy.wrap($el).children().children('').contains(Option).click()
      }
    })
})

Cypress.Commands.add('UADYFillTextArea', (recomended=true, specificFortaleza, needImprovement=false, comment) => {

  const preguntas = {
    0: recomendText[ recomended ? 'yes': 'no'],
    1: specificFortaleza || fortalezasText.sample(),
    2: mejorasText[needImprovement ? 'yes': 'no'].sample(),
    3: comment || comments.sample()

  }
  cy.get('.form-group').find('div[ng-switch-when="TextArea"]')
    .each(($el, index) => {
      if($el.is(':visible')){
        cy.wrap($el).find('textarea').type(preguntas[index])
      }
    })
})

Cypress.Commands.add('UADYEvalDocenteLogin', (matricula, password) => {
  let login = cy.contains('Iniciar Sesión')
  if (login) {
    login.click()
    //console.log('WOW')
    cy.get('#username').type(matricula)
    cy.get('#password').type(password)

    cy.get('.form').get('.btn').click()
  } 
  cy.get('a[href^="#/alumno"]').click()
})