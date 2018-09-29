class Project < ActiveRecord::Base
  ## Associations

  has_many :authorships, dependent: :destroy
  has_many :authors, through: :authorships, dependent: :destroy, source: :user

  has_many :membership, dependent: :destroy
  has_many :members, through: :membership, dependent: :destroy, source: :user

  has_many :investment, dependent: :destroy
  has_many :investors, through: :investment, dependent: :destroy, source: :user

  has_many :membership
  has_many :authorship

  ## Validation

  #validates :title, presence: true
  #validates :description, presence: true
  
end
