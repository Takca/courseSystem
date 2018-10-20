insert into USER values (1, 'login', 'login');
insert into USER values (2, 'admin', 'admin');
insert into USER values (3, 'user', 'password');
insert into USER values (4, 'remedy', 'remedy');

insert into STUDENT values(1, 'Stepan@mail.com', 'Stepan', '+728231123');
insert into STUDENT values(2, 'Petr@mail.com', 'Petr', '+728231123');
insert into STUDENT values(3, 'Vasya@mail.com', 'Vasya', '+728231123');

insert into COURSE values(1, '2018-10-12', '2018-10-8', 'backend',0);
insert into COURSE values(2, '2018-10-19', '2018-10-15', 'frontend',0);

insert into STUDENT_COURSE values(1,1);
insert into STUDENT_COURSE values(1,2);
insert into STUDENT_COURSE values(2,2);
insert into STUDENT_COURSE values(3,1);
insert into STUDENT_COURSE values(3,2);

insert into MARK values(1, 5, 1, 1);
insert into MARK values(2, 4, 1, 1);