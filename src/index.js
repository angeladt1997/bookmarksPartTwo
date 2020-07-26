
import'./index.css';
import bookList from './bookList';
import './normalize.css';
import api from './api';
//import render from './bookList';
//import bindEventListeners from './bookList';
import store from './store';

const main = function () {
	api.getBooks()
		.then((items) => {
			items.forEach((item) =>store.addNewBook(item));
			bookList.render();
	});

	bookList.bindEventListeners();
	bookList.render();
}


$(main);
