describe('HACIENDO VALUACION DIAGNOSTICO', () => {

  function anwserQuestionary () {
    cy.get('.btn-primary').first().click()

    cy.UADYRadioSelect(3,4)

    cy.UADYNextQuestionary()

    cy.UADYAdjectives(1,1)

    cy.UADYNextQuestionary()

    cy.UADYRadioSelect(3,3)

    cy.UADYNextQuestionary()

    cy.UADYRadioSelectYesOrNo('Si')

    cy.UADYFillTextArea()

    cy.contains('Guardar').click()
  }

  it('RESPONDER EVALUACIÓN', () => {
    cy.visit('https://www.sicei.uady.mx/sieddo/#/')
    cy.UADYEvalDocenteLogin('matricula', 'contraseña sicei')

    // Entrar al cuestionario
    cy.get('.btn-primary').first().click()
    anwserQuestionary()
    
  })
})