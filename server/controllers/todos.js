const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

module.exports = {


  /* creates a new todo and if successful, it returns it. If it encounters an error, 
	it returns that error instead. 
	This create function is designed to be a route handler for whichever Express 
	route we'll choose to attach it to. 
	The req parameter is the incoming request from the client. 
	The res parameter is the response we're preparing to eventually 
	send back to the client in response to their request :). All Express route handlers 
	follow this method signature. 
	We can have a third parameter, conventionally named next, which is a function that 
	passes the request on to the next route handler (meaning that a route can be 
	handled by multiple route handlers, in which case it's piped or passed along all 
	of those route handlers). 
	We are, however, not going to see a use case for that in this application .*/
  	create(req, res) {

    	return Todo

      		.create({
        		title: req.body.title,
      		})

      		.then(todo => res.status(201).send(todo))
      		.catch(error => res.status(400).send(error));

  	}, /* END CREATE */


  	/* We fetching all todos from our database and sending them back to the user 
  	as an array in the response. If we encounter an error while fetching the 
  	todos from the database, we send that error object instead. */
	 list(req, res) {
  		return Todo

    		//.all() /* This is replaced with findAll */

    		/* findAll returns a todo together with it's associated items */
    		/* we find all todos and include all associated todoitems from the TodoItem model. 
    		We include them as todoItems, as we did when defining the relationship in the Todo 
    		model. Remember to require the TodoItem model at the top of the 
    		server/controllers/todos.js file. */
    		.findAll({
      			include: [{
        			 model: TodoItem,
        			 as: 'todoItems',
      			}],
    		}) /* end findAll */
    		
    		.then(todos => res.status(200).send(todos))
    		.catch(error => res.status(400).send(error));
	}, /* END LIST */


  /* Retrieve one todo based on it's id */
  /* we're finding the todo whose id matches the todoId we get from the request parameters 
  and we're also including it's associated todo items. If such a todo exists, we're sending 
  it back in the response. If it doesn't, we're sending back an error message letting the 
  user know we didn't find the specified todo. If we encounter an error when processing 
  this request, we're sending back the error object. 
  Then add a new route that maps to the retrieve view */
  retrieve(req, res) {

    return Todo

      .findById(req.params.todoId, {
          include: [{
              model: TodoItem,
              as: 'todoItems',
          }],
      })

      .then(todo => {

          if (!todo) {
              return res.status(404).send({
                  message: 'Todo Not Found',
              });
          }
          return res.status(200).send(todo);

      })
      .catch(error => res.status(400).send(error));
  }, /* END RETRIEVE */


  /* Update a single todo 
  We find the todo whose id matches the todoId supplied in the request params. 
  We are then updating it's title. If no title was provided, we're defaulting 
  to the title the todo already had. 
  We also need to add a new route that maps to the update method */
  update(req, res) {

      return Todo

        .findById(req.params.todoId, {

            include: [{
                model: TodoItem,
                as: 'todoItems',
            }],
      })

      .then(todo => {

          if (!todo) {
              return res.status(404).send({
                  message: 'Todo Not Found',
              });
          }

          return todo
          
              /* we either use the new title or default to the old one if a title is not given */
              .update({
                  title: req.body.title || todo.title,
              })

            .then(() => res.status(200).send(todo))  // Send back the updated todo.
            .catch((error) => res.status(400).send(error));

      }) /* END THEN(TODO => */

      .catch((error) => res.status(400).send(error));

  }, /* END UPDATE */
  

  /* Delete Todos 
  Similar to Updating a Todo, except when you delete a todo, it's 
  corresponding todo items are deleted as well. This is because we 
  specified the onDelete action as CASCADE when we were setting up our models. 
  Then add the corresponding route */
  destroy(req, res) {

      return Todo

          .findById(req.params.todoId)

          .then(todo => {

              if(!todo) {
                  return res.status(400).send({
                      message: 'Todo Not Found',
                  });
              }

              return todo

              .destroy()
              .then(() => res.status(200).send({ message: 'Todo deleted successfully.' }))
              .catch(error => res.status(400).send(error));

         }) /* END .THEN(TODO => */

        .catch(error => res.status(400).send(error));

  }, /* END DESTROY TODO */
  

};

