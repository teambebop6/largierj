insert into user2 (username, password, email, role) values ('admin', 'password', 'hi@cnhalo.com', 1);

insert into configuration(group_name) values ('global');

insert into configuration_item(configuration_id, name, title, config_value) values (1, 'pastConcertNum', 'Show past concerts number', '5');
insert into configuration_item(configuration_id, name, title, config_value) values (1, 'upcomingConcertNum', 'Show upcoming concerts number', '5');
