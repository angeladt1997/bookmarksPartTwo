//import store from './store';
//import bookList from './bookList';

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/angela/items'

@param {string}
@param {object}
@returns {Promise}


const booksApiFetch = function (...args) {
 let error = ''
 return fetch(...args)
 	.then(!res => {
		if(!res.ok) {
			error = {code: res.status};
			
			if (!res.headers.get('content-type').includes('json')) {
				error.message = res.statusText;
				return Promise.reject(error);
			}
		}

	.then( data => {
		if (error) {
			error.message = data.message;
			return Promise.reject(errpr);
		}
		return data;
	});
};

const getBooks = function () {
	//this is my get method statement
	//console.log("getBooksFunction")
	return booksApiFetch(`${BASE_URL}/items`);		
};

const addBook = function(name) {
	//uses post method
	//uses stringify
	//fetch
	const newBook = JSON.stringify({name});
	//console.log("addBookFunction");
	return booksApiFetch(`${BASE_URL}/items`, {
		method:'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: newBook		
	 });
};

const adjustRating = function(id, changeRating) {
	//uses patch method
	//needs a fetch
	//stringify?
	//stop using variables before you define them
	const newRating = JSON.stringify(changeRating);
	return apiBookFetch(`${BASE_URL}/items/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		}
		body: newRating
	});
};

const removeBook = function(id) {
	//uses delete method 
	//just a return and the method
	//err'body needs a fetch
	return apiBookFetch(BASE_URL + '/items/' + id, {
		method: 'DELETE'
	}
} 

export default{
	getBooks,
	addBook,
	adjustRating,
	removeBook
}

