var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});


// Format Dates with MomentJS
AuthorSchema
.virtual('birth_formatted')
.get(function () {
  return this.date_of_birth ? 
  moment(this.date_of_birth).format('YYYY-MM-DD') : '';
});
AuthorSchema
.virtual('death_formatted')
.get(function () {
  return this.date_of_death ?   
  moment(this.date_of_death).format('YYYY-MM-DD') : '';
});

// Author LifeSpan Virtual Property Object replaces the 2 Formatted Dates above 
AuthorSchema
.virtual('life_span')
.get(function () {
  var life_string = '';
	if (this.date_of_birth) {
    	life_string = moment(this.date_of_birth).format('MMMM Do, YYYY');
	}

		life_string += '---';

	if (this.date_of_death) {
		life_string += moment(this.date_of_death).format('MMMM Do, YYYY');
	}
	return life_string;
})

//Export model
module.exports = mongoose.model('Author', AuthorSchema);