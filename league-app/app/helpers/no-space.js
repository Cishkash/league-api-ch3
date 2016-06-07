import Ember from 'ember';

export default Ember.Helper.extend({

  compute(string) {
    debugger;
    if (string && string.length && string != null) {
      string = string[0].toString().replace(/\s/g, '');
    }
    return string[0];
  }
});

// export default Ember.Helper.helper(noSpace);
