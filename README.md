# TO-DO-LIST-Node
Learning to make a simple to do list with Node.js, Express and Postgres. One can create, edit, delete todo items and more :)

improvements to make:

Better error handling. Currently, we're assuming that all errors are due to the data the user has provided. We're also sending back the whole error object. That could be a security issue since you might leak information about your architecture to the end user.

Form fields validation. We currently have no front-facing input fields validation. Whenever you're building a web application, it's imperative that you validate user input before it hits the database. Our current validation (not null constraint) occurs at the database level. One way of performing this validation would be by intercepting the request in a middleware and validating that it contains the required fields.
