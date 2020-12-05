describe('HACIENDO VALUACION DIAGNOSTICO', () => {

  function anwserQuestionnaire () {
    cy.get('.btn-primary').first().click()

    //Primer cuestioanrio
    cy.UADYRadioSelect(3,4)

    cy.UADYNextQuestionnaire()

    //Segundo cuestionario
    cy.UADYAdjectives(1,1)

    cy.UADYNextQuestionnaire()

    //Tercer cuestionario
    cy.UADYRadioSelect(3,3)

    cy.UADYNextQuestionnaire()

    //Cuarto cuestionario - parte 1
    cy.UADYRadioSelectYesOrNo('Si')

    //Cuarto cuestionario - parte 2
    cy.UADYFillTextArea()

    cy.contains('Guardar').click()
  }

  it('RESPONDER EVALUACIÓN', () => {
    cy.visit('https://www.sicei.uady.mx/sieddo/#/')
    cy.UADYEvalDocenteLogin('matricula', 'contraseña sicei')

    // Entrar al cuestionario
    cy.get('.btn-primary').first().click()
    anwserQuestionnaire()
    
  })
})