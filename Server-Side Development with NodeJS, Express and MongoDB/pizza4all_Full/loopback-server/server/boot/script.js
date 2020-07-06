module.exports = function(app) {
    var Customer = app.models.Customer;

    Customer.findOne({ username: 'Admin' }, (err, users) => {
        if (!users) {
            Customer.create([
                { username: 'Admin', email: 'admin@pizza.net', password: 'password'}
            ], (err, users) => {
                if (err) throw(err);

                var Role = app.models.Role;
                var RoleMapping = app.models.RoleMapping;

                // if RoleMapping already exists then destroy those when starting the server
                RoleMapping.destroyAll();

                Role.findOne({ name: 'admin'}, (err, role) => {
                    if (err) throw(err);

                    if (!role) {
                        Role.create({ name: 'admin' }, (err, role) => {
                            if (err) throw(err);

                            role.principals.create({
                                principalType: RoleMapping.USER,
                                principalId: users[0].id
                            }, (err, principal) => {
                                if (err) throw(err);
                            })
                        })
                    }
                    else {
                        role.principals.create({
                            principalType: RoleMapping.USER,
                            principalId: users[0].id
                        }, (err, principal) => {
                            if (err) throw(err);
                        })
                    }
                })
            })
        }
    })
}