import RESTSerializer from 'ember-data/serializers/rest';

export default RESTSerializer.extend({

  /**
   * Just had a few issues initially when collecting data on the summoner. So
   * I did a little front end normalizing to munge what I thought was relevent to
   * this project.
   *
   * @todo Do the munging the backend man.
   * @return {object}         Summoner information
   */
  normalizeFindRecordResponse(store, type, payload, id) {

    return {
      data: {
        type: 'summoner',
        id: id,
        attributes: {
          summonerId: payload.id,
          name: payload.name,
          profileIconId: payload.profileIconId,
          summonerLevel: payload.summonerLevel
        }
      }
    };
  }
});
