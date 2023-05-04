window.onload = function() {



window.addEventListener('scroll', e => {
	document.body.style.cssText = `--scrollTop: ${this.scrollY}px`
})

document.getElementById('menu').addEventListener('click',e => {
	document.querySelector('.header').classList.toggle("active");
	document.querySelector('.header__lang')
})



// Get the modal
var ebModal = document.getElementById('mySizeChartModal');

// Get the button that opens the modal
const ebBtns = document.querySelectorAll(".call");

// Get the <span> element that closes the modal
var ebSpan = document.getElementsByClassName("ebcf_close")[0];

// When the user clicks the button, open the modal 


ebBtns.forEach(item=> {
  item.addEventListener('click', function () {
    ebModal.style.display = "block";
  })
})



// When the user clicks on <span> (x), close the modal
ebSpan.onclick = function() {
    ebModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == ebModal) {
        ebModal.style.display = "none";
    }
}



// Установка cookie

const cookieMess = document.querySelector('.cookie');
const cookieBtn = document.querySelector('.cookie_success');
let cookieStorage = localStorage.getItem('cookie');

if(!cookieStorage) cookieMess.style.display = "block";

cookieBtn.addEventListener('click',function(){
	cookieMess.style.display = "none";
	localStorage.setItem('cookie', true);
})



// Получаем элементы страницы, связанные с языком
const changeLangBtn = document.querySelector('.custom-select'); // кнопка переключения языка
const langOptions = document.querySelectorAll('.custom-option li') // все варианты языков
const value = changeLangBtn.querySelector('.value');

// Получаем язык из localstorage
let currentLang = localStorage.getItem('lang');

// Если язык не был сохранен в localstorage, устанавливаем значение по умолчанию
if (!currentLang) {
currentLang = 'ru'; // например, английский язык
localStorage.setItem('lang', currentLang);
}

// Устанавливаем активный вариант языка на странице
langOptions.forEach((option) => {
if (option.getAttribute('data-lang') === currentLang) {
option.classList.add('active-lang');
} else {
option.classList.remove('active-lang');
}
});

// Устанавливаем активный вариант языка в селектор
const setlang = document.querySelector('.active-lang');
const img = setlang.querySelector('img');
const text = setlang.querySelector('span');
value.innerHTML = `<img src="${img.src}">${text.textContent}`;


// Функция для обновления языка на странице
function updateLang(lang) {
// Устанавливаем значение языка в localstorage
localStorage.setItem('lang', lang);

// Обновляем активные варианты языка на странице
langOptions.forEach((option) => {
if (option.getAttribute('data-lang') === lang) {
option.classList.add('active-lang');
} else {
option.classList.remove('active-lang');
}
});
changeLanguage()
// Здесь можно добавить код для обновления содержимого страницы на выбранном языке
}

// Навешиваем обработчики событий на кнопку и варианты языка
changeLangBtn.addEventListener('click', () => {
	changeLangBtn.parentElement.classList.toggle('show');
});

langOptions.forEach((option) => {
option.addEventListener('click', () => {
const selectedLang = option.getAttribute('data-lang');

const img = option.querySelector('img');
const text = option.querySelector('span');
value.innerHTML = `<img src="${img.src}">${text.textContent}`;
changeLangBtn.parentElement.classList.remove('show');

updateLang(selectedLang);
});
});


window.addEventListener('click', function (e) {
  if(e.target !== changeLangBtn && e.target !== langOptions) {
    changeLangBtn.parentElement.classList.remove('show');
  }
})










function changeLanguage(){
	let currentLang = localStorage.getItem('lang');
	for (let key in langArr){
		try{
			if(document.querySelector('.lang-' + key)){
				document.querySelectorAll('.lang-' + key).forEach((item) =>{
					if(item.value){ item.value = langArr[key][currentLang];
					}else if(item.placeholder){ item.placeholder = langArr[key][currentLang];
					}else {item.innerHTML = langArr[key][currentLang];}
				})
			}
			
		}catch{
		
		}
		
	}
}


changeLanguage();

// Маска

const phoneMask = IMask(
  document.getElementById('phone-mask'), {
		mask: '+0(000)000-00-00',
		country: 'Russia'
  });



// Отправка формы в телеграмм

const TOKEN = "6297152941:AAHkStiTY0-krH-r3L9zl6tWgf89fALgebw";
const CHAT_ID = "-1001953219873";
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
const success = document.getElementById('mySizeChartModal');


document.getElementById('call').addEventListener('submit', function (event) {   
	event.preventDefault();
if(this.name.value.length < 3 || parseInt(this.name.value)){
	this.name.value = '';
}else if (this.phone.value.length < 11){
	this.phone.value = '';
}else{
	
	let message = `<b>Заявка с сайта</b>\n`;
	message += `<b>Имя отправителя:</b> <i>${this.name.value}</i>\n`;
	message += `<b>Телефон отправителя:</b> <i>${this.phone.value}</i>`;

	axios.post(URI_API,{
		chat_id: CHAT_ID,
		parse_mode: "html",
		text: message
	})
	.then((res)=>{
		this.name.value = '',
		this.phone.value = '',
		success.classList.add('success')
	})
	.catch((err)=>{
		console.warn(err)
	})
	.finally(()=>{
		console.log('Send')
	})
}
})











};