import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    this.store.unloadAll();
    return this.store.findRecord('locale', params.region_id);
  }
});
