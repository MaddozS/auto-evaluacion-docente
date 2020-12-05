# AUTO EVALUACIÓN DOCENTE
----
# Requisitos
- Es necesario que tengas instalado Node en tu computadora.

# Cómo iniciar
Una vez cumplido los requisitos, es necesario que ejecutes el siguiente comando
dentro del directorio del repositorio

```console
npm i
```

Ya que lo tengas instalado, entonces simplemente irás al archivo `evaluacion_docente.js` que se encuentra en la carpeta `cypress/integration/fillForm`. Ya que tengas abierto deberás agregar tu matricula y contraseña de SICEI

```js
cy.UADYEvalDocenteLogin('matricula', 'contraseña sicei')
```

Ya que hayas cambiado solo tendrás que correr el siguiente comando

```console
npm run bot
```

----

## Ajustes en la forma en la que responde

----
- __Primer cuestionario:__ Este cuestionario da una cantidad de preguntas que se pueden responder del 1 al 4,
el bot tiene la opción de escoger un numero aleatorio entre ese rango, o poder ajustar este rango para que sea más pequeño, por ejemplo, solo seleccionar los números 3 y 4.
```js
cy.UADYRadioSelect(min,max)
```
Solo debes cambiar los valores `min` y `max` en el archivo `evaluacion_docente.js` que se mencionó anteriormente.

- __Segundo cuestionario:__ El segundo cuestionario se basa en una serie de par adjetivos que son antonimos, seleccionar una opción más cercana a uno de estos es igual a decir que ese profesor es casi o complemente de esa manera. Al momento de hacer pruebas con este bot, el orden de estos fue el mismo, además, el número "más bajo" (1), es igual a un adjetivo positivo, por lo que si se quiere que el bot tenga un comportamiento más positivo, este debe ser un rango de numeros bajos.
```js
cy.UADYAdjectives(min,max)
```
Solo debes cambiar los valores `min` y `max` en el archivo `evaluacion_docente.js` que se mencionó anteriormente.

- __Tercer cuestionario:__ Este es similar al primer cuestionario, pero solo con opciones que van del 1 al 3. Se modificar el comando de la sección del tercer cuestionario.

- __Cuarto cuestionario - parte 1:__ Este cuestionario al principio pregunta si se recomienda el profesor, se le debe dar una opción.
```js
cy.UADYRadioSelectYesOrNo(opcion)
```
para evitar problemas es recomendable que sea con mayúscula al inicio y en español.

- __Cuarto cuestionario - parte 2:__ Este es la sección donde se deben responder ciertas preguntas abiertas. En este proyecto ya tengo definido unos textos.
Por defecto, el bot seleccionará textos recomendando al profesor y textos que mencionen que no necesita mejorar cosas
```js
cy.UADYFillTextArea(recomended=true, specificFortaleza, needImprovement=false, comment)
```
  - el primer parametro está por defecto en `true`, pero se puede especificar que es falso para que ponga textos que no lo recomienden. Por el momento solo hay un texto, pero puedes agregar los tuyos en `cypress/support/textos.js`
  - el segundo parametro puedes mandar tu el mensaje que quieres que diga, pero si no se especifica, el bot usará un texto aleatorio.
  - el tercer parametro es similar al primero, en caso de que se crea que el profesor necesita mejorar, se puede poner el verdadero y el bot usará textos relacionados a eso. También puedes escribir tus propios textos.
  - el cuarto es para pasar un comentario especifico, en caso de que no se ponga, el formulario usará un texto aleatorio.


## ADVERTENCIAS
----
El bot por el momento solo responde una respuesta a la vez, esto con el motivo de poder modificar la forma en la que puede calificar un profesor. 
Si bien tiene un comportamiento aleatorio, puede modificar para hacer que lo haga de una manera más `negativa` o una manera más `positiva`