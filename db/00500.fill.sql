delete from restaurants;

insert into restaurants(name,location,price_range)
          select 'mcdonalds', 'new york', 3
union all select 'pizza hut', 'vegas', 2
union all select 'wendys',    'denver', 3
union all select 'wendys',    'miami', 4
union all select 'taco bell', 'san fran', 3
;

insert into reviews(restaurant_id, name, review, rating) 
          select r.id, 'carl', 'Restaurant was awesome', 5 from restaurants r where name='mcdonalds'
union all select r.id, 'mike', 'Bad restaurant', 1 from restaurants r where name='taco bell'
union all select r.id, 'nell', 'Bad restaurant', 1 from restaurants r where name='pizza hut'
;

