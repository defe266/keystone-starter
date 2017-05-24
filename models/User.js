var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var User = new keystone.List('User');

User.add({

	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	createdAt: { label: 'Creado el', type: Date, default: Date.now },

	//room: { label: '???', type: Types.Relationship, ref: 'Post', filters: { author: ':_id'}},//, required: true, initial: true //, dependsOn: { state : 1 } 

}, 'Permisos', {

	isAdmin: { label: 'Puede acceder al administrador', type: Boolean, index: true }

}, 'Notificaciones', {

	receiveContacts: { label: 'Recibe correos de contacto', type: Boolean},
	receiveOrders: { label: 'Recibe correos de pedidos', type: Boolean}
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});


/**
 * Relationships
 */

//User.relationship({ ref: 'Post', refPath: 'author' });


/**
 * Registration
 */

User.defaultColumns = 'name, email, isAdmin';
User.register();
