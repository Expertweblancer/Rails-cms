class User < ActiveRecord::Base

  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable   , :validatable

  ## Associations
  
  has_many :authorships, dependent: :destroy
  has_many :authored_projects, through: :authorships, dependent: :destroy, source: :project       

  has_many :membership, dependent: :destroy
  has_many :membered_projects, through: :membership, dependent: :destroy, source: :project

  has_many :investment, dependent: :destroy
  has_many :invested_projects, through: :investment, dependent: :destroy, source: :project


  has_many :projects

  ## Validation             

  validates :first_name, presence: true 
  validates :last_name, presence: true


  validates :email, 
   format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }, 
  uniqueness: true,
   unless: lambda { email.nil? }

  validate :at_least_one_role

  def at_least_one_role
    if [self.researcher, self.investor].reject(&:blank?).size == 0
     errors[:base] << ("Please choose at least one role") 
   end
  end

  ## Role separation

  def researcher?
   if self.researcher
    return true
   end
  end

  def investor?
    if self.investor
      return true
    end
  end

end
