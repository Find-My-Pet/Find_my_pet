class User < ApplicationRecord
  has_secure_password
  before_validation :downcase_email

  serialize :oauth_raw_data, Hash

  validates :first_name, presence: true
  validates :last_name, presence: true
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, uniqueness: {case_sensitive: false},
            format: VALID_EMAIL_REGEX,
            unless: :from_oauth?

  has_many :pets, dependent: :destroy

  def signed_in_with_twitter?
    uid.present? && provider == 'twitter'
  end

  def signed_in_with_facebook?
    uid.present? && provider == 'facebook'
  end

  def update_from_oauth(oauth_data)
    update provider: oauth_data['provider'],
           uid: oauth_data['uid'],
           oauth_token: oauth_data['credentials']['token'],
           oauth_secret: oauth_data['credentials']['secret'],
           oauth_raw_data: oauth_data
  end

  private

  def downcase_email
    self.email.downcase! if email.present?
  end

  def from_oauth?
    provider.present? && uid.present?
  end

  def self.find_from_oauth(oauth_data)
    User.where("email = ? OR (provider = ? AND uid = ?)", oauth_data['info']['email'], oauth_data['provider'], oauth_data['uid']).first
  end

  def self.create_from_oauth(oauth_data)
    full_name = oauth_data['info']['name'].split
    User.create first_name: full_name[0],
                last_name: full_name[1],
                email: oauth_data['info']['email'],
                password: SecureRandom.hex(32),
                provider: oauth_data['provider'],
                uid: oauth_data['uid'],
                oauth_token: oauth_data['credentials']['token'],
                oauth_secret: oauth_data['credentials']['secret'],
                oauth_raw_data: oauth_data
  end
end
