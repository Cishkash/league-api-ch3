import Ember from 'ember';
const { inject } = Ember;

export default Ember.Route.extend({
  // Service injections
  global: inject.service(),

  /**
   * Init of the application. With ember adapters, I send a request to my backend
   * requesting region information and it returns all the regions to which I set
   * on my global service. This allows my application to access all regions wherever
   * my service is injected.
   *
   * @method init Init hook
   */
  init() {

    var globalService = this.get('global');

    this.store.findAll('region').then(regions => {

      globalService.set('regions', regions.toArray());
    });
  }
});
