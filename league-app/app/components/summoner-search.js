import Ember from 'ember';
const { computed, inject } = Ember;

export default Ember.Component.extend({
  // Service injections
  global: inject.service(),
  user: inject.service(),

  /**
   * The summoner name without the spaces
   * Set from the noSpace action.
   *
   * @property proxiedSummonerName
   * @type {String}
   */
  proxiedSummonerName: '',
  /**
   * The name of the summoner searched for
   *
   * @type {String}
   */
  summonerName: '',

  // Action
  actions: {
    /**
     * Removes the spaces from the summoner name upon search.
     * Fires first because this actio is yielded before the link-to helper.
     *
     * @method noSpace
     * @param  {String} summonerName
     */
    noSpace(summonerName) {

      summonerName = summonerName.replace(/\s/g, '');
      this.set('proxiedSummonerName', summonerName);
    }
  }
});
