import Ember from 'ember';

export default Ember.Service.extend({
  /**
   * Current DDragon version
   *
   * @property currentVersion
   * @type {String}
   */
  currentVersion: '6.11.1',
  /**
   * List of all available regions
   * Hits the shards endpoint and munged in the backend to provider only specific
   * data I need
   *
   * @property regions
   * @type {Object}
   * @default null
   */
  regions: null
});
