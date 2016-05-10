import Ember from 'ember';

export default Ember.Route.extend({
  /**
   * Fetches all of the summoner info using a by-name search to a riot api.
   *
   * @todo Turn this into an auto suggest dropdown
   * @param  {string} params params.summoner_name used to access the dyanmic segment
   *                         model of the specific summoner you are searching for.
   * @return {object}        Object containing summoner information from the by-name search
   */
  model(params) {

    return this.store.findRecord('summoner', params.summoner_name);
  }
});
