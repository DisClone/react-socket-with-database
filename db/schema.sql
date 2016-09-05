create table messages (
  id serial primary key,
  message_time varchar(40),
  author_id integer references users(id),
  is_group_message boolean,
  recipient_id integer references users(id),
  group_recipient integer references groups(id)
)

create table users (
  id serial primary key,
  username varchar(50),
  password varchar(300)

)

create table groups (
  id serial primary key,
)

create table groups_users_relations (
  id serial primary key,
  user_id integer references users(id),
  group_id integer references users(id)
)

create table test_msgs (
  id serial primary key,
  body varchar(300),
  author varchar(40)
)
