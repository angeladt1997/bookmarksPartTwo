const items = []
let error = null
let collapsed = true



// const store = {
// 	bookmarks: [
// 	{
// 	  id: 'x56w',
// 	  title: 'Title 1',
// 	  rating: 3,
//       url: 'http://www.title1.com',
//       description: 'lorem ipsum dolor sit',
//       expanded: false
//     },
//     {
// 	  id: '6ffw',
// 	  title: 'Title 2',
// 	  rating: 5,
// 	  url: 'http://www.title2.com',
// 	  description: 'dolorum tempore deserunt',
// 	  expanded: false
//     }
// ],
// adding: false,
// error: null,
// filter: 0

//};


const findById = function(id) {
	return this.items.find(currentItem => currentItem.id === id);
};

const addNewBook = function (item) {
	this.items.push(item);
};

const findAndDelete = function (id) {
	this.items = this.items.filter(currentItem => currentItem.id !== id);
}

const toggleCollapsed = function() {
	this.collapsed = !this.collapsed;
};

const findAndUpdate = function(id, newData) {
	const currentItem = this.findById(id);
	Object.assign(currentItem, newData);
};

const setError = function (error) {
	this.error = error
};

export default {
	items,
	error,
	store,
	collapsed,
	findById,
	addNewBook,
	findAndDelete,
	toggleCollapsed,
	findAndUpdate,
	setError
}
