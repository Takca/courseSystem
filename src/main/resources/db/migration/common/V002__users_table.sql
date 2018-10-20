-- CREATE TABLE USERS(
--   id               NUMBER         NOT NULL,
--   name             VARCHAR(255)   NOT NULL,
--   money_amount     NUMBER         NOT NULL,
--   password         VARCHAR(255)   NOT NULL
-- );
--
-- ALTER TABLE USERS
--   ADD CONSTRAINT USERS_ID_PK PRIMARY KEY (id);
--
-- CREATE SEQUENCE SEQ_USER
--   MINVALUE 1
--   MAXVALUE 9223372036854775807
--   START WITH 1
--   INCREMENT BY 1
--   NOCACHE NOCYCLE;
--
--
--
-- alter table GAME_RESULT add column user_id NUMBER;

CREATE TABLE WEAPON(
  id               NUMBER         NOT NULL,
  quality     NUMBER         NOT NULL,
  person_id NUMBER
);

ALTER TABLE WEAPON
  ADD CONSTRAINT WEAPON_ID_PK PRIMARY KEY (id);
