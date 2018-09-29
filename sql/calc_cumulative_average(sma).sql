select 

ad.id, avg(ad.item_price) over(order by ad.id rows between unbounded preceding and current row) as avg_downloads
from annotations ad

