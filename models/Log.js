var keystone = require('keystone');
var Types = keystone.Field.Types;

var Log = new keystone.List('Log', {
    singular: 'Log',
	plural: 'Logs',
	defaultSort: '-createdAt',
	nocreate: true,
	searchFields: 'message',
});

Log.add({
    type: {
        type: Types.Select,
        options: 'info, warn, error, fatal',
        default: 'info',
        noedit: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        noedit: true
    },
    message: {
        type: Types.Textarea
    }
});

Log.schema.add({

    data: { type: keystone.mongoose.Schema.Types.Mixed },
    createdAtTTL: { type: Date, default: Date.now, expires: 60*60*24*365*3 }
})

Log.defaultColumns = 'createdAt, type, message';


//# FIX 'Unknown modifier: $pushAll' after mongo upgrade to 3.6
Log.schema.plugin(schema => { schema.options.usePushEach = true });



Log.register();