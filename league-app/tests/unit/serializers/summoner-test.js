import { moduleForModel, test } from 'ember-qunit';

moduleForModel('summoner', 'Unit | Serializer | summoner', {
  // Specify the other units that are required for this test.
  needs: ['serializer:summoner']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
