datepicker = function(obj){

	this.id; 	   //id do campo de data
	this.height = false // altura do campo
	this.width = false;//largura do campo
	this.fieldStyle = false; // css personalizado para o input
	this.renderTo; // id da div onde será renderizado o campo de data
	this.name; 						//nome do objeto instanciado do datepicker
	this.weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
	this.monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
	this.monthNamesAbbr = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
	this.actualDay; 				// dia atual selecionado
	this.actualMonth; 				//Numero do mes em exibição na tela;
	this.actualYear; 				// ano em exibição na tela
	this.date; 						// guarda a ultima data selecionada no formato yyyy/mm/dd
	this.dateFormat = "dd/mm/yyyy"; //formato da data
	this.closeOnSelect = true; 	//define se o datepicker se fecha ao selecionar uma data
	this.hideDays = false; // Se true exibe botões com nome dos mêses no lugar dos dias.
	this.xPos = 'left'; // Define a posição horizontal em relação ao text field - "right" ou "left"
	this.yPos = 'bottom'; // Define a posição vertical em relação ao text field - "top" ou "bottom"
	this.hasButton = false; // Define se erá renderizado um botão de calendário ao lado do text field;
	
	this.setUserOptions = function(){

		for(var key in obj){ 
			
			this[key] = obj[key];

		}
	}

	this.setUserOptions();

	/* 
	 * Método que insere o campo de data dentro de um div informada no parametro renderTo.
	 */
	this.output = function(){

		var fileref = document.createElement("link");
		fileref.rel = "stylesheet";
		fileref.type = "text/css";
		fileref.href = "datepicker.css";
		document.getElementsByTagName("head")[0].appendChild(fileref);

		var divDateField = document.createElement("div");
		divDateField.id = "div-field";
		divDateField.className = "div-field"; 
		divDateField.setAttribute("onclick",this.name+".render()");
		document.getElementById(this.renderTo).appendChild(divDateField);

			var dateField = document.createElement("input");
			dateField.id = this.id;
			dateField.className = "date-field";
			if(this.fieldStyle)
				dateField.style = ";" + this.fieldStyle;
			if(this.height)
				dateField.style.height = this.height + "px";
			if(this.width)
				dateField.style.width = this.width + "px";
			divDateField.appendChild(dateField);

		divDateField.style.width = dateField.style.width;
		divDateField.style.height = dateField.style.height;

		alert(divDateField.style.width)
	
		if(this.hasButton)
			this.insertButton(divDateField, dateField);

		this.getFieldDate();
	}

	this.insertButton = function(divDateField, dateField){

		height = 30;

		if(this.height)
			height  = this.height;
		
		dateField.style.width = "calc(100% - 28px)";

		var calendarButton = document.createElement('div');
		calendarButton.id = 'calendar-button';
		calendarButton.className = 'calendar-button';
		calendarButton.style.height = (height - 2) + "px"; 
		divDateField.appendChild(calendarButton);

			var calendarIcon = document.createElement("i");
			calendarIcon.id = "calendar-icon";
			calendarIcon.className = "fa fa-calendar";
			calendarIcon.className += " calendar-icon";
			calendarButton.appendChild(calendarIcon);

	}
	/*
	 * Método para remover o objeto renderizado da tela;
	*/
	this.destroy = function(){

		divDatepicker = document.getElementById('datepicker');
		document.body.removeChild(divDatepicker);
	}

	/*
	 * Método para renderizar o objeto na tela ao clicar no text field ou button
	 */
	this.render = function(){

		objectRendered = document.getElementById('datepicker');

		if(objectRendered != null){
			this.destroy();
			return;
		}

		day = this.getActualDay();
		month = this.getActualMonth();
		year = this.getActualYear();

		divField = document.getElementById("div-field");

		var divDatepicker       	  = document.createElement('div');
		divDatepicker.className 	  = "datepicker";
		divDatepicker.id        	  = "datepicker";
		document.body.appendChild(divDatepicker);

			var divArrow       	  = document.createElement('div');
			divArrow.className 	  = "arrow";
			divArrow.id        	  = "arrow";
			if(this.xPos == 'right')
				divArrow.style.left = "230px";
			if(this.yPos == "top"){
				divArrow.style.top = "244px";
				divArrow.style.clipPath = "polygon(50% 50%, 0% 0%, 100% 0%";
			}
	
			divDatepicker .appendChild(divArrow);

			var divYearMonth       = document.createElement('div');
			divYearMonth.className = "year-month";
			divYearMonth.id        = "year-month";
			divDatepicker.appendChild(divYearMonth);

				var divButtonBack       = document.createElement('div');
				divButtonBack.className = "month-direction";
				divButtonBack.id        = "button-monthbackward";
				divButtonBack.setAttribute("onclick", this.name+".changeMonth(-1)");
				divYearMonth.appendChild(divButtonBack);

					var iconButtonBack 		 = document.createElement('i');
					iconButtonBack.className = "fa fa-arrow-circle-left fa-lg";
					iconButtonBack.className += " direction-symbol";
					divButtonBack.appendChild(iconButtonBack);

				var divActualMonth       = document.createElement('div');
				divActualMonth.id        = "header";
				divYearMonth.appendChild(divActualMonth);

					var divYearName = document.createElement('div');
					divYearName.id = "year-name";
					divActualMonth.appendChild(divYearName);

						var yearNameButton = document.createElement('div');
						yearNameButton.className = "year-name-button";
						yearNameButton.id = "year-name-button";
						yearNameButton.setAttribute("onclick", this.name+".renderYearsDiv()");
						divYearName.appendChild(yearNameButton);

							var spanYearName = document.createElement('span');
							spanYearName.id = "span-year-name";
							spanYearName.innerHTML = this.getActualYear();	
							yearNameButton.appendChild(spanYearName);

								var iconDown = document.createElement('div');
								iconDown.innerHTML = "";
								iconDown.className = "month-icon-down";
								iconDown.id = "month-icon";
								spanYearName.appendChild(iconDown);

					var divMonthName = document.createElement('div');
					divMonthName.id = "month-name";
					divActualMonth.appendChild(divMonthName);

						var spanMonthName = document.createElement('span');
						spanMonthName.id = "span-month-name";
						spanMonthName.innerHTML = this.getMonthName();
						divMonthName.appendChild(spanMonthName);
 
				var divButtonFrw       = document.createElement('div');
				divButtonFrw.className = "month-direction";
				divButtonFrw.id        = "button-monthforward";
				divButtonFrw.setAttribute("onclick", this.name+".changeMonth(1)");
				divYearMonth.appendChild(divButtonFrw);

					var iconButtonFrw 		= document.createElement('i');
					iconButtonFrw.className = "fa fa-arrow-circle-right fa-lg";
					iconButtonFrw.className += " direction-symbol";
					divButtonFrw.appendChild(iconButtonFrw);

		if(this.hideDays)
			this.renderMonthsDiv(divDatepicker);
		else
			this.renderDaysDiv(divDatepicker);

		this.definePosition(divField, divDatepicker);
	}

	this.renderDaysDiv = function(divDatepicker){

		var tableDays         = document.createElement('table');
		tableDays.id          = "days";
		tableDays.cellSpacing = 0;
		divDatepicker.appendChild(tableDays);

			var daysHead   = document.createElement('thead');
			tableDays.appendChild(daysHead);

				var daysHeadTr = document.createElement('tr');
				daysHead.appendChild(daysHeadTr);
					
					var th = [];

					for(var i = 0; i < this.weekDays.length; i++){
						th[i] = document.createElement('th');
						th[i].innerHTML = this.weekDays[i];
						daysHeadTr.appendChild(th[i]);
					}

			var daysTr = [];
			var daysTd = [];

			var daysArr = this.generateDaysArr(year, month)

			for(var i = 0; i < 6; i++){

				daysTr[i] = document.createElement('tr');
				tableDays.appendChild(daysTr[i]);

				for(var j = (i*7); j < ((i+1)*7); j++){

					daysTd[j]       = document.createElement('td');
					daysTd[j].className = "date-button";
					daysTd[j].value = daysArr[j];

					dayNumber = this.getOnlyDayNumber(daysArr[j]);
					isActualMonth = this.isActualMonth(daysArr[j]);
					isLastSelectedDate = this.isLastSelectedDate(daysArr[j]);

					if(isLastSelectedDate)
						daysTd[j].className += " selected";

					if(!isActualMonth)
						daysTd[j].className += " day-another-month";

					daysTd[j].innerHTML = dayNumber;
					daysTd[j].setAttribute("onclick", this.name+".selectDate(this)");

					daysTr[i].appendChild(daysTd[j]);
				}
			}
	}

	this.renderMonthsDiv = function(divDatepicker){

		var tableMonths         = document.createElement('table');
		tableMonths.id          = "months";
		tableMonths.cellSpacing = 0;
		divDatepicker.appendChild(tableMonths);
		divDatepicker.style.width = "190px";

			/*var daysHead   = document.createElement('thead');
			tableDays.appendChild(daysHead);

				var daysHeadTr = document.createElement('tr');
				daysHead.appendChild(daysHeadTr);
					
					var th = [];

					for(var i = 0; i < this.weekDays.length; i++){
						th[i] = document.createElement('th');
						th[i].innerHTML = this.weekDays[i];
						daysHeadTr.appendChild(th[i]);
					}
			*/
			var monthsTr = [];
			var monthsTd = [];

			for(var i = 0; i < 3; i++){

				monthsTr[i] = document.createElement('tr');
				tableMonths.appendChild(monthsTr[i]);

				for(var j = (i*4); j < ((i+1)*4); j++){

					monthsTd[j]       = document.createElement('td');
					monthsTd[j].className = "date-button";
					monthsTd[j].value = this.getActualYear() + "/" + j + "/01" ;

					isLastSelectedDate = this.isLastSelectedDate( monthsTd[j].value );

					if(isLastSelectedDate)
						monthsTd[j].className += " selected";

					monthsTd[j].innerHTML = this.monthNamesAbbr[j];
					monthsTd[j].setAttribute("onclick", this.name+".selectDate(this)");

					monthsTr[i].appendChild(monthsTd[j]);
				}
			}

	}

	this.renderYearsDiv = function(){

		objectRendered = document.getElementById('select-year-div');
		divIconDown = document.getElementById('month-icon');
		yearNameButton = document.getElementById("year-name-button");

		if(objectRendered != null){
			divIconDown.className = "month-icon-down";
			this.destroyYearsDiv();
			return;
		}

		yearNameButton.className += " year-name-button-selected";
		divIconDown.className = "month-icon-up";
		divDatepicker = document.getElementById('datepicker');
		divYearName = document.getElementById('year-name');

		selectYearDiv = document.createElement('div');
		selectYearDiv.id = "select-year-div";
		selectYearDiv.className = "select-year-div";
	
		if(this.hideDays){//arrumar aqui para transform
			this.definePosition(yearNameButton, selectYearDiv, "margin: 0 65px; margin-top: -137px");
		}else{
			selectYearDiv.style.position  = "element(year-name)";
			selectYearDiv.style.transform = "translateY(-216px)";
		}
		divDatepicker.appendChild(selectYearDiv);

			selectYearTable = document.createElement('table');
			selectYearDiv.appendChild(selectYearTable);

				var selectYearTr = [];
				var selectYearTd = [];
				var yearsList = this.getYearsFromNow();

				for( var key in yearsList){

					selectYearTr[key] = document.createElement('tr');
					if(yearsList[key] == this.getActualYear()){
						scrollSize = key * 20;
			 			selectYearTr[key].className += " selected";
			 		}
					selectYearTable.appendChild(selectYearTr[key]);

					selectYearTd[key] = document.createElement('td');
			 		selectYearTd[key].innerHTML = yearsList[key];
			 		selectYearTd[key].value = yearsList[key];
			 		selectYearTd[key].setAttribute("onclick", this.name+".setActualYear(this.value); "+this.name+".destroyYearsDiv()");
			 		selectYearTr[key].appendChild(selectYearTd[key]);
			 	}

		//Scroll automático ao abrir a opção de anos, de modo que o ano selecionado fique posicionado no meio da div
		document.getElementById('select-year-div').scrollTop = scrollSize - 80;
	}

	this.definePosition = function(objToFind, objToRender, style = null) {

		posleft = objToFind.offsetLeft;
		postop = objToFind.offsetTop;
		height = objToFind.offsetHeight;
		width = objToFind.offsetWidth;
		myWidth = objToRender.offsetWidth;
		myHeight = objToRender.offsetHeight;

		if(this.xPos == 'left')
			objToRender.style.left = posleft + "px";
		else
			objToRender.style.left = ((posleft - myWidth) + width) + "px";

		if(this.yPos == 'bottom')
			objToRender.style.top = postop + height + "px";
		else
			objToRender.style.top = ((postop - myHeight) - height) + "px";

		objToRender.style.position = "absolute";

		if(style != null)
			objToRender.style += "; " + style;
	}

	this.renderButton = function(){

		var calendarButton = document.createElement('div');
		calendarButton.id = "caledar-button";

		//continuar aqui
	}

	this.destroyYearsDiv = function(){

		divDatepicker = document.getElementById('datepicker');
		yearsDiv = document.getElementById("select-year-div");
		divDatepicker.removeChild(yearsDiv);

		this.destroy();
		this.render();
	}

	this.getYearsFromNow = function(){

		date = new Date;
		startYear = date.getFullYear() - 100;
		yearsList = [];

		for(var i = 0; i <= 200; i++){

			yearsList[i] = startYear++;
		}

		return yearsList;
	}

	this.setDate = function(date){

		this.date = date;
	}

	this.getDate = function(){

		return this.date;
	}

	/*
	 * Função que verifica se a data que está sendo renderizada é a ultima selecionada, utilizado para manter a seleção no ultimo dia clicado
	 * @param: 
	 */
	this.isLastSelectedDate = function(date){

		if(date == this.getDate())
			return true;
			
		return false
	}	

	/*
	 * Função que verifica se o dia que está sendo renderizado pertence ao mês atual, utilizada para esmaecer os dias que aparecem no calendário mas não são do mes em questão
	 */
	this.isActualMonth = function(date){

		date = date.split('/');

		if(date[1] == this.getActualMonth())
			return true;
		else
			return false;

	}
	this.getOnlyDayNumber = function(date){

		day = date.split("/");

		return day[2];
	}

	/*
	 * Função para formatar a data de acordo com o formato escolhido no parametro dateFormat.
	 * @param string de data no formato yyyy/mm/dd
	 * @return string
	 */
	this.formatDate = function(dateString){

		var day;
		var month;
		var year;
		var format = this.dateFormat;
		var dateArr = dateString.split("/");
		
		switch( format ){

			case "dd/mm/yyyy":

				day = dateArr[2];
				month = parseInt(dateArr[1])+1;
				year = dateArr[0];
				
				if(day.length == 1)
					day = "0" + day;
				if(String(month).length == 1)
				    month = "0" + month;

				date = day + "/" + month + "/" + year

				break;

			case "mm/yyyy":

				month = String(parseInt(dateArr[1])+1);
				year = dateArr[0];
				
				if(month.length == 1)
					month = "0" + month;

				date = month + "/" + year;
				break;
			default:
				date = "Incorrect date format!";
		}

		return date;
	}

	this.selectDate = function(e){

		date = e.value;

		console.log(e.value);
		dateArr = date.split("/");

		this.setActualDay(dateArr[2]);
		this.setActualMonth(dateArr[1]);
		this.setActualYear(dateArr[0]);
       	
  		this.setDate(date);

		date = this.formatDate(date);
		
       	document.getElementById(this.id).value = date;

       	this.destroy();

       	if(!this.closeOnSelect)
       		this.render();    
	}

	this.getMonthName = function(){

		month = this.getActualMonth();

		monthName = this.monthNames[month];

		return monthName;
	}

	this.getActualMonth = function(){

		return this.actualMonth;
	}

	this.setActualMonth = function(month = null){

		if(month == null){

			actualDate = document.getElementById(this.id).value;

			if(actualDate == null){

				month = new Date();
				month = month.getMonth();
			}else{

				month = actualDate.split('/');
				month = month[1];
			}
		}
		this.actualMonth = month;
	}

	/*
	 * Troca o mes de acordo com o botão pressionado
	 * @params: int add = +1 avança um mês, -1 volta um mes;	
	*/
	this.changeMonth = function(add){

		year = this.getActualYear();
		month = this.getActualMonth();

		newDate = new Date(year, (parseInt(month) + add) );

		newMonth = newDate.getMonth();
		newYear = newDate.getFullYear();

		this.setActualMonth(newMonth);
		this.setActualYear(newYear);

		if(this.hideDays){

			newDate = newYear + "/" + newMonth + "/01";
			this.setDate(newDate);
		}
		this.destroy();
		this.render();
	}

	this.setActualYear = function(year){

		this.actualYear = year;
	}

	this.getActualYear = function(){

		return this.actualYear;
	}

	this.setActualDay = function(day){

		this.actualDay = day;
	}

	this.getActualDay = function(){

		return this.actualDay;
	}

	this.generateDaysArr = function(year = null, month = null){
		
		currentDate = new Date();

		if(month != null && year != null){

			currentDate = new Date(year, month);
		}
		
		daysArr = [];

		currentMonth = currentDate.getMonth();
		currentYear  = currentDate.getFullYear();

		maxDayThisMonth = new Date(currentYear, currentMonth+1, 0);
		maxDayThisMonth = maxDayThisMonth.getDate();

		dateLastMonth = new Date(currentYear, currentMonth, 0);

		maxDayLastMonth = dateLastMonth.getDate();
		lastMonth       = dateLastMonth.getMonth();
		lastYear        = dateLastMonth.getFullYear();

		nextDate  = new Date(currentYear, currentMonth+1, 1);
		nextMonth = nextDate.getMonth();
		nextYear  = nextDate.getFullYear();

		firstWeekDay = new Date(currentYear, currentMonth, 1);
		firstWeekDay = firstWeekDay.getDay();

		dayStart = 1;

		index = firstWeekDay;

		if(firstWeekDay == 0){ // quando o primeiro dia da semana for segunda feira, pula a primeira linha de dias e começa a contar os dias do mes corrente na segunda feira da segunda linha
			index = 7
		}

		for(var i = 0; i < maxDayThisMonth; i++ ){ // Preenche o array com os dias do mes atual, deixando em branco os indices dos dias do mes anterior e posterior

			daysArr[i+index] = year + "/" + month + "/" + dayStart;

			dayStart++;
		}

		for(var i = index-1; i >= 0; i-- ){ // Preenche o array com os dias do mes anterior;

			daysArr[i] = lastYear + "/" + lastMonth + "/" +maxDayLastMonth;
			maxDayLastMonth--;
		}

		dayStart = 1;
		for(var i = daysArr.length; i < 42; i++){ // Preenche o array com os dias do mes posterior - 42 é o número de posições do calendário (7 dias x 6 linhas);

			daysArr[i] = nextYear + "/" + nextMonth + "/" + dayStart;

			dayStart ++;
		}
		
		return daysArr;
	}

	/*
	* Método para resgatar a data que está preenchida no text field.
	*/
	this.getFieldDate = function(){
		date = document.getElementById(this.id).value;

		date = date.split('/');
		
		switch (this.dateFormat){

			case "dd/mm/yyyy":

				this.setActualDay( date[0] );
				this.setActualMonth( date[1]-1 );
				this.setActualYear( date[2] );	

				break;
			case "mm/yyyy" && date.length == 2:

				this.setActualMonth( date[0]-1);
				this.setActualYear( date[1] );
			
				break;
			default:
				date = new Date();
				this.setActualDay( date.getDate() );
				this.setActualMonth( date.getMonth() );
				this.setActualYear( date.getFullYear() );
		}
	}

	this.output();
}

/***************TODO******************/
// implementar fechamento do calendario ao clicar fora
// implementar fechamento da div de seleção de ano ao clicar fora
// Parametro para setar se o campo de data depende de outro, se sim, a data deste campo não pode ser menor que o qual ele depende 
// Parametros para personalizar as cores;
// Parametros para desabilitar datas passadas ou futuras;
// Parametros para informar o ano máximo e mínimo que serão exibidos
// Adicionar efeitos de transição ao renderizar;
