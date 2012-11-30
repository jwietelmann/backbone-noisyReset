(function(Backbone) {

  var oldReset = Backbone.Collection.prototype.reset;

  Backbone.Collection.prototype.noisyReset = function(models) {
    if(!models) return;

    console.log('wat');

    var oldModelIds = this.pluck(this.model.prototype.idAttribute);
    var newModelIds = _.pluck(models, this.model.prototype.idAttribute);

    // remove all the stuff that was in the collection but not in the new set of models
    // this will trigger 'remove' on each removed model
    var modelsToRemove = _.difference(oldModelIds, newModelIds);
    console.log(oldModelIds);
    console.log(newModelIds);
    console.log(modelsToRemove);
    this.remove(modelsToRemove);

    // now we'll add and change...
    for(var i = 0; i < models.length; i++) {
      var modelAttributes = models[i];

      var existingModel = this.get(modelAttributes[this.model.prototype.idAttribute]);
      // if the model is already present, update it
      // this will trigger 'change' if there are differences
      if(existingModel) {
        existingModel.set(modelAttributes);
      }
      // otherwise this is a new model, add it
      // this will trigger 'add' for each new model
      else {
        this.add(modelAttributes);
      }
    }

    return this;
  };

  Backbone.Collection.prototype.reset = function(models, options) {
    if(options != null && options.noisy) return this.noisyReset(models);

    return oldReset.call(this, models, options);
  };

})(Backbone);
