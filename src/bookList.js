import $ from 'jquery';
import api from './api';
import store from './store';



//submission control functions

const generateBook = function (item) {
  //let bookTitle = `<span class="book-title book-title_collapsed">${bookmarks.title}</span>`;
  let bookTitle = `<span class="book-title book-title_collapsed">${item.name}</span>`;
  if (!book.collapsed) {
    bookTitle = `
    	<form class ="js-edit-title">
    		<input class="book-id" type="text" value"${item.name}" required/>
    	</form>
			<div>	
	    	<form id="bookmark-form">
				<input type="text" name="book-entry" class="bookmark-entry" placeholder="Book Title" required>
				<input type="text" name="author-entry" class="bookmark-entry" placeholder="Author" required>
				<input type="text" name="url" class="bookmark-entry" placeholder="Link to Book" required>
				<button id="testSubmit" type="submit">Add Title</button>
				<ul class="book-list js-book-list">
		</form>
			</div>
			<div class="accordionDetails">
				<label for="bookmark-entry-description">How was the book?</label>
					<ul>					
						<select name="ratings"id="bookmark-form-rating">
							<option selected="selected">1 Star</option>
							<option  value="1 Star">1 Star</option>
							<option  value="2 Stars">2 Stars</option>
							<option  value="3 Stars">3 Stars</option>
							<option  value="4 Stars">4 Stars</option>
							<option  value="5 Stars">5 Stars</option>
						</select>
					</ul>
			</div>
			<div>
				<textarea 
					rows="10" cols="66" name="book-entry-review" class="book-entry-description" placeholder="What did you think of the book?" required>
				</textarea>
	      			<form class="js-edit-title">
	        			<input class="book-entry" type="text" value="${bookmarks.title}" />
	      			</form>
      		</div>
    `;
  }


 return `
   <li class="js-title-element" data-title-id="${item.id}">
     ${itemTitle}
     <div class="book-title-controls">
      	<button class="book-title-toggle js-title-toggle">
        	 <span class ="button-label">Submit</span>
      	</button>
       	<button class="book-title-delete js-title-delete">
      		 <span class="button-label">Delete Submission</span>
       	</button>
       </div>
     </li>`;
//	console.log("generateBook")
};


const generateBookTitleString = function (bookList) {
     const items =bookList.map((item) => generateBook(item));    
     return items.join('');
     //console.log("generateBookTitleString") 
};

const collapsibleMenu =function (bookDescription) {
	const collapsedMenu = ${.accordionDetails}
	return `
	${.accordionDetails}`
// 		<`<div class="accordionDetails">
// 			<label for="bookmark-entry-description">How was the book?</label>
// 				<ul>					
// 					<select name="ratings"id="bookmark-form-rating">
// 						<option selected="selected">1 Star</option>
// 						<option  value="1 Star">1 Star</option>
// 						<option  value="2 Stars">2 Stars</option>
// 						<option  value="3 Stars">3 Stars</option>
// 						<option  value="4 Stars">4 Stars</option>
// 						<option  value="5 Stars">5 Stars</option>
// 					</select>
// 				</ul>
// 		</div>
// 		<div>
// 			<textarea 
// 				rows="10" cols="66" name="book-entry-review" class="book-entry-description" placeholder="What did you think of the book?" required>
// 			</textarea>
//       			<form class="js-edit-title">
//         			<input class="book-entry" type="text" value="${bookmarks.title}" />
//       			</form>
//       	</div>
// }
//still playing with this function
}

//error functions

const generateError = function(message) {
      return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
};


const renderError = function () {
	if (store.error) {
		const uhOh = generateError(store.error);
		$('.error-container').html(uhOh);
	} else {
		$('.error-container').empty();
	}
};

const handleCloseError = function () {
	$('.error-container').on('click', '#cancel-error', () => {
		store.setError(null)
		renderError();
	});
};

//render functions

const render = function() {
	//controls most of the apps functions
	renderError();
	let items = [...store.items];
	if(store.collapsed) {
		items = items.filter(item => !item.collapsed);
	}
	//console.log("render")


const bookTitleString = generateBookTitleString
	$('.js-book-list').html(bookTitleString);
	//console.log("bookTitleString")
}; 

//handler functions

const handleNewBookSubmit = function() { 
	$('#bookmark-form').submit(function(event) {
		event.preventDefault();
		console.log("running")
		const newBookTitle = $('.bookmark-entry').val();
		$('.bookmark-entry').val('');
		api.addBook(newBookTitle)
		.then((newItem)=>{
			store.addNewBook(newItem);
			render();
		})
		.catch((error) => {
			store.setError(error.message);
			renderError();
		});
	});
		
	}; 
	


const getBookIDFromElement = function (item) {
	
	return $(item)
	.closest('.js-title-element')
	.data('item-id');
	//console.log("getBookIDFromElement")
};

const handleDeleteBookClicked = function () {
	$('.bookmark-form').on('click', '.js-title-delete', event => {
		const id = getBookIDFromElement(event.currentTarget);
		api.deleteBook(id)
		.then(()=> {
			store.findAndDelete(id);
			render();
		})
		.catch((error) => {
			console.log(error);
			store.setError(error.message);
			renderError();
		});
	});
	//console.log("handleDeleteBookClicked")
};

const handleCollapsibleDescriptions = function () {
	$('accordionDetails').accordion('click', 'bookmark-entry-description', event => {
		event.preventDefault();
		const description = collapsibleMenu(event.currentTarget);

	// 	.catch((error) => {
	// 		console.log(error);
	// 		store.setError(error.message);
	// 		renderError();
	// 	});
	// })
	//also still playing with this function
}

const handleEditSubmission = function () {
    $('.js-book-list').on('submit', '.js-edit-title', event => {
    	//console.log(event);
    	event.preventDefault();
    	const id = getBookIDFromElement(event.currentTarget);
    	const itemName = $(event.currentTarget).find(.'book-title').val();
    	api.adjustRating (id, {name: itemName})
    	.then(() => {
    		store.findAndUpdate (id, { title:bookTitle});
    		render();
    	})
    	.catch((error) => {
    		console.log(error);
    		store.setError(error.message);
    		renderError();
    	})
    })
};

const handleBookClicked = function () {
    $('.js-book-list').on('click', '.js-title-toggle', event => {
    	const id = getBookIDFromElement(event.currentTarget);
    	const item = store.findByID(id);
    	api.adjustRating(id, {expand: !item.expand})
    	.then(()=> {
    		store.findAndUpdate(id, {expand: !item.expand});
    	render();
    })
	    .catch((error) => {
	    	store.setError(error.message);
	    	renderError();
    	})
	});

};


const bindEventListeners = function() {
	handleBookClicked();
	handleEditSubmission();
	handleDeleteBookClicked();
	handleCollapsibleDescriptions();
	handleCloseError();
	handleNewBookSubmit();
	;
};

export default {
	render,
    bindEventListeners
};

