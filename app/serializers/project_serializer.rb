class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title , :description ,  :created_at 
  	has_many :authors
    has_many :members
    has_many :investors

end
