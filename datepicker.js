datepicker = function(obj){

	this.id; 						//id do datepicker
	this.valueField; 				//Campo de texto que receberá a data e o action de render do datepicker
	this.name; 						//nome do objeto instanciado do datepicker
	this.weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
	this.monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
	this.actualDay; 				// dia atual selecionado
	this.actualMonth; 				//Numero do mes em exibição na tela;
	this.actualYear; 				// ano em exibição na tela
	this.date; 						// guarda a ultima data selecionada no formato dd/mm/yyy
	this.dateFormat = "dd/mm/yyyy"; //formato da data
	this.closeOnSelect = false; 	//define se o datepicker se fecha ao selecionar uma data
	
	this.setUserOptions = function(){

		for(var key in obj){ 
			
			this[key] = obj[key];
		}
	}

	this.setUserOptions();

	/* 
	 * Método que insere a action para renderizar o datepicker ao clicar no text field passado por parametro.
	 */
	this.output = function(){

		field = document.getElementById(this.valueField);
		field.setAttribute("onclick",this.name+".render()");

		var fileref = document.createElement("link");
		fileref.rel = "stylesheet";
		fileref.type = "text/css";
		fileref.href = "datepicker.css";
		document.getElementsByTagName("head")[0].appendChild(fileref);

		this.getFieldDate();
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

		field = document.getElementById(this.valueField);

		

		var divDatepicker       	  = document.createElement('div');
		divDatepicker.className 	  = "datepicker";
		divDatepicker.id        	  = "datepicker";
		this.definePosition(field, divDatepicker);
		document.body.appendChild(divDatepicker);

			var divArrow       	  = document.createElement('div');
			divArrow.className 	  = "arrow";
			divArrow.id        	  = "arrow";
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
					iconButtonBack.className = "direction-symbol";
					iconButtonBack.innerHTML = "<<";
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
					iconButtonFrw.className = "direction-symbol";
					iconButtonFrw.innerHTML = ">>";
					divButtonFrw.appendChild(iconButtonFrw);

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
						daysTd[j].className = "day-button";
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
		selectYearDiv.style.position  = "element(year-name)";
		selectYearDiv.style.transform = "translateY(-216px)";
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

		document.getElementById('select-year-div').scrollTop = scrollSize - 80;
	}

	this.definePosition = function(objToFind, objToRender) {

		posleft = objToFind.offsetLeft;
		postop = objToFind.offsetTop;
		height = objToFind.offsetHeight;

		objToRender.style.position = "absolute";
		objToRender.style.left = posleft + "px";
		objToRender.style.top = postop + height + "px";

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
	 * Função que verifica se a data que está sendo renderizado é o ultimo selecionado, utilizado para manter a seleção no ultimo dia clicado
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
	 * Função para setar o formato em que a data será exibida    
	 * @param string dd/mm/yyyy
	 * @param string mm/yyyy
	 */
	this.setDateFormat = function(format){

		this.dateFormat = format;
	}

	this.getDateFormat = function(){

		return this.dateFormat;
	}

	/*
	 * Função para formatar a data de acordo com o formato escolhido no parametro dateFormat.
	 * @param string de data no formato yyyy/mm/dd
	 * @return string
	 */
	this.formatDate = function(dateString){

		dateArr = dateString.split("/");
		day = dateArr[2];
		month = parseInt(dateArr[1])+1;
		year = dateArr[0];
		format = this.getDateFormat();

		if(day.length == 1)
			day = "0" + day;
		if(String(month).length == 1)
		    month = "0" + month;

		switch( format ){

			case "dd/mm/yyyy":
				date = day + "/" + month + "/" + year
				break;
			case "mm/yyyy":
				date = month + "/" + year;
				break;
			default:
				date = "Incorrect date format!";
		}

		return date;
	}

	this.selectDate = function(e){

		date = e.value;

		dateArr = date.split("/");

		this.setActualDay(dateArr[2]);
		this.setActualMonth(dateArr[1]);
		this.setActualYear(dateArr[0]);
       	
  		this.setDate(date);

		date = this.formatDate(date);
		
       	document.getElementById(this.valueField).value = date;

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

			actualDate = document.getElementById(this.valueField).value;

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
		currentYear = currentDate.getFullYear();

		maxDayThisMonth = new Date(currentYear, currentMonth+1, 0);
		maxDayThisMonth = maxDayThisMonth.getDate();

		dateLastMonth = new Date(currentYear, currentMonth, 0);

		maxDayLastMonth = dateLastMonth.getDate();
		lastMonth       = dateLastMonth.getMonth();
		lastYear        = dateLastMonth.getFullYear();

		nextDate = new Date(currentYear, currentMonth+1, 1);
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
		date = document.getElementById(this.valueField).value;

		if( date == null || date == '' || typeof(date) == undefined ){

			date = new Date();
			
			this.setActualDay( date.getDate() );
			this.setActualMonth( date.getMonth() );
			this.setActualYear( date.getFullYear() );
		}else{

			date = date.split('/');

			if(this.dateFormat == "mm/yyyy"){
				this.setActualMonth( date[0] );
				this.setActualYear( date[1] );
			}else{
				this.setActualDay( date[0] );
				this.setActualMonth( date[1] );
				this.setActualYear( date[2] );
			}
		}
	}

	this.output();
}

/***************TODO******************/

// Quando o formato de data for "mm/yyyy" no lugar dos dias, renderizar botões com os meses
// Parametro para indicar a posição em que o calendario será renderizado em relação ao field, (bottom/right, bottom/left, top/right, top/left);
// implementar fechamento do calendario ao clicar fora
// implementar fechamento da div de seleção de ano ao clicar fora
// Parametro para informar se deve inserir um botão de calendario anexado ao field
// Parametro para setar se o campo de data depende de outro, se sim, a data deste campo não pode ser menor que o qual ele depende 
// Parametros para personalizar as cores;
// Parametros para desabilitar datas passadas ou futuras;
// Parametros para informar o ano máximo e mínimo que serão exibidos
// Adicionar efeitos de transição ao renderizar;
