import RESTSerializer from 'ember-data/serializers/rest';

export default RESTSerializer.extend({
  /**
   * Default id as the primary key for all responses
   *
   * @property
   * @type {String}
   */
  primaryKey: 'id'
});
