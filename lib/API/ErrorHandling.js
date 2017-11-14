
class ErrorHandling {

  static parseDBValidations(errors){

    //var errors = data.error.errors;
    var errorsTransform = {}

    for(var i in errors){

      var item = errors[i];
      var message = item.message;

      //# personalizamos el mensaje por defecto de mongoose (required:true)
      if(message.indexOf('is required') != -1){
         message = 'Requerido'
      }

      errorsTransform[item.path] = [message]
    }

    return errorsTransform
  }

  static HandleDbError(error, res, next) {

    if (error.errors) {
        res.status(400);
        return res.json({type: "Validation", errors: this.parseDBValidations(error.errors) });
    }

    res.status(500);

    console.log("Unhandled error: " + error);

    return res.json({type: "Unhandled"});
  }

  static GenerateValidationError(res, errors) {
      res.status(400);
      return res.json({type: "Validation", errors: errors});
  }

  static GenerateNotFound(res) {
      res.status(404);
      return res.json({type: "Not found", message: "Element(s) not found."});
  }

  static GenerateCollissionOnInsert(res) {
      res.status(400);
      return res.json({type: "Collision", message: "Insertion collides with another entry."});
  }

  static GenerateError(res, message, type = "Unhandled", errorType = 400) {
      res.status(errorType);
      return res.json({type, type, message});
  }
}

module.exports = ErrorHandling;
