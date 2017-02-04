# datepicker.js
  Componente datepicker feito em js puro.
  
  ![alt tag](https://raw.githubusercontent.com/Maykerh/datepicker.js/master/dp.png)
  
  Confira a demo em > https://jsfiddle.net/hsxwkhs4/
  
# Guia rápido de utilização:

  1. Fazer o download dos arquivos datepicker.js e datepicker.css da pasta src
  2. Incluir o arquivo js no código html

   ```html <script type="text/javascript" src="datepicker.js"></script>```
  3. Criar um div no seu código html para receber o datepicker
   ```html <div id="recebedatepicker" style="width: 250px">```
  4. Agora basta instanciar o objeto javascript informando o id do text field que será criado, o nome do objeto datepicker e o id da div onde será adicionado o text field<br>
   ```js
      myDatepicker = new datepicker({
          id: 'date',
          name: 'myDatepicker',
          renderTo: 'recebedatepicker'
          
   });
   ```

# Parametros de configuração:
  
  * **id** {requerido}<br>
    * Id do text field que receberá a data.<br><br>
  * **name** {requerido}<br>
    * Nome dado ao objeto instanciado do datepicker.<br><br>
  * **renderTo** {requerido}<br>
    *Id da div que receberá o text field de data.<br><br>
  * **height** {Padrão: '30px'}<br>
    * Altura do campo de data.<br><br>
  * **width** {Padrão: Largura da div passada no parametro 'renderTo'}<br>
    * Largura do campo de data'<br><br>
  * **fieldStyle** {Padrão: false}<br>
    * CSS personalizado para o campo de data.<br><br>
  * **dateFormat** {Padrão: 'dd/mm/yyy'}<br>
    * Formato de data, atualmente aceitando apenas dois formatos:<br>
      * 'dd/mm/yyyy'<br>
      * 'mm/yyyy' -> No lugar dos botões de dias renderiza botões de meses<br><br>
  * **closeOnSelect** {Padrão: true}<br>
    * Seta se o datepicker será fechado ao selecionar uma data.<br><br>
  * **xPos** {Padrão: 'left'}<br>
    * Determina a posição em que o calendário será renderizado no eixo X.<br>
      * 'left'  -> Renderiza o calendário da borda esquerda do text field para a direita<br>
      * 'right' -> Renderiza o calendário da borda direita do text field para a direita<br><br>
  * **yPos** {Padrão: 'bottom'}<br>
    * Determina a posição em que o calendário será renderizado no eixo Y.<br>
      * 'bottom'  -> Renderiza o calendário abaixo do text field<br>
      * 'right' -> Renderiza o calendário acima do text field<br><br>
  * **hasButton** {Padrão: false}<br>
    * Seta se o text field terá um botão de calendário ao lado direito<br><br>
    
	
