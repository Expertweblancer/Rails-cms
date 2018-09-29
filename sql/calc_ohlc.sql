select distinct on (1)
  id/10
,  max(item_price) over w as high
, min(item_price) over w as low
from annotations 
window w as (partition by id/10 order by 1);
-- order by 1

select  id/10 from annotations
order by 1