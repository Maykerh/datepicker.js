# datepicker.js
  Componente datepicker feito em js puro.
  
  ![alt tag](https://raw.githubusercontent.com/Maykerh/datepicker.js/master/dp.png)
  
  Confira a demo em > https://jsfiddle.net/hsxwkhs4/
  
# Guia rápido de utilização:

  1. Fazer o download dos arquivos datepicker.js e datepicker.css da pasta src
  2. Incluir o arquivo js no código html

   ```html 
   <script type="text/javascript" src="datepicker.js"></script>
   ```
  3. Criar uma div no seu código html para receber o datepicker
  
   ```html 
   <div id="recebedatepicker" style="width: 250px">
   ```
  4. Agora basta instanciar o objeto javascript informando o id do text field que será criado, o nome do objeto datepicker e o id da div onde será adicionado o text field<br>
   ```js
      myDatepicker = new datepicker({
          id: 'date',
          name: 'myDatepicker',
          renderTo: 'recebedatepicker'
          
   });
   ```

# Parametros de configuração:
  
  * **id** *(String)* {requerido}<br>
    * Id do text field que receberá a data.<br><br>
  * **name** *(String)* {requerido}<br>
    * Nome dado ao objeto instanciado do datepicker.<br><br>
  * **renderTo** *(String)* {requerido}<br>
    *Id da div que receberá o text field de data.<br><br>
  * **height** *(Int)* {Padrão: '30'}<br>
    * Altura do campo de data.<br><br>
  * **width** *(Int)* {Padrão: Largura da div passada no parametro 'renderTo'}<br>
    * Largura do campo de data'<br><br>
  * **fieldStyle** *(String)* {Padrão: false}<br>
    * CSS personalizado para o campo de data. Ex: "border: 3px solid black; background-color: #eee"<br><br>
  * **dateFormat** *(String)* {Padrão: 'dd/mm/yyy'}<br>
    * Formato de data. Atualmente aceitando apenas dois formatos:<br>
      * 'dd/mm/yyyy'<br>
      * 'mm/yyyy' -> No lugar dos botões de dias renderiza botões de meses<br><br>
  * **closeOnSelect** *(Boolean)* {Padrão: true}<br>
    * Seta se o datepicker será fechado ao selecionar uma data.<br><br>
  * **xPos** *(String)* {Padrão: 'left'}<br>
    * Determina a posição em que o calendário será renderizado no eixo X.<br>
      * 'left'  -> Renderiza o calendário da borda esquerda do text field para a direita<br>
      * 'right' -> Renderiza o calendário da borda direita do text field para a direita<br><br>
  * **yPos** *(String)* {Padrão: 'bottom'}<br>
    * Determina a posição em que o calendário será renderizado no eixo Y.<br>
      * 'bottom'  -> Renderiza o calendário abaixo do text field<br>
      * 'top' -> Renderiza o calendário acima do text field<br><br>
  * **hasButton** *(Boolean)* {Padrão: false}<br>
    * Seta se o text field terá um botão de calendário ao lado direito<br><br>
    
	
