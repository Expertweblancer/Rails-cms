class TokenSerializer < ActiveModel::Serializer
  attributes :id ,:user_id , :token ,:created_at ,:updated_at
end
