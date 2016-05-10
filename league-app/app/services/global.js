import Ember from 'ember';

export default Ember.Service.extend({
  /**
   * List of all available regions
   * Hits the shards endpoint and munged in the backend to provider only specific
   * data I need
   *
   * @property
   * @type {Object}
   * @default null
   */
  regions: null
});
