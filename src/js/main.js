// import $ from 'jquery';

// Enable inline svg in IE 11
import svg4everybody from 'svg4everybody';
// Enable picture in IE 11
import pictureFill from 'picturefill';
// Enable object-fit in IE 11
import objectFitImages from 'object-fit-images';

// Modules
import { Auth } from './modules/auth';

svg4everybody();
pictureFill();
objectFitImages();

document.addEventListener('DOMContentLoaded', () => {
    let mainForm = new Auth(
        document.querySelector('#main-form'),
        'Главная форма',
        [
            {
                name: 'Имя',
                type: 'firstname',
            },
            {
                name: 'Фамилия',
                type: 'lastname',
            },
            {
                name: 'Отчество',
                type: 'patronymic',
            },
            {
                name: 'Телефон',
                type: 'phone',
            },
            {
                name: 'Пин-код',
                type: 'password',
            },
        ],
        'https://crcal.sovcombank.ru/app/api/v1',
    );
});
