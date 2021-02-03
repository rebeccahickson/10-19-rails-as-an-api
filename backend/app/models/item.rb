class Item < ApplicationRecord
  belongs_to :category

  def naming
    self.name.upcase
  end
end
