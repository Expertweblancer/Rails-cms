class Annotation < ActiveRecord::Base

  def self.test1
  end
  def self.sma_ohlc_data
    result = ActiveRecord::Base.connection.exec_query('select distinct on (1)
      aa.id/10 as "id"
    , max(aa.avg_price) over w as high
    , min(aa.avg_price) over w as low
    , first_value(aa.avg_price) over w as "Open"
    , last_value(aa.avg_price) over w as "Close"
    , count(*) over w as "Volumn"
    from (
        select 
          ca.id 
        , avg(ca.item_price) over(order by ca.id rows between unbounded preceding and current row) as avg_price
        from annotations ca
    ) aa
    window w as (partition by aa.id/10 order by 1);')
    return result.to_hash
  end
end
