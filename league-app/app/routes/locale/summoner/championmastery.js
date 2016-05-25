import Ember from 'ember';

export default Ember.Route.extend({

  /**
   * Model for the championmastery route
   * @param  {number} params query param for the summonerId
   * @return {object}        Kind of a massive object that hits a couple riot apis
   *                         Initially hits the championmastery api to retrieve
   *                         the summoner's top 3 champs and the consecutively
   *                         hits the champion static data to retrieve the champion
   *                         specific data to each top 3 champ. These responses are
   *                         munged in the backed to produce a pretty nice object to
   *                         work with.
   * @method model           model hook
   */
  model(params) {

    return Ember.RSVP.hash({
      topChampions: this.store.query('top-champion', params),
      masteryScore: this.store.queryRecord('mastery-score', params)
    });
    // return this.store.query('top-champion', params);
  }
});
