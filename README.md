backbone-noisyReset
===================

Adds a ```noisy``` boolean flag to ```Backbone.Collection.reset()``` which, instead of firing a ```reset``` event, will fire ```add```, ```change```, and ```remove``` events depending on whether each model is new, updated, or removed.

# Usage

```javascript
var collection = new Backbone.Collection();

var models = [{ id: 1 }, { id: 2 }];
collection.reset(models, { noisy: true });
```