import Ember from 'ember';
const { inject } = Ember;

export default Ember.Controller.extend({

  globalService: inject.service('global'),
  /**
   * Binding of the summonerId from the template. Porque routable components wru!
   * The summoner id of the summoner you are looking to search data on. Currently,
   * only active on the champion masteries but I have plans. Good plans. So good that
   * I'm gonna build a wall around it and have Mexico pay for it.
   *
   * @property queryParams
   * @type {array.string}
   */
  queryParams: ['summonerId'],
  /**
   * Computed property to sort my model.
   * @param  {object} 'model'     Ember magic model imported from the route.
   * @property topThreeChampions  Computed property
   * @returns {object}            Sorted version of my model
   */
  topThreeChampions: Ember.computed.sort('model.topChampions', 'champSort'),
  /**
   * Sort my model by id. Apparently it's just that easy in Ember
   *
   * @property champSort
   * @type {Array}
   */
  champSort: ['championPoints:desc'],
  /**
   * Default property of the summonerId. That's it.
   *
   * @property summonerId
   * @type {String}
   */
  summonerId: '',

});
